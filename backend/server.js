require('dotenv').config();
const express = require('express');
const cors = require('cors');
const promptRoutes = require('./routes/promptRoutes');
const { connectDB, sequelize } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/prompts', promptRoutes);

// Conectar y sincronizar
connectDB();
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
    })
    .catch((error) => console.error('❌ Error al sincronizar la DB:', error));