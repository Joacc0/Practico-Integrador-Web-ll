const axios = require('axios');

async function obtenerPregunta(tipo) {
    const res = await axios.get('https://restcountries.com/v3.1/all');
    const paises = res.data.filter(p => p.name?.common && p.flags?.png && p.capital && p.capital.length);
    let pais;

    // Intenta encontrar un país válido
    for (let i = 0; i < 10; i++) {
        const candidato = paises[Math.floor(Math.random() * paises.length)];
        if (
            (tipo === 'capital' && candidato.capital && candidato.capital.length) ||
            (tipo === 'bandera') ||
            (tipo === 'limites' && candidato.name?.common)
        ) {
            pais = candidato;
            break;
        }
    }

    if (!pais) throw new Error('No se encontró un país válido');

    switch (tipo) {
        case 'capital':
            return {
                pregunta: `¿A qué país pertenece la capital: ${pais.capital[0]}?`,
                opciones: generarOpciones(paises, pais.name.common),
                respuestaCorrecta: pais.name.common,
                puntos: 3
            };

        case 'bandera':
            return {
                pregunta: `¿A qué país pertenece esta bandera?`,
                imagen: pais.flags.png,
                opciones: generarOpciones(paises, pais.name.common),
                respuestaCorrecta: pais.name.common,
                puntos: 5
            };

        case 'limites':
            const cantidad = pais.borders?.length || 0;
            return {
                pregunta: `¿Cuántos países limítrofes tiene ${pais.name.common}?`,
                opciones: generarOpcionesNumero(paises, cantidad),
                respuestaCorrecta: cantidad.toString(),
                puntos: 3
            };
    }
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

module.exports = { obtenerPregunta };