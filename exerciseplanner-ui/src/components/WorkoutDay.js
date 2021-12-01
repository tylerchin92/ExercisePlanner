import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Exercise from './Exercise';

// Component that displays each workout on the schedule
function WorkoutDay({workout, exercises}) {

        return (
            
            <table>
                <caption>{workout.name}</caption>
                <thead>
                <th>Exercise</th>
                    <th>Group</th>
                    <th>Weight (lbs)</th>
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