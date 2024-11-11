import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 shadow-lg mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-white">ΩmegaMovies</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md flex items-center space-x-2"
            >
              <Home size={20} />
              <span>Inicio</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;