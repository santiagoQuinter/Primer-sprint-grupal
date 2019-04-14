//Requires
require('./config/config');
const express = require('express')
const app = express ()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//### Para usar las variables de sesión
const session = require('express-session')
var MemoryStore = require('memorystore')(session)

//Paths
const dirPublic = path.join(__dirname, "../public")
const dirNode_modules = path.join(__dirname , '../node_modules')

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


//Static
app.use(express.static(dirPublic))
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));


//Trae el motor de hbs 
app.set('view engine', 'hbs');

app.use('/ver_usuario',(req,res)=>{
    res.render('ver_usuario');
});

//llama la página para inscribirse en un curso
app.use('/inscribir',(req,res)=>{
    res.render('inscribir');
});

//llama a la página de validación del formulario inscribir un alumno
app.post('/inscribir_verificado',(req, res)=>{
    //variables enviadas desde inscribir curso hasta inscribir_verificado
    res.render('inscribir_verificado',{
        identificacion: parseInt(req.body.identificacion),
        curso: parseInt(req.body.curso)
    });
});

//llama a la página ver_inscritos
app.use('/ver_inscritos',(req,res)=>{
    res.render('ver_inscritos');
});

// //llama a la página crear_curso
// app.use('/crear_curso',(req,res)=>{
//     res.render('crear_curso');
// });

//llama a la página crear_usuario
app.use('/crear_usuario',(req,res)=>{
    res.render('crear_usuario');
});


//llama a la página de eliminar_aspirante para eliminar el aspirante del curso 
app.use('/eliminar_aspirante',(req,res)=>{
    res.render('eliminar_aspirante',{
        identificacion: parseInt(req.body.EliminarAspirante)
    });
});

//Llama a la página actualizar_curso para actulizar el estado del curso
app.use('/actualizar_curso',(req,res)=>{
    res.render('actualizar_curso',{
        curso: parseInt(req.body.curso)
    });
});
//Llama a la pagina actualizar usuario
app.use('/actualizar_Usuario',(req,res)=>{
    res.render('actualizar_Usuario');
});
//Para escribri error en caso de que se accesa a una página
//diferente al index por método get


app.post('/actualizar_Usuario_verificado',(req,res)=>{
    res.render('actualizar_Usuario_verificado',{
        id: parseInt(req.body.id)
    });
});
app.post('/eliminar_curso_verificado',(req,res)=>{
    res.render('eliminar_curso_verificado',{
        id: parseInt(req.body.id)
    });
});

app.post('/curso_eliminado',(req,res)=>{
    res.render('curso_eliminado',{
        identifacion: parseInt(req.body.identifacion),
        curso: req.body.curso
    });
});

app.use('/eliminar_curso',(req,res)=>{
    res.render('eliminar_curso');
});


app.post('/usuario_modificado',(req,res)=>{
    res.render('usuario_modificado',{
        id: parseInt(req.body.id),
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        rol: req.body.rol
    });
});

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use(require('./routes/index'));


mongoose.connect('mongodb://localhost:27017/cursosplataformavirtual', {useNewUrlParser: true}, (err, resultado) => {
	if (err){
		return console.log(error)
	}
	console.log("conectado")
});

app.listen(process.env.PORT, () => {
	console.log ('servidor en el puerto ' + process.env.PORT)
});

