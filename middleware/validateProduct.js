const { body } = require('express-validator');

exports.validateProduct = [
  body('name')
    .trim()
    .escape()
    .notEmpty().withMessage('Name is required'),

  body('description')
    .trim()
    .escape(),

  body('price')
    .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),

  body('stock')
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

  body('category')
    .isMongoId().withMessage('Category must be a valid ID')
];
