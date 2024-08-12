import { MongoClient } from 'mongodb';
import { useState } from 'react';
import Link from 'next/link';
import ProductGrid from '../app/components/ProductGrid';
import ProductFilters from '../app/components/ProductFilters';
import Header from '../app/components/header'; // Import Header
import Footer from '../app/components/footer'; // Import Footer

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const productsCollection = db.collection('products');

  // Fetch products in the 'Jewelry' category
  const products = await productsCollection.find({ category: 'Jewelry' }).toArray();
  client.close();

  return {
    props: {
      initialProducts: products.map(product => ({
        id: product._id.toString(),
        name: product.name,
        category: product.category,
        price: product.amount,
        image: product.image,
      })),
      categories: ['Necklaces', 'Bracelets', 'Earrings'], // Example subcategories
    },
  };
}

export default function JewelryPage({ initialProducts, categories }) {
  const [products, setProducts] = useState(initialProducts);

  const handleFilter = async (filters) => {
    const res = await fetch(`/api/products?category=${filters.category}&priceRange=${filters.priceRange}`);
    const data = await res.json();
    setProducts(data);
  };

  return (
    <>
      <Header /> {/* Include Header */}
      <div className="container mx-auto flex">
        <ProductFilters categories={categories} onFilter={handleFilter} />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-8">Jewelry</h1>
          <ProductGrid products={products} />
        </div>
      </div>
      <Footer /> {/* Include Footer */}
    </>
  );
}