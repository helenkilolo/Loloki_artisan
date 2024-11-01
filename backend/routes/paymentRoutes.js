import express from 'express';
import { processPaymentMpesa, verifyPaymentMpesa, processPaymentStripe, verifyPaymentStripe } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// MPesa Routes
router.post('/mpesa/process', protect, processPaymentMpesa);
router.get('/mpesa/verify/:paymentId', protect, verifyPaymentMpesa);

// Stripe Routes
router.post('/stripe/process', protect, processPaymentStripe);
router.get('/stripe/verify/:paymentId', protect, verifyPaymentStripe);

export default router;

