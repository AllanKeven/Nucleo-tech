const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tellNumber: { type: String, required: true, unique: true },
    hasTeacher: { type: Boolean, default: false },
    progressCourse: { type: [{}], default: [] }
});

module.exports = mongoose.model('User', UserSchema);
