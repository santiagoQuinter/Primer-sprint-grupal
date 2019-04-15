const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const aspirante_inscrito = new Schema({
    identificacion:{
        type: Number,
        required: true
    },
    id:{
        type: Number,
        required: true
    }
    
});

//cursoSchema.plugin(uniqueValidator);

const Aspirante_inscrito = mongoose.model('Aspirante_inscrito',aspirante_inscrito);

module.exports = Aspirante_inscrito;