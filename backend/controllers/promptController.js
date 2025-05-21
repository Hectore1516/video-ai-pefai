const Prompt = require("../models/Prompt");
const Provider = require("../models/Provider");
const { sequelize } = require("../config/database");

exports.createPrompt = async (req, res) => {
    try {
        const { main_prompt, ui_settings } = req.body;

        const nuevoPrompt = await Prompt.create({
            prompt_text: main_prompt,
            duration_seconds: ui_settings.duration_seconds,
            genre: ui_settings.genre,
            tone: ui_settings.tone,
            language: ui_settings.language,
            target_audience: ui_settings.target_audience,
            selected_voice_id: ui_settings.selected_voice_id,
            image_gen_config_id: ui_settings.image_gen_config_id,
            video_gen_config_id: ui_settings.video_gen_config_id,
        });

        res.status(201).json(nuevoPrompt);
    } catch (error) {
        console.error("❌ Error al crear el prompt:", error);
        res.status(500).json({ error: "Error al crear el prompt" });
    }
};

exports.getProviders = async (req, res) => {
    try {
        const result = await Provider.findAll();
        res.json(result);
    } catch (error) {
        console.error("❌ Error al obtener proveedores:", error.message);
        res.status(500).json({ error: "Error al obtener proveedores" });
    }
};

exports.getAllPrompts = async (req, res) => {
    try {
        const prompts = await Prompt.findAll();
        res.json(prompts);
    } catch (error) {
        console.error("❌ Error al obtener prompts:", error.message);
        res.status(500).json({ error: "Error al obtener prompts" });
    }
};

exports.getGenerationConfigs = async (req, res) => {
    try {
        const [configs] = await sequelize.query(`
      SELECT 
        id, 
        provider_id, 
        generation_type, 
        video_dimension_id, 
        display_name
      FROM generation_job_configs
    `);
        res.json(configs);
    } catch (error) {
        console.error("❌ Error al obtener generation configs:", error.message);
        res.status(500).json({ error: "Error al obtener configuraciones" });
    }
};

exports.getVoices = async (req, res) => {
    try {
        const [voices] = await sequelize.query(`
      SELECT id, name FROM voices_elevenlabs
    `);
        res.json(voices);
    } catch (error) {
        console.error("❌ Error al obtener voces:", error.message);
        res.status(500).json({ error: "Error al obtener voces" });
    }
};

exports.getVideoRatios = async (req, res) => {
    try {
        const [ratios] = await sequelize.query(`
      SELECT id, aspect_ratio FROM video_dimensions
    `);
        res.json(ratios);
    } catch (error) {
        console.error("❌ Error al obtener ratios de video:", error.message);
        res.status(500).json({ error: "Error al obtener ratios de video" });
    }
};;

exports.getPromptStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await sequelize.query(`
      SELECT final_video_url, status
      FROM prompts
      WHERE id = $1
    `, { bind: [id] });

        if (!result.length) {
            return res.status(404).json({ error: "Prompt no encontrado" });
        }

        res.json(result[0]);
    } catch (error) {
        console.error("❌ Error al verificar estado del prompt:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};