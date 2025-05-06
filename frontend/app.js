const API_URL = 'http://localhost:3000';

let usuario = '';
let puntos = 0;
let preguntaActual = 0;
let correctas = 0;
let incorrectas = 0;
let tiempoInicio = null;
let tiemposPorPregunta = [];
let preguntaEnCurso = null;
const totalPreguntas = 10;
const valoresPregunta = [3, 5, 3]; // orden: capital, bandera, limítrofes

const formUsuario = document.getElementById('form-usuario');
const juego = document.getElementById('juego');
const preguntaElem = document.getElementById('pregunta');
const opcionesElem = document.getElementById('opciones');
const siguienteBtn = document.getElementById('siguiente');
const rankingDiv = document.getElementById('ranking');

formUsuario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreInput = document.getElementById('nombre');
    usuario = nombreInput.value.trim();
    if (usuario) {
        formUsuario.style.display = 'none';
        juego.style.display = 'block';
        tiempoInicio = Date.now();
        cargarPregunta();
    }
});

siguienteBtn.addEventListener('click', () => {
    preguntaActual++;
    if (preguntaActual < totalPreguntas) {
        cargarPregunta();
    } else {
        mostrarResultados();
    }
    siguienteBtn.disabled = true;
});

async function cargarPregunta() {
    try {
        const numero = (preguntaActual % 3) + 1;
        const tipo = numero === 1 ? "capital" : numero === 2 ? "bandera" : "limites";
        const res = await fetch(`${API_URL}/pregunta/${tipo}`);
        preguntaEnCurso = await res.json();

        // Validación defensiva
        if (!preguntaEnCurso || !preguntaEnCurso.opciones || preguntaEnCurso.opciones.length < 2) {
            preguntaElem.innerHTML = '❌ Error al cargar la pregunta. Intenta nuevamente.';
            opcionesElem.innerHTML = '';
            siguienteBtn.disabled = false;
            return;
        }

        preguntaElem.innerHTML = preguntaEnCurso.pregunta;
        if (preguntaEnCurso.imagen) {
            preguntaElem.innerHTML += `<br><img src="${preguntaEnCurso.imagen}" width="100">`;
        }

        opcionesElem.innerHTML = '';
        preguntaEnCurso.opciones.forEach(opcion => {
            const btn = document.createElement('button');
            btn.textContent = opcion;
            btn.classList.add('opcion');
            btn.onclick = () => verificarRespuesta(opcion);
            opcionesElem.appendChild(btn);
        });

        siguienteBtn.disabled = true;
        console.log('Pregunta cargada:', preguntaEnCurso);
    } catch (err) {
        console.error('Error al cargar pregunta:', err);
        preguntaElem.innerHTML = '❌ Error al obtener la pregunta.';
        opcionesElem.innerHTML = '';
        siguienteBtn.disabled = false;
    }
}

function verificarRespuesta(opcionElegida) {
    console.log('Respuesta seleccionada:', opcionElegida);

    const tiempoRespuesta = Date.now() - tiempoInicio;
    tiemposPorPregunta.push(tiempoRespuesta);
    tiempoInicio = Date.now();

    const correcta = preguntaEnCurso.respuestaCorrecta;
    if (opcionElegida === correcta) {
        puntos += preguntaEnCurso.puntos;
        correctas++;
        mostrarResultado('✅ ¡Correcto!');
    } else {
        incorrectas++;
        mostrarResultado(`❌ Incorrecto. Respuesta correcta: ${correcta}`);
    }

    Array.from(opcionesElem.children).forEach(btn => btn.disabled = true);
    siguienteBtn.disabled = false;
}

function mostrarResultado(mensaje) {
    const resultadoDiv = document.createElement('div');
    resultadoDiv.innerHTML = `<p>${mensaje}</p>`;
    opcionesElem.appendChild(resultadoDiv);
}

async function mostrarResultados() {
    const tiempoTotal = tiemposPorPregunta.reduce((a, b) => a + b, 0);
    const promedio = (tiempoTotal / tiemposPorPregunta.length / 1000).toFixed(2);

    preguntaElem.innerHTML = `
    <h2>Juego terminado, ${usuario}!</h2>
    <p>Puntaje: ${puntos}</p>
    <p>Correctas: ${correctas}</p>
    <p>Incorrectas: ${incorrectas}</p>
    <p>Tiempo total: ${(tiempoTotal / 1000).toFixed(2)}s</p>
    <p>Tiempo promedio por pregunta: ${promedio}s</p>
  `;
    opcionesElem.innerHTML = '';
    siguienteBtn.style.display = 'none';

    try {
        await fetch(`${API_URL}/ranking`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: usuario,
                puntos,
                correctas,
                tiempoTotal: Math.floor(tiempoTotal)
            })
        });

        const res = await fetch(`${API_URL}/ranking`);
        const ranking = await res.json();
        mostrarRanking(ranking);
    } catch (err) {
        console.error('Error mostrando ranking:', err);
    }
}

function mostrarRanking(ranking) {
    rankingDiv.innerHTML = '<h3>Top 20 partidas</h3>';
    const lista = document.createElement('ol');

    ranking.slice(0, 20).forEach(jugador => {
        const item = document.createElement('li');
        item.textContent = `${jugador.nombre} - ${jugador.puntos} pts, ${jugador.correctas} correctas, ${(jugador.tiempoTotal / 1000).toFixed(2)}s`;
        lista.appendChild(item);
    });

    rankingDiv.appendChild(lista);
}