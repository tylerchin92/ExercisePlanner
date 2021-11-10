import React from 'react';

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