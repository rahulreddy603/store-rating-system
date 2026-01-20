const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rating = sequelize.define('Rating', {
    // Explicitly define these so the index can find them
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['userId', 'storeId']
        }
    ]
});

module.exports = Rating;