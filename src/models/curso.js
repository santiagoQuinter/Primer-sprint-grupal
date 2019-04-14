const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const cursoSchema = new Schema({
    id:{
        type: Number,
        required: true
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
        type:String,
    },
    modalidad:{
        type:String,
        enum:{values:['virtual', 'presencial']}
    },
    estado:{
        type:String,
        default: 'Disponible'
    }
});

cursoSchema.plugin(uniqueValidator);

const Curso = mongoose.model('Curso',cursoSchema);

module.exports = Curso