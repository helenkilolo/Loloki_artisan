// /routes/adminPromotionRoutes.js
import express from 'express';
import Promotion from '../models/promotionModel.js';
import DiscountCode from '../models/discountCodeModel.js';
import { adminProtect } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Create a new promotion
router.post('/promotions', adminProtect, async (req, res) => {
  const { title, description, startDate, endDate, products } = req.body;

  try {
    const promotion = new Promotion({ title, description, startDate, endDate, products });
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a discount code
router.post('/discount-codes', adminProtect, async (req, res) => {
  const { code, percentageOff, expirationDate } = req.body;

  try {
    const discountCode = new DiscountCode({ code, percentageOff, expirationDate });
    await discountCode.save();
    res.status(201).json(discountCode);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all promotions
router.get('/promotions', adminProtect, async (req, res) => {
  const promotions = await Promotion.find().populate('products');
  res.json(promotions);
});

// Get all discount codes
router.get('/discount-codes', adminProtect, async (req, res) => {
  const discountCodes = await DiscountCode.find();
  res.json(discountCodes);
});

export default router;
