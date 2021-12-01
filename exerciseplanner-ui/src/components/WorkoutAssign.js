import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

// Component that allows the user to assign a workout to a day on the schedule
function WorkoutAssign({workout, onEdit, onDelete, assignDay, setDay}) {
        return (
            <tr>
                <td>{workout.name}</td>
                <td><select onChange={e => setDay(e.target.value)}>
                    <option value="none" selected disabled hidden>
                        Select an Option
                    </option>
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option value="">Unassign</option>
                    </select>
                    <button onClick={() => assignDay(workout._id)}>Submit</button>
                </td>
                <td><AiOutlineEdit onClick={() => onEdit(workout)} /></td>
                <td><AiOutlineDelete onClick={() => onDelete(workout._id)}/></td>
            </tr>
    )
};

export default WorkoutAssign