const express = require('express');
const cors = require('cors');
const path = require('path');
const rutas = require('./rutas');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Servir archivos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas de la API
app.use('/api', rutas);

// Ruta por defecto para SPA
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});





