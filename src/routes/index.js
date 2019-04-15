const express = require('express')
const app = express ()
const path = require('path')
const hbs = require ('hbs')
const dirViews = path.join(__dirname, '../../template/views')
const dirPartials = path.join(__dirname, '../../template/partials')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Curso = require('../models/curso');
const Usuario = require('../models/usuario')
const session=require ('express-session')

require('./../helper/helpers')

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)

//variables de sesión

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))



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




//llama a la página de eliminar_aspirante para eliminar el aspirante del curso 
app.use('/eliminar_aspirante',(req,res)=>{
    res.render('eliminar_aspirante',{
        identificacion: parseInt(req.body.EliminarAspirante)
    });
});

//Eliminar usuario con un curso especifico



//Ingresar usuario
app.post('/ingresar', (req,res)=>{
    Usuario.findOne({cedula:req.body.usuario},(err, resultado)=>{
        if (err){
            return console.log(err);
        }
        if(!resultado)
           return res.render('ingresar',{mensaje:"Usuario no encontrado"})

        if(!bcrypt.compareSync(req.body.password, resultado.password) ){
            return res.render('ingresar',{mensaje:"Contraseña incorrecta"})
        }
     req.session.usuario=resultado._id  
    res.render('ingresar',{mensaje:"Bienvenido "+ resultado.nombre})

    })

})

app.post('/',(req, res)=>{

    let usuario = new Usuario ({
        cedula: req.body.cedula,
        nombre : req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        password:bcrypt.hashSync(req.body.contraseña, 10)
	})

	usuario.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				mostrar : err
			});			
		}		
		res.render ('indexpost', {			
				mostrar : resultado.nombre
		});		
	});	
});

app.get('/ver_curso_interesado',(req,res)=>{
    Curso.find({estado:'disponible'}).exec((err,respuesta)=>{
        if(err){
            return console.log('Error al ver_curso'+ err);
        }
        if(!respuesta){
            return console.log('No existen cursos para mostrar')
            //res.render('ver_curso_interesado',{
                
            //});
        }
        res.render('ver_curso_interesado',{
            listado: respuesta
        });
    });
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