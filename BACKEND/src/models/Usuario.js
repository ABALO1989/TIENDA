const { Shema, model, Schema } = require('mongoose')

const usuarioSchema= new Schema({
    nombre:{
        type:String,

    },
    email:{
        type: String,

    },
    estado:{
        type: String,
    },
    rol:{
        type: String,
    }
     

})

module.exports = model('Usuario', usuarioSchema )