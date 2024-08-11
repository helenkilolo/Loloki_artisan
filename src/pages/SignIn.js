import Link from 'next/link';
import Image from 'next/image';
import Head from "next/head";
import "../app/globals.css"
import Header from '../app/components/header';


const SignIn = () => {
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
      <div className="relative bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Join Our Artisan Marketplace!</h2>
        <p className="text-center text-gray-600 mb-8">
          Discover unique African art pieces.
        </p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
            />
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
    </div>
  );
};

export default SignIn;



