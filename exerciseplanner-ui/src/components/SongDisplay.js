import React from 'react';
import Song from './Song';

// Displays the song table on the homepage, maps each song to the table body
function SongDisplay({songs}) {

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Tempo</th>
                </tr>
            </thead>
            <tbody>
                {songs.map((song, i) =>  <Song 
                        song={song}
                        key={i} />)}
            </tbody>
        </table>
        
    );

};

export default SongDisplay