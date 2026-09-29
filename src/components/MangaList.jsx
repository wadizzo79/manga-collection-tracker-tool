import { useState } from 'react';

function MangaList({ manga, setManga }){
    const [inputMode, setInputMode] = useState("total"); // Remembers the input mode the user selected
    const [totalInput, setTotalInput] = useState(""); // Remembers the input the user typed into the field after selecting "total"
    const [rangeStart, setRangeStart] = useState(""); // Remembers the first value entered by the user after selecting the "range" option
    const [rangeEnd, setRangeEnd] = useState(""); // Remembers the second value entered by the user after selecting the "range" option
    const [individualInput, setIndividualInput] = useState(""); // Remembers the input the user typed into the field after selecting "individual"

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
                {manga.map(currentManga => {
                    const selectedEdition = currentManga.englishEditions.find(
                        edition => edition.name === currentManga.selectedEdition
                    );
                    const collectedVolumes = currentManga.collectedVolumes;
                    console.log(selectedEdition.volumes.length);
                    console.log("volumes", collectedVolumes);
                    //console.log(totalInput);
                    /*console.log(
                        Array.from({ length: Number(totalInput) },(_, index) => index + 1)
                    ); */

                    const usedEditions = manga
                        .filter(item => item.mangaId === currentManga.mangaId && item.id !== currentManga.id) // Compares a new manga entry with already existing entries and ensures they're the same series(mangaId) but different entry(id)
                        .map(item => item.selectedEdition); // Stores the selected editions of the existing entries

                    return (
                        <tr>
                            <td>{currentManga.text}</td>
                            <td>{collectedVolumes.length}/{selectedEdition.volumes.length}</td> {/* Displays the number the user owns against the numbers of the selected edition available */}
                            <td>
                                <select 
                                    value={currentManga.selectedEdition}
                                    onChange={(e) => {
                                        setManga(currentList => currentList.map(
                                            item => item.id === currentManga.id
                                            ? { 
                                                ...item, 
                                                selectedEdition: e.target.value, 
                                                collectedVolumes: [] // Changing editions refreshes collectedVolumes to 0
                                            } // item maintains the data for the manga while only the edition changes
                                            : item
                                        )
                                        );
                                    }} 
                                    >
                                        {currentManga.englishEditions
                                            .filter(edition => !usedEditions.includes(edition.name))
                                            .map(edition => (
                                                <option key={edition.name} value={edition.name}>
                                                    {edition.name} {/* Name of the edition */}
                                                </option>
                                            ))
                                        }
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
                                    <>
                                        <input
                                            type="number"
                                            min="0"
                                            value={totalInput} // React controls what is displayed on the input
                                            onChange={(e) => setTotalInput(e.target.value)} // What is typed updates totalInput
                                        />

                                        <button
                                            onClick={() => {
                                                    const total = Number(totalInput);

                                                    if (total > selectedEdition.volumes.length) {
                                                        return;
                                                    } // Checks if the input the user added is greater than the number of volumes actually available in the selected edition

                                                    const volumes = Array.from(
                                                        { length: Number(totalInput) }, // Takes the totalInput and converts it from a string to a number which becomes the length
                                                        (_, index) => index + 1 // A function that adds one to the index to represent the volume no. since an array starts from 0 
                                                    ); // Converts the total into individual entries eg 5 means the user has collected the first 5 volumes

                                                    setManga(currentList => currentList.map(item =>
                                                        item.id === currentManga.id
                                                        ? { ...item, collectedVolumes: volumes }
                                                        : item
                                                    )
                                                ); // Stores the separated entries into their respective manga
                                            }}
                                        >
                                            Apply
                                        </button>
                                    </>
                                )} {/* When a user selects total as their input a field will appear */}

                                {inputMode === "range" && (
                                    <>
                                        <input 
                                            type="number"
                                            min="1"
                                            value={rangeStart}
                                            onChange={(e) => setRangeStart(e.target.value)}
                                        /> 

                                        <input
                                            type="number"
                                            min="1"
                                            value={rangeEnd}
                                            onChange={(e) => setRangeEnd(e.target.value)} 
                                        />

                                        <button
                                            onClick={() => {
                                                const start = Number(rangeStart);
                                                const end = Number(rangeEnd);
                                                const max = selectedEdition.volumes.length;

                                                if (start > end || end > max) {
                                                    return;
                                                } // Ensures that the range parameter is within the number of available volumes and that the start value does not exceed the end value

                                                const volumes = Array.from(
                                                    { length: end - start + 1},
                                                    (_, index) => start + index
                                                );
                                    
                                                setManga(currentList => currentList.map(item => 
                                                    item.id === currentManga.id
                                                        ? { 
                                                            ...item, 
                                                            collectedVolumes: [
                                                                ...new Set([
                                                                    ...item.collectedVolumes,
                                                                    ...volumes
                                                                ]) // Added volumes are stored alongside the already existing volumes while preventing duplicates
                                                            ]
                                                        }
                                                        : item
                                                    )
                                                );
                                            }}
                                        >
                                            Apply
                                        </button>
                                    </>
                                )} {/* When a user selects range as their input two fields appear to put in the start and end volumes */}

                                {inputMode === "individual" && (
                                    <>
                                        <input 
                                            type="text"
                                            value={individualInput}
                                            onChange={(e) => setIndividualInput(e.target.value)}
                                        />

                                        <button
                                            onClick={() => {
                                                const volumes = individualInput
                                                    .split(",") // Turns 1,2,3 into ["1","2","3"]
                                                    .map(volume => Number(volume)); // Converts the entered strings into numbers

                                                console.log(volumes);

                                                const max = selectedEdition.volumes.length;

                                                const validVolumes = volumes.filter(
                                                    volume => volume >= 1 && volume <= max
                                                );

                                                setManga(currentList => currentList.map(item =>
                                                    item.id === currentManga.id
                                                    ? { 
                                                        ...item, 
                                                        collectedVolumes: [
                                                            ...new Set([
                                                                ...item.collectedVolumes,
                                                                ...validVolumes 
                                                            ]) 
                                                        ]
                                                    }
                                                    : item
                                                )
                                            );
                                        }}
                                        >
                                            Apply
                                        </button>
                                    </>
                                )} {/* When a user selects 'individual' they will be able to enter multiple numbers that could represent any volume number into the field that appears */}

                          

                                {selectedEdition.volumes.map(volume => (
                                    <button 
                                        key={volume.number} 
                                        className={currentManga.collectedVolumes.includes(volume.number) ? "collected" : ""} // Checks if a volume has been collected among the stored volumes
                                        onClick={() => {
                                            setManga(currentList => 
                                                currentList.map(item =>
                                                    item.id === currentManga.id
                                                        ? {
                                                            ...item,
                                                            collectedVolumes: item.collectedVolumes.includes(volume.number)
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
                            <td>{currentManga.volumes}</td>
                        </tr>)} // Table entry per row 
                    )
                }
                  
            </tbody>
        </table>
    ); // Manga entry list
}

export default MangaList;