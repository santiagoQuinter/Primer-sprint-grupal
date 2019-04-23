process.env.PORT=process.env.PORT || 3000;
process.env.NODE_ENV=process.env.NODE_ENV || "local";
let URLDB
//URLDB = 'mongodb+srv://devtimeadmin:BeyondDevTime@divetimedatabase-arktg.mongodb.net/test?retryWrites=true'
//console.log("desde config con PORT: " +process.env.PORT.NODE_ENV);
//console.log("desde config: " + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'local'){
//Agregar el puerto sobre el cual escucha mongodb
    URLDB = 'mongodb://localhost:27017/cursosplataformavirtual';
}
else {
    require('dotenv').config()
    URLDB = 'mongodb+srv://devtimeadmin:BeyondDevTime@divetimedatabase-arktg.mongodb.net/test?retryWrites=true';
}


//URLDB = 'mongodb+srv://devtimeadmin:BeyondDevTime@divetimedatabase-arktg.mongodb.net/test?retryWrites=true';


//URLDB = 'mongodb+srv://devtimeadmin:BeyondDevTime@divetimedatabase-arktg.mongodb.net/test?retryWrites=true';

process.env.URLDB = URLDB

// if(!process.env.URLDB){

//     process.env.URLDB = 'mongodb://localhost:27017/cursosplataformavirtual'
    
//     }
// if(process.env.NODE_ENV !=='local'){
//     require('dotenv').config();
//     process.env.URLDB = 'mongodb://localhost:27017/cursosplataformavirtual'
// }