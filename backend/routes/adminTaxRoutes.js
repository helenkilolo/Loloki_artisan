import express from 'express';
import Tax from '../models/taxModel.js';
import { adminProtect } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Create or update tax settings
router.post('/taxes', adminProtect, async (req, res) => {
  try {
    const tax = new Tax(req.body);
    await tax.save();
    res.status(201).json(tax);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tax settings
router.get('/taxes', adminProtect, async (req, res) => {
  const taxes = await Tax.find();
  res.json(taxes);
});

// Delete tax settings
router.delete('/taxes/:id', adminProtect, async (req, res) => {
  try {
    const tax = await Tax.findByIdAndDelete(req.params.id);
    if (!tax) {
      return res.status(404).json({ message: 'Tax setting not found' });
    }
    res.json({ message: 'Tax setting deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
