import React from 'react';
import Exercise from './Exercise';

// Component that maps each exercise to a table for a workout
function ExerciseList({exercises, editExercise, deleteExercise}) {
    return(
            <tbody>
                {exercises.map((exercise, i) =>  <Exercise 
                    exercise={exercise}
                    editExercise={editExercise}
                    deleteExercise={deleteExercise}
                    key={i} />)}
            </tbody>

    )
}

export default ExerciseList