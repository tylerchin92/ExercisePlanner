import ExerciseList from "../components/ExerciseList";
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function ExercisePage ({setExerciseToEdit}) {

    const [exercises, setExercises] = useState([]);
    const [name, setName] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');

    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});

        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        }
        else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    };
    
    const addExercise = async () => {
        const newExercise = { name, muscleGroup };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        window.location.reload(false)
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push('/edit-exercise')
    };

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    };


    useEffect(() => {
        loadExercises();
    }, []);

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Muscle Group</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                type='text'
                                value={name}
                                placeholder='Enter Exercise Name'
                                onChange={e => setName(e.target.value)}/>
                        </td>
                        <td>
                            <input
                                type='text'
                                value={muscleGroup}
                                placeholder='Enter Muscle Group'
                                onChange={e => setMuscleGroup(e.target.value)}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addExercise}>Add</button>
            <br></br>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <br></br>
            <Link to='/' className='App-link'>Go to Home Page</Link>
        </div>
    );
};

export default ExercisePage