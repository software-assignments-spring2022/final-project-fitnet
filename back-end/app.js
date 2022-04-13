require("dotenv").config({ silent: true })

const express = require("express") 
const app = express() 
const path = require("path")
const port = 3000 

const mongoose = require('mongoose');

// mongoose
//   .connect(`${process.env.DB_CONNECTION_STRING}`)
//   .then(data => console.log(`Connected to MongoDB`))
//   .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// const { Post } = require('./models/Post') 
// const { User } = require('./models/User')

const multer = require("multer") 
const cors = require("cors")
const axios = require("axios") 
const morgan = require("morgan") 

const allWorkouts = require("./mock_workouts.json")
const allPosts = require("./mock_posts.json") 
const allUsers = require("./mock_users.json") 

app.use(morgan("dev")) 

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded());

app.use(cors()) 

app.use("/static", express.static("public"))

app.get("/", (req, res) => {
    res.send("This is the root directory link for our app")
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, "public/uploads")
  },
  filename: function (req, file, cb) {
    // take apart the uploaded file's name so we can create a new one based on it
    const extension = path.extname(file.originalname)
    const basenameWithoutExtension = path.basename(file.originalname, extension)
    // create a new filename with a timestamp in the middle
    const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`
    // tell multer to use this new filename for the uploaded file
    cb(null, newName)
  },
})
const upload = multer({ storage: storage })


app.post("/save-changes", upload.single('image'), async(req, res) => {
  try { 
    if (req.file) 
      console.log('size:', req.file.size)
    //the user id is just the index of the user in mock_users for now. 
    //during database integration, we will assign real IDs to each user 

    const user = allUsers[req.body.uid] 
    const User = await User.findOne({ _id: req.params._id })

    if (!user) { 
      res
      .status(400) 
      .json({
        success: false, 
        status: "user " + req.params._id + " was not found",
      })
    }
    else {
      //editing of user's information 
      user = new User({ // does this create a new user in database vs editing their info 
        name: req.body.name,
        username: req.body.username,
        bio: req.body.bio,
        email: req.body.email,
        password: req.body.password,
        profile_pic: req.file,
      })
      await user.save()
      res.send(user)
  
      res.json({ 
        success: true, 
        user: user, 
        status: "saving changes in settings succeeded",   
      })
    } 
  }
  catch (err) { 
    console.error(err) 
    res.status(400).json({ 
      success: false, 
      error: err, 
      status: "saving changes in settings failed", 
    })
  }
})
module.exports = this.router

const imageHandler = (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('image', file)
  fetch('http://localhost:3000/api/image',{
    method: 'POST',
    body: formData,
    headers:{
      'Accept': 'multipart/form-data',
    },
    credentials: 'include',
  })
  .then(res=>res.json())
  .then(res =>{
    setUploadStatus(res.msg);

  })
  .catch(error=>{
    console.error(error)
  })
}

app.post("/post", upload.single('image'),(req, res, err) => {
  if(!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
    res.send({msg: 'Only image files (jpg, jpeg, png) are allowed!'})
  }
  else{
    const image = req.file.filename;
    const id = 1;
    const sqlInsert = "UPDATE images SET 'image' = ? WHERE id = ?;"
    RTCPeerConnection.query(sqlInsert,[image, id], (err, result)=>{
      if(err){
        console.log(err)
        res.send({
          msg: err
        })
      }
      if(result){
        res.send({
          data: result,
          msg: 'Your image has been updated!'
        });
      }
    });
  }
});

app.get("/posts", async(req, res) => { 
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

app.get("/users", async(req, res) => { 
  try { 
    const users = await User.find({}) 
    res.json({ 
      success: true, 
      users: users, 
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

app.get("/new-user", async(req, res) => { 
  const user = await User.create({ 
  // id??
    name: "Sydney", 
    username: "sjp655", 
    bio:"...", 
    email:"sjp655@nyu.edu",
    password:"password",
    // profile_pic: "http://dummyimage.com/140x100.png/cc0000/ffffff"
  })
  return res.json ({ 
    success: true, 
    user: user, 
    status: "yay it worked", 
  })
})


app.get("/workouts", async(req, res) => { 
  try { 
    res.json({ 
      success: true, 
      workouts: allWorkouts, 
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

app.post("/new-post", upload.single('image'), async(req, res) =>{
  try {  
    const post = await Post.create({ 
      username: req.body.username, 
      description: req.body.description, 
      picture: 'http://dummyimage.com/140x100.png/cc0000/ffffff' 
    })
    //fake editing database — database integration not completed
  //   allPosts.unshift({ 
  //     username: req.body.username, 
  //     description: req.body.description, 
  //     //dummy picture until data base integration completed
  //     picture: 'http://dummyimage.com/140x100.png/cc0000/ffffff' 
  //  })
    return res.json({ 
      success: true, 
      newpost: post, 
      status: "uploading new post succeeded" 
    }) 
  } catch (err) { 
    console.error(err) 
    res.status(400).json({ 
      success: false, 
      error: err, 
      status: 'uploading new post failed', 
    })
  }
})

//more secure way of retrieving a user's information 
//used for settings and myprofile
app.get('/uid/:uid', async(req, res) => { 
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

app.get("/:username", async(req, res) => { 
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

app.get("/w/:id", async(req, res) => { 
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

app.post("/w/:id", (req, res) => { 
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

app.post('/we/:id/:index', (req, res) => {
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

app.get('/p/:id', (req, res) => { 
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

app.post('/users/register', (req, res) => {
  try {
    const user = User.findOne({email: req.body.email }).then(user => {
      if(user) {
        return res.status(400).json({
          success: false,
          status: 'Email already exists.'
        })
      } else {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        });
        newUser.save().then(user => res.json(user)).catch(err => console.log(err));
      }
    })
  }
  catch(err) {
    console.error(err)
  }
})

app.post('/p/:id', (req, res) => { 
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

module.exports = app
