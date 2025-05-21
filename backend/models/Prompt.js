const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Prompt = sequelize.define("Prompt", {
    prompt_text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    duration_seconds: {
        type: DataTypes.INTEGER,
    },
    genre: {
        type: DataTypes.STRING,
    },
    tone: {
        type: DataTypes.STRING,
    },
    language: {
        type: DataTypes.STRING,
    },
    target_audience: {
        type: DataTypes.STRING,
    },
    selected_voice_id: {
        type: DataTypes.INTEGER,
    },
    image_gen_config_id: {
        type: DataTypes.INTEGER,
    },
    video_gen_config_id: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "received",
    },
    is_viable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: "prompts",
    timestamps: true, // o false si no usas created_at y updated_at
    createdAt: 'created_at',    // ✅ nombre real en tu base de datos
    updatedAt: 'updated_at'
});

module.exports = Prompt;