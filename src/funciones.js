//require para fs(almacenar datos)
//No necesita ./ por qué es nativo de node
const fs =require('fs');

//Creación de un vector de estudiantes para almacenar en el Json 
listaCursos = [];
listaAspirantes = [];

const crear = (curso) => {
    //traemos el listado antes de agregar
    listar();
    //objeto llamado cur
    let cur = {
        id: curso.id,
        nombre : curso.nombre,
        valor : curso.valor,
        descripcion: curso.descripcion,
        modalidad: curso.modalidad,
        intensidadHoraria: curso.intensidadHoraria,
        estado: curso.estado
    };
    //Controlar los elementos duplicados
    let duplicados = listaCursos.find(buscar => buscar.id == curso.id);

    if (!duplicados){   
        listaCursos.push(cur);
        //console.log(listaCursos);
        //llama a guardar
        guardar();
        //si no existen duplicados me devuelve la lista de cursos creado
        return `Curso ${curso.nombre} creado exitosamente <br>` + mostrar(); 
    }else {
        return `<div class="alert alert-danger" role="alert">
                    El id del curso ya se encuentra en la base de datos
                </div>`;
    }
}


//Función para traer los datos del JSON
const listar = () => {
    //Controlar si no existe el archivo
    try {
        //Si es constante con el tiempo se puede utilizar
        listaCursos = require('./cursos.json');
        //Traer el archivo utilizando funcion de fileSystem: se utiliza si
        //El Json cambia de forma asincronica
        //listaCursos = JSON.parse(fs.readFileSync(curso.json));    
    } catch (error) {
        listaCursos = [];
    }
}

//Función propia de json para guardar 
 const guardar = () =>{
     listar();
    //datos contiene el vector listaCursos preparado 
    //para ser almacenado como un documento 
    let datos = JSON.stringify(listaCursos);
    //Se debe ingresar a la carpeta porque si se deja solo, toma la carpeta raíz
    fs.writeFile('./src/cursos.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo creado exitosamente');
    });
 }



//Función para mostrar los estudiantes
const mostrar = ()=>{
    //Trae los elementos de json
    listar()
    //Recorreo la lista de cursos para imprimir cada uno y sus notas
    // \sirve para salto de linea
    let retorno = `<table class="table">
                   <thead class="thead-dark">
                   <th scope="col">ID</th>
                   <th scope="col">NOMBRE</th>
                   <th scope="col">VALOR</th>
                   <th scope="col">DESCRIPCIÓN</th>
                   <th scope="col">MODALIDAD</th>
                   <th scope="col">INTENSIDAD HORARIA</th>
                   <th scope="col">ESTADO</th>
                   </thead>
                   <tbody>`;    

    listaCursos.forEach(curso => {
    retorno += ` <tr>
                <td> ${curso.id} </td>
                <td> ${curso.nombre} </td>
                <td> ${curso.valor}</td>
                <td> ${curso.descripcion} </td>
                <td> ${curso.modalidad} </td>
                <td> ${curso.intensidadHoraria} </td>
                <td> ${curso.estado} </td>
                </tr>`;
        
    });
    retorno += `</tbody>
                </table>`;
    return retorno;
}

const listarCursosInteresado =()=> {
    //Trae los elementos de json
    listar()
    //Recorreo la lista estudiantes para imprimir cada uno y sus notas
    // \sirve para salto de linea
    let retorno = `<div class="accordion" id="accordionExample">`;    
    i=1
    listaCursos.forEach(curso => {
    //Solo muestra los cursos disponibles
    if(curso.estado =='disponible'){
    retorno += `<div class="card">
                    <div class="card-header" id="heading${i}">
                    <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                        Nombre del curso: ${curso.nombre}
                        >>>Valor: ${curso.valor} <br>
                        Descripción: ${curso.descripcion}    
                        </button>
                    </h5>
                    </div>
                    <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                        <div class="card-body">
                            <b> Nombre:</b> ${curso.nombre} <br>
                            <b> Valor:</b> ${curso.valor} <br>
                            <b> Descripción:</b> ${curso.descripcion} <br>
                            <b> Modalidad:</b> ${curso.modalidad} <br>
                            <b> Intensidad horaria:</b> ${curso.intensidadHoraria} <br>
                        </div>
                    </div>`;
                    i++;
    
    }
    });
    retorno += `</div>`;
    return retorno;
}


const listarCursoInscribir =()=> {
    //Trae los elementos de json
    listar()
    //Recorreo la lista estudiantes para imprimir cada uno y sus notas
    // \sirve para salto de linea
    let retorno = `<select class="custom-select  col-5" name="curso" id="cursoSeleccionado">`;    
    
    listaCursos.forEach(curso => {
    //Solo muestra los cursos disponibles
    if(curso.estado == 'disponible'){
        retorno += `<option value="${curso.id}">${curso.nombre}</option>`;
    }
    });
    retorno += `</select>`;
    return retorno;
}

