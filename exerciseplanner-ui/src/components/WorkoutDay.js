import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Exercise from './Exercise';


function WorkoutDay({workout, exercises}) {

        return (
            <div>
                {workout.name}
                <table>
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
            </div>

    )
};

export default WorkoutDay