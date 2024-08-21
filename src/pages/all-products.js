import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import "../fontawesome";
import "../app/globals.css";
import Header from "../app/components/header";
import Footer from "../app/components/footer";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/products?category=${category}&sort=${sort}`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [category, sort]);

  return (
    <>
      <Head>
        <title>All Products - Loloki Africa</title>
        <meta name="description" content="Browse all products available on Loloki Africa." />
      </Head>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>
        <div className="flex space-x-4 mb-8">
          {/* Category Filter */}
          <select onChange={(e) => setCategory(e.target.value)} className="border rounded p-2">
            <option value="">All Categories</option>
            <option value="Women">Women</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Fabrics">Fabrics</option>
            <option value="Men">Men</option>
            <option value="Art and Decor">Art and Decor</option>
            <option value="Bags">Bags</option>
            <option value="Accessories">Accessories</option>
            <option value="Beauty and Hair">Beauty and Hair</option>
            <option value="Kids">Kids</option>
            <option value="Shoes">Shoes</option>
          </select>

          {/* Sort Options */}
          <select onChange={(e) => setSort(e.target.value)} className="border rounded p-2">
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product._id} className="product-card p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>Category: {product.category}</p>
              <p>Price: ${product.amount}</p>
              <Image 
                src={product.image} 
                alt={product.name} 
                width={500} 
                height={500} 
                className="w-full h-auto"
              />

              <Link href={`/products/${product._id}`} className="text-orange-500 hover:underline">
                View Product
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


