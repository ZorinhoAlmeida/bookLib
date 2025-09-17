import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Collection from './pages/Collection'



function App() {

  return(
    <div>
      <NavBar />
      

      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
        </Routes>
        


      </main>
    </div>
  )


  
}


export default App
