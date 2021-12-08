import React from 'react';
import WorkoutAssign from './WorkoutAssign';

// This workout list differs from the other because it allows the user to assign the workout to a day
function WorkoutListFull({workouts, onDelete, onEdit, assignDay, setDay}) {

    return (
        <div>
            <h1>Your Workouts</h1>
            <table class='table table-dark table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Assign Workout</th>
                        <th>View Workout and Add Exercises</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map((workout, i) =>  <WorkoutAssign 
                        workout={workout}
                        assignDay = {assignDay}
                        onDelete = {onDelete}
                        onEdit = {onEdit}
                        setDay = {setDay}
                        key={i} />)}
                </tbody>
            </table>
        </div>
    )
};

export default WorkoutListFull