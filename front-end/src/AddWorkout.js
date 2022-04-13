import "./AddWorkout.css"
import AddWorkoutInfo from "./AddWorkoutInfo.js"
import Exercise from "./Exercise.js"
import Header from "./Header"
import Footer from "./Footer"
import { useState, useEffect } from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { useParams } from "react-router-dom";
import axios from "axios"
import { HiOutlineMusicNote } from 'react-icons/hi' 

const AddWorkout = () => {
    const dummyExercise = (index_value, exercise_name, num_sets, num_reps) => {
        const index = index_value
        const name = exercise_name
        const sets = num_sets
        const reps = num_reps
        
        return {index, name, sets, reps}
    }

    // const dummy1 = dummyExercise("Pushups", 3, 15)
    // const dummy2 = dummyExercise("Pullups", 3, 15)
    // const dummy3 = dummyExercise("Squats", 3, 15)

    const [workout_name, setName] = useState("") 
    const [workout_description, setDesc] = useState("")
    const [exercises, setExercises] = useState([]) 
    const [num_exercises, setNumExercises] = useState("")

    let params = useParams(); 

    useEffect(() => { 
        if(params.id === 'new') {
            console.log("New workout, no retrieval")
            console.log("This should say 'new': " + params.id)
        }
        else{
            console.log("retrieving workout " + params.id) 
            axios 
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/` + params.id) 
            .then(res => { 
                setName(res.data.workout.workout_name)
                setDesc(res.data.workout.workout_description) 
                setExercises(res.data.workout.exercises)
                setNumExercises(res.data.workout.exercises.length)
                console.log("successful retrieval of workout " + params.id + " from database")
            })
            .catch(err => { 
                console.log("retrieval of workout " + params.id + " from backend failed") 
                console.log(err)
            })
        }
    }, [params.id]) 

    const addExercise = () => {
        console.log("Starting addExercise function")
        const filler = dummyExercise(num_exercises, "Foo", "1", "1")
        console.log(filler)
        // exercises.append(filler)
        setExercises([...exercises, filler])
        setNumExercises(num_exercises + 1)
        axios
            .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/we/` + params.id + `/` + num_exercises, filler)
            .catch((err) => {
                console.error(err)
                console.log("Front end: Failed to add new exercise")
            })
            .then((response) => {
                console.log("Front end: added new exercise")
            })
    }
    const removeExercise = () => {
        console.log("Starting removeExercise function")
        console.log("New value for exercises array: " + exercises.slice(1, num_exercises).length)
        setExercises(exercises.slice(1,num_exercises))
        setNumExercises(num_exercises - 1)
        axios
            .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/we/` + params.id + `/-1`)
            .catch((err) => {
                console.error(err)
                console.log("Front end: Failed to remove exercise " + num_exercises)
            })
            .then((response) => {
                console.log("Front end: removed exercise " + num_exercises)
                setExercises(exercises.slice(1,num_exercises))
                setNumExercises(num_exercises - 1)
            })
    }

    return (
        <main className="AddWorkout">
            <Header
                url = "./addWorkout" 
                title = "Add Workout"
            /> 
            <div className="backlink">
                <a className = "User-link" href={"../workoutHistory"}>{<BsArrowLeftCircle size = "30px"/>}</a>
                {/* <div>
                        <a id = "playlistLink" 
                            className = "User-link"
                            href = {'../p/' + params.id} >
                            {<HiOutlineMusicNote size = "30px"/>}
                        </a> 
                    <a className = "User-link" href={"../e/" + params.id}>{<AiOutlinePlusCircle size = "34px"/>}</a>
                </div> */}
                <a  className = "User-link"
                    href = {'../p/' + params.id} >
                    {<HiOutlineMusicNote size = "30px"/>}
                 </a> 
            </div>
            <AddWorkoutInfo
                workout_name = {workout_name} 
                workout_description = {workout_description} 
                id = {params.id}
            />

            <h5 className="TableHeader">
                <div>Exercise Name</div>
                <div>Sets</div>
                <div>Reps</div>
            </h5>
            
            <div>
                {exercises?.map((exercise, index) => ( 
                <Exercise  
                    id = {params.id}
                    index = {index}
                    exercise_name = {exercise.exercise_name} 
                    num_sets = {exercise.num_sets}
                    num_reps = {exercise.num_reps}
                /> 
                )) 
                }   
            </div>
            <div>
                <button onClick={removeExercise}>
                    {<AiOutlineMinusCircle size = "30px"/>}
                </button>
                <button onClick={addExercise}>
                    {<AiOutlinePlusCircle size = "30px"/>}
                </button>
                
            </div>
            {/* <div className="AddExercise">
                <a className = "User-link" href={"../workoutHistory"}>{<BsArrowLeftCircle size = "30px"/>}</a>
            </div> */}
            <Footer
            />
            {/* <p>
                <Link to='/addExercise'>Add Exercise</Link>
            </p> */}

        </main>
        
        
    )
}

export default AddWorkout