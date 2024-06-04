const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { userController } = require('../Controller/userController');
const { FaNeuter } = require('react-icons/fa');
const router = express.Router();


router.post('/register', new userController().registerUser);

router.post('/login', new userController().loginUser);

router.get('/usuario', new userController().getUser);

router.patch('/usuario/:id', new userController().updateUser);

router.delete('/usuario/:id', new userController().deleteUser);



module.exports = router;
