const { Shema, model, Schema } = require('mongoose')

const productoSchema= new Schema({
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