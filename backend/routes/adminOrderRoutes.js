// /routes/adminOrderRoutes.js
import express from 'express';
import Order from '../models/orderModel.js';
import { adminProtect } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Get all orders
router.get('/orders', adminProtect, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'id name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.put('/orders/:id', adminProtect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
