import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Schedule from '../components/Schedule';

function HomePage() {

    const [workouts, setWorkouts] = useState([]);



    const findWorkouts = async day => {
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
            <table>
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
                    <Schedule workouts = {workouts} day ={'Sunday'} ></Schedule>
                    <Schedule workouts = {workouts} day ={'Monday'} ></Schedule>
                    <Schedule workouts = {workouts} day ={'Tuesday'} ></Schedule>
                    <Schedule workouts = {workouts} day ={'Wednesday'} ></Schedule>
                    <Schedule workouts = {workouts} day ={'Thursday'} ></Schedule>
                    <Schedule workouts = {workouts} day ={'Friday'} ></Schedule>
                    <Schedule workouts = {workouts} day ={'Saturday'} ></Schedule>
                </tr>
            </tbody>
        </table>
            
            <Link to='/workouts' className='App-link'>View and Assign Workouts</Link>
            <br></br>
            <Link to='/create-workout' className='App-link'>Create a Workout</Link>
        </div>
    );
};

export default HomePage