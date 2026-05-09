import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import './App.css'
import Footer from './components/Footer'


function App() {
  
  return (
    <> 
    <Navbar/>
    <div className='min-h-[87vh]'>
       <Manager/>
    </div>
    <Footer/>
      <div>
        
       </div>
     </> 
  )
}

export default App
