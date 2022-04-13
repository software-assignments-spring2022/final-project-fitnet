import React from 'react'
import "./AddWorkoutInfo.css"
import { useState, useEffect } from 'react'
import axios from "axios"

const AddWorkoutInfo = props => { 

    // create a state variable for each form field
    const [workout_name, setName] = useState("")
    const [workout_description, setDesc] = useState("")
    const [savedMessage, setSavedMessage] = useState("") 

    useEffect(() => { 
      setName(props.workout_name) 
      setDesc(props.workout_description)
    }, [props.workout_name, props.workout_description])
    /**
    * A nested function that is called when the user submits the form to save a new Workout.
    * @param {*} e
    */
    const submitForm = e => {
      e.preventDefault() // prevent normal browser submit behavior
      axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/` + props.id, { 
          workout_name: workout_name,
          workout_description: workout_description,  
        })
        .catch((err) => { 
          console.error(err) 
          console.log("editing workout " + props.id + " has failed")
        })
        .then((response) => { 
          console.log("editing workout " + props.id + " has succeeded")
        })
        setSavedMessage("Your workout has been saved!") 
    }

    return (
      //<main className="AddWorkoutInfo">
        <form className="AddWorkoutInfo-header" onSubmit={submitForm}>
          <input
            type="text"
            name = "workout_name"
            value = {workout_name}
            placeholder = {"Workout Name"}
            onChange={e => { 
              setName(e.target.value)
              setSavedMessage("") 
            }}
          />
          <textarea
            name = "workout_description" 
            value = {workout_description}
            placeholder = {"Workout Description"}
            onChange={e => { 
              setDesc(e.target.value)
              setSavedMessage("") 
            }}
          />
          <input type="submit" disabled={!workout_name} value="Save" />
          {savedMessage ? <p id = "awiSaved" className = "saved">{savedMessage}</p> : ""}
        </form>
      //</main>
        
      )
}

export default AddWorkoutInfo