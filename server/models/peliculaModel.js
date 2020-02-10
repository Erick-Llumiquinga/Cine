const mongoose = require('mongoose');

const { Schema } = mongoose;

const peliculasModel = new Schema(
  {
    foto: {type: String},
    titulo: {type: String},
    resumen: {type: String},
    categorias: {type: String},
    valorBoleto: {type: Number}
  }
);

module.exports = mongoose.model('peliculas', peliculasModel);