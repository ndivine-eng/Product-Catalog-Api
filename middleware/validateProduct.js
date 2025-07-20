// middlewares/validateProduct.js
const { body } = require('express-validator');

// Validation rules for creating or updating a product
exports.validateProduct = [
  // Validate and sanitize the 'name' field
  body('name')
    .trim()
    .escape()
    .notEmpty().withMessage('Product name is required'),

  // Validate and sanitize the 'description' field (optional)
  body('description')
    .optional()
    .trim()
    .escape(),

  // Validate that 'price' is a number greater than 0
  body('price')
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),

  // Optional discount, if present must be between 0 and 100
  body('discount')
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage('Discount must be between 0 and 100'),

  // Validate that 'category' is a valid MongoDB ObjectId
  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Category must be a valid Mongo ID'),

  // Validate each variant inside 'variants'
  body('variants').isArray().withMessage('Variants must be an array'),
  body('variants.*.size').optional().isString().trim().escape(),
  body('variants.*.color').optional().isString().trim().escape(),
  body('variants.*.stock')
    .isInt({ min: 0 }).withMessage('Variant stock must be a non-negative integer')
];
