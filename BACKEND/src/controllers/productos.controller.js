const productosCtrl = {}

const Producto = require('../models/Producto')

productosCtrl.getProductos = async (req, res)=> {
    const productos = await Producto.find()
    res.json(productos)

}
productosCtrl.createProducto = async (req, res)=> {
    const { IDproducto, descripcion, valorUnitario, estado,  } = req.body

    const newProducto = new Producto({
        IDproducto,
        descripcion,
        valorUnitario,
        estado
    })

    await newProducto.save()
    res.json({message:'Producto Guardado'})

}

productosCtrl.getProducto = async (req, res)=> {
    const producto= await Producto.findById (req.params.id)
    res.json(producto)
}


productosCtrl.updateProducto = async (req, res)=> {
    const { IDproducto, descripcion, valorUnitario, estado,  } = req.body
    await Producto.findByIdAndUpdate(req.params.id, {
        IDproducto,
        descripcion,
        valorUnitario,
        estado

   })
    res.json({message:'Producto Actulizado'})

}

productosCtrl.deleteProducto= async (req, res)=> {
    await Producto.findByIdAndDelete(req.params.id)
    res.json({message:'Producto Eliminado'})

}
module.exports =productosCtrl