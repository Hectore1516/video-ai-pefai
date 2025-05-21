import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from 'lucide-react';

const Gallery = () => {
  const videos = [
    {
      id: 1,
      title: 'Aventura en el espacio',
      description: 'Una nave espacial explorando nuevos planetas',
      thumbnail: 'bg-gradient-to-br from-indigo-600 to-purple-600',
    },
    {
      id: 2,
      title: 'Océano profundo',
      description: 'Una inmersión en las profundidades marinas',
      thumbnail: 'bg-gradient-to-br from-blue-600 to-cyan-500',
    },
    {
      id: 3,
      title: 'Ciudad del futuro',
      description: 'Una metrópoli avanzada tecnológicamente',
      thumbnail: 'bg-gradient-to-br from-purple-600 to-pink-500',
    },
    {
      id: 4,
      title: 'Naturaleza salvaje',
      description: 'Paisajes naturales impresionantes',
      thumbnail: 'bg-gradient-to-br from-green-600 to-emerald-500',
    },
    {
      id: 5,
      title: 'Cosmos y nebulosas',
      description: 'Un viaje por el universo y sus maravillas',
      thumbnail: 'bg-gradient-to-br from-purple-800 to-blue-900',
    },
    {
      id: 6,
      title: 'Danza contemporánea',
      description: 'Expresión artística a través del movimiento',
      thumbnail: 'bg-gradient-to-br from-red-600 to-orange-500',
    },
  ];

  return (
    <section id="gallery" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Galería de <span className="text-gradient">inspiración</span>
          </h2>
          <p className="text-lg text-envision-dark-gray max-w-2xl mx-auto">
            Explora ejemplos de videos generados con nuestra IA para inspirar tu próxima creación.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="glass-card rounded-xl overflow-hidden transition-transform hover:scale-[1.02]">
              <div className={`aspect-video ${video.thumbnail} relative overflow-hidden`}>
                <div className="absolute inset-0 cyber-bg opacity-30"></div>
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white bg-opacity-30 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110">
                    <Play className="h-5 w-5 text-white" fill="white" />
                  </div>
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{video.title}</h3>
                <p className="text-sm text-envision-dark-gray">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button>
            Ver más ejemplos <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
