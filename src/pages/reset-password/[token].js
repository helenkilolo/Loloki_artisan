// /pages/reset-password/[token].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      const res = await fetch(`/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        router.push('/SignIn');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600">
              Reset Password
            </button>
          </form>
          {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
}
