const { Shema, model, Schema } = require('mongoose')

const productoSchema= new Schema({
    IDproducto:{
        type: String,
        required: true,
        unique: true
    
    },
    descripcion:{
        type: String,
        required: true

    }, 
    valorUnitario:{
       type: Number,
       required: true

    },
    estado:{
        type: String,
        required: true
    }
     

})

module.exports = model('Producto', productoSchema )