// /routes/notificationRoutes.js
import express from 'express';
import Notification from '../models/notificationModel.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Send a notification
router.post('/notifications', protect, async (req, res) => {
  try {
    const { recipient, message } = req.body;
    const notification = new Notification({ recipient, message });
    await notification.save();
    res.status(201).json({ message: 'Notification sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user notifications
router.get('/notifications', protect, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark notification as read
router.put('/notifications/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

