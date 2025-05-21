
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Crea videos increíbles con <span className="text-gradient">IA</span>
            </h1>
            <p className="text-lg md:text-xl text-envision-dark-gray mb-8">
              Convierte tus ideas en videos profesionales en segundos. Solo describe lo que imaginas, y nuestra IA lo hará realidad.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-purple-glow hover:bg-envision-dark-purple">
                Empezar ahora <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-envision-purple text-envision-purple">
                <PlayCircle className="mr-2 h-5 w-5" /> Ver demostración
              </Button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2 mr-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-10 w-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                    <span className="text-xs font-medium">U{n}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-envision-dark-gray">
                Más de <span className="font-bold">10,000</span> creadores confían en nosotros
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white border-opacity-20">
              <div className="absolute inset-0 cyber-bg opacity-20"></div>
              <div className="aspect-video bg-gradient-to-br from-envision-dark-purple to-envision-blue animate-pulse relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 flex items-center justify-center text-white font-display">
                  <span className="animate-pulse text-lg md:text-xl">Generando video...</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-xl bg-envision-cyan blur-2xl opacity-50"></div>
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-xl bg-envision-purple blur-2xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;