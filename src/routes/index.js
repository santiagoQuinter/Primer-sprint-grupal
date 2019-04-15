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
const Aspirante_inscrito = require('../models/aspirante_inscrito')

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
				mostrar : `<div class="alert alert-warning" role="alert">
                            Ya se encuentra un curso con el mismo id (${req.body.id}) en la base de datos
                        </div>`
			})			
        }		
              
		res.render ('crear_curso_verificado', {			
            mostrar : `<div class="alert alert-success" role="alert">
                    El curso ${resultado.nombre}, con id${resultado.id} ha sido creado exitosamente
                        </div>`
            
        })
        		
	})
});


app.post('/',(req, res)=>{

    let usuario = new Usuario ({
        cedula: req.body.cedula,
        nombre : req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono
	})

	usuario.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				mostrar :`<div class="alert alert-warning" role="alert">
                        Ya se encuentra un usuario con la mismaa cédula (${req.body.cedula}) en la base de datos
                        </div>`
			});			
		}		
		res.render ('indexpost', {			
				mostrar : `<div class="alert alert-success" role="alert">
                            Bienvenid@ ${req.body.nombre} a la plataforma de Devtime
                            </div>`
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
		});
	});
});

app.get('/ver_curso_interesado',(req,res)=>{
    Curso.find({estado:'Disponible'},(err,respuesta)=>{
        if(err){
            return console.log('Error al ver_curso'+ err);
        }
        // if(!respuesta){
        //     return console.log('No existen cursos para mostrar')
        //     //res.render('ver_curso_interesado',{
                
        //     //});
        // }
        res.render('ver_curso_interesado',{
            listado: respuesta
        });
    });
});

app.post('/actualizar_curso',(req,res)=>{
    Curso.findOneAndUpdate({id: req.body.curso},{estado:'Cerrado'},{new:true},(err,resultado)=>{
        if(err){
            return console.log('error al actualiar curso' + err);
        }
        if(!resultado){
            return console.log('No se encontro curso para actualizar');
        }
        res.render('actualizar_curso',{
            nombre: resultado.nombre,
        });
    });
});


//guardar aspirante
app.post('/inscribir_verificado', (req, res)=>{
    Aspirante_inscrito.find({identificacion : parseInt(req.body.identificacion),id : parseInt(req.body.curso)},(err,resultado)=>{
        if (err){
            return console.log(err) 
        }
    if (resultado.length<=0 ) {   
        //console.log(req.body.curso)
        //console.log(req.body.identificacion)

        let aspirante=new Aspirante_inscrito({ 
            id: parseInt(req.body.curso),
            identificacion: parseInt(req.body.identificacion),
        })

        Curso.find({id : req.body.curso},(err,respuesta2)=>{

            if (err){
                return console.log(err)		}
        
        aspirante.save((err, resultado) => {
            if (err){
                return res.render ('inscribir_verificado', {
                    mostrar : err
                })			
            }		
            res.render ('inscribir_verificado', {
                    mostrar : `<div class="alert alert-success" role="alert">
                    El usuario con la id ${resultado.identificacion}, ha sido inscrito correctamente en el curso ${respuesta2.nombre}
                            </div>`
                    
                })	
            });	
        })
}
else {
    res.render ('inscribir_verificado', {			
        mostrar: `<div class="alert alert-warning" role="alert">
                Usted ya está inscrito en este curso
                </div>`
    })
}
})
});

//Cuando el usuario ingrese a la platafora(url)
app.get('/inscribir',(req, res)=>{
    
    Curso.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}
		res.render ('inscribir',{
			listado : respuesta
		});
	});
});

app.get('*',(req,res)=>{
    res.render('error',{
        //debe traer estudiante porque header lo está pidiendo
        curso: 'error'
    });
});

module.exports = app