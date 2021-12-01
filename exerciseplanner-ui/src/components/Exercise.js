import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

// Component for each exercise mapped to a table row
function Exercise({exercise, onEdit, onDelete}) {
        return (

            <tr>
                <td>{exercise.name}</td>
                <td>{exercise.muscleGroup}</td>
                <td>{exercise.weight}</td>
                <td>{exercise.sets}</td>
                <td>{exercise.reps}</td>
            </tr>

    )
};

export default Exercise