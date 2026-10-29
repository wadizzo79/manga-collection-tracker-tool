import MangaRow from './MangaRow';

function MangaList({ manga, setManga, searchBooks, testKodansha, mangaInfo }){
    

    return (
        <>
        <button onClick={() => searchBooks("Blue Lock")}>
            Test Open Library
        </button>
        <button onClick={testKodansha}>
            Test Kodansha
        </button>
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
                {manga.map(currentManga => (
                    <MangaRow 
                        key={currentManga.id}
                        currentManga={currentManga}
                        manga={manga}
                        setManga={setManga}
                        mangaInfo={mangaInfo}
                    />
                     // Table entry per row 
                    ))
                }
                  
            </tbody>
        </table>
        </>
    ); // Manga entry list
}

export default MangaList;