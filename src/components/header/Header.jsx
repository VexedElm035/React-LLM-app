import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='header-container'>
        <section className='header-section'>
            <div>
                <p>
                    <a href="/">Inicio</a>
                </p>
            </div>
            <div>
                <p>Item2</p>
            </div>
            <div>
                <p>
                    <a href="/contact">Contacto</a>
                </p>
            </div>
                   
        </section>

    </div>
  )
}

export default Header