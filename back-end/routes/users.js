const express = require("express");
const router = express.Router();

const { User } = require('../models/User')

router.post("/users/delete", async(req, res) => {
  try {
    const user = await User.findOne({username: req.body.username})
    if(user) {
      deletedUser = await User.findOneAndDelete({username: req.body.username})
      res.json({
        success: true,
        status: "successfully removed user from database",
        user: deletedUser
      })
    } else {
      res.json({
        success:false,
        status: "user does not exist in the database"
      })
    }
  } catch (err) {
    console.error(err) 
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: "unable to remove user from the database.",
      })
  }
})

router.get("/users", async(req, res) => { 
    try { 
      const users = await User.find({}) 
      res.json({ 
        success: true, 
        users: users, 
        status: 'retrieving users from database succeeded', 
      })
    }
    catch (err) { 
      console.error(err) 
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: "retrieving users from database failed", 
      })
    }
  })
  
  router.get("/user/:username", async(req, res) => {
    try { 
      const user = await User.findOne( {username : req.params.username } ) 
      if (!user) { 
        res
        .status(400) 
        .json({ 
          success: false, 
          status: "user " + req.params.username + " was not found", 
        })
      }
      else {
        res.json({ 
          success: true, 
          user: user, 
          status: "retrieving user " + req.params.username + " succeeded"
        })
      } 
    } catch(err) { 
      console.error(err)
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: "retreiving user " + req.params.username + " failed" 
      })
    }
  })

  module.exports = router; 