const express = require("express");
const { obtenerPregunta } = require("./backpais");
const { guardarPartida, obtenerRanking } = require("./partidas");

const router = express.Router();

// Obtener una pregunta según el número
router.get("/pregunta/:tipo", async (req, res) => {
    try {
        const tipo = req.params.tipo;
        if (!["capital", "bandera", "limites"].includes(tipo)) {
            return res.status(400).json({ error: "Tipo de pregunta inválido." });
        }
        const pregunta = await obtenerPregunta(tipo);
        res.json(pregunta);
    } catch (error) {
        res.status(500).json({ error: "Error al generar pregunta." });
    }
});

// Obtener el ranking
router.get("/ranking", (req, res) => {
    try {
        const ranking = obtenerRanking();
        res.json(ranking);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener ranking." });
    }
});

// Guardar una partida
router.post('/ranking', (req, res) => {
    try {
        const { nombre, puntos, correctas, tiempoTotal } = req.body;
        if (!nombre || puntos === undefined || correctas === undefined || tiempoTotal === undefined) {
            return res.status(400).json({ error: 'Faltan datos.' });
        }
        guardarPartida({ nombre, puntos, correctas, tiempoTotal });
        res.json({ mensaje: 'Partida guardada correctamente.' });
    } catch (error) {
        res.status(500).json({ error: "Error al generar pregunta.", detalle: error.message });
    }
});

module.exports = router;
