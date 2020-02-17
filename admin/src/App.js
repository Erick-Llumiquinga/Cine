import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Informe from './components/Informe';
import Salas from './components/Salas';
import Peliculas from './components/Peliculas';
import Isalas from './components/Isalas';
import './index.css';



function App() {
  return (
      <BrowserRouter>
        <Navigation/>
        <Route path="/" exact component={Informe} />
        <Route path="/peliculas" component={Peliculas} />
        <Route path="/create" component={Salas} />
        <Route path="/salas" component={Isalas} />
      </BrowserRouter>
  );
}

export default App;
