const express = require('express');
const router = express.Router();
const paises = require('./paises.js');

router.get('/',paises.getPaises);