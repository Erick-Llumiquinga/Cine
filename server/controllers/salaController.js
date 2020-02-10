const express = require('express');
const mongoose = require('mongoose');
const Sala = require('../models/salaModel');
const routerApi = express.Router();
const db = mongoose.connect('mongodb://localhost/Cine');

routerApi.route('/newMovie')
  .post((req, res) => {
    let sala = new Sala(req.body)

    sala.save((err,resp) => {
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

    Sala.updateOne({'_id': id}, Query , (err,resp) => {
      if(err){
        return res.json(err);
      }

      return res.json(resp);
    })
  });

  routerApi.route('/deleteMovie')
  .delete((req, res) => {
    let id = req.body.id

    Sala.deleteOne( {'_id': id},(err,resp) => {
      if(err){
        return res.json(err);
      }
      return res.json(resp);
    })
  });