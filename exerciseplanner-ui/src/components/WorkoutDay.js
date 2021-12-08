import React from 'react';
import { useHistory } from 'react-router';
import Exercise from './Exercise';

// Component that displays each workout on the schedule
function WorkoutDay({workout, exercises, setWorkoutToEdit}) {

        const history = useHistory();

        const editWorkout = () => {
            setWorkoutToEdit(workout);
            history.push('/edit-workout');
        }

        return (
            
            <table class='table table-dark table-bordered'>
                <caption>{workout.name} <td><button class='btn btn-outline-light' onClick={() => editWorkout()}>View/Edit</button></td> </caption>
                <thead>
                <th>Exercise</th>
                    <th>Group</th>
                    <th>Weight</th>
                    <th>Sets</th>
                    <th>Reps</th>
                </thead>
            {exercises.map((exercise, i) =>  <Exercise 
                exercise={exercise}
                key={i} />)}
            </table>
            

    )
};

export default WorkoutDay