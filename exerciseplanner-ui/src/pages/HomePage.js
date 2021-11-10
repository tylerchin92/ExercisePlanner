import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Schedule from '../components/Schedule';
import SongDisplay from '../components/SongDisplay';

function HomePage() {

    const [workouts, setWorkouts] = useState([]);
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [minTempo, setMinTempo] = useState(0);
    const [maxTempo, setMaxTempo] = useState(0);

    const findSongs = async () => {
        const response = await fetch('http://127.0.0.1:8000/songs');
        const data = await response.json();

        if (response.ok) {
            setSongs(data);
        }
        else {
            console.error(`Could not fetch, status code = ${response.status}`)
        };
        
    };

    const filterSongs = () => {

        findSongs();
        
        const minFilter = songs.filter(song => song.tempo >= minTempo);

        const maxFilter = minFilter.filter(song => song.tempo <= maxTempo)
        
        setFilteredSongs(maxFilter);
        
    }


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
            <h1>Your Workout Schedule</h1>
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
            <br />
            <Link to='/create-workout' className='App-link'>Create a Workout</Link>
            <br />
            <h2>Workout Song Recommendations</h2>
            <div>
                <label>Set Minimum Tempo</label>
                <input 
                    type='number' 
                    value={minTempo} 
                    min='0'
                    max='200'
                    defaultValue='0'  
                    onChange={e => setMinTempo(e.target.value)} />
                <br />
                <label>Set Maximum Tempo</label>
                <input 
                    type='number' 
                    value={maxTempo} 
                    max='200'  
                    defaultValue='200'
                    onChange={e => setMaxTempo(e.target.value)} />
                <br />
                <button onClick= {filterSongs}>Request New Songs</button>
            </div>
            <SongDisplay songs = {filteredSongs}></SongDisplay>
        </div>
    );
};

export default HomePage