const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const validate = require('../middleware/validate'); // Custom middleware to handle validation errors

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management endpoints
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Accessories
 *               description:
 *                 type: string
 *                 example: Fashion accessories and more
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Validation error
 */
router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string')
  ],
  validate,
  categoryController.createCategory
);

/**
 * @swagger
 * /categories/{idOrSlug}:
 *   get:
 *     summary: Get category by ID or slug
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: idOrSlug
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID or slug
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
router.get('/:idOrSlug', categoryController.getCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
router.put(
  '/:id',
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid category ID'),
    body('name')
      .optional()
      .isString()
      .withMessage('Name must be a string'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string')
  ],
  validate,
  categoryController.updateCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.delete(
  '/:id',
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid category ID')
  ],
  validate,
  categoryController.deleteCategory
);

module.exports = router;
