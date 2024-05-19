const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/seu_banco_de_dados', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());

// Middleware de verificação de token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Acesso negado');

    try {
        const verified = jwt.verify(token, 'seu_segredo_jwt');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Token inválido');
    }
};

// Definir as rotas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Exemplo de rota protegida
app.get('/api/protected', verifyToken, (req, res) => {
    res.send('Conteúdo protegido');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
