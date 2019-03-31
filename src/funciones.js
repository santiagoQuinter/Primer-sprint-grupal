//require para fs(almacenar datos)
//No necesita ./ por qué es nativo de node
const fs =require('fs');

//Creación de un vector de estudiantes para almacenar en el Json 
listaCursos = [];
listaAspirantes = [];
listaUsuario= [];
listaUsuarioCurso = [];

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


const crear_usuario = (usuario) => {
    //traemos el listado antes de agregar
    listar_usuarios();
    //objeto llamado usu :)
    let usu = {

        id: usuario.id,
        nombre : usuario.nombre,
        correo : usuario.correo,
        telefono : usuario.telefono,
        rol : usuario.rol
    };
    //Controlar los elementos duplicados
    let duplicados = listaUsuario.find(buscar => buscar.id == usuario.id);

    if (!duplicados){   
        listaUsuario.push(usuario);        
        guardar_usuario();
        //si no existen duplicados me devuelve la lista de cursos creado
        return `Usuario ${usuario.nombre} creado exitosamente <br>` + mostrar_usuarios(); 
    }else {
        return `<div class="alert alert-danger" role="alert">
                    El id del Usuario ya se encuentra en la base de datos
                </div>`;
    }
}


//Función para traer los datos del JSON
const listar = () => {
    //Controlar si no existe el archivo
    try {
        //Si es constante con el tiempo se puede utilizar
        listaCursos = require('./listado.json');
        //Traer el archivo utilizando funcion de fileSystem: se utiliza si
        //El Json cambia de forma asincronica
        //listaCursos = JSON.parse(fs.readFileSync(listado.json));    
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
    fs.writeFile('./src/listado.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo creado exitosamente');
    });
 }


 const listar_usuarios = () => {
    //Controlar si no existe el archivo
    try {
        //Si es constante con el tiempo se puede utilizar
        listaUsuario = require('./usuarios.json');
        //Traer el archivo utilizando funcion de fileSystem: se utiliza si
        //El Json cambia de forma asincronica
        //listaCursos = JSON.parse(fs.readFileSync(listado.json));    
    } catch (error) {
        listaUsuario = [];
    }
}
const guardar_usuario = () =>{
    listar_usuarios();
   //datos contiene el vector listasuarios preparado 
   //para ser almacenado como un documento 
   let datos = JSON.stringify(listaUsuario);
   //Se debe ingresar a la carpeta porque si se deja solo, toma la carpeta raíz
   fs.writeFile('./src/usuarios.json', datos, (err) => {
       if (err) throw (err);
       console.log('Usuario creado exitosamente');
   });
}

//Función para mostrar los usuarios
const mostrar_usuarios = ()=>{
    //Trae los elementos de json
    listar_usuarios()
    //Recorreo la lista de usuarios para imprimir cada uno y sus notas
    // \sirve para salto de linea
    let retorno = `<table class="table">
                   <thead class="thead-dark">
                   <th scope="col">ID</th>
                   <th scope="col">NOMBRE</th>
                   <th scope="col">CORREO</th>
                   <th scope="col">TELEFONO</th>
                   <th scope="col">ROL</th>                
                   </thead>
                   <tbody>`;    

    listaUsuario.forEach(usuario => {
    retorno += ` <tr>
                <td> ${usuario.id} </td>
                <td> ${usuario.nombre} </td>                
                <td> ${usuario.correo} </td>
                <td> ${usuario.telefono} </td>
                <td> ${usuario.rol} </td>                
                </tr>`;
        
    });
    retorno += `</tbody>
                </table>`;
    return retorno;
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
    listarUsuarioCurso();
    listar_usuarios();
    //objeto llamado cur
    let aspi = {
        identificacion:aspirante.identificacion,
        curso:aspirante.curso
    };

    console.log("lalalal"+aspi.identificacion);
    //Controla que el estudiante se encuentree en la lista de usuario
    let usuarioExistente = listaUsuario.find(buscar => buscar.id == aspirante.identificacion);
    
    if (!usuarioExistente){ 
        return `<div class="alert alert-danger" role="alert">
                    Primero debe registrarse como usuario para acceder a un curso
                </div>`;
    }else {
        let inscrito = listaUsuarioCurso.filter(buscar=>(buscar.identificacion==aspi.identificacion & buscar.curso == aspi.curso));
        if(inscrito.length == 0){
            listaUsuarioCurso.push(aspi);
            //console.log(listaCursos);
            //llama a guardar
            guardarUsuarioCurso();
            return `<div class="alert alert-success" role="alert">
                    El usuario inscrito correctamente
                    </div>` ;
        }else{
            return `<div class="alert alert-danger" role="alert">
                    El usuario ya se encuentra inscrito en el curso
                    </div>` ;
        }
        
    }
}

