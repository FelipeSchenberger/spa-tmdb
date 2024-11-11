import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PelisGrid from '../components/PelisGrid';
import Paginacion from '../components/Paginacion';
import { searchMovies } from '../services/api';

const ResultadoBusqueda = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [peliculas, setPeliculas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  useEffect(() => {
    const fetchResultadosBusqueda = async () => {
      const data = await searchMovies(query, paginaActual);
      setPeliculas(data.results);
      setTotalPaginas(data.total_pages);
    };
    fetchResultadosBusqueda();
  }, [query, paginaActual]);

  const handleCambioPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Resultados de búsqueda para: {query}</h1>
      <PelisGrid peliculas={peliculas} />
      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onCambioPagina={handleCambioPagina}
      />
    </div>
  );
};

export default ResultadoBusqueda;