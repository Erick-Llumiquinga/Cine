const express = require('express');
const mongoose = require('mongoose');
const Pelicula = require('../models/peliculaModel')
const routerApi = express.Router();
const db = mongoose.connect('mongodb://localhost/Cine');

routerApi.route('/getMovie')
  .get((req,res) => {
    Pelicula.find((err,resp) => {
      if(err){
        return res.send(err)
      }
      return res.json(resp)
    })
  })

routerApi.route('/newMovie')
  .post((req, res) => {
    let pelicula = new Pelicula(req.body)

    pelicula.save((err,resp) => {
      if(err){
        return res.json(err);
      }
      return res.json(resp);
    })
  });

  routerApi.route('/updateMovie')
  .put((req, res) => {

    let id = req.body.id
    let Query  = req.body

    Pelicula.updateOne({'_id': id}, Query , (err,resp) => {
      if(err){
        return res.json(err);
      }

      return res.json(resp);
    })
  });

  routerApi.route('/deleteMovie')
  .delete((req, res) => {
    let id = req.body.id

    Pelicula.deleteOne( {'_id': id},(err,resp) => {
      if(err){
        return res.json(err);
      }
      return res.json(resp);
    })
  });


module.exports = routerApi;
