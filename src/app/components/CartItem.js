import React from 'react';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-20">
          <Image
            src={item.imageUrl || '/placeholder.svg'}
            alt={item.name}
            width={80}
            height={80}
            className="h-24 object-cover rounded"
          />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{item.name}</span>
          <button 
            onClick={() => removeFromCart(item.id)}
            className="font-semibold hover:text-red-500 text-gray-500 text-xs flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Remove
          </button>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="text-gray-600 hover:text-primary focus:outline-none"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input 
          className="mx-2 border text-center w-12"
          type="text"
          value={item.quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value)) {
              handleQuantityChange(value);
            }
          }}
        />
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="text-gray-600 hover:text-primary focus:outline-none"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">${item.price.toFixed(2)}</span>
      <span className="text-center w-1/5 font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  );
}

