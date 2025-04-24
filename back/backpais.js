const axios = require('axios');
const express = require('express');

axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
        const paises = response.data.map(pais => ({
            nombre: pais.name.common,
            capital: pais.capital ? pais.capital[0] : 'No tiene capital',
            poblacion: pais.population,
            area: pais.area,
            bandera: pais.flags.png
        }));
        module.exports = { getPaises: (req, res) => res.json(paises) };
    })
    .catch(error => {
        console.error('Error fetching countries:', error);
    });

