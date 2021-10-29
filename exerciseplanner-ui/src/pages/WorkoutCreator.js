import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import WorkoutList from '../components/WorkoutList';


function WorkoutCreator({setWorkoutToEdit}) {

    const [name, setName] = useState('');
    const [exercises, setExercises] = useState('');
    const [workouts, setWorkouts] = useState([]);

    const history = useHistory();

    const addWorkout = async () => {
        const newWorkout = { name, exercises };
        const response = await fetch('/create-workout', {
            method: 'POST',
            body: JSON.stringify(newWorkout),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.status === 201) {
            
        } else {
            alert(`Failed to add workout, status code = ${response.status}`);
        }
        window.location.reload(false)
    };

    const onEdit = workout => {
        setWorkoutToEdit(workout);
        history.push('/edit-workout')
    }

    const onDelete = async _id => {
        const response = await fetch(`/workouts/${_id}`, {method: 'DELETE'});

        if (response.status === 204) {
            setWorkouts(workouts.filter(e => e._id !== _id));
        }
        else {
            console.error(`Failed to delete workout with _id = ${_id}, status code = ${response.status}`)
        }
    };

    const loadWorkouts = async () => {
        const response = await fetch('/workouts');
        const data = await response.json();
        setWorkouts(data);
    }

    useEffect(()=> {
        loadWorkouts();
    }, []);

    return(
        <div>
            <h1>Create a Workout</h1>
            <input
                type='text'
                value={name}
                placeholder='Enter Workout Name'
                onChange={e => setName(e.target.value)} />
            <button onClick={addWorkout}>Create</button>
            <br></br>
            <WorkoutList workouts = {workouts} onEdit = {onEdit} onDelete = {onDelete}></WorkoutList>
            <br></br>
            <Link to='/' className='App-link'>Return to Home</Link>
        </div>
    )
};

export default WorkoutCreator