const express = require('express');
const app = express();
const paises = require('./paises.js');

const port = 3000;

app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.static('public'));
app.use("/api/paises", paises);
