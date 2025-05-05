const fs = require('fs');
const path = require('path');

const rutaRanking = path.join(__dirname, '../data', 'ranking.json');

// Asegura que exista el archivo de ranking
function inicializarArchivoRanking() {
    if (!fs.existsSync(rutaRanking)) {
        fs.writeFileSync(rutaRanking, JSON.stringify([]));
    }
}

// Guarda una partida en el ranking
function guardarPartida({ nombre, puntos, correctas, tiempoTotal }) {
    inicializarArchivoRanking();
    const data = JSON.parse(fs.readFileSync(rutaRanking));
    data.push({ nombre, puntos, correctas, tiempoTotal, fecha: new Date().toISOString() });
    fs.writeFileSync(rutaRanking, JSON.stringify(data, null, 2));
}

function obtenerRanking() {
    inicializarArchivoRanking();
    const data = JSON.parse(fs.readFileSync(rutaRanking));
    return data.sort((a, b) => {
        if (b.puntos !== a.puntos) return b.puntos - a.puntos;
        if (b.correctas !== a.correctas) return b.correctas - a.correctas;
        return a.tiempoTotal - b.tiempoTotal;
    });
}

module.exports = { guardarPartida, obtenerRanking };