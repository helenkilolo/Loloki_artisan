// /components/ProductDetail.js
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function ProductDetail({ product }) {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-4">${product.price}</p>
          <p className="mb-4">{product.description}</p>
          <button
            onClick={addToCart}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
