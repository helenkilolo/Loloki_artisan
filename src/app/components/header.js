import Link from 'next/link';
import Image from 'next/image';
import "../globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Location, Language, Currency */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <img src="/images/kenya.png" alt="Location" className="h-4 w-4 mr-1" />
              <span>Location: KE</span>
            </div>
            <div className="flex items-center">
              <img src="/images/ukflag.jpeg" alt="Language" className="h-4 w-4 mr-1" />
              <span>Language: EN</span>
            </div>
            <div className="flex items-center">
              <span>Currency: KES</span>
            </div>
          </div>
          {/* Sign In / Create Account */}
          <div className="flex items-center space-x-4 text-sm">
            <Link href="/SignIn" legacyBehavior>
              <a className="hover:text-orange-500">Sign In</a>
            </Link>
            <span>|</span>
            <Link href="/SignUp" legacyBehavior>
              <a className="hover:text-orange-500">Create an Account</a>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <Link href="/" legacyBehavior>
          <a className="flex items-center space-x-2">
            <Image src="/images/logo_drum.jpg" alt="Logo" width={100} height={100} />
            <span className="text-2xl font-bold text-black">Loloki Africa</span>
          </a>
        </Link>

        {/* Search Bar and "Sell with Us" */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <Link href="/sell-with-us" legacyBehavior>
            <a className="hover:text-orange-500 font-semibold">SELL WITH US</a>
          </Link>
          <Link href="/cart" legacyBehavior>
            <a className="hover:text-orange-500">
              <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            </a>
          </Link>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="container mx-auto flex justify-center space-x-8 py-4">
        <Link href="/all-products" legacyBehavior>
          <a className="hover:text-orange-500">All products</a>
        </Link>
        <Link href="/women" legacyBehavior>
          <a className="hover:text-orange-500">Women</a>
        </Link>
        <Link href="/jewelry" legacyBehavior>
          <a className="hover:text-orange-500">Jewelry</a>
        </Link>
        <Link href="/fabrics" legacyBehavior>
          <a className="hover:text-orange-500">Fabrics</a>
        </Link>
        <Link href="/men" legacyBehavior>
          <a className="hover:text-orange-500">Men</a>
        </Link>
        <Link href="/art-decor" legacyBehavior>
          <a className="hover:text-orange-500">Art & Decor</a>
        </Link>
        <Link href="/bags" legacyBehavior>
          <a className="hover:text-orange-500">Bags</a>
        </Link>
        <Link href="/accessories" legacyBehavior>
          <a className="hover:text-orange-500">Accessories</a>
        </Link>
        <Link href="/beauty-hair" legacyBehavior>
          <a className="hover:text-orange-500">Beauty & Hair</a>
        </Link>
        <Link href="/kids" legacyBehavior>
          <a className="hover:text-orange-500">Kids</a>
        </Link>
        <Link href="/shoes" legacyBehavior>
          <a className="hover:text-orange-500">Shoes</a>
        </Link>
        <Link href="/reviews" legacyBehavior>
          <a className="hover:text-orange-500">Reviews</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;

