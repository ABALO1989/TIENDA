const usuariosCtrl = {}

const Usuario = require('../models/Usuario')

usuariosCtrl.getUsuarios = async (req, res)=> {
    const usuarios = await Usuario.find()
    res.json(usuarios)

}

usuariosCtrl.createUsuario = async (req, res)=> {
    const { correo, rol, estado  } = req.body

    const newUsuario = new Usuario({
        correo,
        rol,
        estado
    })

    await newUsuario.save()
    res.json({message:'Usuario Guardado'})

}

usuariosCtrl.getUsuario =async (req, res)=> {
    const usuario= await Usuario.findById (req.params.id)
    res.json(usuario)
}

usuariosCtrl.updateUsuario = async (req, res)=> {
    const { correo, rol, estado } = req.body
    await Usuario.findByIdAndUpdate(req.params.id, {
        correo,
        rol,
        estado

   })
   res.json({message:'Usuario Actulizado'})

} 

usuariosCtrl.deleteUsuario=async (req, res)=> {
    await Usuario.findByIdAndDelete(req.params.id)
    res.json({message:'Usuario Eliminado'})

} 

module.exports =usuariosCtrl