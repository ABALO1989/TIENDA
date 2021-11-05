const { Shema, model, Schema } = require('mongoose')

const ventaSchema= new Schema({
    valorTotal:{
        type: Number,
        required: true
     
    },
    IDproducto:{
        type: String,
        required: true
    
    
    },
    cantidad:{
        type: Number,
        required: true
 
     },
     valorUnitario:{
        type: Number,
        required: true
 
     },
     fechaVenta:{
        type: Date,
        required: true
 
     },
     IDcliente:{
        type: String,
        required: true
 
     },
     nombreCliente:{
        type: String,
        required: true
 
     },
     vendedor:{
     type: String,
     required: true
    } 

})

module.exports = model('Venta', ventaSchema )