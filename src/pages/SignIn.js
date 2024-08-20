import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Import axios for HTTP requests
import Link from 'next/link';
import Image from 'next/image';
import ForgotPasswordForm from '../app/components/ForgotPasswordForm'; // Import the form component
import "../fontawesome";
import "../app/globals.css";
import Header from "../app/components/header"; // Correct path
import Footer from "../app/components/footer"; // Correct path

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Send login data to backend
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);

        // Redirect to homepage
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Invalid email or password');
    }
  };

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
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="text-orange-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600">
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don&apos;t have an account?{' '}
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












