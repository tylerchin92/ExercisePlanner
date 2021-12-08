import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import WorkoutList from '../components/WorkoutList';
import WorkoutNavbar from '../components/WorkoutNavbar';

// Displays page where users can create a new workout
function WorkoutCreator({setWorkoutToEdit}) {

    const [name, setName] = useState('');
    const [exercises, setExercises] = useState('');
    const [workouts, setWorkouts] = useState([]);

    const history = useHistory();

    // Adds a new workout to the database
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

    // Takes user to the page for the specified workout for editing
    const onEdit = workout => {
        setWorkoutToEdit(workout);
        history.push('/edit-workout')
    }

    // Deletes a workout
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
            <WorkoutNavbar />
            <h1>Create a Workout</h1>
            <input
                type='text'
                value={name}
                placeholder='New Workout Name'
                onChange={e => setName(e.target.value)} />
            <button class='btn btn-outline-light' onClick={addWorkout}>Create</button>
            <br></br>
            <WorkoutList workouts = {workouts} onEdit = {onEdit} onDelete = {onDelete}></WorkoutList>
            <br></br>
        </div>
    )
};

export default WorkoutCreator