const Product = require('../models/Product');
const slugify = require('slugify');

// CREATE a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, variants, discount } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const slug = slugify(name, { lower: true });

    const product = new Product({
      name,
      slug,
      description,
      price,
      discount,
      category,
      variants, // includes size, color, stock
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all products with optional search, category, price, and date filtering
exports.getAllProducts = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice, dateCreated } = req.query;

    const filter = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (dateCreated) {
      filter.createdAt = { $gte: new Date(dateCreated) };
    }

    const products = await Product.find(filter).populate('category');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET product by Slug
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found by slug' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE product by ID
exports.updateProduct = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name, { lower: true });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET low stock products (reporting feature)
exports.getLowStockProducts = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 5;

    const products = await Product.find({
      variants: { $elemMatch: { stock: { $lt: threshold } } },
    }).populate('category');

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
