// /pages/api/mpesa.js
import { processPaymentMpesa, verifyPaymentMpesa } from '@controllers/paymentController.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const result = await processPaymentMpesa(req, res);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    const { paymentId } = req.query;
    try {
      const result = await verifyPaymentMpesa({ params: { paymentId } }, res);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

