import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getMovieVideos } from '../services/api';

const PelisCarta = ({ pelicula, index, totalInRow }) => {
  const [videoKey, setVideoKey] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const cartaRef = useRef(null);

  useEffect(() => {
    const fetchVideoKey = async () => {
      try {
        const videos = await getMovieVideos(pelicula.id);
        const trailer = videos.find(video => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) {
          setVideoKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    fetchVideoKey();
  }, [pelicula.id]);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getExpandedPosition = () => {
    if (!cartaRef.current) return {};

    const rect = cartaRef.current.getBoundingClientRect();
    const isLeftEdge = index % totalInRow === 0;
    const isRightEdge = (index + 1) % totalInRow === 0;

    if (isLeftEdge) {
      return { left: '0', marginLeft: '0', transformOrigin: 'left top' };
    } else if (isRightEdge) {
      return { right: '0', marginLeft: '0', transformOrigin: 'right top' };
    } else {
      return { left: '50%', marginLeft: '-150px', transformOrigin: 'center top' };
    }
  };

  const expandedStyle = getExpandedPosition();

  return (
    <div ref={cartaRef} className="relative group h-[330px] w-full sm:w-[220px]">
      <Link to={`/pelicula/${pelicula.id}`} className="block">
        <div 
          className={`absolute top-0 bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
            isHovered ? 'lg:transform lg:scale-125 lg:z-50 lg:-mt-[50px]' : ''
          }`}
          style={{
            width: isHovered ? '300px' : '100%',
            height: isHovered ? '350px' : '330px',
            ...(isHovered ? expandedStyle : { left: '0', marginLeft: '0' })
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative h-full">
            {isHovered && videoKey ? (
              <div className="absolute inset-0 z-10">
                <iframe
                  src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}`}
                  title={`${pelicula.title} trailer`}
                  className="w-full h-[calc(100%-40px)]"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            ) : null}
            <img
              src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
              alt={pelicula.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div 
            className={`absolute bottom-0 left-0 right-0 transition-all duration-300 bg-gray-800 ${
              isHovered 
                ? 'h-[40px] opacity-100 p-2' 
                : 'h-0 opacity-0 p-0'
            }`}
          >
            <h2 className="text-sm font-semibold text-gray-100 truncate">
              {pelicula.title}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PelisCarta;