// src/pages/register.js

import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();
    // Perform validation or save the data
    router.push('/merchant-login'); // Redirect to the next step page
  };

  return (
    <>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Merchant Registration</h1>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="businessName" className="block text-lg font-semibold mb-2">Business Name</label>
            <input type="text" id="businessName" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-lg font-semibold mb-2">Phone Number</label>
            <input type="tel" id="phoneNumber" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
            <input type="email" id="email" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-lg font-semibold mb-2">Address</label>
            <input type="text" id="address" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
            <input type="password" id="password" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
          </div>
          <div className="mb-8">
            <label htmlFor="confirmPassword" className="block text-lg font-semibold mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
          </div>
          <button 
            type="button" 
            onClick={handleNext} 
            className="bg-orange-500 text-white py-2 px-4 rounded-lg w-full hover:bg-orange-600"
          >
            Next
          </button>
        </form>
      </div>
    </>
  );
}

