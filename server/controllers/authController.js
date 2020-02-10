const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/usuarioModel')
const routerApi = express.Router();
const db = mongoose.connect('mongodb://localhost/Cine');

routerApi.route('/register')
  .post((req, res) => {
    let usuario = new User(req.body)

    usuario.save((err,resp) => {
      if(err){
        return res.json(err);
      }
      return res.json(resp)
    })
  });

routerApi.route('/login')
  .post((req, res) => {
    User.findOne({correo: req.body.correo}, (err, resp) => {
      if(err){
        return res.json(err);
      }
      else if(req.body.clave === resp.clave){
        return res.send('Loggeded') 
      }
      else{
        return res.send("Usuario no encontrado");
      }
    })
  });

module.exports = routerApi;

