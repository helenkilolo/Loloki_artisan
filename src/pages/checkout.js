import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../app/components/header';
import Footer from '../app/components/footer';

export default function Checkout() {
  const { cart } = useCart();
  const [paymentDetails, setPaymentDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(''); // To track selected payment method
  const router = useRouter();

  const handlePayment = async () => {
    if (paymentMethod === 'mpesa') {
      // Handle MPesa payment process
      console.log('Processing MPesa payment...', paymentDetails, cart);
      // Integrate MPesa API here
    } else if (paymentMethod === 'stripe') {
      // Handle Stripe payment process
      console.log('Processing Stripe payment...', paymentDetails, cart);
      // Integrate Stripe API here
    } else {
      alert('Please select a payment method.');
      return;
    }
    
    // Simulate order saving and redirection to order confirmation
    console.log('Payment Details:', paymentDetails, cart);
    router.push('/order-confirmation');
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
