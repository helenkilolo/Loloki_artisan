// /pages/api/stripe.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { totalAmount } = req.body;

      // Ensure 'totalAmount' is provided and is a valid number
      if (typeof totalAmount !== 'number' || isNaN(totalAmount) || totalAmount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      // Create a Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd', // Adjust based on your currency
              product_data: {
                name: 'Total Amount',
              },
              unit_amount: Math.round(totalAmount * 100), // Convert dollars to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

