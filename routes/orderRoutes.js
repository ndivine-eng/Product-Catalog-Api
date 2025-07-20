const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// 👉 CREATE a new order
router.post('/', async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    const newOrder = new Order({
      products,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order', details: error.message });
  }
});

// 👉 READ all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// 👉 READ one order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// 👉 UPDATE an order
router.put('/:id', async (req, res) => {
  try {
    const { products, status, totalAmount } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { products, status, totalAmount },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update order' });
  }
});

// 👉 DELETE an order
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;
