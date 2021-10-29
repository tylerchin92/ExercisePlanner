import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import WorkoutCreator from './pages/WorkoutCreator';
import WorkoutPage from './pages/WorkoutPage';
import EditWorkout from './pages/EditWorkout';

function App() {

  const [workoutToEdit, setWorkoutToEdit] = useState();
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/workouts'>
            <WorkoutPage setWorkoutToEdit = {setWorkoutToEdit} workoutToEdit = {workoutToEdit} />
          </Route>
          <Route path='/create-workout'>
            <WorkoutCreator setWorkoutToEdit = {setWorkoutToEdit}/>
          </Route>
          <Route path='/edit-workout'>
            <EditWorkout workoutToEdit = {workoutToEdit}/>
          </Route>
        </Router>
      </header>
    </div>
  );
}

export default App;