//Las siguientes funciones son para el ---------------aspirante--------------------
const inscribirAspirante = (aspirante) => {
    //traemos el listado antes de agregar
    listarAspirante();
    //objeto llamado cur
    let aspi = {
        identificacion:aspirante.identificacion,
        nombre:aspirante.nombre,
        correo:aspirante.correo,
        telefono:aspirante.telefono,
        curso:aspirante.curso
    };
    //Controla que el estudiante no se matricule 2 veces en el mismo curso 
    let matriculado = listaAspirantes.filter(buscar => (buscar.curso == aspi.curso & buscar.identificacion == aspi.identificacion));

    if (matriculado.length == 0){ 
        listaAspirantes.push(aspi);
        //console.log(listaCursos);
        //llama a guardar
        guardarAspirante();
        //Busco el nombre del curso con la identificacion
        let curso = listaCursos.find(buscar => buscar.id == aspirante.curso);
        //si no existen duplicados me devuelve la lista de cursos creado
        return `<div class="alert alert-success" role="alert">
                Estudiante ${aspi.nombre} inscrito exitosamente en el curso ${curso.nombre} 
                </div>`; 
    }else {
        return `<div class="alert alert-danger" role="alert">
                    El estudiante ya se encuentra inscrito en el curso seleccionado
                </div>`;
    }
}

//Función para traer los datos del aspirante de aspirantes.json
const listarAspirante = () => {
    //Controlar si no existe el archivo
    try {
        //Si es constante con el tiempo se puede utilizar
        listaAspirantes= require('./aspirantes.json');
    } catch (error) {
        listaAspirantes = [];
    }
}

const guardarAspirante = () =>{
    listarAspirante();
    let datos = JSON.stringify(listaAspirantes);
    //Se debe ingresar a la carpeta porque si se deja solo, toma la carpeta raíz
    fs.writeFile('./src/aspirantes.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo creado exitosamente(aspirantes)');
    });
}


const verInscritos = () => {
    //lista los aspirante
    listarAspirante();
    //lista los cursos
    listar();
    let retorno=``;
    //Recorro la lista de cursos y por cada uno busco los aspirantes de dicho curso
    
    for(i=0;i<listaCursos.length;i++){
        let matriculado = listaAspirantes.filter(buscar => buscar.curso == listaCursos[i].id & listaCursos[i].estado =='disponible');
        
        retorno += `<div class="card accordion" id="accordionExample">
                    <div class="card-header" id="heading${i}">
                        <h5 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                            Nombre del curso: ${listaCursos[i].nombre}
                            </button>
                        </h5>
                    </div>  

                    <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                    <div class="card-body">

                    <form action='/eliminar_aspirante' method='post'>
                    
                    <table class="table">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">Documento</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>`;  

        //si la lista de matriculado es igual a cero no hay estudiantes en el curso
        if (matriculado.length > 0){                     
            matriculado.forEach(aspirante => {
                retorno += `<tr>    
                            <td>${aspirante.identificacion}</td>                
                            <td>${aspirante.nombre}</td>
                            <td>${aspirante.correo}</td>
                            <td>${aspirante.telefono}</td>
                            <td><button type="submit" name="EliminarAspirante" value="${aspirante.identificacion}" class="btn btn-danger"> Eliminar</button> </td>
                            </tr>`;
            });
        }
        retorno += `
                    </tbody>
                    </table>
                    </div>
                    </div>
                    </div>`;   
    }
    return retorno;  
}

const eliminarAspirante = (aspirante)=>{
    //console.log("Identificación del estudiante a eliminar: " + aspirante);
    listarAspirante();
    let indice = listaAspirantes.findIndex(buscar => buscar.identificacion ==aspirante);
    if(!indice){
        //console.log('El aspirante no existe');
    }else {
        //Remplaza la lista de estudiantes por la nueva(sin el estudiante eliminado)
        listaAspirantes.splice(indice,1);
        guardarAspirante();
        //console.log("Identificación del estudiante a eliminar: " + aspirante);
        return `<div class="alert alert-danger" role="alert">
                El aspirante ha sido eliminado exitosamente
                </div>`;
    }

}



//Actualiza el curso de disponible a cerrado y de cerrado a disponible
const actualizarCurso =(curso)=>{
    listar();
    let cur = listaCursos.find(buscar => buscar.id == curso);
    if(!cur){
        console.log("El curso no existe");
    }else{
        if(cur.estado=='disponible'){
            cur.estado='cerrado'
        }else{
            cur.estado='disponible'
        }
        guardar();
        return `<div class="alert alert-success" role="alert">
                El aspirante ha sido eliminado exitosamente
                </div>`;
    }
}


module.exports = {
    crear,
    mostrar,
    listarCursosInteresado,
    listarCursoInscribir,
    inscribirAspirante,
    verInscritos,
    eliminarAspirante,
    actualizarCurso
}