const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSPec = require('./swagger');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Catalog API',
      version: '1.0.0',
      description: 'API for managing products and categories',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Register models
require('./models/Product');
require('./models/Category');

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h2>✅ Welcome to the Product Catalog API</h2>
    <ul>
      <li><a href="/api/products">GET /api/products</a></li>
      <li><a href="/api/categories">GET /api/categories</a></li>
      <li><a href="/api-docs">Swagger Docs</a></li>
    </ul>
  `);
});

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).send('<h2>❌ 404 - Not Found</h2>');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📄 Swagger docs at http://localhost:${PORT}/api-docs`);
});
