import express from 'express';
import Notification from '../models/notificationModel.js';
import { adminProtect } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Get notifications
router.get('/notifications', adminProtect, async (req, res) => {
  const notifications = await Notification.find().populate('recipient', 'name email');
  res.json(notifications);
});

// Mark notification as read
router.put('/notifications/:id/read', adminProtect, async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) return res.status(404).json({ message: 'Notification not found' });

  notification.read = true;
  await notification.save();
  res.status(200).json({ message: 'Notification marked as read' });
});

export default router;
