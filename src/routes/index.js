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
const session=require ('express-session')
const multer = require('multer')

const sgMail = require('@sendgrid/mail');

require('./../helper/helpers')

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

//Cuando el usuario ingrese a la platafora(url)
app.get('/',(req, res)=>{
    //Creamos el render para que la página dinámica(index.hbs) sea renderizada
    //y llamamos index d
    res.render('index', {
        //Se debe declarar sino lanza un error
    });
});

//salir del login e ingresar a inicio
app.get('/salir',(req, res)=>{
    req.session.destroy((err)=>{
        if(err) return console.log(err)
    })
    console.log("esta cerrada")
    res.redirect('/')
});
//llama a la página crear_curso
app.get('/crear_curso',(req,res)=>{
    res.render('crear_curso');
});
//Llama a la página de los cursos de un aspirante
app.get('/curso_aspirante',(req,res)=>{
    Aspirante_inscrito.find({identificacion:req.session.identificacion}, (err, aspirante)=>{
        if (err){
			return console.log(err)
        }
        Curso.find({},(err,cursos_a)=>{
            if (err){
                return console.log(err)
            }
            res.render('curso_aspirante', {
                listadoa:aspirante,
                listadoc:cursos_a
            });
        })
    })
});

//llama a la página ver_inscritos
app.get('/ver_inscritos', (req,res) => {

	Curso.find({},(err,resC)=>{
		if (err){
			return console.log(err)
        }
        Aspirante_inscrito.find({},(err,resA)=>{
            if (err){
                return console.log(err)
            }
            Usuario.find({},(err,resU)=>{
                if (err){
                    return console.log(err)
                }
                res.render ('ver_inscritos',{
                    listadoC :resC,
                    listadoA: resA,
                    listadoU:resU
                })
           
    
            })

        })
       
    })
   
   
  
})



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




//llama a la página de eliminar_aspirante para eliminar el aspirante del curso 
app.post('/eliminar_aspirante',(req,res)=>{

	Aspirante_inscrito.findOneAndDelete({cedula : req.body.identificacion}, req.body, (err, resultados) => {
		if (err){
			return console.log(err)
		}

		if(!resultados){
			res.render ('eliminar_aspirante', {
			nombre : "no encontrado"			
		})

		}

		res.render ('eliminar_aspirante', {
			nombre : resultados.nombre			
		})
	})	

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
     req.session._id=resultado._id
     req.session.identificacion=resultado.cedula
     req.session.usuario=resultado.tipo 
     req.session.nombre=resultado.nombre
     avatar = resultado.avatar.toString('base64')
     if(resultado.tipo=='aspirante'){
        req.session.aspirante=true
    }
    else if (resultado.tipo=='coordinador'){
        req.session.admin=true
    }
    else{
        req.session.docente=true
    }
     res.render('ingresar',{
    mensaje:"Bienvenid@"+ resultado.nombre, 
    sesion:true,
    aspirante:req.session.aspirante, 
    admin:req.session.admin,
    docente:req.session.docente,
    nombre:req.session.nombre,
    avatar: avatar
    
        })
    })

})
var upload = multer({       
    limits: {
        fileSize : 1000000
    }
    
    
})
app.post('/',upload.single('archivo'),(req, res)=>{
    

    let usuario = new Usuario ({    
        cedula: req.body.cedula,
        nombre : req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        password:bcrypt.hashSync(req.body.contraseña, 10), //Para encriptar la contraseña,
        avatar : req.file.buffer
	})
    const msg={
        to:req.body.correo,
        from:'thelife231@gmail.com',
        subject: 'Bienvenido',
        text: 'Bienvenido a la pagina de Node.js'
    }
   
	usuario.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				mostrar :`<div class="alert alert-warning" role="alert">
                        Ya se encuentra un usuario con la mismaa cédula (${req.body.cedula}) en la base de datos
                        </div>`
			});			
        }	
        req.session._id=usuario._id
        req.session.identificacion=usuario.cedula
        req.session.usuario=usuario.tipo 
        req.session.nombre=usuario.nombre
        req.session.usuario=usuario.tipo
        req.session.aspirante=true
        req.session.admin=false	
        req.session.coordinador=false
        console.log("entro"+ req.session.usuario)
        sgMail.send(msg);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		res.render ('indexpost', {			
				mostrar : `<div class="alert alert-success" role="alert">
                            Bienvenid@ ${req.body.nombre} a la plataforma de Devtime
                            <br>
                                <img  src="data:img/png;base64,{{avatar}}" max-width="100%" max-height="100%"  class="img-fluid" >
                            </div>`,
                aspirante:req.session.aspirante, 
                admin:req.session.admin,
                docente:req.session.docente,
                
                sesion:true       
		});		
	});	
});
//traer la pagina que tiene los cursos de un docente

