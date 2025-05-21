import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Heart, Repeat2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type VideoPreviewProps = {
  promptId: number;
};

const VideoPreview = ({ promptId }: VideoPreviewProps) => {
  const [liked, setLiked] = useState(false);

  const [videoData, setVideoData] = useState({ status: "processing", final_video_url: null });
  const [pollingActive, setPollingActive] = useState(true);

  // 👇 Reemplaza este valor por el ID real del prompt

  useEffect(() => {
    if (!pollingActive) return;

    const interval = setInterval(async () => {
      try {
        console.log(`📡 Haciendo polling a: http://localhost:3001/api/prompts/${promptId}/status`);
        const res = await fetch(`http://localhost:3001/api/prompts/${promptId}/status`);
        const data = await res.json();

        setVideoData(data);

        if (data.status === "ready" && data.final_video_url) {
          setPollingActive(false);
        }
      } catch (err) {
        console.error("❌ Error al verificar estado del video:", err);
      }
    }, 5000); // consulta cada 5 segundos

    return () => clearInterval(interval);
  }, [pollingActive, promptId]);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Tu <span className="text-gradient">creación</span>
          </h2>
          <p className="text-lg text-envision-dark-gray max-w-2xl mx-auto">
            Visualiza, edita y comparte tu video generado por IA.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8 mx-auto max-w-md">
              <TabsTrigger value="preview">Vista previa</TabsTrigger>
              <TabsTrigger value="details">Detalles</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-0">
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="aspect-video bg-envision-black relative">
                  {videoData.status === "ready" && videoData.final_video_url ? (
                    <video
                      className="w-full h-full object-cover"
                      src={videoData.final_video_url}
                      controls
                      autoPlay
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="cyber-bg w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-envision-purple bg-opacity-30 mb-4 animate-pulse">
                          <span className="text-2xl">⏳</span>
                        </div>
                        <p className="text-sm opacity-80">Generando video...</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                    <h3 className="text-xl font-medium">Ciudad futurista al atardecer</h3>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLiked(!liked)}
                        className={liked ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-red-500" : ""}`} />
                        {liked ? "Guardado" : "Guardar"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        Compartir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-gray-50 rounded-md p-3">
                      <span className="block text-xs text-gray-500 mb-1">Duración</span>
                      <span className="font-medium">15 segundos</span>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3">
                      <span className="block text-xs text-gray-500 mb-1">Estilo</span>
                      <span className="font-medium">Cinematográfico</span>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3">
                      <span className="block text-xs text-gray-500 mb-1">Resolución</span>
                      <span className="font-medium">1920 x 1080</span>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3">
                      <span className="block text-xs text-gray-500 mb-1">Creado</span>
                      <span className="font-medium">Hace 2 minutos</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full">
                      <Repeat2 className="mr-2 h-4 w-4" />
                      Regenerar con ajustes
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-medium mb-4">Detalles de generación</h3>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-envision-dark-gray mb-2">Prompt utilizado</h4>
                  <div className="bg-gray-50 rounded-md p-4 text-sm">
                    Un video de una ciudad futurista con coches voladores, con un estilo cinematográfico, luz del atardecer, colores vibrantes, edificios altos de cristal, gente caminando, tráfico aéreo.
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-envision-dark-gray mb-2">Parámetros</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 rounded-md p-3">
                      <span className="block text-xs text-gray-500 mb-1">Modelo IA</span>
                      <span className="font-medium">VideoGen 2.0</span>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3">
                      <span className="block text-xs text-gray-500 mb-1">Frames</span>
                      <span className="font-medium">450 (30fps)</span>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3">
                      <span className="block text-xs text-gray-500 mb-1">Seed</span>
                      <span className="font-medium">427895</span>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3">
                      <span className="block text-xs text-gray-500 mb-1">Intensidad</span>
                      <span className="font-medium">Alta</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-envision-dark-gray mb-2">Historial de versiones</h4>
                  <div className="border rounded-md divide-y">
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium">Versión 1</span>
                        <span className="text-xs text-gray-500 block">Hace 2 minutos</span>
                      </div>
                      <Button variant="ghost" size="sm">Ver</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default VideoPreview;