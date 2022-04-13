const { interfaces } = require('mocha')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = new Schema(
    {
        index: {
            type: Number,
            required: true,
        },
        exercise_name: {
            type: String,
            required: true,
        },
        num_sets: {
            type: Number,
            required: true,
        },
        num_reps: {
            type: Number,
            required: true,
        },
    }
)
const workoutSchema = new Schema (
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        workout_name: {
            type: String,
            required: true,
        },
        workout_description: {
            type: String,
            required: true,
        },
        exercises: {
            type: [exerciseSchema],
            required: true,
        },
    }
)

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = {
    Workout,
  }