const { Router} = require('express')
const router = Router();

const { getProductos, createProducto, updateProducto, deleteProducto, getProducto } = require('../controllers/productos.controller')

router.route('/')
.get(getProductos)
.post(createProducto)


router.route('/:id')
.get(getProducto)
.put(updateProducto)
.delete(deleteProducto)


module.exports = router; 