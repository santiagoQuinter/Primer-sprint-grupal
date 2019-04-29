process.env.PORT=process.env.PORT || 3000;
process.env.NODE_ENV=process.env.NODE_ENV || "local";
let URLDB

if (process.env.NODE_ENV === 'local'){
    URLDB = 'mongodb://localhost:27017/cursosplataformavirtual';
}
else {
    URLDB = 'mongodb+srv://devtimeadmin:BeyondDevTime@divetimedatabase-arktg.mongodb.net/test?retryWrites=true';
}

process.env.URLDB = URLDB
<<<<<<< HEAD
process.env.SENDGRID_API_KEY=process.env.SENDGRID_API_KEY1
=======
//process.env.SENDGRID_API_KEY=process.env.SENDGRID_API_KEY
>>>>>>> 731bc90da37694cf166dbb713a08c27d7faf0221
