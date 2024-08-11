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
            <li><Link href="/SignIn" legacyBehavior><a className="hover:underline">Login</a></Link></li>
            <li><Link href="/orders" legacyBehavior><a className="hover:underline">My Orders</a></Link></li>
            <li><Link href="/returns" legacyBehavior><a className="hover:underline">Returns and Refunds</a></Link></li>
            <li><Link href="/shipping" legacyBehavior><a className="hover:underline">Shipping Policy</a></Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Sell With Us</h4>
          <ul className="space-y-2">
            <li><Link href="/merchant-login" legacyBehavior><a className="hover:underline">Merchant Login</a></Link></li>
            <li><Link href="/register" legacyBehavior><a className="hover:underline">Merchant Registration</a></Link></li>
            <li><Link href="/training" legacyBehavior><a className="hover:underline">Merchant Training</a></Link></li>
            <li><Link href="/marketplace" legacyBehavior><a className="hover:underline">The Marketplace</a></Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">About</h4>
          <ul className="space-y-2">
            <li><Link href="/about-us" legacyBehavior><a className="hover:underline">About Us</a></Link></li>
            <li><Link href="/careers" legacyBehavior><a className="hover:underline">Careers</a></Link></li>
            <li><Link href="/terms" legacyBehavior><a className="hover:underline">Terms & Conditions</a></Link></li>
            <li><Link href="/privacy" legacyBehavior><a className="hover:underline">Privacy Policy</a></Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" legacyBehavior>
              <a className="text-black hover:text-white">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
            </Link>
            <Link href="https://twitter.com" legacyBehavior>
              <a className="text-black hover:text-white">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </Link>
            <Link href="https://instagram.com" legacyBehavior>
              <a className="text-black hover:text-white">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
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
