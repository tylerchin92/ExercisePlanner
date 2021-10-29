import React from 'react';
import WorkoutAssign from './WorkoutAssign';


function WorkoutListFull({workouts, onDelete, onEdit, assignDay, setDay}) {

    return (
        <div>
            <h1>Your Workouts</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Assign Workout</th>
                        <th>Edit/View Workout</th>
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