// /services/stripeService.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (amount) => {
  return await stripe.paymentIntents.create({
    amount: amount * 100, // Stripe amount is in cents
    currency: 'usd', // Change this based on your currency
    payment_method_types: ['card'],
  });
};

// Implement this if you need to verify payment status
export const verifyStripePayment = async (paymentId) => {
  return await stripe.paymentIntents.retrieve(paymentId);
};

