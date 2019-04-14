process.env.PORT=process.env.PORT || 3000
let urlDB
if (process.env.NODE_ENV === 'local'){
//Agregar el puerto sobre el cual escucha mongodb
    urlDB = 'mongodb://localhost:27017/cursos';
}
else {
    urlDB = 'mongodb+srv://nodejstdea:nodejstdea@nodejstdea-4jn4i.mongodb.net/cursos?retryWrites=true'
}

process.env.URLDB = urlDB