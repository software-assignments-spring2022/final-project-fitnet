const express = require("express");
const router = express.Router();
const allWorkouts = require("../mock_workouts.json")

const { User } = require('../models/User')

router.get("/workouts", async(req, res) => {
    //use a random user in the database for now 
    const _id = '625763d1974d42cfce0fa342' 
    const user = await User.findById(_id)
    console.log(user.workouts) 
    try { 
      res.json({ 
        success: true, 
        workouts: user.workouts, 
        status: 'retrieving workouts from database succeeded', 
      })
    }
    catch (err) { 
      console.error(err) 
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: 'retrieving workouts from database failed', 
      })
    }
  }) 

  module.exports = router; 