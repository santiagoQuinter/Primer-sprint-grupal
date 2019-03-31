//helper(funciones terminadas en hbs)
const hbs = require('hbs');
//trae funciones
const funciones = require('./funciones');


hbs.registerHelper('crearCurso',(id, nombre, valor, descripcion, modalidad, intensidadHoraria)=>{
    let cur = {
        id: id,
        nombre : nombre,
        valor : valor,
        descripcion: descripcion,
        modalidad: modalidad,
        intensidadHoraria: intensidadHoraria,
        estado: 'disponible'
    };
    //Prueba de llamada a la funcion crear
    return funciones.crear(cur);
});

hbs.registerHelper('listarCursos',()=>{
    return funciones.mostrar();
});

hbs.registerHelper('listarCursosInteresado', ()=>{
    return funciones.listarCursosInteresado();
});

hbs.registerHelper('listarCursoInscribir', ()=>{
    return funciones.listarCursoInscribir();
});

hbs.registerHelper('inscribirAspirante',(identificacion, nombre, correo, telefono, curso)=>{
    let aspi={
        identificacion:identificacion,
        nombre:nombre,
        correo:correo,
        telefono:telefono,
        curso:curso
    }
    return funciones.inscribirAspirante(aspi);
});

hbs.registerHelper('verInscritos',()=>{
    return funciones.verInscritos();
});


hbs.registerHelper('eliminarAspirante',(identificacion)=>{
    return funciones.eliminarAspirante(identificacion);

});

hbs.registerHelper('actualizarCurso',(curso)=>{
    return funciones.actualizarCurso(curso);
});