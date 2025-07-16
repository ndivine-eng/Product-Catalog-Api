// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Swagger setup
const { swaggerUi, swaggerSpec } = require('./swagger');

// Middleware setup
app.use(cors());
app.use(express.json()); // Allows app to parse JSON request bodies

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import route handlers
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' Connected to MongoDB'))
  .catch((err) => console.error(' MongoDB connection error:', err));

// Use routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

// Root route
app.get('/', (req, res) => {
  res.send(' Product Catalog API is running. Use /products or /categories or visit /api-docs for documentation.');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
