// swagger.js

// Import Swagger UI Express and swagger-jsdoc
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger configuration options
const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI specification version
    info: {
      title: 'Product Catalog API',
      version: '1.0.0',
      description:
        'Comprehensive API documentation for the Product Catalog System built with Node.js, Express, and MongoDB.',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Your local server URL
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        // Product Schema
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
              example: '68765e6e7cb9b87cdfacbc37', // Example ObjectId
            },
            variants: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  size: {
                    type: 'string',
                    example: '13 inch',
                  },
                  color: {
                    type: 'string',
                    example: 'Silver',
                  },
                  stock: {
                    type: 'number',
                    example: 5,
                  },
                },
              },
            },
          },
        },

        // Category Schema
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

  // Points Swagger to route files that contain annotations
  apis: ['./routes/*.js'],
};

// Generate swagger documentation object
const swaggerSpec = swaggerJsdoc(options);

// Export Swagger UI middleware and spec for use in index.js
module.exports = {
  swaggerUi,
  swaggerSpec,
};
