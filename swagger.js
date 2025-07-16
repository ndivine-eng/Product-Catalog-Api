// swagger.js
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Catalog API',
      version: '1.0.0',
      description: 'API documentation for the Product Catalog System built with Node.js, Express, and MongoDB.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price', 'category', 'stock'],
          properties: {
            name: {
              type: 'string',
              example: 'Laptop',
            },
            description: {
              type: 'string',
              example: 'High-performance laptop for professionals',
            },
            price: {
              type: 'number',
              example: 1200,
            },
            stock: {
              type: 'number',
              example: 10,
            },
            discount: {
              type: 'number',
              example: 15,
            },
            category: {
              type: 'string',
              example: '68765e6e7cb9b87cdfacbc37',
            },
            variants: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  size: { type: 'string', example: '13 inch' },
                  color: { type: 'string', example: 'Silver' },
                  stock: { type: 'number', example: 5 },
                },
              },
            },
          },
        },
        Category: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              example: 'Electronics',
            },
            description: {
              type: 'string',
              example: 'All kinds of electronic items',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // path to the API routes with Swagger annotations
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
