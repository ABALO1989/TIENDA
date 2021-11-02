const { Shema, model, Schema } = require('mongoose')

const usuarioSchema= new Schema({
    correo:{
        type: String,

    },
    rol:{
        type: String,
    },
    estado:{
        type: String,
    }
     

})

module.exports = model('Usuario', usuarioSchema )