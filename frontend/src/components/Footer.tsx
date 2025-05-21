import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-lg bg-purple-glow flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-display font-bold text-xl">
                <span className="text-gradient">EnVision</span>
              </span>
            </div>
            <p className="text-envision-dark-gray text-sm mb-4">
              Convierte tus ideas en videos impresionantes con la potencia de la inteligencia artificial.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-envision-purple transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-envision-purple transition-colors">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-envision-purple transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-envision-purple transition-colors">
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Producto</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Características</a></li>
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Precios</a></li>
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Tutoriales</a></li>
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Recursos</a></li>
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Casos de uso</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Blog</a></li>
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Contacto</a></li>
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Trabaja con nosotros</a></li>
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Prensa</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Términos de servicio</a></li>
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Política de privacidad</a></li>
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Política de cookies</a></li>
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Ética de IA</a></li>
              <li><a href="#" className="text-envision-dark-gray hover:text-envision-purple transition-colors">Derechos de autor</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 text-center text-sm text-envision-dark-gray">
          <p>© {new Date().getFullYear()} EnVision. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
