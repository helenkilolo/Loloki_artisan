import { useCart } from '../../context/CartContext';
import Image from 'next/image'; // Ensure you have imported Image if you're using images in your CartItem

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  const updateQuantity = (quantity) => {
    // Ensure quantity is a number
    const parsedQuantity = parseInt(quantity, 10);
    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { id: item.id, quantity: parsedQuantity },
      });
    }
  };

  const removeFromCart = (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id },
    });
  };

  return (
    <div className="cart-item">
      <h2>{item.name}</h2>
      <p>${item.price.toFixed(2)}</p> {/* Ensure price is displayed correctly */}
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => updateQuantity(e.target.value)}
        min="1"
      />
      <button onClick={() => removeFromCart(item.id)} className="text-red-500">
        Remove
      </button>
    </div>
  );
}

