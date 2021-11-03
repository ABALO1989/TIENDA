import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../media/logo2.png'

const NavbarInicio = () => {
    return (
        <div className='block font-mono font-bold bg-yellow-300 p-2'>
            <img className='h-16 m-auto  '
                src={logo}
                alt='logo' />


        </div>

    )
}

export default NavbarInicio
