import axios from 'axios';

const generateToken = async () => {
  const response = await axios.post('https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {}, {
    headers: {
      'Authorization': `Basic ${Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64')}`
    }
  });
  return response.data.access_token;
};

const initiatePayment = async (accessToken, payload) => {
  const response = await axios.post('https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest', payload, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });
  return response.data;
};

export const handleMpesaPayment = async (paymentDetails, totalAmount) => {
  const accessToken = await generateToken();
  const payload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${new Date().toISOString().slice(0, -5).replace(/[-T:.]/g, '')}`).toString('base64'),
    Timestamp: new Date().toISOString().slice(0, -5).replace(/[-T:.]/g, ''),
    TransactionType: 'CustomerPayBillOnline',
    Amount: totalAmount,
    PartyA: paymentDetails.phoneNumber,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: paymentDetails.phoneNumber,
    CallBackURL: 'https://yourdomain.com/callback', // Handle callback after payment
    AccountReference: 'YourAccountReference',
    TransactionDesc: 'Payment for order'
  };
  return initiatePayment(accessToken, payload);
};

// Add this function if needed for verification
export const verifyMpesaPayment = async (paymentId) => {
  // Implement MPesa payment verification logic here
  // Return a response or status based on the paymentId
};

