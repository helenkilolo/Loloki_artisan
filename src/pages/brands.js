import { MongoClient } from 'mongodb';
import Link from 'next/link';
import Head from 'next/head';
import "../fontawesome";
import "../app/globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Header from "../app/components/header"; // Correct path
import Footer from "../app/components/footer"; // Correct path

export async function getServerSideProps() {
  let brands = [];

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const brandsCollection = db.collection('brands');
    brands = await brandsCollection.find().toArray();
    client.close();
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }

  return {
    props: {
      brands: brands.map(brand => ({
        id: brand._id.toString(),
        name: brand.name,
        country: brand.country,
        products: brand.products,
      })),
    },
  };
}

export default function BrandsPage({ brands }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Discover African Brands - Loloki Africa</title>
        <meta name="description" content="Explore and shop from a diverse selection of African brands on Loloki Africa. Discover unique products and support local artisans." />
      </Head>
      <Header />
      <h1 className="text-4xl font-bold mb-8">Discover African Brands</h1>
      {brands.length === 0 ? (
        <p>No brands available at the moment. Please check back later.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map(brand => (
            <div key={brand.id} className="brand-card p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold">{brand.name}</h2>
              <p>{brand.country}</p>
              <p>{brand.products.length} Products</p>
              <Link href={`/brand/${brand.id}`}>
                <a className="text-orange-500 hover:underline">View Shop</a>
              </Link>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

