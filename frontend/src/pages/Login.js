import React from 'react'
import GoogleLogin from 'react-google-login';

const Login = () => {

    const respuestaGoogle=(respuesta)=>{
        console.log(respuesta)
    }
    return (
        <div className='fondoImagen'>
            <div className='block pt-4'>
            <GoogleLogin
                clientId="18048176545-6dptqp0s46sssjhsj96iffljn0o47p9n.apps.googleusercontent.com"
                buttonText="Iniciar Sesión"
                onSuccess={respuestaGoogle}
                onFailure={respuestaGoogle}
                cookiePolicy={'single_host_origin'}
               
            />,
            </div>
        </div>
    )
}

export default Login
