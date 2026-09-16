import { useState } from 'react';

function MangaList({ manga, setManga }){

    return (
        <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Volumes Collected</th>
                <th>English Edition</th>
                <th>Japanese Volumes Released</th>
                </tr>
            </thead>

            <tbody>
                {manga.map(manga => {
                    const selectedEdition = manga.englishEditions.find(
                        edition => edition.name === manga.selectedEdition
                    );

                    return (
                        <tr>
                            <td>{manga.text}</td>
                            <td>N/A</td>
                            <td>
                                <select 
                                    value={manga.selectedEdition}
                                    onChange={(e) => {
                                        setManga(currentManga => currentManga.map(
                                            item => item.id === manga.id
                                            ? { ...item, selectedEdition: e.target.value } // item maintains the data for the manga while only the edition changes
                                            : item
                                        )
                                        );
                                    }} 
                                    >
                                        {manga.englishEditions.map(edition => (
                                            <option key={edition.name} value={edition.name}>
                                                {edition.name} {/* Name of the edition */}
                                            </option>
                                        ))}
                                </select> {/* The user selects the english edition from here */}
                            </td>
                            <td>{manga.volumes}</td>
                        </tr>)} // Table entry per row 
                    )
                }
                    
            </tbody>
        </table>
    ); // Manga entry list
}

export default MangaList;