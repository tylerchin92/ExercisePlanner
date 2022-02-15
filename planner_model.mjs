'use strict';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to database hosted on MongoDB cloud
mongoose.connect(
    process.env.MONGODB_URI,
    { useUnifiedTopology: true },
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// Schema which defines an exercise
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: false},
    muscleGroup: {type: String, required: false},
    weight: {type: String, required: false},
    sets: {type: String, required: false},
    reps: {type: String, required: false},
});

// Schema which defines a workout
const workoutSchema = mongoose.Schema({
    name: {type: String, required: true},
    exercises: {type: [exerciseSchema], required: false},
    day: {type: String, required: false}
});

const Workout = mongoose.model("Workout", workoutSchema);


// Function to create a workout. A workout is initialized with just a name
const createWorkout = async (name) => {

    const workout = new Workout({name: name});

    return workout.save()
};

// Function to view a specific workout, by id
const findWorkoutById = async (_id) => {

    const query = Workout.findById(_id);

    return query.exec();
};

// Function to view all workouts
const findWorkouts = async (filter, projection, limit) => {
    const query = Workout.find(filter)
        .select(projection)
        .limit(limit)

    return query.exec()
};

// Function to update an existing workout's exercises
const updateWorkout = async (_id, name, exercises) => {
    await Workout.findByIdAndUpdate(
        {_id: _id},
        {exercises: exercises},
        {upsert: true, new: true}
    );
    return 1
};

// Function to assign a workout to a day
const assignDay = async (_id, name, day) => {
    await Workout.findByIdAndUpdate(
        {_id: _id},
        {day: day},
        {upsert: true, new: true}
    );
    return 1
};

// Function to delete a workout
const deleteWorkoutById = async(_id) => {
    const remove = await Workout.deleteOne({_id: _id})
    return remove.deletedCount;
};

export {createWorkout, findWorkoutById, findWorkouts, updateWorkout, deleteWorkoutById, assignDay}