const express = require('express')
const app= express()
const cors = require('cors')



//settings

app.set('port', process.env.PORT || 4000)

//middlewares

app.use(cors())
app.use(express.json())

//routes (url que la aplicacion de react va a utilizar)

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/productos', require('./routes/productos') )
app.use('/api/ventas', require('./routes/ventas'))


module.exports = app