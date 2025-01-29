// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Login from './Components/Login'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import SignUp from './Components/SignUp'
import Home from './Pages/Homepage'

function App() {
  return (
<>
    <Routes>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/" element={<Home/>}/>      
    </Routes>
</>
  )
}

export default App
