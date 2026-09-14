import { useState } from 'react';

function MangaList({ manga }){

    return (
        <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Volumes Collected</th>
                <th>Volumes Available (EN)</th>
                <th>Volumes Available (JP)</th>
                </tr>
            </thead>

            <tbody>
                {manga.map(manga =>
                    <tr>
                        <td>{manga.text}</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>{manga.volumes}</td>
                    </tr>)} {/* Table entry per row */}
            </tbody>
        </table>
    ); // Manga entry list
}

export default MangaList;