
import Footer from '../components/Footer'
import React from 'react'
import NavbarInicio from '../components/NavbarInicio'

const LayoutInicial = ({children}) => {
    return (
        <div className='mainContainer'>
            <NavbarInicio />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default LayoutInicial
