const express = require('express')
const app= express()
const cors = require('cors')
const { OAuth2Client} = require('google-auth-library')
const CLIENT_ID = '1013222702859-0eg3qo5hvs6s2cl5347rld1otne9tsia.apps.googleusercontent.com'
const client = new OAuth2Client (CLIENT_ID)



//settings

app.set('port', process.env.PORT || 4000)


async function verify (token){
    try{
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience: CLIENT_ID
        })
        const payload = ticket.getPayload()
        const userid = payload ['sub']
        return userid

    }catch(error){
        console.error (error)
        return null

    }
}

app.post('./login', async (req, res)=> {
    let userid = await verify (req.body.token)
    if(userid){
        res.send({
            success: true, 
            message:'El token es valido'
        })
    }else{
        res.status =400
        res.send ({
            error:true,
            message:'No se pudo validar el usuario'

        })
    }
})


//middlewares

app.use(cors())
app.use(express.json())

//routes (url que la aplicacion de react va a utilizar)

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/productos', require('./routes/productos') )
app.use('/api/ventas', require('./routes/ventas'))


module.exports = app