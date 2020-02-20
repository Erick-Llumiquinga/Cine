const express = require('express');
const mongoose = require('mongoose');
const Compra = require('../models/comprasModel');
const routerApi = express.Router();
const db = mongoose.connect('mongodb://localhost/Cine');
const nodemailer = require("nodemailer");


routerApi.route('/getTicketId')
  .get((req,res) => {
    let idBase64 = req.query.id;
    let buff = str => JSON.parse(new Buffer(str,'base64').toString('utf-8'));
    let id = buff(idBase64)

    let dataTemporal = [];

    Pelicula.find({"_id": id}, (err,resp) => {
      if(err){
        return res.send(err)
      }
          return res.json(resp)
    });
  });

routerApi.route('/getTicket')
  .get((req,res) => {
    Compra.find((err,resp) => {
      if(err){
        return res.send(err)
      }
      return res.json(resp)
    })
  })

routerApi.route('/newTicket')
  .post((req, res) => {

    let email = req.body.email
    let compra = new Compra(req.body)
    let mensaje = `Hola, te confirmamos tu comprar de ${req.body.boletos} boletos para la funcion de ${req.body.pelicula} en horario de ${req.body.horario}`;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'login',
            user: '@gmail.com',
            pass: ''
        }
    });

    const mailOptions = {
        from: 'cine@yavirac.edu.ec',
        to: email,
        subject: 'Cine Yavirac',
        html: `<div><h1>YAVIRAC's Film</h1><br><p>${mensaje}</p></div>`
    };

    compra.save((err,resp) => {
      if(err){
        return res.json(err);
        }

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return res.send(`Error del servidor: ${ err }`)
            } 
            else {
                return res.send('Compra Realizada');
            }
        }) 
    })
  });

  routerApi.route('/updateTicket')
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

  routerApi.route('/deleteTicket')
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