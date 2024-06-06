const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    author: { type: String, required: true },
    describe: { type: String, required: true },
    rate: { type: Number, required: true, default: 5 },
    modulesIds: { type: [String] }
});

module.exports = mongoose.model('Course', CourseSchema);
