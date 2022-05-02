const express = require("express")
const router = express.Router()
const multer = require("multer") 
const path = require("path")
const fs = require('fs')

const { User } = require('../models/User') 

// do we need this? 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, "routes/uploads")
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

router.get("/users", async(req, res) => { 
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


const lookUpUser = async(req, cb) => {
    const id = req.body.uid 
    const user = await User.findById(id)
    if (!user) {
        res
        .status(400)
        .json({
            success: false,
            status: "user not found",
        })
    } else {
        await cb(user)
    }
}

router.post("/save-changes", upload.single('image'), async(req, res) =>{
    try {
        lookUpUser(req, async(user) => {
            user.name = req.body.name
            user.username = req.body.username
            user.bio = req.body.bio
            user.email = req.body.email
            user.password = req.body.password
            //console.log(req.file)
            if (req.file) { 
              user.profile_pic = { 
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: `image/png` 
              } 
              //user.profile_pic = await fs.readFile(req.file.path)
            } 
            await user.save()

            res.json({ 
                success: true, 
                user: user, 
                status: 'editing user ' + req.params.id + ' succeeded'
              })
        })
    } 
    catch (err) {
        console.error(err)
        res.status(400).json( {
            success: false,
            error: err,
            status: 'editing user ' + req.params.name + ' failed'
        })
    }
})

module.exports = router