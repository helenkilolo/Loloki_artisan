import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import "../fontawesome";
import "../app/globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Header from "../app/components/header"; // Correct path
import Footer from "../app/components/footer"; // Correct path

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('South Africa');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation checks (e.g., password match)
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // Send user data to backend for registration
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        surname,
        email,
        password,
        phoneNumber,
        country
      });

      if (response.status === 201) {
        // If registration is successful, show welcome message and redirect to login or homepage
        setWelcomeMessage(`Welcome ${firstName} ${surname}!`);
        setTimeout(() => {
          router.push('/');  // Redirect to sign-in page
        }, 2000); // Optional delay for user to see the message
      }
    } catch (error) {
      // Handle errors
      console.error('Error during sign-up:', error);
      setErrorMessage('An error occurred during sign-up. Please try again.');
    }
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
      <div className="relative bg-white p-8 rounded shadow-md w-full max-w-4xl flex">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4">Create New Account</h2>
          {welcomeMessage ? (
            <div className="text-2xl font-semibold text-green-600 mb-4">
              {welcomeMessage}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Surname</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </div>
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
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Country</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option>South Africa</option>
                  <option>Kenya</option>
                  <option>Nigeria</option>
                  <option>Ghana</option>
                </select>
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
              {errorMessage && (
                <div className="text-red-500 mb-4">
                  {errorMessage}
                </div>
              )}
              <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600">
                Create an Account
              </button>
            </form>
          )}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link href="/SignIn" legacyBehavior>
              <a className="text-orange-500 hover:underline">Sign in here</a>
            </Link>
          </p>
        </div>
        <div className="hidden md:block md:w-1/2 p-8">
          <Image
            src="/images/signup.jpg"
            alt="Create Your Account"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;



