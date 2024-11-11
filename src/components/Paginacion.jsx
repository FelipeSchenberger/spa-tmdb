import React from 'react';

const Paginacion = ({ paginaActual, totalPaginas, onCambioPagina }) => {
  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      <button
        onClick={() => onCambioPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-700 disabled:text-gray-400 hover:bg-blue-700"
      >
        Anterior
      </button>
      <span className="text-gray-300">
        Página {paginaActual} de {totalPaginas}
      </span>
      <button
        onClick={() => onCambioPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-700 disabled:text-gray-400 hover:bg-blue-700"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginacion;