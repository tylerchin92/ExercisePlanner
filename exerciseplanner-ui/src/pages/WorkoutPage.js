import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import WorkoutListFull from '../components/WorkoutListFull';
import WorkoutNavbar from '../components/WorkoutNavbar';

// Displays page with all existing workouts
function WorkoutPage ({setWorkoutToEdit, workoutToEdit}) {

    const [workouts, setWorkouts] = useState([]);
    const [name, setName] = useState('');
    const [exercises, updateExercises] = useState('');
    const [day, setDay] = useState('');

    const history = useHistory();

    // Brings user to specific page for selected workout for editing
    const onEdit = workout => {
        setWorkoutToEdit(workout);
        history.push('/edit-workout')
    }

    // Delete a workout
    const onDelete = async _id => {
        const response = await fetch(`/workouts/${_id}`, {method: 'DELETE'});

        if (response.status === 204) {
            setWorkouts(workouts.filter(e => e._id !== _id));
        }
        else {
            console.error(`Failed to delete workout with _id = ${_id}, status code = ${response.status}`)
        }
    };

    // Assign a workout to a specific day on the schedule
    const assignDay = async _id => {

        const changedWorkout = {name, exercises, day};
        
        const response = await fetch(`/days/${_id}`, {
            method: 'PUT',
            body: JSON.stringify(changedWorkout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            console.log("Successfully edited exercise")
        }
        else {
            alert(`Failed to edit exercise, status code = ${response.status}`)
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
            <WorkoutListFull workouts = {workouts} onEdit = {onEdit} onDelete = {onDelete} assignDay = {assignDay} setDay={setDay}></WorkoutListFull>
            <br></br>
        </div>
    );
};

export default WorkoutPage