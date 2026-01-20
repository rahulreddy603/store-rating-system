require('dotenv').config(); // Ensure variables are loaded 
const { Sequelize } = require('sequelize');

// Initialize Sequelize with environment variables 
const sequelize = new Sequelize(
  process.env.DB_NAME,      // 'store_rating_system' 
  process.env.DB_USER,      // Your MySQL username
  process.env.DB_PASSWORD,  // Your MySQL password
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',       // Specifies MySQL as the database 
    logging: false,         // Set to console.log to see SQL queries in terminal
    pool: {
      max: 5,               // Maximum number of connections in pool
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;