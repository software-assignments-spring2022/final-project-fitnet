import "./WorkoutHistory.css"
// import myProfile from "./MyProfile"
import WorkoutPost from "./WorkoutPost"
import Header from "./Header"
import Footer from "./Footer" 
import { useState, useEffect} from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import axios from "axios"

const WorkoutHistory = () => {

    const [workouts, setWorkouts] = useState([])

    useEffect (() => { 
        console.log('retrieving workouts from database')
        axios 
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/workouts`) 
            .then(res => { 
                setWorkouts(res.data.workouts) 
                console.log("successful retrieval of workouts from database")
            })
            .catch(err => { 
                console.log("retrieval of workouts from backend failed") 
                console.error(err)
            })
        }, [])
        
    return(
        <main className="WorkoutHistory">
            <Header 
                url = "./WorkoutHistory" 
                title = "Workout History"
            /> 
            {//Add workout button goes here
            }
            <div className="backlink">
                <a className = "User-link" href={"../myProfile"}>{<BsArrowLeftCircle size = "30px"/>}</a>
                <a className = "User-link" href={"../w/new"}>{<AiOutlinePlusCircle size = "34px"/>}</a>
            </div>
            <body className = "Workout-posts">
                {workouts?.map((workout) => ( 
                <WorkoutPost 
                    picture = {workout.picture} 
                    name = {workout.workout_name} 
                    description = {workout.workout_description}
                    id = {workout.id}
                    playlist = {workout.playlist}
                /> 
                )) 
                }   
            </body>
            <Footer 
                title = "Workout History" 
            />
        </main>
    )
}

export default WorkoutHistory