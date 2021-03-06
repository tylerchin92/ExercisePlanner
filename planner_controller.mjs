'use strict';
import express from 'express';
import cors from 'cors';
import * as planner from './planner_model.mjs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Create a workout
app.post('/create-workout', (req, res) => {

    planner.createWorkout(req.body.name)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed'});
        });
});


// Get all workouts
app.get('/workouts', (req, res) => {

    let filter = {}

    planner.findWorkouts(filter, '', 0)
        .then(workouts => {
            res.status(200).json(workouts);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Request failed'});
        });
});


// Get a workout by id
app.get('/workouts/:_id', (req, res) => {

    planner.findWorkoutById(req.params._id)
        .then(workout => {
            if (workout !== null) {
                res.json(workout);
            }
            else {
                res.status(404).json({Error: 'Resource not found'})
            }
        })
        .catch(error => {
            res.status(400).json({error: 'Request failed'});
        });
});


// Update a workout by id
app.put('/workouts/:_id', (req, res) =>{

    planner.updateWorkout(req.params._id, req.body.name, req.body.exercises)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({_id: req.params._id, name: req.body.name, exercises: req.body.exercises})
            }
            else {
                res.status(404).json({Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Request failed'});
        });
});

// Assign a workout to a day
app.put('/days/:_id', (req, res) =>{

    planner.assignDay(req.params._id, req.body.name, req.body.day)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({_id: req.params._id, name: req.body.name, exercises: req.body.day})
            }
            else {
                res.status(404).json({Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Request failed'});
        });
});

// Delete a workout
app.delete('/workouts/:_id', (req, res) => {

    planner.deleteWorkoutById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            }
            else {
                res.status(404).json({Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Request failed'});
        });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'exerciseplanner-ui', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'exerciseplanner-ui', 'build', 'index.html'));
      });
};

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})