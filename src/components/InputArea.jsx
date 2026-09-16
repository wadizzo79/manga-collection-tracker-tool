import { useState } from "react";


function InputArea({ addManga }) {
    const [ newEntry, setNewEntry ] = useState("");
    const [ searchResults, setSearchResults ] = useState([]);

    async function searchManga() {
        const query = `
            query ($search: String!) {
                Page {
                    media(search: $search, type: MANGA) {
                        id
                        title {
                            romaji
                            english
                        }
                        volumes
                    }
                }
            }`; // GraphQL query that searches the AniList database using a search value and give the resulting ID and titles

        const variables = {
            search: newEntry // The search query is given to $search
        };

        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        }); // Makes the request from anilist and puts the response into 'response' 

        const data = await response.json(); // Waits until the response body has been read and converted into a JS object, then stores that object in data
        console.log(data.data.Page.media);
        setSearchResults([
            ...data.data.Page.media
        ]);
    }

    return (
        <>
            <input type= "text" value={newEntry} onChange={(e) => setNewEntry(e.target.value)} />
            <button type="submit" onClick={searchManga}>Search</button>
            {searchResults.map(manga => (
                <p key={manga.id}>{manga.title.romaji} <button type="submit" onClick={() => addManga(manga.id, manga.title.romaji, manga.volumes)}>Add</button></p>
            ))}
            
        </>
    );

}

export default InputArea;