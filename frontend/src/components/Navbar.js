import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../media/logo.png'



const Navbar = () => {
    return (
        <div>
            <ul class="flex bg-green-200 p-3">
                <li class="w-10 mr-6">
                    <img src={logo}/> 
                </li>
                <li class="mr-6">
                    <Link class="text-white hover:text-blue-800" to='/usuarios'>USUARIOS</Link>
                </li>
                <li class="mr-6">
                    <Link class="text-white hover:text-blue-800" to='/productos'>PRODUCTOS</Link>
                </li>
                <li class="mr-6">
                    <Link class="text-white hover:text-blue-800" to='/ventas'>VENTAS</Link>
                </li>

                <li class="mr-6">
                    <a class="text-gray-400 cursor-not-allowed" href="#">Disabled</a>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
