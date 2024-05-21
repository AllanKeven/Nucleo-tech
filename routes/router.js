const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const serviceController = require('../controllers/serviceController');
const router = express.Router();

// Registrar um novo usuário
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send('Usuário registrado com sucesso');
    } catch (err) {
        res.status(500).send('Erro ao registrar o usuário');
    }
});

// Fazer login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Usuário não encontrado');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Senha incorreta');

        res.status(200).send('Usuário logado com sucesso');
    } catch (err) {
        res.status(500).send('Erro ao fazer login');
    }
});

module.exports = router;
