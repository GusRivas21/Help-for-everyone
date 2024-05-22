const mongoose = require('mongoose')

const bakestudianteSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    fechaNacimiento: Date,
    dui: String,
    telefono: String,
    departamento: String,
    direccion: String,
});

const bakestudiantes = mongoose.model('bakestudiantes', bakestudianteSchema);

module.exports = bakestudiantes;