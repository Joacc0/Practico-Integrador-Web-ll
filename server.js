const express = require("express");
const cors = require("cors");
const path = require("path");
const rutas = require("./backend/rutas");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde el frontend
app.use(express.static(path.join(__dirname, "./frontend")));

// Rutas del backend
app.use("/", rutas);

// Ruta para la SPA
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/index.html"));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
