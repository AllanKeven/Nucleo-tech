const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    videoTitle: {type: String, required: true},
    describe: {type: String, required: true},
    videoUrl: {type: String, required: true},
});

module.exports = mongoose.model('Video', VideoSchema);
