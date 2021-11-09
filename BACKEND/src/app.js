const express = require('express')
const app = express()
const cors = require('cors')
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = '1013222702859-0eg3qo5hvs6s2cl5347rld1otne9tsia.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID)
const userModel = require('./models/usuarioModel')



//settings

app.set('port', process.env.PORT || 4000)



//middlewares

app.use(cors())
app.use(express.json())

//routes (url que la aplicacion de react va a utilizar)

//app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/productos', require('./routes/productos'))
app.use('/api/ventas', require('./routes/ventas'))


//LOGIN
async function verify(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
        const payload = ticket.getPayload()
        const userid = payload['sub']
        return userid

    } catch (error) {
        console.error(error)
        return null

    }
}

app.post('/login', async (req, res) => {
    let userid = await verify(req.body.token)
    if (userid) {
        userModel.crearUsuario({
            email: req.body.email,
            nombre: req.body.nombre,
            activado: false

        }, (error, usuario) => {
            if (error) {
                res.status = 500
                res.send({
                    error: true,
                    message: error
                })
                return
            }
            res.send({
                success: true,
                message: 'El Usuario Es Valido',
                usuario: usuario
            })

        })

    } else {
        res.status = 400
        res.send({
            error: true,
            message: 'No se pudo validar el usuario'

        })
    }
})
app.post('/actualizarUsuario', async (req, res) => {
    let userid = await verify(req.headers.token);
    if (userid) {
        userModel.actualizarUsuario({
            email: req.body.email,
            nombre: req.body.nombre,
            rol: req.body.rol
        }, (error, usuario) => {
            if (error) {
                res.status = 500;
                res.send({
                    error: true,
                    message: error
                });
                return;
            }

            res.send({
                success: true,
                message: 'El usuario fue actualizado',
                usuario: usuario
            });
        });
    } else {
        res.status = 400;
        res.send({
            error: true,
            message: 'No se pudo validar el usuario'
        });
    }
})

app.get('/usuarios', async (req, res) => {
    if (req.headers.token) {
        let userid = await verify(req.headers.token);
        if (userid) {
            userModel.cargarTodos((error, usuarios) => {
                if (error) {
                    res.status = 500;
                    res.send({
                        error: true,
                        message: 'Ocurrio un error en el servidor',
                        errorMessage: error
                    });
                    return;
                }

                res.send({
                    success: true,
                    usuarios: usuarios
                });

                return;
            });
        } else {

            res.status = 400;

            res.send({
                error: true,
                message: 'El TOKEN es invalido'
            });
        }
    } else {

        res.status = 400;

        res.send({
            error: true,
            message: 'El usuario no esta autorizado NO TOKEN'
        });
    }


})




module.exports = app