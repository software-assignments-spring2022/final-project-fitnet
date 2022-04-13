const express = require("express");
const router = express.Router();
const allWorkouts = require("../mock_workouts.json")

router.get('/p/:id', (req, res) => { 
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
        if (typeof workout.playlist == "undefined") { 
          res.json({ 
            success: true, 
            playlist: "", 
            status: 'retrieving playlist for workout ' + req.params.id + ' succeeded', 
          })
        }
        else 
          res.json({ 
            success: true, 
            playlist: workout.playlist, 
            status: 'retrieving playlist for workout ' + req.params.id + ' succeeded', 
          })
      } 
    }
    catch (err) { 
      console.error(err) 
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: 'retreiving playlist for workout ' + req.params.id + ' failed'
      })
    }
  })

router.post('/p/:id', (req, res) => { 
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
        workout.playlist = req.body.playlist
        res.json({ 
          success: true, 
          playlist: workout.playlist, 
          status: 'uploading playlist for workout ' + req.params.id + ' succeeded', 
        })
      }
    }
    catch (err) { 
      console.error(err) 
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: 'uploading playlist for workout ' + req.params.id + ' failed'
      })
    }
  })
  
  module.exports = router; 