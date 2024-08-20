import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  const updateQuantity = (quantity) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { id: item.id, quantity },
    });
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
      <p>{item.price}</p>
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
