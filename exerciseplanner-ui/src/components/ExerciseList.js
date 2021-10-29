import React from 'react';
import Exercise from './Exercise';

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