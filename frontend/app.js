let preguntaActual = null;

async function cargarPregunta() {
    const res = await axios.get('http://localhost:3000/api/pregunta');
    preguntaActual = res.data;

    document.getElementById('pregunta').innerText = preguntaActual.pregunta;

    const opcionesDiv = document.getElementById('opciones');
    opcionesDiv.innerHTML = '';

    preguntaActual.opciones.forEach(opcion => {
    const btn = document.createElement('button');
    btn.innerText = opcion;
    btn.onclick = () => verificarRespuesta(opcion);
    opcionesDiv.appendChild(btn);
    });

    document.getElementById('siguiente').disabled = true;
}

function verificarRespuesta(respuestaSeleccionada) {
    if (respuestaSeleccionada === preguntaActual.respuestaCorrecta) {
    alert('¡Correcto!');
    } else {
    alert(`¡Incorrecto! La respuesta correcta era: ${preguntaActual.respuestaCorrecta}`);
    }
    document.getElementById('siguiente').disabled = false;
}

document.getElementById('siguiente').addEventListener('click', cargarPregunta);

cargarPregunta();


