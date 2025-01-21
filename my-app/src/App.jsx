// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Login from './Components/Login'
import './App.css'
import {Routes,Route} from 'react-router-dom'

function App() {
  return (
<>
    <Routes>
      <Route path="/Login" element={<Login/>}/>
    </Routes>
</>
  )
}

export default App
