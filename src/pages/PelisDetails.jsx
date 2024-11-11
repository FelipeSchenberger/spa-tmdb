import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieTrailers } from '../services/api';
import Trailer from '../components/Trailer';
import { Play } from 'lucide-react';

const PelisDetails = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [trailerSeleccionado, setTrailerSeleccionado] = useState(null);

  useEffect(() => {
    const fetchPeliculaData = async () => {
      try {
        const peliculaData = await getMovieDetails(id);
        setPelicula(peliculaData);
        
        const trailerData = await getMovieTrailers(id);
        // Filtrar solo los videos que son trailers de YouTube
        const trailersDisponibles = trailerData.results.filter(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailers(trailersDisponibles);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };
    
    fetchPeliculaData();
  }, [id]);

  if (!pelicula) return <div className="text-center">Cargando...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-auto flex justify-center md:justify-start">
        <img
          src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
          alt={pelicula.title}
          className="w-[230px] mx-[50px] h-auto rounded-lg shadow-lg object-cover"
        />
      </div>
      <div className="md:flex-1">
        <h1 className="text-3xl font-bold mb-4 text-gray-100">{pelicula.title}</h1>
        <p className="text-gray-400 mb-4">{pelicula.release_date}</p>
        <p className="mb-4 text-gray-300">{pelicula.overview}</p>
        <p className="mb-4 text-gray-300">
          <span className="font-semibold text-gray-100">Calificación:</span>{' '}
          {pelicula.vote_average.toFixed(1)} / 10
        </p>
        {trailers.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {trailers.map((trailer) => (
              <button
                key={trailer.id}
                onClick={() => setTrailerSeleccionado(trailer)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center space-x-2"
              >
                <Play size={20} />
                <span>{trailer.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No hay trailers disponibles</p>
        )}
      </div>
      {trailerSeleccionado && (
        <Trailer
          trailers={trailers}
          trailerActual={trailerSeleccionado}
          onCerrar={() => setTrailerSeleccionado(null)}
          onCambiarTrailer={setTrailerSeleccionado}
        />
      )}
    </div>
  );
};

export default PelisDetails;