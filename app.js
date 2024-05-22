const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bakestudiantes = require('./rutas/estudiante');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api/estudiante', bakestudiantes);

//Conectarse a la base de datos uwu
mongoose.connect('mongodb://localhost:27017/estudiantes')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexion a MongoDB:'));
db.once('open',() => {
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});