import React, { useState, useEffect } from 'react';
import PelisGrid from '../components/PelisGrid';
import Paginacion from '../components/Paginacion';
import { getPopularMovies } from '../services/api';

const Home = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  useEffect(() => {
    const fetchPeliculas = async () => {
      const data = await getPopularMovies(paginaActual);
      setPeliculas(data.results);
      setTotalPaginas(data.total_pages);
    };
    fetchPeliculas();
  }, [paginaActual]);

  const handleCambioPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    window.scrollTo(0, 0);
  };

  return (
    <div className='bg-gray-900'>
      <h1 className="text-3xl font-bold mb-8">Películas Populares</h1>
      <PelisGrid peliculas={peliculas} />
      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onCambioPagina={handleCambioPagina}
      />
    </div>
  );
};

export default Home;