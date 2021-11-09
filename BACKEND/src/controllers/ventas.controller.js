const ventasCtrl = {}

const Venta = require('../models/Venta')

ventasCtrl.getVentas =  async (req, res)=> {
    const ventas = await Venta.find()
    res.json(ventas)

}

ventasCtrl.createVenta = async (req, res)=> {
    const { IDventa, valorTotal, IDproducto, cantidad, valorUnitario, fechaVenta, IDcliente, nombreCliente, vendedor } = req.body

    const newVenta= new Venta({
        IDventa,
        valorTotal,
        IDproducto,
        cantidad,
        valorUnitario,
        fechaVenta,
        nombreCliente,
        IDcliente,
        vendedor

    })

    await newVenta.save()
    res.json({message:'Venta Guardada'})

} 

ventasCtrl.getVenta =async (req, res)=> {
    const venta= await Venta.findById (req.params.id)
    res.json(venta)
}


ventasCtrl.updateVenta = async (req, res)=> {
    const { IDventa, valorTotal, IDproducto, cantidad, valorUnitario, fechaVenta, IDcliente, nombreCliente, vendedor } = req.body
 
    await Venta.findByIdAndUpdate(req.params.id, {
        IDventa,
        valorTotal,
        IDproducto,
        cantidad,
        valorUnitario,
        fechaVenta,
        nombreCliente,
        IDcliente,
        vendedor

   })
   res.json({message:'Venta Actualizada'})

} 

ventasCtrl.deleteVenta= async (req, res)=> {
    await Venta.findByIdAndDelete(req.params.id)
    res.json(({message:'Venta Eliminada'}))

}

module.exports =ventasCtrl