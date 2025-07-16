const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  size: { type: String },
  color: { type: String },
  stock: {
    type: Number,
    required: true,
    min: 0
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  variants: [variantSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
