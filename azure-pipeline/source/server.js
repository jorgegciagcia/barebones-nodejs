 
const express = require('express');
const bodyParser = require('body-parser');
const cp = require('child_process');

const cmd='ls -la';
cp.exec(cmd);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Ruta predeterminada
app.get('/', (req, res) => {
    res.send('Bienvenido a la aplicación lanzada por pipeline');
});


// Puerto en el que se ejecuta la aplicación
const port = 8080;
app.listen(port, () => {
    console.log(`La aplicación está funcionando en http://localhost:${port}`);
});
