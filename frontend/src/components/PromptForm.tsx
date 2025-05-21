import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Wand2, Video, Clock, Sparkles, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { createPrompt } from "@/services/promptService";
import { useEffect } from "react";
import VideoPreview from "./VideoPreview";



const PromptForm = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("");
  const [genre, setGenre] = useState('');
  const [tone, setTone] = useState('');
  const [language, setLanguage] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [imageProvider, setImageProvider] = useState("");
  const [videoProvider, setVideoProvider] = useState("");
  const [videoRatio, setVideoRatio] = useState('');
  const [videoRatios, setVideoRatios] = useState<any[]>([]);
  const [imageProviders, setImageProviders] = useState([]);
  const [videoProviders, setVideoProviders] = useState([]);
  const [durationSeconds, setDurationSeconds] = useState(30);
  const [selectedVoiceId, setSelectedVoiceId] = useState("");
  const [generationConfigs, setGenerationConfigs] = useState<any[]>([]);
  const [createdPromptId, setCreatedPromptId] = useState<number | null>(null);
  const [voices, setVoices] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/prompts/providers");
        const data = await res.json();

        const images = data.filter((p: any) => p.provider_type === "image");
        const videos = data.filter((p: any) => p.provider_type === "video");

        setImageProviders(images);
        setVideoProviders(videos);
      } catch (err) {
        console.error("Error al cargar proveedores:", err);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/prompts/voices");
        const data = await res.json();
        setVoices(data);
      } catch (err) {
        console.error("❌ Error al cargar voces:", err);
      }
    };

    fetchVoices();
  }, []);

  useEffect(() => {
    const fetchVideoRatios = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/prompts/video-ratios");
        const data = await res.json();
        console.log("📺 Ratios cargados:", data); // 👈 Agrega este log
        setVideoRatios(data);
      } catch (err) {
        console.error("❌ Error al cargar video ratios:", err);
      }
    };

    fetchVideoRatios();
  }, []);

  useEffect(() => {
    const fetchGenerationConfigs = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/prompts/generation-configs");
        const data = await res.json();
        setGenerationConfigs(data);
      } catch (err) {
        console.error("❌ Error al obtener generation configs:", err);
      }
    };

    fetchGenerationConfigs();
  }, []);

  const getImageProviderId = (name: string) => {
    const match = imageProviders.find((p: any) => p.name === name);
    return match ? match.id : null;
  };

  const getVideoProviderId = (name: string) => {
    const match = videoProviders.find((p: any) => p.name === name);
    return match ? match.id : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa una descripción para tu video",
        variant: "destructive"
      });
      return;
    }

    if (!videoProvider || !videoRatio) {
      toast({
        title: "Campos obligatorios",
        description: "Selecciona proveedor de video y formato antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    // 🔍 Obtener IDs desde generación de configuraciones
    const videoProviderId = videoProviders.find(p => p.name === videoProvider)?.id;

    // ✅ Buscar configuración de imagen basada en el ratio
    const imageConfigId = generationConfigs.find(
      (c) => Number(c.video_dimension_id) === Number(videoRatio) && c.generation_type === "image"
    )?.id;

    // ✅ Buscar configuración de video basada en el provider
    const videoConfigId = generationConfigs.find(
      (c) => Number(c.provider_id) === videoProviderId && c.generation_type === "video"
    )?.id;

    // ✅ Buscar estilo visual por provider + ratio
    const visualStyleConfigId = generationConfigs.find(
      (c) =>
        Number(c.provider_id) === videoProviderId &&
        Number(c.video_dimension_id) === Number(videoRatio) &&
        c.generation_type === "image"
    )?.id;

    if (!imageConfigId || !videoConfigId) {
      toast({
        title: "Error",
        description: "No se encontró configuración válida para el formato o proveedor seleccionado.",
        variant: "destructive"
      });
      return;
    }

    const data = {
      main_prompt: prompt,
      ui_settings: {
        duration_seconds: Number(durationSeconds),
        genre: genre || null,
        language: language || null,
        tone: tone || null,
        target_audience: targetAudience || null,
        selected_voice_id: selectedVoiceId ? Number(selectedVoiceId) : null,
        image_gen_config_id: imageConfigId,
        video_gen_config_id: videoConfigId,
        video_dimension_id: Number(videoRatio),
        visual_style_config_id: style ? Number(style) : null,
      }
    };

    console.log("📤 Enviando datos al backend:", data);

    try {
      const response = await createPrompt(data); // crea el registro en BD
      setCreatedPromptId(response.id); // guarda el ID del prompt creado

      // 🔁 Llama al webhook de n8n para iniciar generación
      await fetch("http://localhost:5678/webhook/n8n-generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          main_prompt_id: response.id
        })
      });

      toast({
        title: "¡Video generado con éxito!",
        description: `Tu video con ID ${response.id} ha sido creado.`,
      });

      // Limpiar campos del formulario
      setPrompt("");
      setImageProvider("");
      setVideoProvider("");
      setVideoRatio("");
      setGenre("");
      setTone("");
      setLanguage("");
      setTargetAudience("");
    } catch (error) {
      console.error("❌ Error al generar el video:", error);
      toast({
        title: "Error",
        description: "No se pudo crear el video. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const styleOptions = [
    { value: 'cinematic', label: 'Cinematográfico' },
    { value: 'animation', label: 'Animación' },
    { value: 'realistic', label: 'Realista' },
    { value: 'anime', label: 'Anime' },
    { value: 'vintage', label: 'Vintage' },
  ];

  return (
    <section id="create" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Crea tu <span className="text-gradient">video</span>
          </h2>
          <p className="text-lg text-envision-dark-gray max-w-2xl mx-auto">
            Describe el video que imaginas y nuestra IA lo creará para ti. Sé detallado para obtener mejores resultados.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="prompt" className="block text-sm font-medium text-envision-dark-gray mb-2">
                Describe tu video
              </label>
              <Textarea
                id="prompt"
                placeholder="Ej: Un video de una ciudad futurista con coches voladores, con un estilo cinematográfico, luz del atardecer, colores vibrantes..."
                className="h-32"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Duración */}
              <div>
                <label className="block text-sm font-medium text-envision-dark-gray mb-2">
                  <Clock className="inline mr-2 h-4 w-4" /> Duración (segundos)
                </label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[durationSeconds]}
                    min={5}
                    max={60}
                    step={5}
                    onValueChange={(value) => setDurationSeconds(value[0])}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-8">{durationSeconds}s</span>
                </div>
              </div>

              {/* Estilo visual dinámico */}
              <div>
                <label className="block text-sm font-medium text-envision-dark-gray mb-2">
                  <Video className="inline mr-2 h-4 w-4" /> Estilo visual
                </label>

                {/* 🧪 DEBUG: Mostrar lo que se está usando para filtrar */}
                {(() => {
                  const videoProviderId = videoProviders.find(p => p.name === videoProvider)?.id;
                  const selectedRatio = Number(videoRatio);

                  console.log("🎯 FILTRO estilo visual:");
                  console.log("→ videoProviderId:", videoProviderId);
                  console.log("→ selectedRatio:", selectedRatio);
                  console.log("→ generationConfigs:", generationConfigs);

                  const estilosCoincidentes = generationConfigs.filter(
                    (c) =>
                      c.generation_type === "image" &&
                      Number(c.provider_id) === videoProviderId &&
                      Number(c.video_dimension_id) === selectedRatio
                  );

                  console.log("🧪 Estilos visuales coincidentes:", estilosCoincidentes);

                  return null;
                })()}

                {(() => {
                  const videoProviderId = videoProviders.find(p => p.name === videoProvider)?.id;
                  const selectedRatio = Number(videoRatio);

                  console.log("🚨 DEBUG estilo visual:");
                  generationConfigs.forEach((c) => {
                    console.log({
                      id: c.id,
                      provider_id: c.provider_id,
                      video_dimension_id: c.video_dimension_id,
                      generation_type: c.generation_type,
                      display_name: c.display_name,
                      match:
                        c.generation_type === "image" &&
                        Number(c.provider_id) === videoProviderId &&
                        Number(c.video_dimension_id) === selectedRatio
                    });
                  });

                  return null;
                })()}

                <div className="grid grid-cols-2 gap-2">
                  {generationConfigs
                    .filter((c) =>
                      c.generation_type === "image" &&
                      Number(c.provider_id) === getImageProviderId(imageProvider) &&
                      Number(c.video_dimension_id) === Number(videoRatio)
                    )
                    .map((config) => (
                      <div
                        key={config.id}
                        className={`border rounded-md px-3 py-2 text-sm cursor-pointer transition ${Number(style) === config.id
                          ? 'border-envision-purple bg-envision-purple bg-opacity-10 text-envision-purple font-medium'
                          : 'border-gray-200 hover:border-envision-purple'
                          }`}
                        onClick={() => setStyle(String(config.id))}
                      >
                        {config.display_name || `Estilo ${config.id}`}
                      </div>
                    ))}
                </div>
              </div>

              {/* Género */}
              <div>
                <label className="block text-sm font-medium text-envision-dark-gray mb-2">Género</label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drama">Drama</SelectItem>
                    <SelectItem value="comedy">Comedia</SelectItem>
                    <SelectItem value="action">Acción</SelectItem>
                    <SelectItem value="sci-fi">Ciencia Ficción</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tono */}
              <div>
                <label className="block text-sm font-medium text-envision-dark-gray mb-2">Tono</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tono" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="serio">Serio</SelectItem>
                    <SelectItem value="emocional">Emocional</SelectItem>
                    <SelectItem value="epico">Épico</SelectItem>
                    <SelectItem value="inspirador">Inspirador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Idioma */}
              <div>
                <label className="block text-sm font-medium text-envision-dark-gray mb-2">Idioma</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">Inglés</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Audiencia Objetivo */}
              <div>
                <label className="block text-sm font-medium text-envision-dark-gray mb-2">Audiencia Objetivo</label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la audiencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="infantil">Infantil</SelectItem>
                    <SelectItem value="adolescente">Adolescente</SelectItem>
                    <SelectItem value="adulto">Adulto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Proveedor de Imagen */}
              <div>
                <label className="block text-sm font-medium text-envision-dark-gray mb-2">Proveedor de Imagen</label>
                <Select value={imageProvider} onValueChange={setImageProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona modelo de IA (imagen)" />
                  </SelectTrigger>
                  <SelectContent>
                    {imageProviders.map((provider: any) => (
                      <SelectItem key={provider.id} value={provider.name}>
                        <div className="flex items-center space-x-2">
                          <img
                            src={provider.logo_url}
                            alt={provider.name}
                            className="w-5 h-5 rounded"
                          />
                          <span>{provider.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Proveedor de Video */}
              <div>
                <label className="block text-sm font-medium text-envision-dark-gray mb-2">Proveedor de Video</label>
                <Select value={videoProvider} onValueChange={setVideoProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona modelo de IA (video)" />
                  </SelectTrigger>
                  <SelectContent>
                    {videoProviders.map((provider: any) => (
                      <SelectItem key={provider.id} value={provider.name}>
                        <div className="flex items-center space-x-2">
                          <img
                            src={provider.logo_url}
                            alt={provider.name}
                            className="w-5 h-5 rounded"
                          />
                          <span>{provider.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ratio */}
              <div>
                <label className="block text-sm font-medium text-envision-dark-gray mb-2">Ratio del video</label>
                <Select value={videoRatio} onValueChange={setVideoRatio}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    {videoRatios.map((ratio) => (
                      <SelectItem key={ratio.id} value={String(ratio.id)}>
                        {ratio.aspect_ratio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Voces */}
            <div>
              <label className="block text-sm font-medium text-envision-dark-gray mb-2">Voz</label>
              <Select value={selectedVoiceId} onValueChange={setSelectedVoiceId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una voz" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.id} value={String(voice.id)}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-glow hover:bg-envision-dark-purple"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generando video...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" /> Generar video
                </>
              )}
            </Button>

            <div className="mt-4 text-center text-sm text-envision-dark-gray flex items-center justify-center">
              <Sparkles className="mr-2 h-4 w-4 text-envision-purple" />
              La generación puede tomar hasta 1 minuto dependiendo de la complejidad
            </div>
          </form>
          {createdPromptId && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 text-center">Vista previa de tu video</h3>
              <VideoPreview promptId={createdPromptId} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromptForm;

