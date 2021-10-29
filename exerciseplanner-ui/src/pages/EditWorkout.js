import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';

function EditWorkout({workoutToEdit}) {

    const [name, setName] = useState(workoutToEdit.name);
    const [exercises, updateExercises] = useState(workoutToEdit.exercises);
    const [day, setDay] = useState(workoutToEdit.day);
    const [exerciseName, addName] = useState('');
    const [exerciseMuscleGroup, addMuscleGroup] = useState('');
    const [exerciseWeight, addWeight] = useState(0);
    const [exerciseSets, addSets] = useState(0);
    const [exerciseReps, addReps] = useState(0);
    const [page, refresh] = useState();

    const history = useHistory();

    const updateWorkout = async () => {

        const exercise = {name: exerciseName, muscleGroup: exerciseMuscleGroup, weight: exerciseWeight , sets: exerciseSets, reps: exerciseReps};
        exercises.push(exercise);
        updateExercises(exercises);
        const changedWorkout = {name, exercises};
        const response = await fetch(`/workouts/${workoutToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(changedWorkout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            console.log('Workout update successful');
        }
        else {
            alert(`Failed to edit exercise, status code = ${response.status}`)
        }
        refresh({});
    };

    const assignDay = async () => {

        const changedWorkout = {name, exercises, day};
        
        const response = await fetch(`/days/${workoutToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(changedWorkout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            console.log('Day assigned')
        }
        else {
            alert(`Failed to edit exercise, status code = ${response.status}`)
        }
    };

    return(
        <div>
            <h1>{ name }</h1>
            <table>
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
                                onChange={e => addName(e.target.value)}/>
                        </td>
                        <td>
                            <input
                                type='text'
                                value={exerciseMuscleGroup}
                                onChange={e => addMuscleGroup(e.target.value)}/>
                        </td>
                        <td>
                            <input
                                type='text'
                                value={exerciseWeight}
                                onChange={e => addWeight(e.target.value)}/>
                        </td>
                        <td>
                            <input
                                type='text'
                                value={exerciseSets}
                                onChange={e => addSets(e.target.value)}/>
                        </td>
                        <td>
                            <input
                                type='text'
                                value={exerciseReps}
                                onChange={e => addReps(e.target.value)}/>
                        </td>
                        <td><button onClick={updateWorkout}>Add Exercise</button></td>
                    </tr>
                </tbody>
                <ExerciseList exercises = {exercises}></ExerciseList>
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
                    </select>
                    <button onClick={assignDay}>Submit</button>
            <br></br>
            <Link to='/create-workout' className='App-link'>Create another Workout</Link>
            <br></br>
            <Link to='/' className='App-link'>Return to Home</Link>
        </div>
    )
};

export default EditWorkout