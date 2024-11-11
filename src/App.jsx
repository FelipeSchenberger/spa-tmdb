import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PelisDetails from './pages/PelisDetails';
import ResultadoBusqueda from './pages/ResultadoBusqueda';
import BarraBusqueda from './components/BarraBusqueda';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <NavBar />
        <div className="container mx-auto px-4 py-4">
          <BarraBusqueda />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pelicula/:id" element={<PelisDetails />} />
            <Route path="/busqueda" element={<ResultadoBusqueda />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;