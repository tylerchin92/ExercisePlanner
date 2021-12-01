import React from 'react';
import Workout from './Workout';


function WorkoutList({workouts, onDelete, onEdit}) {

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>View Workout and Add Exercises</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {workouts.map((workout, i) =>  <Workout 
                    workout={workout}
                    onDelete = {onDelete}
                    onEdit = {onEdit}
                    key={i} />)}
            </tbody>
        </table>
    )
};

export default WorkoutList