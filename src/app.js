const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
//helper(funciones terminadas en hbs)
require('./helpers');
//constante de body parser
const bodyParser = require('body-parser');
//constante de bootstrap 
const dirNode_modules = path.join(__dirname , '../node_modules')


//permite que public este visible para todos
const directoriopublico = path.join(__dirname, '../public')
//Indicar en donde están los partials
const directoriopartials = path.join(__dirname,'../partials');
app.use(express.static(directoriopublico));
//funcion de hbs donde indica cuales son los partials
hbs.registerPartials(directoriopartials);
//indica a nodejs y a express especificamente que ya se puede utilizar body-parser
//Permite traer elementos tipo string
app.use(bodyParser.urlencoded({extended:false}))
//Incluimos bootstrap, jquerry y popper.js
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));



//Trae el motor de hbs 
app.set('view engine', 'hbs');

//Cuando el usuario ingrese a la platafora(url)
app.get('/',(req, res)=>{
    //Creamos el render para que la página dinámica(index.hbs) sea renderizada
    //y llamamos index d
    res.render('index', {
        //Se debe declarar sino lanza un error
    });
});

//Llama a la página de validación del formulacion creación de cursos
app.post('/crear_curso_verificado',(req, res)=>{
    //Mostrar el req
    //console.log(req.query);

    //Función que indica que pasa cuando ingrese a esta página
    //Muestra el archivo que se llama calculos
    res.render('crear_curso_verificado',{        
        id: parseInt(req.body.id),
        nombre: req.body.nombre,
        valor: parseInt(req.body.valor),
        descripcion : req.body.descripcion,
        modalidad : req.body.modalidad,
        intensidadHoraria : req.body.intensidadHoraria
    });
});

//Llama a la página de validación del formulacion creación de cursos
app.post('/crear_usuario_verificado',(req, res)=>{
    //Mostrar el req
    //console.log(req.query);

    //Función que indica que pasa cuando ingrese a esta página
    //Muestra el archivo que se llama calculos
    res.render('crear_usuario_verificado',{        
        id: parseInt(req.body.id),
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono : req.body.telefono,
        rol : req.body.rol
       
    });
});

//llama la página para ver los cursos
app.use('/ver_curso',(req,res)=>{
    res.render('ver_curso');
});
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

//llama a la página crear_curso
app.use('/crear_curso',(req,res)=>{
    res.render('crear_curso');
});

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
app.get('*',(req,res)=>{
    res.render('error',{
        //debe traer estudiante porque header lo está pidiendo
        curso: 'error'
    });
});


app.post('/actualizar_Usuario_verificado',(req,res)=>{
    res.render('actualizar_Usuario_verificado',{
        id: parseInt(req.body.id)
    });
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
//console.log(__dirname)
app.listen(3000, ()=> {
    console.log('Escuchando por el puerto 3000');
});