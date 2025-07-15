const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// PRODUCT ROUTES
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
// This code defines the product routes for a product catalog API using Express.js.
// It imports the necessary modules, sets up the router, and defines routes for creating,
// retrieving, updating, and deleting products.