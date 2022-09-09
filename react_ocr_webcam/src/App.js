import React from 'react'
import { Container } from 'semantic-ui-react';
import HeaderComponent from './Components/HeaderComponent';
import Model from './Pages/Model';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import About from './Pages/About';
import Info from './Pages/Info';
const App = () => {
  return (
    <div>
      
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
      <Route path="/" element={<Info/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/model" element={<Model  />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;