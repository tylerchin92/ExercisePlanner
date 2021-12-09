'use strict';
import mongoose from 'mongoose';

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/exercise_planner_db",
    { useUnifiedTopology: true },
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const exerciseSchema = mongoose.Schema({
    name: {type: String, required: false},
    muscleGroup: {type: String, required: false},
    weight: {type: String, required: false},
    sets: {type: String, required: false},
    reps: {type: String, required: false},
});

const workoutSchema = mongoose.Schema({
    name: {type: String, required: true},
    exercises: {type: [exerciseSchema], required: false},
    day: {type: String, required: false}
});

const songSchema = mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    album: {type: String, required: true},
    genre: {type: String, required: true}

})



const Workout = mongoose.model("Workout", workoutSchema);

const Song = mongoose.model("Song", songSchema)

const findSongs = async (filter, projection, limit) => {
    const query = Song.find(filter)
        .select(projection)
        .limit(limit)

    return query.exec()
};

const createWorkout = async (name) => {

    const workout = new Workout({name: name});

    return workout.save()
};

const findWorkoutById = async (_id) => {

    const query = Workout.findById(_id);

    return query.exec();
};


const findWorkouts = async (filter, projection, limit) => {
    const query = Workout.find(filter)
        .select(projection)
        .limit(limit)

    return query.exec()
};

const updateWorkout = async (_id, name, exercises) => {
    await Workout.findByIdAndUpdate(
        {_id: _id},
        {exercises: exercises},
        {upsert: true, new: true}
    );
    return 1
};

const assignDay = async (_id, name, day) => {
    await Workout.findByIdAndUpdate(
        {_id: _id},
        {day: day},
        {upsert: true, new: true}
    );
    return 1
};

const deleteWorkoutById = async(_id) => {
    const remove = await Workout.deleteOne({_id: _id})
    return remove.deletedCount;
};

export {createWorkout, findWorkoutById, findWorkouts, updateWorkout, deleteWorkoutById, assignDay, findSongs}