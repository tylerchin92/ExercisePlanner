import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import WorkoutNavbar from '../components/WorkoutNavbar';

// Displays page for a specific exercise for editing
function EditWorkout({ workoutToEdit }) {

    const storedName = localStorage.getItem('savedName');
    const storedExercises = JSON.parse(localStorage.getItem('savedExercises'));
    const storedDay = localStorage.getItem('savedDay');
    const storedID = localStorage.getItem('savedID');

    const [id, setID] = useState(workoutToEdit ? workoutToEdit._id : storedID)
    const [name, setName] = useState(workoutToEdit ? workoutToEdit.name : storedName);
    const [exercises, updateExercises] = useState(workoutToEdit ? workoutToEdit.exercises : storedExercises);
    const [day, setDay] = useState(workoutToEdit ? workoutToEdit.day : storedDay);
    const [dayDisplay, setDayDisplay] = useState(workoutToEdit ? workoutToEdit.day : storedDay);
    const [exerciseName, addName] = useState('');
    const [exerciseMuscleGroup, addMuscleGroup] = useState('');
    const [exerciseWeight, addWeight] = useState(0);
    const [exerciseSets, addSets] = useState(0);
    const [exerciseReps, addReps] = useState(0);
    const [page, refresh] = useState();

    const history = useHistory();

    useEffect(() => {
        if (workoutToEdit !== undefined) {
            localStorage.setItem('savedExercises', JSON.stringify(workoutToEdit.exercises));
            localStorage.setItem('savedName', workoutToEdit.name);
            localStorage.setItem('savedDay', workoutToEdit.day);
            localStorage.setItem('savedID', workoutToEdit._id);
        }
    }, [workoutToEdit]);

    // Add exercises to a workout
    const addExercise = async () => {

        const exercise = { name: exerciseName, muscleGroup: exerciseMuscleGroup, weight: exerciseWeight, sets: exerciseSets, reps: exerciseReps };
        exercises.push(exercise);
        updateExercises(exercises);
        const changedWorkout = { name: name, exercises: exercises };
        const response = await fetch(`/workouts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(changedWorkout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            console.log('Exercise added.');
            localStorage.setItem('savedExercises', JSON.stringify(exercises))
        }
        else {
            alert(`Failed to add exercise, status code = ${response.status}`)
        }
        refresh({});
    };

    const deleteExercise = async exercise => {
        const filter = exercises.filter(e => e !== exercise);
        updateExercises(filter);
        const changedWorkout = { name: name, exercises: filter };
        const response = await fetch(`/workouts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(changedWorkout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            console.log('Exercise deleted.');
            localStorage.setItem('savedExercises', JSON.stringify(filter))
            window.location.reload(false);
        }
        else {
            alert(`Failed to delete exercise, status code = ${response.status}`)
        }
    };


    const editExercise = async (exercise, weight, sets, reps) => {

        const findExercise = exercises.filter(e => e === exercise);
        const exerciseToEdit = findExercise[0];
        const exerciseIndex = exercises.indexOf(exerciseToEdit);
        const updatedExercise = { name: exercise.name, muscleGroup: exercise.muscleGroup, weight: weight, sets: sets, reps: reps };
        exercises[exerciseIndex] = updatedExercise
        updateExercises(exercises)
        const changedWorkout = { name: name, exercises: exercises };

        const response = await fetch(`/workouts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(changedWorkout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            console.log('Exercise edited.');
            localStorage.setItem('savedExercises', JSON.stringify(exercises))
            console.log(weight)
            console.log(updatedExercise)
        }
        else {
            alert(`Failed to edit exercise, status code = ${response.status}`)
        }
        refresh({});
    }

    // Assign this workout to a day on the schedule
    const assignDay = async () => {

        const changedWorkout = { name, exercises, day };

        const response = await fetch(`/days/${id}`, {
            method: 'PUT',
            body: JSON.stringify(changedWorkout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            console.log('Day assigned')
            setDayDisplay(day);
            localStorage.setItem("savedDay", day)

        }
        else {
            alert(`Failed to assign day, status code = ${response.status}`)
        }
    };

    return (
        <div>
            <WorkoutNavbar />
            <h1>{name}</h1>
            <h2>Assigned Day: {dayDisplay}</h2>
            <table class='table table-dark table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Muscle Group</th>
                        <th>Weight (lbs)</th>
                        <th>Sets</th>
                        <th>Reps</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                type='text'
                                value={exerciseName}
                                onChange={e => addName(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type='text'
                                value={exerciseMuscleGroup}
                                onChange={e => addMuscleGroup(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type='text'
                                value={exerciseWeight}
                                onChange={e => addWeight(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type='text'
                                value={exerciseSets}
                                onChange={e => addSets(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type='text'
                                value={exerciseReps}
                                onChange={e => addReps(e.target.value)} />
                        </td>
                        <td><button class='btn btn-outline-light' onClick={addExercise}>Add Exercise</button></td>
                    </tr>
                </tbody>
                <ExerciseList exercises={exercises} editExercise={editExercise} deleteExercise={deleteExercise}></ExerciseList>
            </table>

            <h4>Assign Workout to a Day</h4>
            <select onChange={e => setDay(e.target.value)}>
                <option value="none" selected disabled hidden>
                    Select an Option
                </option>
                <option>Sunday</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option value="">Unassign</option>
            </select>
            <button class='btn btn-outline-light' onClick={() => assignDay()}>Submit</button>
            <br></br>
        </div>
    )
};

export default EditWorkout