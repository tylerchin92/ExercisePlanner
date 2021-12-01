import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

// Displays the workouts in a table
function Workout({workout, onEdit, onDelete}) {
        return (

            <tr>
                <td>{workout.name}</td>
                <td><AiOutlineEdit onClick={() => onEdit(workout)} /></td>
                <td><AiOutlineDelete onClick={() => onDelete(workout._id)}/></td>
            </tr>

    )
};

export default Workout