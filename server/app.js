const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const rutas = require('./controllers/authController');
const rutasPelicula = require('./controllers/peliculaController');
const rutasSalas = require('./controllers/salaController');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/server',rutas);
app.use('/server',rutasPelicula);
app.use('/server',rutasSalas);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
})
