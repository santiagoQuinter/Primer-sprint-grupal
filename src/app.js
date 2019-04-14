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

