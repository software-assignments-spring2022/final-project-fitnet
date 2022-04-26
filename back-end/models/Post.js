const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')

const postSchema = new Schema( 
    { 
        // username: { 
        //     type: String, 
        //     required: true, 
        // },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        description: { 
            type: String, 
            required: true, 
        }, 
        picture: { 
            data: Buffer,
            contentType: String,
            required: false, 
        },
    }, 
)

const Post = mongoose.model('Post', postSchema) 

module.exports = { 
    Post, 
}