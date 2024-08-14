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

// Update order status (new route for updating status separately)
router.put('/orders/:id/status', adminProtect, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order (existing route, but now we can update other parts of the order)
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

// Refund an order
router.put('/orders/:id/refund', adminProtect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  // Implement refund logic with payment gateway
  // Example: await paymentGateway.refund(order.paymentId);
  
  order.status = 'Refunded';
  await order.save();
  res.status(200).json({ message: 'Order refunded successfully' });
});

router.get('/orders/report', adminProtect, async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  
  const csvData = convertOrdersToCSV(orders);
  
  res.header('Content-Type', 'text/csv');
  res.attachment('orders_report.csv');
  res.send(csvData);
});

function convertOrdersToCSV(orders) {
  const header = 'Order ID,User,Email,Total Price,Status\n';
  const rows = orders.map(order => 
    `${order._id},${order.user.name},${order.user.email},${order.totalPrice},${order.status}`
  );
  
  return header + rows.join('\n');
}


export default router;

