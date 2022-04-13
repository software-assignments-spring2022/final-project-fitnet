import "./AddExercise.css"
import { useState } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import { BsArrowLeftCircle } from 'react-icons/bs'
import { useParams } from "react-router-dom";
import workout_database from "./mock_workouts.json"

const AddExercise = () => {
    // create a state variable for each form field
    const [exerciseName, setExerciseName] = useState('')
    const [numSets, setNumSets] = useState('')
    const [numReps, setNumReps] = useState('')

    /**
    * A nested function that is called when the user submits the form to save a new Workout.
    * @param {*} e
    */
    const submitForm = e => {
        e.preventDefault() // prevent normal browser submit behavior
        //NEEDS axios stuff here
        console.log("NYI: submitForm, AddExercise.js")
        setExerciseName('')
        setNumSets('')
        setNumReps('')
    }

    let workouts = workout_database; 
    let params = useParams(); 
    const workout = workouts.find(x=>x.id == params.id); 

    return (
        <main className="AddExercise">
            <Header
                url="./addExercise"
                title="Add Exercise"
            />
            <div className="backlink">
                <a href={"/w/" + workout.id}>{<BsArrowLeftCircle size = "30px"/>}</a>
            </div>
          <form className="AddExercise-form" onSubmit={submitForm}>
            <input
              type="text"
              placeholder="Exercise name"
              value={exerciseName}
              onChange={e => setExerciseName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Number of Sets"
              value={numSets}
              onChange={e => setNumSets(e.target.value)}
            />
            <input
              type="text"
              placeholder="Number of Reps"
              value={numReps}
              onChange={e => setNumReps(e.target.value)}
            />
            <input type="submit" disabled={!exerciseName || !numSets || !numReps} value="Add" />
          </form>
          <Footer
            url="./addExercise"
            title="Add Exercise"
          />
        </main>
          
        )
}

export default AddExercise