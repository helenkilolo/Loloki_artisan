// /backend/routes/adminUserRoutes.js
import express from 'express';
import User from '../models/userModel.js';
import { adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Fetch all users
router.get('/users', adminProtect, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Update user
router.put('/users/:id', adminProtect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete user
router.delete('/users/:id', adminProtect, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});


// Ban or unban a user
router.put('/users/:id/ban', adminProtect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.banned = !user.banned;
    await user.save();

    res.status(200).json({ message: `User ${user.banned ? 'banned' : 'unbanned'} successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
