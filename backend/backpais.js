const preguntas = [
  {
    pregunta: "¿Cuál es el país de la siguiente ciudad capital: París?",
    opciones: ["Francia", "España", "Italia", "Alemania"],
    respuestaCorrecta: "Francia"
  },
  {
    pregunta: "¿Qué país tiene esta bandera 🇦🇷?",
    opciones: ["Argentina", "Uruguay", "Chile", "Paraguay"],
    respuestaCorrecta: "Argentina"
  },
  {
    pregunta: "¿Cuántos países limítrofes tiene Brasil?",
    opciones: ["5", "9", "10", "8"],
    respuestaCorrecta: "10"
  }
];

// Función para obtener una pregunta aleatoria
function obtenerPregunta() {
  const indice = Math.floor(Math.random() * preguntas.length);
  return preguntas[indice];
}

module.exports = { obtenerPregunta };
