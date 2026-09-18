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
                    console.log(selectedEdition.volumes.length);

                    return (
                        <tr>
                            <td>{manga.text}</td>
                            <td>{selectedEdition.volumes.length}</td> {/* Displays the number the user owns against the numbers of the selected edition available */}
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
                                {selectedEdition.volumes.map(volume => (
                                    <button 
                                        key={volume.number} 
                                        className={manga.collectedVolumes.includes(volume.number) ? "collected" : ""}
                                        onClick={() => manga.collectedVolumes.includes(volume.number) === manga.collectedVolumes ?
                                            manga.collectedVolumes.filter(volume.number) //Continue from here
                                         }
                                        >
                                            {volume.number}
                                    </button>
                                ))} {/* The number of volumes available to be selected is displayed here */}
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