// backend/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    // ... other fields (name, email)
    password: {
        type: DataTypes.STRING(100), // Matches your SQL change
        allowNull: false,
        // Remove any Bcrypt validation or length requirements here for testing
    },
    role: {
        type: DataTypes.ENUM('admin', 'user', 'store_owner'),
        defaultValue: 'user'
    }
    // ...
});

module.exports = User;