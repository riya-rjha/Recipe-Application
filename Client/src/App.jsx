import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Auth from './Pages/Auth.jsx'
import Saved from './Pages/Saved.jsx'
import Create from './Pages/Create.jsx'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/auth' element={<Auth />} ></Route>
        <Route path='/saved' element={<Saved />} ></Route>
        <Route path='/create' element={<Create />} ></Route>
      </Routes>
    </>
  )
}

export default App