import express from 'express';
import Discount from '../models/discountModel.js';
import { adminProtect } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Create a new discount code
router.post('/discounts', adminProtect, async (req, res) => {
  try {
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json(discount);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit an existing discount code
router.put('/discounts/:id', adminProtect, async (req, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!discount) {
      return res.status(404).json({ message: 'Discount code not found' });
    }
    res.json(discount);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a discount code
router.delete('/discounts/:id', adminProtect, async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: 'Discount code not found' });
    }
    res.json({ message: 'Discount code deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
