const express = require('express');
const ruta = express.Router();
const Estudiante = require('../modelos/bakestudiantes');

ruta.get('/', async (req, res) => {
    try {
        const bakestudiantes = await Estudiante.find();
        res.json(bakestudiantes);
    }catch (err){
        res.status(500).json({message: err.message});
    }
});

ruta.post('/', async (req, res) => {
    const estudiante = new Estudiante({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechaNacimiento: req.body.fechaNacimiento,
        dui: req.body.dui,
        telefono: req.body.telefono,
        departamento: req.body.departamento,
        direccion: req.body.direccion,
    });

    try {
        const newEstudiante = await estudiante.save();
        res.status(201).json(newEstudiante);
    }catch (err){
        res.status(400).json({message: err.message});
    }
});

ruta.get('/:id', getEstudiante, (req, res) => {
    res.json(res.estudiante);
});

async function getEstudiante(req, res, next){
    let estudiante;
    try {
        estudiante = await Estudiante.findById(req.params.id);
        if (estudiante == null) {
            return res.status(404).json({message: 'Estudiante no encontrado'});
        }
    }catch (err){
        return res.status(500).json({message: err.message});
    }

    res.estudiante = estudiante;
    next();
}

ruta.put('/:id', getEstudiante, async (req, res) => {
    if (req.body.nombre != null) {
        res.estudiante.nombre = req.body.nombre;
    }
    if (req.body.apellido != null) {
        res.estudiante.apellido = req.body.apellido;
    }
    try {
        const updatedEstudiante = await res.estudiante.save();
        res.json(updatedEstudiante);
    } catch (err){
        res.status(400).json({message: err.message});
    }
    });

    module.exports = ruta;