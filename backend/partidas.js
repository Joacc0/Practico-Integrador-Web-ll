const fs = require('fs');
const path = require('path');

const rutaRanking = path.join(__dirname, 'data', 'ranking.json');

function inicializarArchivoRanking() {
    if (!fs.existsSync(path.dirname(rutaRanking))) {
    fs.mkdirSync(path.dirname(rutaRanking));
    }
    if (!fs.existsSync(rutaRanking)) {
    fs.writeFileSync(rutaRanking, JSON.stringify([]));
    }
}

function guardarPartida({ nombre, puntos }) {
    inicializarArchivoRanking();
    const data = JSON.parse(fs.readFileSync(rutaRanking));
    data.push({ nombre, puntos, fecha: new Date().toISOString() });
    fs.writeFileSync(rutaRanking, JSON.stringify(data, null, 2));
}

function obtenerRanking() {
    inicializarArchivoRanking();
    const data = JSON.parse(fs.readFileSync(rutaRanking));
    return data.sort((a, b) => b.puntos - a.puntos);
}

module.exports = { guardarPartida, obtenerRanking };