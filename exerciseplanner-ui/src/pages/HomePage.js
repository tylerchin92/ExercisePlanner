import React, { useEffect } from 'react';
import { useState } from 'react';
import Schedule from '../components/Schedule';
import WorkoutNavbar from '../components/WorkoutNavbar';

// The homepage displays the user's workout schedule and allows them to navigate the website
function HomePage({setWorkoutToEdit}) {

    const [workouts, setWorkouts] = useState([]);


    // Gets all existing workouts from the database
    const findWorkouts = async () => {
        const response = await fetch('/workouts');
        const data = await response.json();

        if (response.status === 200) {
            setWorkouts(data);
        }
        else {
            console.error(`Could not fetch, status code = ${response.status}`)
        }

    };

    useEffect(() => {
        findWorkouts();
    }, [])


    return (
        <div>
            <WorkoutNavbar />
            <h1>Your Workout Schedule</h1>
            <div class='table-responsive'>
                <table class='table table-dark table-bordered'>
                    <thead>
                        <tr>
                            <th><h2>Sunday</h2></th>
                            <th><h2>Monday</h2></th>
                            <th><h2>Tuesday</h2></th>
                            <th><h2>Wednesday</h2></th>
                            <th><h2>Thursday</h2></th>
                            <th><h2>Friday</h2></th>
                            <th><h2>Saturday</h2></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/*Display the workouts assigned to each day*/}
                            <Schedule workouts={workouts} day={'Sunday'} setWorkoutToEdit={setWorkoutToEdit}></Schedule>
                            <Schedule workouts={workouts} day={'Monday'} setWorkoutToEdit={setWorkoutToEdit}></Schedule>
                            <Schedule workouts={workouts} day={'Tuesday'} setWorkoutToEdit={setWorkoutToEdit}></Schedule>
                            <Schedule workouts={workouts} day={'Wednesday'} setWorkoutToEdit={setWorkoutToEdit}></Schedule>
                            <Schedule workouts={workouts} day={'Thursday'} setWorkoutToEdit={setWorkoutToEdit}></Schedule>
                            <Schedule workouts={workouts} day={'Friday'} setWorkoutToEdit={setWorkoutToEdit}></Schedule>
                            <Schedule workouts={workouts} day={'Saturday'} setWorkoutToEdit={setWorkoutToEdit}></Schedule>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
        </div>
    );
};

export default HomePage