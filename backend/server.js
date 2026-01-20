require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Import the synced instance from models folder

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/store', require('./routes/store'));
app.use('/api/rating', require('./routes/rating'));

// --- Database Sync & Server Start ---
const PORT = process.env.PORT || 5000;

// sequelize.sync() creates the tables if they don't exist
// use { alter: true } during development to update tables if models change
sequelize.sync({ alter: false }) 
  .then(() => {
    console.log('✅ Database connected and tables synced.');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync database:', err);
  });