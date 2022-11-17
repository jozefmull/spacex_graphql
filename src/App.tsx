import './App.css'
import { Routes, Route, Link } from 'react-router-dom'


import LaunchesList from './components/LaunchesList';
import LaunchDetails from './components/LaunchDetails';
import Logo from './components/Logo';

import React from 'react'

const App:React.FC = () => {
  return (
    <div className="App">
      <Link to='/'><Logo/></Link>
      <Routes>
        <Route path='/' element={<LaunchesList/>}/>
        <Route path='/launch/:id' element={<LaunchDetails/>}/>
      </Routes>
    </div>
  )
}

export default App
