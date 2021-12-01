import React from 'react';
import Exercise from './Exercise';

// Component that maps each exercise to a table for a workout
function ExerciseList({exercises}) {
    return(
            <tbody>
                {exercises.map((exercise, i) =>  <Exercise 
                    exercise={exercise}
                    key={i} />)}
            </tbody>

    )
}

export default ExerciseList