const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  size: String,
  color: String,
  stock: {
    type: Number,
    default: 0
  }
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  discount: {
    type: Number,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  variants: [variantSchema], // Array of variant objects
}, { timestamps: true });

productSchema.virtual('finalPrice').get(function () {
  return this.price - (this.price * this.discount);
});
productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
