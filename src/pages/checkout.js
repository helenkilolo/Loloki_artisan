import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js'; // Import Stripe library
import Header from '../app/components/header';
import Footer from '../app/components/footer';

// Initialize Stripe with your public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { state } = useCart(); // Access state from CartContext
  const [paymentDetails, setPaymentDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(''); // To track selected payment method
  const router = useRouter();

  // Handle MPesa Payment
  const handleMpesaPayment = async () => {
    try {
      const response = await fetch('/api/mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentDetails, totalAmount: state.total }),
      });
      const result = await response.json();
      if (result.success) {
        console.log('MPesa Payment Success:', result);
        router.push('/order-confirmation');
      } else {
        alert('MPesa Payment Failed');
      }
    } catch (error) {
      console.error('MPesa Payment Error:', error);
    }
  };

// Handle Stripe Payment
const handleStripePayment = async () => {
  const stripe = await stripePromise;
  try {
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalAmount: state.total }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error creating checkout session');
    }

    const { sessionId } = await response.json();
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error('Stripe Checkout Error:', error);
      alert('Payment failed');
    }
  } catch (error) {
    console.error('Stripe Payment Error:', error);
  }
};


  // Handle Payment based on selected method
  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    
    if (paymentMethod === 'mpesa') {
      await handleMpesaPayment();
    } else if (paymentMethod === 'stripe') {
      await handleStripePayment();
    }
  };

  return (
    <>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Payment Method Selection */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
            <label className="block mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value="mpesa"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">MPesa</span>
            </label>
            <label className="block mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">Stripe</span>
            </label>
          </div>

          {/* Payment Details */}
          {paymentMethod === 'mpesa' && (
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-4">MPesa Payment</h3>
              <label className="block text-gray-700">
                Phone Number
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, phoneNumber: e.target.value })
                  }
                />
              </label>
            </div>
          )}

          {paymentMethod === 'stripe' && (
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-4">Stripe Payment</h3>
              <label className="block text-gray-700">
                Card Number
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
                  }
                />
              </label>
              <label className="block text-gray-700 mt-4">
                Expiry Date
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })
                  }
                />
              </label>
              <label className="block text-gray-700 mt-4">
                CVC
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, cvc: e.target.value })
                  }
                />
              </label>
            </div>
          )}

          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4">Total Amount</h2>
            <p className="text-xl">${state.total.toFixed(2)}</p>
          </div>

          <button
            onClick={handlePayment}
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </>
  );
}
