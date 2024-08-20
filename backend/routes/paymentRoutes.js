// /routes/paymentRoutes.js
import express from 'express';
import { processPayment, verifyPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to process a payment
router.post('/process', protect, processPayment);

// Route to verify a payment
router.get('/verify/:paymentId', protect, verifyPayment);

export default router;
