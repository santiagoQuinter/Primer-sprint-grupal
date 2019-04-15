const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
    cedula:{
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    nombre:{
        type: String,
        required: true
    },
    correo: {
        type: String,
        required:true
    },
    telefono:{
        type: Number,
        required:true
    },  
    tipo:{
        type:String,
        default: 'aspirante'
    }
});

usuarioSchema.plugin(uniqueValidator,{ message: 'Error, Ya existe un usuario con la misma cedula' });

const Usuario = mongoose.model('Usuario',usuarioSchema);

module.exports = Usuario