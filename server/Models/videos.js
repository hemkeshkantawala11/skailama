const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    name: {
        type: String
    },
    transcript: {
        type: String,
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('videos', VideoSchema);