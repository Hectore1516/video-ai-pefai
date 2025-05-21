import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-purple-glow flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="font-display font-bold text-2xl">
              <span className="text-gradient">EnVision</span>
            </span>
          </a>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-envision-dark-gray font-medium hover:text-envision-purple transition-colors">
            Características
          </a>
          <a href="#how-it-works" className="text-envision-dark-gray font-medium hover:text-envision-purple transition-colors">
            Cómo funciona
          </a>
          <a href="#gallery" className="text-envision-dark-gray font-medium hover:text-envision-purple transition-colors">
            Galería
          </a>
          <Button>Iniciar Sesión</Button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-envision-dark-gray"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-envision-dark-gray font-medium py-2 hover:text-envision-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Características
            </a>
            <a 
              href="#how-it-works" 
              className="text-envision-dark-gray font-medium py-2 hover:text-envision-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Cómo funciona
            </a>
            <a 
              href="#gallery" 
              className="text-envision-dark-gray font-medium py-2 hover:text-envision-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Galería
            </a>
            <Button className="w-full">Iniciar Sesión</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
