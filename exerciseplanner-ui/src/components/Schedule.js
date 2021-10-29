import React from 'react';
import { useEffect } from 'react'
import WorkoutDay from './WorkoutDay';

function Schedule ({workouts, findWorkout, day}) {
    
    const dayWorkout = workouts.filter(workout => workout.day === day)

    return (
        <td>
            {dayWorkout.map((workout, i) =>  <WorkoutDay 
                workout={workout}
                exercises={workout.exercises}
                key={i} />)}
        </td>
    );
};

export default Schedule