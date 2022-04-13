const express = require("express");
const router = express.Router();

router.post('/register', (req, res) => {
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

module.exports = router; 