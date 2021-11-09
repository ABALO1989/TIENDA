const { Shema, model, Schema } = require('mongoose')

const ventaSchema= new Schema({
    valorTotal:{
        type: Number,
        
     
    },
    IDproducto:{
        type: String,
        
    
    
    },
    cantidad:{
        type: Number,
        
 
     },
     valorUnitario:{
        type: Number,
        
 
     },
     fechaVenta:{
        type: Date,
        
 
     },
     IDcliente:{
        type: String,
        
 
     },
     nombreCliente:{
        type: String,
        
 
     },
     vendedor:{
     type: String,
     
    } 

})

module.exports = model('Venta', ventaSchema )