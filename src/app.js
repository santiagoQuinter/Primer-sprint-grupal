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

//app.use('/ver_usuario',(req,res)=>{
//    res.render('ver_usuario');
//});
//variables de sesión

app.use(session({
	cookie: { maxAge: 86400000 },
	store: new MemoryStore({
		 checkPeriod: 86400000 // prune expired entries every 24h
	   }),
	 secret: 'keyboard cat',
	 resave: true,
	 saveUninitialized: true
  }))

  app.use((req, res, next)=> {
	if(req.session.usuario){
		res.locals.sesion=true
		// res.locals.nombre=true
		res.locals.tipo=req.session.usuario //el tipo de usuario
		res.locals.docente=req.session.docente
		res.locals.admin=req.session.admin
		res.locals.aspirante=req.session.aspirante
		//si es coordinador
		// if(res.locals.tipo=='aspirante'){
		// 	res.locals.aspirante=true
		// }
		// else if (res.locals.tipo=='coordinador'){
		// 	res.locals.admin=true
		// }
		// else{
		// 	res.locals.docente=true
		// }

		console.log(res.locals.docente+ " ahora miremos coordinador"+res.locals.admin+ " ahora aspirante "+res.locals.aspirante)
	}
	next()
})


//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use(require('./routes/index'));


mongoose.connect('mongodb://localhost:27017/cursosplataformavirtual', {useNewUrlParser: true}, (err, resultado) => {
	if (err){
		return console.log("No se pudo conectar")
	}
	console.log("conectado")
});

app.listen(process.env.PORT, () => {
	console.log ('servidor en el puerto ' + process.env.PORT)
});

