class Usuarios{
    
    constructor() {
        this.usuarios = [];
    }

    agregarUsuario(id,nombre){
        let usuario = {id, nombre}
        this.usuarios.push(usuario)
        return this.usuarios
    }

    getUsuarios(){
        return this.usuarios
    }
    
    getUsuarioPorId(id){
        let usuario = this.usuarios.filter(user=>user.id == id)[0]
        return usuario
    }
    
    borrarUsuario(id){
        let usuarioBorrado = this.getUsuarioPorId(id)
        this.usuarios = this.usuarios.filter(user=>user.id !=id)
        return usuarioBorrado
    }
}

module.exports = {
    Usuarios
}