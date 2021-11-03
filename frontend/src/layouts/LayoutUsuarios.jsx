
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LayoutUsuarios = ({children}) => {
    return (
        <div className='h-screen flex flex-col overflow-y-hidden '>
            <Navbar/>
            <main className='h-full'>{children}</main>
            <Footer />
        </div>
    )
}

export default LayoutUsuarios
