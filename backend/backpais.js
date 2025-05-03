const axios = require('axios');

async function obtenerPreguntas() {
    const res = await axios.get('https://restcountries.com/v3.1/all');
    const paises = res.data;

    const preguntas = [];

    // Pregunta 1: Capital → País (3 puntos)
    const pais1 = paises[Math.floor(Math.random() * paises.length)];
    preguntas.push({
    tipo: 'capital',
    pregunta: `¿A qué país pertenece la capital: ${pais1.capital?.[0] || 'desconocida'}?`,
    opciones: generarOpciones(paises, pais1.name.common),
    respuestaCorrecta: pais1.name.common
    });

    // Pregunta 2: Bandera → País (5 puntos)
    const pais2 = paises[Math.floor(Math.random() * paises.length)];
    preguntas.push({
    tipo: 'bandera',
    pregunta: `¿A qué país pertenece esta bandera?`,
    imagen: pais2.flags?.png,
    opciones: generarOpciones(paises, pais2.name.common),
    respuestaCorrecta: pais2.name.common
    });

  // Pregunta 3: País → Nº de fronteras (3 puntos)
  const pais3 = paises[Math.floor(Math.random() * paises.length)];
    preguntas.push({
    tipo: 'limites',
    pregunta: `¿Cuántos países limítrofes tiene ${pais3.name.common}?`,
    opciones: generarOpcionesNumero(paises, pais3.borders?.length || 0),
    respuestaCorrecta: (pais3.borders?.length || 0).toString()
    });

    return preguntas;
}

function generarOpciones(paises, correcta) {
    const opciones = new Set([correcta]);
    while (opciones.size < 4) {
    const aleatorio = paises[Math.floor(Math.random() * paises.length)].name.common;
    opciones.add(aleatorio);
    }
    return [...opciones].sort(() => Math.random() - 0.5);
}

function generarOpcionesNumero(paises, correcto) {
    const opciones = new Set([correcto]);
    while (opciones.size < 4) {
    const aleatorio = Math.floor(Math.random() * 15);
    opciones.add(aleatorio);
    }
    return [...opciones].sort(() => Math.random() - 0.5).map(String);
}

module.exports = { obtenerPreguntas };