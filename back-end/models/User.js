const { interfaces } = require('mocha')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true,
      },
    profile_pic: {
      data: Buffer,
      type: String,
      required: true,
    },
  },
)

// create mongoose Model
const User = mongoose.model('User', userSchema)

// export the model so other modules can import it
module.exports = {
  User,
}