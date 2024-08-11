import Link from 'next/link';
import Image from 'next/image';
import Head from "next/head";
import "../app/globals.css"
import Header from '../app/components/header';


const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
      <div className="absolute inset-0">
        <Image
          src="/images/signup2.jpg"
          fill={true} // Updated from layout="fill"
          style={{ objectFit: 'cover' }} // Updated from objectFit="cover"
          alt="Background Image"
        />
        <div className="absolute inset-0 bg-white bg-opacity-75"></div>
      </div>
      <div className="relative bg-white p-8 rounded shadow-md w-full max-w-4xl flex">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4">Create New Account</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Surname</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Country</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500">
                <option>South Africa</option>
                <option>Kenya</option>
                <option>Nigeria</option>
                <option>Ghana</option>
                {/* Add more countries as needed */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                <input type="checkbox" className="mr-2 leading-tight" />
                I agree to the terms and conditions and the privacy policy
              </label>
            </div>
            <div className="mb-4">
              <div className="g-recaptcha" data-sitekey="your-site-key"></div>
            </div>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600">
              Create an Account
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link href="/SignIn" legacyBehavior>
              <a className="text-orange-500 hover:underline">Sign in here</a>
            </Link>
          </p>
        </div>
        <div className="hidden md:block md:w-1/2 p-8">
          <Image
            src="/images/signup.jpg" // Update with your image path
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
