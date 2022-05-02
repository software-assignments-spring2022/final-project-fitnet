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
        workout_name: {
            type: String,
            required: true,
        },
        workout_description: {
            type: String,
            required: false,
        },
        exercises: {
            type: [exerciseSchema],
            required: true,
        },
        playlist: { 
            type: String, 
            required: false, 
        }
    }
)

const Workout = mongoose.model('Workout', workoutSchema)
const Exercise = mongoose.model('Exercise', exerciseSchema) 

module.exports = {
    Workout, Exercise, 
  }