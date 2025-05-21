const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Provider = sequelize.define("Provider", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provider_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logo_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "providers",
    timestamps: false, // o true si usas created_at / updated_at
});

module.exports = Provider;
