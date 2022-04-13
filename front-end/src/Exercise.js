import "./Exercise.css"
import { useState, useEffect } from 'react'
import axios from "axios"
import React from 'react'

const Exercise = props => {
    // Give each exercise an index w/in the array to pass to database
    
    const [exercise_name, setName] = useState("")
    const [saved_name, setSavedName] = useState("")

    const [num_sets, setSets] = useState("")
    const [saved_sets, setSavedSets] = useState("")
    
    const [num_reps, setReps] = useState("")
    const [saved_reps, setSavedReps] = useState("")

    const [index, setIndex] = useState("")
    const [saved_index, setSavedIndex] = useState("")

    const [saveColor, setSaveColor] = useState("") 

    

    useEffect(() => { 
        setName(props.exercise_name)
        setSavedName(props.exercise_name) 

        setSets(props.num_sets)
        setSavedSets(props.num_sets)

        setReps(props.num_reps)
        setSavedReps(props.num_reps)

        setIndex(props.index)
        setSavedIndex(props.index)

        setSaveColor("1px solid grey") 
      }, [props.exercise_name, props.num_sets, props.num_reps, props.index])

    function updateSaved() {
        setSavedName(exercise_name)
        setSavedSets(num_sets)
        setSavedReps(num_reps)
        setSavedIndex(saved_index)
        setSaveColor("1px solid grey")
    }

    const submitForm = e => {
        e.preventDefault() // prevent normal browser submit behavior
        console.log("POST request for exercise, front end side.\nID: " + props.id + "\tindex: " + props.index)
        axios
          .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/we/` + props.id + `/` + props.index, { 
            exercise_name: exercise_name,
            num_sets: num_sets,  
            num_reps: num_reps,
            index: index
          })
          .catch((err) => { 
            console.error(err) 
            console.log("Front end: editing exercise " + props.index + " of workout " + props.id + " has failed")
          })
          .then((response) => { 
            console.log("Front end: editing exercise " + props.index + " of workout " + props.id + " has succeeded")
          })
        //   setSaveColor("1px solid grey")
      }
    // Props should have exercise name, numSets, numReps
    return (
        <form className="Exercise" onSubmit={submitForm}>
            {/* style={{border: saveColor}} */}
            <input
                className="ExerciseName"
                type="text"
                name = "exercise_name"
                value = {exercise_name}
                placeholder = {"Exercise name"}
                onChange={e => { 
                    setName(e.target.value)
                    setSaveColor("rgb(76, 78, 228)") 
                }}
            />
            <input
                className="ExerciseSets"
                type="text"
                name = "num_sets"
                value = {num_sets}
                placeholder = {"S"}
                onChange={e => { 
                    setSets(e.target.value)
                    setSaveColor("rgb(76, 78, 228)") 
                }}
            />
            <input
                className="ExerciseReps"
                type="text"
                name = "num_reps"
                value = {num_reps}
                placeholder = {"R"}
                onChange={e => { 
                    setReps(e.target.value)
                    setSaveColor("rgb(76, 78, 228)") 
                }}
            />
            <input 
                className="ExerciseSubmit" 
                type="submit" 
                // disabled={!(exercise_name && num_sets && num_reps)} 
                disabled={ // Every input needs a value, and at least one needs to differ from database
                    !((exercise_name && num_sets && num_reps) && 
                    ((exercise_name !== saved_name) || 
                    (num_sets !== saved_sets) ||
                    (num_reps !== saved_reps)))
                }
                value="Save" 
                color={saveColor}
                onClick={e => {
                submitForm(e);
                updateSaved();
                }}
            />
            {/* {savedMessage ? <p id = "awiSaved" className = "saved">{savedMessage}</p> : ""} */}
      </form>
    )
}

export default Exercise