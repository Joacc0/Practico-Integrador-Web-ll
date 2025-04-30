const express = require('express');
const { obtenerPregunta } = require('./backpais');

const router = express.Router();

router.get('/pregunta', (req, res) => {
    const pregunta = obtenerPregunta();
    res.json(pregunta);
});

module.exports = router;
