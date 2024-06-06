const express = require('express');
const { courseController } = require('../controller/courseController');

const courseRoutes = express.Router();

courseRoutes.get('/', new courseController().getAllCourses);
courseRoutes.post('/newCourse', new courseController().createCourse);
courseRoutes.patch('/updateCourse/:courseId', new courseController().updateCourse);
courseRoutes.delete('/deleteCourse/:courseId', new courseController().deleteCourse);
courseRoutes.post('/createModule/:courseId', new courseController().addNewModule);
courseRoutes.patch('/updateModule/:moduleId', new courseController().updateModule);
courseRoutes.delete('/deleteModule/:moduleId/:courseId', new courseController().removeModule);
courseRoutes.post('/addVideo/:moduleId', new courseController().addNewVideo);
courseRoutes.patch('/updateVideo/:videoId', new courseController().updateVideo);
courseRoutes.patch('/deleteVideo/:videoId', new courseController().deleteVideo);

module.exports = courseRoutes;