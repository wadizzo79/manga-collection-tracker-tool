import { useState } from 'react'
import './App.css'
import InputArea from './components/InputArea.jsx'
import MangaList from './components/MangaList.jsx'

function App() {
  const [manga, setManga] = useState([]);

  const newId = manga.length > 0
    ? Math.max(...manga.map(manga => manga.id)) + 1
    : 1; //Calculates the next available id from existing entries

  function addManga(id, text, volumes) {
    const newManga = {
      id: newId, // Manga collection's ID
      mangaId: id, // AniList's ID
      text: text, // Manga title
      volumes: volumes // AniList's general volume count

    }; // Creates an entry

    setManga(currentManga => [
      ...currentManga,
      newManga
    ]); // Adds the new entry to the existing ones
  }

  const mangaInfo = [{
    id: 12345,
    title: "Vagabond",
    japaneseVolumes: 37,

    englishEditions: [
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

  const selectedManga = mangaInfo.find(manga => manga.id === id);

  return (
    <>
      <InputArea addManga={addManga} />

      <MangaList manga={manga} />
    </>
  );
}

export default App
