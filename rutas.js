import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

//Configuración del entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

//Creamos una instancia de express
const app = express();

//Ruta específica para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Ruta para manejar páginas no encontradas
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

//Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//Ruta para manejar errores internos del servidor
// app.use((err, req, res, next) => {
    // console.error(err.stack);
    // res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
// });

//Configuración de la carpeta pública para servir archivos estáticos
// app.use(express.static(path.join(__dirname, 'public')));

