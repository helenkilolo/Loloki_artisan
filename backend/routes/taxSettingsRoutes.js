// /routes/taxSettingsRoutes.js
import express from 'express';
import TaxSettings from '../models/taxSettingsModel.js';

const router = express.Router();

// Create a new tax setting
router.post('/tax-settings', async (req, res) => {
  try {
    const taxSetting = new TaxSettings(req.body);
    await taxSetting.save();
    res.status(201).json(taxSetting);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tax settings
router.get('/tax-settings', async (req, res) => {
  try {
    const taxSettings = await TaxSettings.find();
    res.json(taxSettings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
