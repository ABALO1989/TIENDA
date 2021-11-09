import React from 'react'
import GoogleLogin from 'react-google-login';

const Login = () => {

    function responseGoogle(response){
        if(response && response.tokenId ){
            fetch('http://localhost:4000/login', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify ({
                    token: response.tokenId,
                    email: response.profileObj.email,
                    nombres: response.profileObj.name,

                })
                

            }).catch((err)=>console.error(err))
            .then ((respuesta)=>respuesta.json()
            .then ((respuestaServidor)=>{
                console.log(respuestaServidor)
            })
            )

        }

        
    }
    
    return (
        <div className='fondoImagen'>
            <div className='block pt-4'>
            <GoogleLogin
                clientId="1013222702859-0eg3qo5hvs6s2cl5347rld1otne9tsia.apps.googleusercontent.com"
                buttonText="Iniciar Sesión"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
               
            />,
            </div>
        </div>
    )
}


export default Login
