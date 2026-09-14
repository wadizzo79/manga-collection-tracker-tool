import { useState } from 'react'
import './App.css'
import InputArea from './components/InputArea.jsx'
import MangaList from './components/MangaList.jsx'

function App() {
  const [manga, setManga] = useState([]);

  const newId = manga.length > 0
    ? Math.max(...manga.map(manga => manga.id)) + 1
    : 1; //Calculates the next available id from existing entries

  function addManga(text) {
    const newManga = {
      id: newId,
      text: text,
    }; // Creates an entry

    setManga(currentManga => [
      ...currentManga,
      newManga
    ]); // Adds the new entry to the existing ones
  }

  return (
    <>
      <InputArea addManga={addManga} />

      <MangaList manga={manga} />
    </>
  );
}

export default App
