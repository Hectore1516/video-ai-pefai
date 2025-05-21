const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Si quieres ver las queries, ponlo en true
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado a PostgreSQL correctamente.');
    } catch (error) {
        console.error('❌ No se pudo conectar a PostgreSQL:', error);
    }
};

module.exports = { sequelize, connectDB };