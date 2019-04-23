process.env.PORT=process.env.PORT || 3000;
process.env.NODE_ENV=process.env.NODE_ENV || "local";
let URLDB

if (process.env.NODE_ENV === 'local'){
//Agregar el puerto sobre el cual escucha mongodb
    URLDB = 'mongodb://localhost:27017/cursosplataformavirtual';
}
else {
    require('dotenv').config()
    URLDB = 'mongodb+srv://devtimeadmin:BeyondDevTime@divetimedatabase-arktg.mongodb.net/test?retryWrites=true';
}

process.env.URLDB = URLDB

