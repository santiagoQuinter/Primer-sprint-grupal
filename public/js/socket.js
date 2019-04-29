
socket = io()
// //Escucha un mensaje que se llama mensaje
// socket.on("mensaje",(informacion)=>{
//     console.log(informacion)
// })

// //enviar desde server al cliente
// socket.emit("mensajeServer","Conectado desde el server")

// socket.emit("contador")

// socket.on("contador",(contador)=>{
//     console.log(contador)
// })

var param = new URLSearchParams(window.location.search);
var usuario = param.get('nombre')

socket.on("connect",()=>{
    //console.log(usuario)
    socket.emit('usuarioNuevo', usuario)
})

socket.on('nuevoUsuario', (texto)=>{
    //console.log(texto)
    conectados.innerHTML = conectados.innerHTML + `<div class="alert alert-warning container-fluid" role="alert">` +texto +`</div>` 
    conectados.scrollTop = conectados.scrollHeight;
})

socket.on('usuarioDesconectado', (texto)=>{
    //console.log(texto)
    conectados.innerHTML = conectados.innerHTML + `<div class="alert alert-danger container-fluid" role="alert">` +texto +`</div>` 
    conectados.scrollTop = conectados.scrollHeight;
})


const formulario = document.querySelector('#formulario')
const mensaje = formulario.querySelector('#texto')
const chat =document.querySelector('#chat')
const conectados =document.querySelector('#conectados')


//Preguntamos si enviar fue cliqueado
formulario.addEventListener('submit',(datos)=>{
    //Evita que cargue una nueva página cada vez que haga clic en enviar
    datos.preventDefault()
    socket.emit("texto",mensaje.value,()=>{
            mensaje.value = ''
            mensaje.focus()
        })
})

socket.on("texto",(textoRecibido)=>{
    //console.log(textoRecibido)
    chat.innerHTML = chat.innerHTML + `<div class="alert alert-success container-fluid" role="alert">` +textoRecibido + `</div>` 
    chat.scrollTop = chat.scrollHeight;
})
