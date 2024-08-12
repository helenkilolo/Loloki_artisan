import Link from 'next/link';
import Image from 'next/image';
import "../globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-orange-300 text-black font-poppins">
      {/* Newsletter Signup */}
      <div className="py-8">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">Stay Updated with Loloki Africa</h3>
          <p className="mb-6">Sign up for our newsletter to receive the latest news and offers.</p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full max-w-sm p-2 rounded-l-lg focus:outline-none"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-800">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            <li><Link href="/SignIn">Login</Link></li>
            <li><Link href="/orders">My Orders</Link></li>
            <li><Link href="/returns">Returns and Refunds</Link></li>
            <li><Link href="/shipping">Shipping Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Sell With Us</h4>
          <ul className="space-y-2">
            <li><Link href="/merchant-login">Merchant Login</Link></li>
            <li><Link href="/register">Merchant Registration</Link></li>
            <li><Link href="/training">Merchant Training</Link></li>
            <li><Link href="/marketplace">The Marketplace</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">About</h4>
          <ul className="space-y-2">
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <Link href="https://facebook.com">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </Link>
            <Link href="https://twitter.com">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </Link>
            <Link href="https://instagram.com">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </Link>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">Contact Us</p>
            <p>hello@loloki.com</p>
            <p>Nairobi, Kenya</p>
          </div>
        </div>
      </div>

      {/* Partners and Payment Methods */}
      <div className="bg-black text-white py-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Image src="/images/dhl.png" alt="DHL" width={100} height={50} />
            <Image src="/images/alx.jpeg" alt="alx" width={100} height={50} />
          </div>
          <div className="text-sm">
            <p>&copy; 2024 Loloki Africa. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Image src="/images/mpesa.png" alt="MPesa" width={50} height={30} />
            <Image src="/images/stripe.png" alt="Stripe" width={50} height={30} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



