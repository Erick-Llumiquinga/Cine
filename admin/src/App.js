import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';
import Navigation from './components/navigation';
import NuevaPelicula from './components/NuevaPelicula';
import Salas from './components/salas';
import Compras from './components/compras';
import Login from './components/login';
import Register from './components/register';
import './index.css';



function App() {
  return (
      <BrowserRouter>
     
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
       <Navigation/>
      <Route path="/nuevaPelicula" component={NuevaPelicula} />
        <Route path="/create" component={Salas} />
        <Route path="/resumenVentas" component={Compras} />
      </BrowserRouter>
  );
}

export default App;
