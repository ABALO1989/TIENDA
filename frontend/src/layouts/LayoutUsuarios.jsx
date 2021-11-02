
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LayoutUsuarios = ({children}) => {
    return (
        <div className='mainContainer'>
            <Navbar/>
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default LayoutUsuarios
