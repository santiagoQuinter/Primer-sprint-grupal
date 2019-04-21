process.env.PORT=process.env.PORT || 3000;
process.env.NODE_ENV=process.env.PORT.NODE_ENV || "local";
let urlDB
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'local'){
//Agregar el puerto sobre el cual escucha mongodb
    urlDB = 'mongodb://localhost:27017/cursosplataformavirtual';
}
else {
    urlDB = 'mongodb+srv://admin:<1234>@nodejstdea-1cqmw.mongodb.net/cursosplataformavirtual?retryWrites=true';
}

process.env.URLDB = urlDB