//Función para traer los datos de listaUsuario
const listarUsuarioCurso = () => {
    //Controlar si no existe el archivo
    try {
        //Si es constante con el tiempo se puede utilizar
        listaUsuarioCurso = require('./listadoUsuarioCurso.json');
        //Traer el archivo utilizando funcion de fileSystem: se utiliza si
        //El Json cambia de forma asincronica
        //listaCursos = JSON.parse(fs.readFileSync(listado.json));    
    } catch (error) {
        listaUsuarioCurso = [];
    }
}

const guardarUsuarioCurso = () =>{
    listarUsuarioCurso();
   //datos contiene el vector listasuarios preparado 
   //para ser almacenado como un documento 
   let datos = JSON.stringify(listaUsuarioCurso);
   //Se debe ingresar a la carpeta porque si se deja solo, toma la carpeta raíz
   fs.writeFile('./src/listadoUsuarioCurso.json', datos, (err) => {
       if (err) throw (err);
       console.log('Curso inscrito exitosamente');
   });
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
    //listarAspirante();
    //lista los usuarios
    listar_usuarios();
    //lista los cursos
    listarUsuarioCurso();
    //lista los cursos
    listar();
    let retorno=``;
    
    //Recorro la lista de cursos y por cada uno busco los aspirantes de dicho curso
    for(i=0;i<listaCursos.length;i++){
        //console.log("aaaaaaaaaaaa"+listaCursos[i].id);
        

        let matriculado = listaUsuarioCurso.filter(buscar => (buscar.curso == listaCursos[i].id));


        //console.log("matriculado"+ matriculado[0].curso);

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
                    console.log("aspiranteeeeeee  " + aspirante.identificacion);
                    console.log("1111111  " + aspirante.curso);
                    listar_usuarios();
                    let inscritos = listaUsuario.find(buscar => buscar.id == aspirante.identificacion);
                    
                    if(inscritos){
                    retorno += `<tr>    
                                <td>${inscritos.id}</td>                
                                <td>${inscritos.nombre}</td>
                                <td>${inscritos.correo}</td>
                                <td>${inscritos.telefono}</td>
                                <td><button type="submit" name="EliminarAspirante" value="${aspirante.identificacion}" class="btn btn-danger"> Eliminar</button> </td>
                                </tr>`;
                    }        
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

//Actualiza los datos de los usuarios
const actualizarUsuario =(identificacion)=>{
    listar_usuarios();
    let usuario = listaUsuario.find(buscar => buscar.id == identificacion);
    if(!usuario){
        console.log("El usuario no existe");
        return `<div class="alert alert-success" role="alert">
        El usuario no existe
        </div>`;
    }else{
        return `<form action="/usuario_modificado" method="post">
        <div class="form-group">
            <label for="id">Id</label>
            <input type="number" name="id"  class="form-control" required value=${usuario.id}>
        </div>
        <div class="form-group">   
            <label for="nombre">Nombres y apellidos</label>
            <input type="text" name="nombre" class="form-control"  required value=${usuario.nombre}>
        </div>
            <label for="correo">correo</label>
            <input type="text" name="correo" class="form-control"  required value=${usuario.correo}>
        <div class="form-group">   
            <label for="telefono">Telefono</label>
            <input type="text" name="telefono" class="form-control"  required value=${usuario.telefono}>
        </div>
        <div class="form-group">
            <label for="rol">rol</label>
            <select class="form-control" id="exampleFormControlSelect1" name="rol">
                <option>aspirante</option>
                <option>docente</option>
            </select>
        </div>
        <button class="btn btn-primary">Actualizar usuario</button>
        </form>`;
    }
}

//Modificar los datos del usuario
const modificarUsuario =(ide, nom, tele, corr, rol)=>{
    listar_usuarios();
    let usuario = listaUsuario.find(buscar => buscar.identificacion == ide);
        usuario.identificacion=ide;
        usuario.nombre=nom;
        usuario.correo=corr;
        usuario.rol=rol;
        usuario.telefono=tele;
    guardar_usuario();
    return `<div class="alert alert-success" role="alert">
    El usuario ha sido modificado
    </div>`;
}
module.exports = {
    crear,
    mostrar,
    listarCursosInteresado,
    listarCursoInscribir,
    inscribirAspirante,
    verInscritos,
    eliminarAspirante,
    actualizarCurso,
    crear_usuario,
    mostrar_usuarios,
    actualizarUsuario,
    modificarUsuario
}