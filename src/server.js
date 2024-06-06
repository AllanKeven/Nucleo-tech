const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3333;

const conn = require("./db/conn");

conn();

app.use(cors());
app.use(express.json());


const routes = require('./routes/index.routes');
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;