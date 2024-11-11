import React from 'react';
import PelisCarta from './PelisCarta';

const PelisGrid = ({ peliculas }) => {
  const totalInRow = 5;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-4 gap-y-6 ">
        {peliculas.map((pelicula, index) => (
          <div key={pelicula.id} className="flex justify-center">
            <PelisCarta 
              pelicula={pelicula} 
              index={index} 
              totalInRow={totalInRow}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PelisGrid;