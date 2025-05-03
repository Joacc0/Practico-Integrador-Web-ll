const API_URL = 'http://localhost:3000';

let usuario = '';
let puntos = 0;
let preguntaActual = 0;
let preguntas = [];

const valoresPregunta = [3, 5, 3];

const nombreInput = document.getElementById('nombre');
const comenzarBtn = document.getElementById('comenzar');
const juego = document.getElementById('juego');
const preguntaElem = document.getElementById('pregunta');
const opcionesElem = document.getElementById('opciones');
const siguienteBtn = document.getElementById('siguiente');
const finalDiv = document.getElementById('final');
const puntosFinal = document.getElementById('puntos');
const rankingList = document.getElementById('ranking');

comenzarBtn.addEventListener('click', async () => {
    usuario = nombreInput.value.trim();
    if (!usuario) return;

    const res = await fetch(`${API_URL}/preguntas`);
    preguntas = await res.json();

    document.querySelector('label[for="nombre"]').style.display = 'none';
    nombreInput.style.display = 'none';
    comenzarBtn.style.display = 'none';
    juego.classList.remove('hidden');

    cargarPregunta();
});

function cargarPregunta() {
    if (preguntaActual >= preguntas.length) return mostrarResultados();

    const pregunta = preguntas[preguntaActual];

    preguntaElem.innerHTML = pregunta.pregunta;
    opcionesElem.innerHTML = '';

    if (pregunta.tipo === 'bandera') {
    const img = document.createElement('img');
    img.src = pregunta.imagen;
    img.alt = 'Bandera';
    img.width = 150;
    preguntaElem.appendChild(img);
    }

    pregunta.opciones.forEach(opcion => {
    const btn = document.createElement('button');
    btn.textContent = opcion;
    btn.classList.add('opcion');
    btn.onclick = () => verificarRespuesta(opcion, pregunta.respuestaCorrecta);
    opcionesElem.appendChild(btn);
    });

    siguienteBtn.disabled = true;
}

function verificarRespuesta(respuesta, correcta) {
    if (respuesta === correcta) {
    puntos += valoresPregunta[preguntaActual];
    }

    preguntaActual++;
    setTimeout(cargarPregunta, 1000);
}

async function mostrarResultados() {
    juego.classList.add('hidden');
    finalDiv.classList.remove('hidden');
    puntosFinal.textContent = `${usuario}, tu puntaje fue de ${puntos} puntos.`;

    await fetch(`${API_URL}/ranking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: usuario, puntos })
    });

    const res = await fetch(`${API_URL}/ranking`);
    const ranking = await res.json();

    rankingList.innerHTML = '';
    ranking.forEach(j => {
    const li = document.createElement('li');
    li.textContent = `${j.nombre}: ${j.puntos} puntos`;
    rankingList.appendChild(li);
    });
}