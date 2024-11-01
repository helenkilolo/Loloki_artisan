import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import Header from '../app/components/header';
import Footer from '../app/components/footer';

export default function CartPage() {
  const { state, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      savedCart.forEach(item => {
        // Check if the item already exists in the cart to prevent duplication
        if (!state.items.find(existingItem => existingItem.id === item.id)) {
          addToCart(item);
        }
      });
    }
  }, [addToCart, state.items]);
  

  const increaseQuantity = (id) => {
    const item = state.items.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decreaseQuantity = (id) => {
    const item = state.items.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {state.items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🛒</p>
            <p className="mt-4 text-xl text-gray-600">Your cart is empty</p>
            <Link href="/" className="mt-8 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {state.items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center border-b pb-4">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <Image 
                    src={item.imageUrl || '/placeholder.svg'} 
                    alt={item.name} 
                    width={80} 
                    height={80} 
                    className="rounded object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => decreaseQuantity(item.id)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
                    -
                  </button>
                  <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
                    +
                  </button>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <span className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition duration-200">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-4">
              <h2 className="text-2xl font-bold mb-4 sm:mb-0">Total: ${state.total.toFixed(2)}</h2>
              <div className="flex space-x-4">
                <button onClick={clearCart} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200">
                  Clear Cart
                </button>
                <Link href="/checkout" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}