// /pages/ResetPassword.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from "../app/components/header";
import Footer from "../app/components/footer";

const ResetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: router.query.token,
          newPassword: password,
        }),
      });

      if (res.ok) {
        router.push('/SignIn');
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
      <Header />
      <div className="relative bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Reset Password</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600">
            Reset Password
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
