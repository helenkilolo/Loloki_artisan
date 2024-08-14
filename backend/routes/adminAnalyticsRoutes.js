import express from 'express';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { adminProtect } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Sales Analytics
router.get('/analytics/sales', adminProtect, async (req, res) => {
  try {
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date
    ]);

    const formattedData = salesData.map(data => ({
      date: data._id,
      total: data.total,
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User Analytics
router.get('/analytics/users', adminProtect, async (req, res) => {
  try {
    const userData = await User.aggregate([
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Inventory Analytics
router.get('/analytics/inventory', adminProtect, async (req, res) => {
  try {
    const inventoryData = await Product.find().select('name stock');
    res.json(inventoryData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

