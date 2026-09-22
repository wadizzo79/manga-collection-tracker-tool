import { useState } from 'react';

function MangaList({ manga, setManga }){
    const [inputMode, setInputMode] = useState("total"); // Remembers the input mode the user selected
    const [totalInput, setTotalInput] = useState(""); // Remembers the input the user typed into the field
    const [rangeStart, setRangeStart] = useState(""); // Remembers the first value entered by the user after selecting the "range" option
    const [rangeEnd, setRangeEnd] = useState(""); // Remembers the second value entered by the user after selecting thr "range" option

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
                    console.log(totalInput);
                    console.log(
                        Array.from({ length: Number(totalInput) },(_, index) => index + 1)
                    );

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
                                <select
                                    value={inputMode}
                                    onChange={(e) => setInputMode(e.target.value)}
                                >
                                    <option value="total">Total</option>
                                    <option value="range">Range</option>
                                    <option value="individual">Individual</option>
                                </select> {/* The user can select how to input their volumes of manga */}
                                {inputMode === "total" && (
                                    <input
                                        type="number"
                                        min="0"
                                        value={totalInput} // React controls what is displayed on the input
                                        onChange={(e) => setTotalInput(e.target.value)} // What is typed updates totalInput
                                    />
                                )} {/* When a user selects total as their input a field will appear */}

                                <button
                                    onClick={
                                        () => {
                                            const volumes = Array.from(
                                                { length: Number(totalInput) },
                                                (_, index) => index + 1
                                            ); // Coverts the total into individual entries eg 5 means the user has collected the first 5 volumes

                                            setManga(currentManga => currentManga.map(item =>
                                                item.id === manga.id
                                                ? { ...item, collectedVolumes: volumes }
                                                : item
                                            )
                                        ); // Stores the separated entries into their respective manga
                                    }}
                                >
                                    Apply
                                </button>

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