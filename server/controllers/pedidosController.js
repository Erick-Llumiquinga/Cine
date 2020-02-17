const express = require('express');
const mongoose = require('mongoose');
const Sala = require('../models/salaModel');
const routerApi = express.Router();
const db = mongoose.connect('mongodb://localhost/Cine');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
   user: 'eam.llumiquinga@yavirac.edu.ec',
   pass: '4201925bscso'
 }
});

var mensaje = "Hola, te confirmamos tus boletos para la funcion ${} en horario de ${}";

var mailOptions = {
 from: 'eam.llumiquinga@yavirac.edu.ec',
 to: '',
 subject: 'Confirmacion',
 text: mensaje
};


routerApi.route('/getPedidos')
  .get((req,res) => {
    let id = req.query.id
    Sala.findOne({'idPelicula': id},(err,resp) => {
      if(err){
        return res.send(err)
      }
      return res.json(resp)
    })
  })

routerApi.route('/newPedidos')
  .post((req, res) => {
    mailOptions.to = req.body.correo
    let sala = new Sala(req.body)

    sala.save((err,resp) => {
      if(err){
        return res.json(err);
      }
      transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email enviado: ' + info.response);
       }
      });
      return res.json(resp);
    })
  });

  routerApi.route('/updateSala')
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

  routerApi.route('/deleteSala')
  .delete((req, res) => {
    let id = req.body.id

    Sala.deleteOne( {'_id': id},(err,resp) => {
      if(err){
        return res.json(err);
      }
      return res.json(resp);
    })
  });

  module.exports = routerApi
