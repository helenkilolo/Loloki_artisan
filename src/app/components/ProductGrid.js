// /components/ProductGrid.js
import Link from 'next/link';
import Image from 'next/image';

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map(product => (
        <div key={product._id} className="product-card border rounded-lg overflow-hidden shadow-sm">
          <Link href={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              layout="responsive"
              objectFit="cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}