app.get('/curso_docente', (req,res) => {
    
	Curso.find({docente:req.session.identificacion},(err,curso)=>{
    console.log(curso) 
		if (err){
			return console.log(err)
        }
        Usuario.find({},(err, usuario)=>{
            if (err){
                return console.log(err)
            } 
            Aspirante_inscrito.find({},(err, aspirante)=>{
                if (err){   
                    return console.log(err)
                } 
                console.log("imprima curso"+ curso)
                res.render ('curso_docente',{
                    listadoC :curso,
                    listadoU:usuario,
                    listadoA:aspirante
                });
            })
	    });
    });
});

//vista de los cursos desde la perspectiva del coordinador
app.get('/ver_curso', (req,res) => {
	Curso.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
        }
        Usuario.find({tipo:'docente'},(req, usuario)=>{
            if (err){
                return console.log(err)
            } 
            res.render ('ver_curso',{
                listado : respuesta,
                docentes:usuario
            });
        })
		
	});
});
//los cursos que le aparecen a una persona que ingrese a la pagina
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

app.post('/actualizar_curso',(req,res)=>{               //segundo argumento son los cambios a hacer
    Curso.findOneAndUpdate({id:req.body.curso},{estado:'Cerrado', docente:req.body.docente},{new:true},(err,resultado)=>{
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


app.get('/editar_foto',(req,res)=>{
    Usuario.findOne({cedula : req.session.identificacion},(err,respuesta)=>{
        if(err){
            return console.log(err);
        }
       
        console.log(respuesta + "acqui");
        aux = respuesta.avatar.toString('base64');

        
        res.render('editar_foto',{
            avatar: aux, 
        });
    });
    
});




app.post('/editar_foto_verificado',upload.single('archivo'),(req,res)=>{
    console.log("hola")
    Usuario.findOneAndUpdate({cedula: req.session.identificacion},{avatar: req.file.buffer},{new:true},(err,resultado)=>{
        if(err){req.file.buffer
            return console.log('error al actualiar curso' + err);
        }
        if(!resultado){
            return console.log('No se encontro curso para actualizar');
        }
        aux = resultado.avatar.toString('base64');
        console.log("hola")
        res.render('editar_foto_verificado',{
            avatar: aux,
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
            console.log(typeof (respuesta2));

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
                    El usuario con la id ${resultado.identificacion}, ha sido inscrito correctamente en el curso ${respuesta2[0].nombre}
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
    //console.log(session.usuario)
    Curso.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
        }
        Usuario.findById(req.session._id, (err, usu) =>{
            if(err){
                return console.log(err);
            }
            else{
            
            res.render ('inscribir',{                 
                identificacion : parseInt(usu.cedula),
                nombre : usu.nombre,
                correo : usu.correo,
                telefono : parseInt(usu.telefono),
                listado : respuesta
            });}

            
                console.log("imprimir usuario "+ usu)
                console.log(usu.cedula);
                console.log(usu.nombre);
                console.log(usu.correo);
                console.log(usu.telefono);
                res.render ('inscribir',{                 
                    identificacion : usu.cedula,
                    nombre : usu.nombre,
                    correo : usu.correo,
                    telefono : parseInt(usu.telefono),
                    listado : respuesta
                });
            
        });
		
	});
});

app.get('/ingresarChat',(req,res)=>{
    res.render('ingresarChat');
});

app.get('/chat',(req,res)=>{
    res.render('chat',{
        nombre:req.body.nombre
    });
});

app.get('*',(req,res)=>{
    res.render('error',{
        //debe traer estudiante porque header lo está pidiendo
        curso: 'error'
    });
});

module.exports = app