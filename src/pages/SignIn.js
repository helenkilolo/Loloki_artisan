import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ForgotPasswordForm from '../app/components/ForgotPasswordForm'; // Import the form component
import "../fontawesome";
import "../app/globals.css";
import Header from "../app/components/header"; // Correct path
import Footer from "../app/components/footer"; // Correct path

const SignIn = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleClose = () => {
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
      <div className="absolute inset-0">
        <Image
          src="/images/signup2.jpg"
          fill={true} 
          style={{ objectFit: 'cover' }} 
          alt="Background Image"
        />
        <div className="absolute inset-0 bg-white bg-opacity-75"></div>
      </div>
      <div className="relative bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Sign In to Your Account</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="text-orange-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600">
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link href="/SignUp" legacyBehavior>
            <a className="text-orange-500 hover:underline">Sign up here</a>
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && <ForgotPasswordForm onClose={handleClose} />}
    </div>
  );
};

export default SignIn;





