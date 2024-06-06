const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    titleModule: { type: String, required: true },
    videosIds: { type: [String] }
});

module.exports = mongoose.model('Module', ModuleSchema);
