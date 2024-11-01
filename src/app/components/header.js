import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios'; // Import axios for API requests
import "../globals.css";
import { useAuth } from '../../context/authContext';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { state } = useCart();
  const { user, setUser } = useAuth();  // Ensure setUser is available from useAuth
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.log('User not logged in:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser]); // Depend on setUser to avoid re-fetching unnecessarily

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true,
      });
      localStorage.removeItem('token');
      setUser(null); // Update the user state to null
      await router.push('/'); // Wait for the navigation to complete
      router.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  
  if (loading) return <p>Loading...</p>;  // Handle the loading state

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Image src="/images/kenya.png" alt="Location" width={16} height={16} className="h-4 w-4 mr-1" />
              <span>Location: KE</span>
            </div>
            <div className="flex items-center">
              <Image src="/images/ukflag.jpeg" alt="Language" width={16} height={16} className="h-4 w-4 mr-1" />
              <span>Language: EN</span>
            </div>
            <div className="flex items-center">
              <span>Currency: KES</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            {user ? (
              <>
                <span className="text-gray-700">Welcome, {user.firstName || 'User'}!</span>
                <button 
                  onClick={handleLogout} 
                  className="hover:text-orange-500"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link href="/SignIn" legacyBehavior>
                  <a className="hover:text-orange-500">Sign In</a>
                </Link>
                <span>|</span>
                <Link href="/SignUp" legacyBehavior>
                  <a className="hover:text-orange-500">Create an Account</a>
                </Link>
              </>
            )}
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
            <a className="relative">
              <FontAwesomeIcon icon={faShoppingCart} size="2x" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartItemCount}
                </span>
              )}
            </a>
          </Link>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="container mx-auto flex justify-center space-x-4 py-4 flex-wrap">
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