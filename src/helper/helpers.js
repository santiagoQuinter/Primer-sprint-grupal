//helper(funciones terminadas en hbs)
const hbs = require('hbs');
//trae funciones
const funciones = require('./funciones');


// hbs.registerHelper('crearCurso',(id, nombre, valor, descripcion, modalidad, intensidadHoraria)=>{
//     let cur = {
//         id: id,
//         nombre : nombre,
//         valor : valor,
//         descripcion: descripcion,
//         modalidad: modalidad,
//         intensidadHoraria: intensidadHoraria,
//         estado: 'disponible'
//     };
//     //Prueba de llamada a la funcion crear
//     return funciones.crear(cur);
// });

hbs.registerHelper('crearUsuario',(id, nombre, correo, telefono)=>{
    let usuario = {
        id: id,
        nombre : nombre,
        correo : correo,
        telefono: telefono,
        rol : "aspirante",
    
    };
    //Prueba de llamada a la funcion crear
    console.log(usuario.correo)
    return funciones.crear_usuario(usuario);
});

hbs.registerHelper('listarCursos',(listado, docentes)=>{
    return funciones.mostrar(listado, docentes);
});

hbs.registerHelper('listarCursosInteresado', (listado)=>{
    return funciones.listarCursosInteresado(listado);
});

hbs.registerHelper('listarCursoActualizar', (listado, docentes)=>{
    return funciones.listarCursoActualizar(listado, docentes);
});
hbs.registerHelper('listarCursoInscribir', (listado)=>{
    return funciones.listarCursoInscribir(listado);
});

hbs.registerHelper('inscribirAspirante',(identificacion, curso)=>{
    let aspi={
        identificacion:identificacion,
        curso:curso
    }
    return funciones.inscribirAspirante(aspi);
});

hbs.registerHelper('EliminarCurso',(identificacion)=>{    
    return funciones.eliminar_curso(identificacion);
});

hbs.registerHelper('verInscritos',(listadoC, listadoA, listadoU)=>{
    return funciones.verInscritos(listadoC, listadoA, listadoU);
});
hbs.registerHelper('verUsuarios',()=>{
    return funciones.mostrar_usuarios();
});


// hbs.registerHelper('eliminarAspirante',(identificacion)=>{
//     return funciones.eliminarAspirante(identificacion);

// });

hbs.registerHelper('eliminarCurso',(identificacion, curso)=>{
    return funciones.eliminarCurso(identificacion, curso);

});
hbs.registerHelper('verCursosA',(listadoa, listadoc)=>{
    return funciones.verCursosA(listadoa, listadoc);

});
hbs.registerHelper('actualizarCurso',(curso)=>{
    return funciones.actualizarCurso(curso);
});

hbs.registerHelper('actualizarUsuario',(id)=>{
    return funciones.actualizarUsuario(id);
});
hbs.registerHelper('modificarUsuario',(id, nombre, correo, telefono, rol)=>{
    return funciones.modificarUsuario(id, nombre, correo, telefono, rol);
});
