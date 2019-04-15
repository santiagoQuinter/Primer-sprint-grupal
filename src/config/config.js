process.env.PORT=process.env.PORT || 3000
process.env.URLDB = 'mongodb://localhost:27017/cursosplataformavirtual'
let URLDB
if (process.env.NODE_ENV === 'local'){
//Agregar el puerto sobre el cual escucha mongodb
    urlDB = 'mongodb://localhost:27017/cursosplataformavirtual';
}
else {
    urlDB = 'mongodb+srv://admin:<1234>@cursoplataformavirtual-lkkto.mongodb.net/cursosplataformavirtual?retryWrites=true'
}
process.env.URLDB = urlDB