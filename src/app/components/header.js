import Image from 'next/image';
import Link from 'next/link';
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

        {/* Navigation Links */}
        <nav className="flex items-center space-x-8">
          <Link href="/brands" legacyBehavior>
            <a className="hover:text-orange-500">BRANDS</a>
          </Link>
          <Link href="/women" legacyBehavior>
            <a className="hover:text-orange-500">WOMEN</a>
          </Link>
          <Link href="/men" legacyBehavior>
            <a className="hover:text-orange-500">MEN</a>
          </Link>
          <Link href="/art-decor" legacyBehavior>
            <a className="hover:text-orange-500">ART & DECOR</a>
          </Link>
          <Link href="/sell-with-us" legacyBehavior>
            <a className="hover:text-orange-500 font-semibold">SELL WITH US</a>
          </Link>
        </nav>

        {/* Search and Cart Icons */}
        <div className="flex items-center space-x-4">
          <Link href="/search" legacyBehavior>
            <a className="hover:text-orange-500">
            <FontAwesomeIcon icon={faSearch} size="lg" />
            </a>
          </Link>
          <Link href="/cart" legacyBehavior>
            <a className="hover:text-orange-500">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;