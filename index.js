// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route handlers
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // Allows app to parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' Connected to MongoDB'))
  .catch((err) => console.error(' MongoDB connection error:', err));

// Use routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

// Root route
app.get('/', (req, res) => {
  res.send(' Product Catalog API is running. Use /products or /categories.');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
