import React from 'react';

// Component that maps each song to a row in the song table display
function Song({song}) {
    return (
        <tr>
            <td>{song.name}</td>
            <td>{song.artists}</td>
            <td>{song.tempo}</td>
        </tr>

)
}

export default Song