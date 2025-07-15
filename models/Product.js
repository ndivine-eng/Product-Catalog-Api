const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  variants: [
    {
      size: String,
      color: String,
      stock: Number,
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

// ✅ Prevent OverwriteModelError during development
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
