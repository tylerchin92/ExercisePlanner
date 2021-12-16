import React from 'react';
import { useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import ToggleEdit from './ToggleEdit';

// Component for each exercise mapped to a table row
function Exercise({ exercise, editExercise, deleteExercise }) {

    const [display, setDisplay] = useState(
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.muscleGroup}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.sets}</td>
            <td>{exercise.reps}</td>
            <td><AiOutlineEdit onClick={() => setDisplay(<ToggleEdit exercise={exercise} editExercise={editExercise} deleteExercise={deleteExercise} />)} /></td>
            <td><AiOutlineDelete onClick={() => deleteExercise(exercise)} /></td>
        </tr>);

    return (
        display
    );
};

export default Exercise