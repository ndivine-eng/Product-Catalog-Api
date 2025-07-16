const { body } = require('express-validator');

// Validation rules for creating or updating a product
exports.validateProduct = [
  // Validate and sanitize the 'name' field
  body('name')
    .trim() // Remove extra spaces
    .escape() // Escape special characters to prevent XSS
    .notEmpty().withMessage('Name is required'),

  // Validate and sanitize the 'description' field (optional)
  body('description')
    .trim()
    .escape(),

  // Validate that 'price' is a number greater than 0
  body('price')
    .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),

  // Validate that 'stock' is a non-negative integer
  body('stock')
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

  // Validate that 'category' is a valid MongoDB ObjectId
  body('category')
    .isMongoId().withMessage('Category must be a valid ID')
];
