
import React from 'react'

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Testimonails from './components/Testimonails'
import Contact from './components/Contact'
import Footer from './components/Footer';

function App() {
  return (
    <div className='w-full overflow-hidden'>
      <ToastContainer position="top-right" autoClose={2000} />
      <Header/>
      <About/>
      <Projects/>
      <Testimonails/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
