import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, dispatch } = useCart();

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} width={50} height={50} />
                  <span className="ml-4">{item.name}</span>
                </div>
                <span>${item.price}</span>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
            <button onClick={clearCart} className="bg-red-500 text-white py-2 px-4 rounded mt-4">
              Clear Cart
            </button>
            <Link href="/checkout">
              <a className="bg-green-500 text-white py-2 px-4 rounded ml-4">Proceed to Checkout</a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
