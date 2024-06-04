const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { userController } = require('../Controller/userController');
const { FaNeuter } = require('react-icons/fa');
const router = express.Router();


router.post('/register', new userController().registerUser);

router.post('/login', new userController().loginUser);

router.get('/users', new userController().getUser);

router.patch('/user/:id', new userController().updateUser);

router.delete('/user/:id', new userController().deleteUser);



module.exports = router;
