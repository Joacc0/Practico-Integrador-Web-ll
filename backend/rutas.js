const express = require('express');
const { obtenerPreguntas } = require('./backpais');
const { guardarPartida, obtenerRanking } = require('./partidas');

const router = express.Router();

router.get('/preguntas', async (req, res) => {
    try {
    const preguntas = await obtenerPreguntas();
    res.json(preguntas);
    } catch {
    res.status(500).json({ error: 'Error al generar preguntas.' });
    }
});

router.post('/ranking', (req, res) => {
    const { nombre, puntos } = req.body;
    if (!nombre || puntos === undefined) {
    return res.status(400).json({ error: 'Nombre y puntos requeridos.' });
    }
    guardarPartida({ nombre, puntos });
    res.json({ mensaje: 'Partida guardada correctamente.' });
});

router.get('/ranking', (req, res) => {
    try {
    res.json(obtenerRanking());
    } catch {
    res.status(500).json({ error: 'Error al obtener ranking.' });
    }
});

module.exports = router;