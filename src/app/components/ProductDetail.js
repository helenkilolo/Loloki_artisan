// /components/ProductDetail.js
import Image from 'next/image';

export default function ProductDetail({ product }) {
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
          <button className="bg-orange-500 text-white py-2 px-4 rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
