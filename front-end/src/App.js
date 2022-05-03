
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./Home.js"
import NewPost from "./NewPost.js"
import AddExercise from "./AddExercise.js"
import AddWorkout from "./AddWorkout.js"
import MyProfile from "./MyProfile.js"
import Feed from "./Feed.js"
import UserProfile from "./UserProfile.js" 
import WorkoutHistory from "./WorkoutHistory.js"
import Playlists from './Playlists.js';
import Settings from './Settings.js';
import SignUp from './SignUp';
import Login from './Login';
import ForgotPassword from './ForgotPassword'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/NewPost" element={<NewPost/>} />
        <Route path="/addExercise" element={<AddExercise />} />
        <Route path="/addWorkout" element={<AddWorkout />} />
        <Route path= "/Feed" element = {<Feed />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/workoutHistory" element={<WorkoutHistory />} />
        <Route path="/myProfile" element={<MyProfile />} /> 
        <Route path="/Playlists" element={<Playlists />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/w/:id" element = {<AddWorkout />}/> 
        <Route path = "/e/:id" element = {<AddExercise />} />
        <Route path = "/p/:id" element = {<Playlists />} /> 
      </Routes>
    </Router>
  )
}

export default App
