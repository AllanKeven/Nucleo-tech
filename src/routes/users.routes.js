const express = require('express');
const { userController } = require('../controller/userController');

const userRoutes = express.Router();

userRoutes.get('/allusers', new userController().getUser);

userRoutes.post('/login', new userController().loginUser);

userRoutes.post('/register', new userController().registerUser);

userRoutes.patch('/update/:id', new userController().updateUser);

userRoutes.delete('/remove/:id', new userController().deleteUser);
userRoutes.post('/addProgressCourse/:userId', new userController().addCourseProgressInUserProfile);


module.exports = userRoutes;