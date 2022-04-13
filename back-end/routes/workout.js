const express = require("express");
const router = express.Router();
const allWorkouts = require("../mock_workouts.json")

router.get("/w/:id", async(req, res) => { 
    try {
      const workout = allWorkouts.find(workout => workout.id == req.params.id)
      if (!workout) { 
        res
        .status(400) 
        .json({ 
          success: false, 
          status: "workout " + req.params.id + " was not found", 
        })
      }
      else { 
        res.json({ 
          success: true, 
          workout: { 
            workout_name: workout.workout_name,  
            workout_description: workout.workout_description,
            playlist: workout.playlist, 
            id: req.params.id, 
            exercises: workout.exercises
          }, 
          status: 'retrieving workout ' + req.params.id + ' succeeded', 
        })
      } 
    }
    catch (err) { 
      console.error(err) 
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: 'retreiving workout ' + req.params.id + ' failed'
      })
    }
  })
  
  router.post("/w/:id", (req, res) => { 
    try { 
      if(req.params.id == 'new') {
        let new_id = Date.now()
        const workout = {
          id: new_id,
          workout_name: req.body.workout_name,
          workout_description: req.body.workout_description
        }
        allWorkouts.unshift(workout)
        res.json({
          success: true,
          workout: workout,
          status: 'added workout ' + workout.id + 'to database'
        })
      }
      else {
        const workout = allWorkouts.find(workout => workout.id == req.params.id)
        if (!workout) { 
          res
          .status(400) 
          .json({ 
            success: false, 
            status: "workout " + req.params.id + " was not found", 
          })
        }
        else {
          //fake editing database — database integration not completed
          workout.workout_name = req.body.workout_name
          workout.workout_description = req.body.workout_description
          res.json({ 
            success: true, 
            workout: workout, 
            status: 'editing workout ' + req.params.id + ' succeeded'
          })
        } 
      }
    }
    catch (err) { 
      console.error(err) 
      res.status(400).json( { 
        success: false, 
        error: err, 
        status: 'editing workout ' + req.params.id + ' failed'
      })
    }
  }) 
  
  router.post('/we/:id/:index', (req, res) => {
    console.log("handling add exercise")
    console.log(req.params)
    try{
      const workout = allWorkouts.find(workout => workout.id == req.params.id)
      if(!workout) {
        res
        .status(400)
        .json({
          success: false,
          status: "workout " + req.params.id + "was not found",
        })
      }
      else {
        if(req.params.index == -1) {
          res
          .json({
            success: true,
            status: "exercise " + workout.exercises.length + "was successfully removed"
          })
        }
        if(!workout.exercises.find(exercise => exercise.index == req.params.index)) {
          res
          .json({
            success: true,
            status: "exercise " + req.params.index + " added to workout " + req.params.id,
          })
        }
        else{
          res.json({
            success: true,
            status: 'editing exercise ' + req.params.index + ' of workout ' + req.params.id + 'successful',
          })
        }
        
      }
    }
    catch (err) {
      console.error(err) 
      res.status(400).json( { 
        success: false, 
        error: err, 
        status: 'editing exercise ' + req.params.index + ' of workout ' + req.params.id + 'failed',
      })
    }
  })

  module.exports = router; 