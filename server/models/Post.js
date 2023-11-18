// import mongoose from "mongoose";
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
        max: 300,  
    },
    likes: {
        type: Array,
        default: [],
    },
    username: {
        type: String,
    }
},
{ timestamps: true },
);


// add hook to check if current user has liked current post

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
  