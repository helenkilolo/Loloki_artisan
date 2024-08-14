// /routes/adminPaymentRoutes.js
import express from 'express';
import PaymentSettings from '../models/paymentSettingsModel.js';
import TaxSettings from '../models/taxSettingsModel.js';
import { adminProtect } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Get payment settings
router.get('/payment-settings', adminProtect, async (req, res) => {
  try {
    const settings = await PaymentSettings.find();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update payment settings
router.put('/payment-settings/:id', adminProtect, async (req, res) => {
  try {
    const settings = await PaymentSettings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tax settings
router.get('/tax-settings', adminProtect, async (req, res) => {
  try {
    const settings = await TaxSettings.find();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update tax settings
router.put('/tax-settings/:id', adminProtect, async (req, res) => {
  try {
    const settings = await TaxSettings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
