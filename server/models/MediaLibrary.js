// import mongoose from  "mongoose";
const mongoose = require('mongoose');

const mediaLibrarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

const MediaLibrary = mongoose.model('MediaLibrary', mediaLibrarySchema);

module.exports = MediaLibrary;