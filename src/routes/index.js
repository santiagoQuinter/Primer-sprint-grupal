const express = require('express')
const app = express ()
const path = require('path')
const hbs = require ('hbs')
const Curso = require('./../models/curso')
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
//llama a la página crear_curso
app.get('/crear_curso',(req,res)=>{
    res.render('crear_curso');
});
//Crear curso
app.post('/crear_curso_verificado', (req, res)=>{
    let curso=new Curso({ 
        id: req.body.id,
        nombre: req.body.nombre,
        valor: req.body.valor,
        descripcion: req.body.descripcion,
        intensidad: req.body.intensidadHoraria,
        modalidad: req.body.modalidad,
    })
    curso.save((err, resultado) => {
		if (err){
			return res.render ('crear_curso_verificado', {
				mostrar : err
			})			
		}		
		res.render ('crear_curso_verificado', {			
				mostrar : resultado
			})		
	})
});


app.get('/ver_curso', (req,res) => {

	Curso.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}

		res.render ('ver_curso',{
			listado : respuesta
		})
	})
})
app.get('*',(req,res)=>{
    res.render('error',{
        //debe traer estudiante porque header lo está pidiendo
        curso: 'error'
    });
});

module.exports = app