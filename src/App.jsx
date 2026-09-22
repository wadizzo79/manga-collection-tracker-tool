import { useState } from 'react'
import './App.css'
import InputArea from './components/InputArea.jsx'
import MangaList from './components/MangaList.jsx'

function App() {
  const [manga, setManga] = useState([]);

  const newId = manga.length > 0
    ? Math.max(...manga.map(manga => manga.id)) + 1
    : 1; //Calculates the next available id from existing entries


  const mangaInfo = [{
    id: 30656,
    title: "Vagabond",
    japaneseVolumes: 37,

    englishEditions: [
      {
        name: "Singles",
        format: "single",
        volumes: [

        ]
      },
      {
        name: "VIZBIG",
        format: "omnibus",
        volumes: [
          {
            number: 1,
            covers: [1, 2, 3]
          },
          {
            number: 2,
            covers: [4, 5, 6]
          }
        ]
      }
    ]
  },
  {
    id: 54321,
    title: "Blue Lock",
    japaneseVolumes: 40,

    englishEditions: []
  }
];

  function addManga(id, text, volumes) {  
    console.log("AniList ID:", id);
    console.log("mangaInfo:", mangaInfo);

    const selectedManga = mangaInfo.find(manga => manga.id === id); // Compares the id from aniList against the id of same manga in mangainfo to find more details
    console.log("SELECTED MANGA:", selectedManga);

    const newManga = {
      id: newId, // Manga collection's ID
      mangaId: id, // AniList's ID
      text: text, // Manga title
      volumes: volumes, // AniList's general volume count
      englishEditions: selectedManga.englishEditions, // The english edition information from the record found in mangaInfo 
      selectedEdition: "VIZBIG", // The default selection for an added manga
      collectedVolumes: [1] // The number of volumes owned by the user is stored here
    }; // Creates an entry
    

    console.log("NEW MANGA: ", newManga);

    setManga(currentManga => [
      ...currentManga,
      newManga
    ]); // Adds the new entry to the existing ones


  }

  const userCollection = {
    mangaId: 12345,
    title: "Vagabond",

    englishEditions: [
      {
        name: "VIZBIG",
        volumes: [1, 2]
      }
    ]
  };



  return (
    <>
      <InputArea addManga={addManga} />
      
      <MangaList manga={manga} setManga={setManga} />
    </>
  );
}

export default App
