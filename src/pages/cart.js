import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useEffect } from 'react';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import CartItem from '../components/CartItem';

export default function CartPage() {
  const { cart, dispatch } = useCart();

  // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Load the cart from localStorage on first render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: savedCart });
    }
  }, [dispatch]);

  const increaseQuantity = (id) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { id } });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { id } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} width={50} height={50} className="rounded" />
                  <span className="text-lg">{item.name}</span>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span className="text-lg">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
                <span className="text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <button onClick={clearCart} className="bg-red-500 text-white py-2 px-4 rounded">
                Clear Cart
              </button>
              <Link href="/checkout">
                <a className="bg-green-500 text-white py-2 px-4 rounded">Proceed to Checkout</a>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

