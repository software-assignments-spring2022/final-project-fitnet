const express = require("express");
const router = express.Router();
// const cors = require("cors")
// router.use(cors()) 

const { Post } = require('../models/Post') 

router.get("/posts", async(req, res) => { 
    try { 
      const posts = await Post.find({}) 
      res.json({ 
        success: true, 
        posts: posts, 
        status: 'retrieving posts from database succeeded', 
      })
    }
    catch (err) { 
      console.error(err) 
      res.status(400).json({ 
        success: false, 
        error: err, 
        status: "retrieving posts from database failed", 
      })
    }
  })

module.exports = router; 