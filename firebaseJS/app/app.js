const express = require('express');
const app = express();
const port = 3000;

const azul = '\x1b[34m\x1b[4m';
const reset = '\x1b[0m';

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Servidor aberto na porta ${azul}http://localhost:${ port }/${reset}`);
});