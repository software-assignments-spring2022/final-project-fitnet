const express = require("express");
const router = express.Router();
const allUsers = require("../mock_users.json")

const { User } = require('../models/User')

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

//more secure way of retrieving a user's information 
//used for settings and myprofile
router.get('/uid/:uid', async(req, res) => { 
    try { 
      const user = allUsers[req.params.uid]
      if (!user) { 
        res
        .status(400) 
        .json({
          success: false, 
          status: "user " + req.params.id + " was not found",
        })
      }
      else 
        res.json( { 
          success: true, 
          user: { 
            name: user.name, 
            username: user.username, 
            bio: user.bio, 
            profile_pic: user.profile_pic, 
            email: user.email, 
            password: user.password 
          }, 
          status: "retrieving user " + req.params.id + " succeeded"
        })
    } catch(err) { 
      console.error(err)
      res
      .status(400)
      .json({ 
        success: false, 
        error: err, 
        status: "retreiving user " + req.params.id + " failed" 
      })
    }
  }) 
  
  router.get("/:username", async(req, res) => { 
    try { 
      const user = allUsers.find(user => user.username == req.params.username) 
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
          user: { 
            name: user.name, 
            username: user.username, 
            bio: user.bio, 
            profile_pic: user.profile_pic, 
            email: user.email, 
            password: user.password 
          }, 
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