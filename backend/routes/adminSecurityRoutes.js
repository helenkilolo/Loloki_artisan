// /routes/adminSecurityRoutes.js
import express from 'express';
import SecurityLog from '../models/securityLogModel.js';
import { adminProtect } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Log security action
router.post('/log', adminProtect, async (req, res) => {
  try {
    const { action, userId } = req.body;
    const log = new SecurityLog({ action, userId });
    await log.save();
    res.status(201).json({ message: 'Log saved' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get security logs
router.get('/security-logs', adminProtect, async (req, res) => {
  try {
    const logs = await SecurityLog.find().populate('userId', 'email');
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

