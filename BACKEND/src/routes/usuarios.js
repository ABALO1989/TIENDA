const { Router} = require('express')
const router = Router();

const { getUsuarios, createUsuario, updateUsuario, deleteUsuario, getUsuario } = require('../controllers/usuarios.controller')

router.route('/')
.get(getUsuarios)
.post(createUsuario)


router.route('/:id')
.get(getUsuario)
.put(updateUsuario)
.delete(deleteUsuario)


module.exports = router; 