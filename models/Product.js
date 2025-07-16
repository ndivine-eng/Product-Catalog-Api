const mongoose = require('mongoose');

// Define the schema for product variants (e.g., different sizes or colors)
const variantSchema = new mongoose.Schema({
  size: { type: String }, // Optional size (e.g., "M", "Large", "6.1 inch")
  color: { type: String }, // Optional color (e.g., "Red", "Black")
  stock: {
    type: Number,
    required: true,       // Each variant must have stock defined
    min: 0                // Stock cannot be negative
  }
});

// Define the main product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true            // Removes whitespace before and after
  },
  description: {
    type: String,
    trim: true            // Optional description, also trimmed
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0                // Must be greater than or equal to 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',      // Links to a Category model
    required: [true, 'Category is required']
  },
  variants: [variantSchema], // Embeds variant schema (array of options)
  createdAt: {
    type: Date,
    default: Date.now     // Automatically set when product is created
  }
});

// Export the model, preventing OverwriteModelError in dev
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
