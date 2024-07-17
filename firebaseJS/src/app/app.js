const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const azul = '\x1b[34m\x1b[4m';
const reset = '\x1b[0m';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => {
    console.log(`\nServidor aberto na porta ${azul}http://localhost:${ port }/${reset}`);
});