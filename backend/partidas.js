const fs = require('fs');
const path = require('path');

const rutaCarpeta = path.join(__dirname, '../data');
const rutaRanking = path.join(rutaCarpeta, 'ranking.json');

// Asegura que exista el archivo de ranking
function inicializarArchivoRanking() {
    try {
        if (!fs.existsSync(rutaCarpeta)) {
            fs.mkdirSync(rutaCarpeta, { recursive: true });
        }
        if (!fs.existsSync(rutaRanking)) {
            fs.writeFileSync(rutaRanking, JSON.stringify([]));
        }
    } catch (error) {
        console.error('Error al inicializar el archivo de ranking:', error);
    }
}

// Guarda una partida en el ranking
function guardarPartida({ nombre, puntos, correctas, tiempoTotal }) {
    try {
        inicializarArchivoRanking();
        const data = JSON.parse(fs.readFileSync(rutaRanking));
        data.push({ nombre, puntos, correctas, tiempoTotal, fecha: new Date().toISOString() });
        fs.writeFileSync(rutaRanking, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error al guardar la partida:', error);
    }
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