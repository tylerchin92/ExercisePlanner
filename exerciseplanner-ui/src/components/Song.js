import React from 'react';

function Song({song}) {
    return (
        <tr>
            <td>{song.title}</td>
            <td>{song.artist}</td>
            <td>{song.album}</td>
            <td>{song.genre}</td>
        </tr>

)
}

export default Song