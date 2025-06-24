import React from 'react'
import { BrowserRouter } from 'react-router-dom'  
import { Route, Routes} from 'react-router-dom';
import { Contact, Home, } from './pages/index';
import Router from './router/'
import { Header, Footer } from './components/index';
import './App.css';

const App = () => {
  return (
    <div>
      {/* <Header/> */}
      <Router />
      {/* <Footer /> */}
    </div>
  )
}

export default App