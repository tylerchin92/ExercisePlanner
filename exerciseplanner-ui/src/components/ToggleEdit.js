import React from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { useState } from "react";

// When user clicks edit button, display form to edit that exercise
function ToggleEdit({exercise, editExercise, deleteExercise}) {

    const [editedWeight, setWeight] = useState(exercise.weight);
    const [editedSets, setSets] = useState(exercise.sets);
    const [editedReps, setReps] = useState(exercise.reps);

    const handleEdit = (exercise, editedWeight, editedSets, editedReps) => {
        editExercise(exercise, editedWeight, editedSets, editedReps);
        window.location.reload(false);
    }

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.muscleGroup}</td>
            <td><input type='text' value={editedWeight} onChange={e => setWeight(e.target.value)} /></td>
            <td><input type='text' value={editedSets}onChange={e => setSets(e.target.value)} /></td>
            <td><input type='text' value={editedReps} onChange={e => setReps(e.target.value)} /></td>
            <td><button class='btn btn-outline-light' onClick={() => handleEdit(exercise, editedWeight, editedSets, editedReps)}>Save</button></td>
            <td><AiOutlineDelete onClick={() => deleteExercise(exercise)} /></td>
        </tr>
    );
};

export default ToggleEdit