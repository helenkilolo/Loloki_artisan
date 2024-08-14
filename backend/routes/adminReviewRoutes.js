import express from 'express';
import Review from '../models/reviewModel.js';
import { adminProtect } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Fetch pending reviews for moderation
router.get('/reviews/pending', adminProtect, async (req, res) => {
  const reviews = await Review.find({ approved: false });
  res.json(reviews);
});

// Approve a review
router.put('/reviews/:id/approve', adminProtect, async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });

  review.approved = true;
  await review.save();
  res.status(200).json({ message: 'Review approved' });
});

// Reject and delete a review
router.put('/reviews/:id/reject', adminProtect, async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });

  await review.remove();
  res.status(200).json({ message: 'Review rejected' });
});

export default router;
