require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded());
app.use(cors());

const mongoose = require('mongoose');

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then((data) => console.log(`Connected to MongoDB`))
  .catch((err) => console.error(`Failed to connect to MongoDB: ${err}`));

const { Post } = require('./models/Post');
const { User } = require('./models/User');
const { Workout, Exercise } = require('./models/Workout');

const myInfo = require('./routes/myInfo');
const newPost = require('./routes/newPost');
const settings = require('./routes/settings');
const register = require('./routes/register');
const posts = require('./routes/posts');
const workout = require('./routes/workout');
const playlists = require('./routes/playlists');
const loginVerify = require('./routes/loginVerify');
const users = require('./routes/users');

app.use('/', myInfo);
app.use('/', settings);
app.use('/', newPost);
app.use('/', register);
app.use('/', posts);
app.use('/', workout);
app.use('/', playlists);
app.use('/', loginVerify);
app.use('/', users);

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.send('This is the root directory link for our app');
});

let i = 0;

function createExercise(name, sets, reps) {
  const exercise = new Exercise({
    index: i,
    exercise_name: name,
    num_sets: sets,
    num_reps: reps,
  });
  exercise.save();
  i++;
  return exercise;
}

function createWorkout(name, desc, exercises) {
  const workout = new Workout({
    workout_name: name,
    workout_description: desc,
    exercises: exercises,
  });
  workout.save();
  return workout;
}

function createUser(name, username, bio, email, password, workouts) {
  const user = new User({
    name: name,
    username: username,
    bio: bio,
    email: email,
    profile_pic: 'http://dummyimage.com/200x100.png/5fa2dd/ffffff',
    password: password,
    workouts: workouts,
  });
  user.save();
  return user;
}

app.get('/test/new-user', async (req, res) => {
  const exercise = createExercise('first test exercise', 3, 3);
  const workout = createWorkout('first test workout', 'first test workout desc', [exercise]);
  const user = createUser(
    'Kayleigh Smith',
    'kaykay',
    'this is once again vanessa testing',
    'kayleigh@nyu.edu',
    'idk',
    [workout]
  );
  return res.json({
    success: true,
    status: 'new user created',
    user: user,
  });
});

app.get('/test/new-workout', async (req, res) => {
  const exercise = await Exercise.create({
    index: 0,
    exercise_name: 'pushups',
    num_sets: 3,
    num_reps: 3,
  });
  const workout = await Workout.create({
    workout_name: 'new workout',
    workout_description: 'my new workout',
    exercises: [exercise],
  });
  return res.json({
    id: workout.__id,
    success: true,
    status: 'creating new workout worked',
    workout: workout,
  });
});

module.exports = app;
