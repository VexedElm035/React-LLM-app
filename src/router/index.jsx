import React from 'react'
import {Route, Routes} from 'react-router-dom';
import {Contact, Home, } from '../pages/';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default Router