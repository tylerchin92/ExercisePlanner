import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import WorkoutListFull from '../components/WorkoutListFull';


function WorkoutPage ({setWorkoutToEdit, workoutToEdit}) {

    const [workouts, setWorkouts] = useState([]);
    const [name, setName] = useState('');
    const [exercises, updateExercises] = useState('');
    const [day, setDay] = useState('');

    const history = useHistory();

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
            alert("Successfully edited exercise")
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
            <WorkoutListFull workouts = {workouts} onEdit = {onEdit} onDelete = {onDelete} assignDay = {assignDay} setDay={setDay}></WorkoutListFull>
            <br></br>
            <Link to='/create-workout' className='App-link'>Create another Workout</Link>
            <br></br>
            <Link to='/' className='App-link'>Return to Home</Link>
        </div>
    );
};

export default WorkoutPage