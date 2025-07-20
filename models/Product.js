// models/Product.js
const mongoose = require('mongoose');
const slugify = require('slugify'); // For generating URL-friendly slugs from product names
const Category = require('./Category'); // Import the Category model
// Define schema for product variants like size and color
const variantSchema = new mongoose.Schema({
  size: {
    type: String, // e.g., Small, Medium, Large
  },
  color: {
    type: String, // e.g., Red, Blue, Black
  },
  stock: {
    type: Number, // Inventory count for this variant
    required: true,
    min: 0 // Stock should not be negative
  }
});

// Define main product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'], // Mandatory field
    trim: true // Remove leading/trailing whitespace
  },
  description: {
    type: String,
    trim: true // Optional product description
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'], // Mandatory field
    min: 0 // Price must be a positive number or zero
  },
  discount: {
    type: Number,
    default: 0, // Optional discount percentage (e.g., 10 means 10%)
    min: 0,
    max: 100 // Discount should be between 0 and 100%
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    required: [true, 'Category is required']
  },
  variants: [variantSchema], // Array of variants (each with size/color/stock)
  slug: {
    type: String,
    unique: true, // Each product must have a unique slug
    lowercase: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Auto set the creation date
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Automatically generate a slug from the name before saving
productSchema.pre('save', function (next) {
  // If the name has changed or slug is missing, regenerate it
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Optional: Add a virtual field to calculate price after discount
productSchema.virtual('finalPrice').get(function () {
  return this.price * (1 - (this.discount || 0) / 100);
});

// Export the Product model
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
