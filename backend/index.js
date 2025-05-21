const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const promptRoutes = require("./routes/promptRoutes");

app.use(cors());
app.use(express.json());

// Prefijo para rutas
app.use("/api/prompts", promptRoutes);

// PUERTO
const PORT = 3001;

const { sequelize } = require("./config/database"); // asegúrate de que exista y esté bien configurado

app.get("/db-test", async (req, res) => {
    try {
        await sequelize.authenticate();
        res.send("✅ Conexión a PostgreSQL verificada con Sequelize.");
    } catch (error) {
        console.error("❌ Error al verificar conexión:", error.message);
        res.status(500).send("❌ Falló la conexión a la base de datos con Sequelize.");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});