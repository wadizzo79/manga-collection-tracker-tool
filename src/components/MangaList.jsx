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
                    const collectedVolumes = manga.collectedVolumes;
                    console.log(selectedEdition.volumes.length);
                    console.log("volumes", collectedVolumes);

                    return (
                        <tr>
                            <td>{manga.text}</td>
                            <td>{manga.collectedVolumes.length}/{selectedEdition.volumes.length}</td> {/* Displays the number the user owns against the numbers of the selected edition available */}
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
                                        className={manga.collectedVolumes.includes(volume.number) ? "collected" : ""} // Checks if a volume has been collected among the stored volumes
                                        onClick={() => {
                                            setManga(currentManga => 
                                                currentManga.map(item =>
                                                    item.id === manga.id
                                                        ? {
                                                            ...item,
                                                            collectedVolumes: manga.collectedVolumes.includes(volume.number)
                                                            ? item.collectedVolumes.filter(
                                                                collectedVolume => collectedVolume !== volume.number
                                                            ) // On click if the volume number is present it is removed
                                                            : [
                                                                ...item.collectedVolumes,
                                                                volume.number
                                                            ] // if not it is added
                                                        }
                                                        : item
                                                    )
                                                );
                                         }} // When an uncollected volume is clicked it adds it and vice versa
                                        >
                                            {volume.number}
                                    </button>
                                ))} {/* A volume selector in the form of numbers that stores and deletes the number of volumes a user has collected */}
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