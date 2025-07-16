// controllers/productController.js

// Helper: calculate total stock
const calculateTotalStock = (variants) => {
  if (!variants || variants.length === 0) return 0;
  return variants.reduce((total, variant) => total + (variant.stock || 0), 0);
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { variants } = req.body;

    const totalStock = calculateTotalStock(variants);
    const product = new Product({ ...req.body, stock: totalStock });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { variants } = req.body;

    const totalStock = calculateTotalStock(variants);
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, stock: totalStock },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
