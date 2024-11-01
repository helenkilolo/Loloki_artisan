// /controllers/paymentController.js
import { handleMpesaPayment, verifyMpesaPayment } from '../services/mpesaService.js';
import { createPaymentIntent, verifyStripePayment } from '../services/stripeService.js';

export const processPaymentMpesa = async (req, res) => {
  try {
    const { paymentDetails, totalAmount } = req.body;
    const result = await handleMpesaPayment(paymentDetails, totalAmount);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPaymentMpesa = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const result = await verifyMpesaPayment(paymentId); // Implement this method in your mpesaService
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const processPaymentStripe = async (req, res) => {
  try {
    const { amount } = req.body;
    const result = await createPaymentIntent(amount);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPaymentStripe = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const result = await verifyStripePayment(paymentId); // Implement this method in your stripeService
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




  