const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [20, 60] }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING(400),
        allowNull: false
    }
});

module.exports = Store;