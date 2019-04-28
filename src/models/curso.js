const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const cursoSchema = new Schema({
    id:{
        type: Number,
        required: true,
        unique: true, 
    },
    nombre:{
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required:true
    },
    descripcion:{
        type: String,
        required:true
    },
    intensidad:{
        type:Number,
        trim: true
    },
    modalidad:{
        type:String,
        enum:{values:['virtual', 'presencial']}
    },
    estado:{
        type:String,
        default: 'Disponible'
    },
    docente:{
        type:Number,
        default: 0
    }
});

cursoSchema.plugin(uniqueValidator,{ message: 'Error, Ya existe un curso con el mismo id' });

const Curso = mongoose.model('Curso',cursoSchema);

module.exports = Curso