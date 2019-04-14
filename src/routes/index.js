const express = require('express')
const app = express ()
const path = require('path')
const hbs = require ('hbs')
const Estudiante = require('./../models/curso')
const dirViews = path.join(__dirname, '../../template/views')
const dirPartials = path.join(__dirname, '../../template/partials')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('./../helper/helpers')

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)


//Cuando el usuario ingrese a la platafora(url)
app.get('/',(req, res)=>{
    //Creamos el render para que la página dinámica(index.hbs) sea renderizada
    //y llamamos index d
    res.render('index', {
        //Se debe declarar sino lanza un error
    });
});
app.get('*',(req,res)=>{
    res.render('error',{
        //debe traer estudiante porque header lo está pidiendo
        curso: 'error'
    });
});

module.exports = app