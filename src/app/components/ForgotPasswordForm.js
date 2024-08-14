// /components/ForgotPasswordForm.js
import { useState } from 'react';

export default function ForgotPasswordForm({ onClose }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission, e.g., send email to API
    console.log('Forgot Password email:', email);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600"
          >
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
