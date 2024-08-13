import Header from '../app/components/header';
import Footer from '../app/components/footer';

export default function Shipping() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
        <p className="mb-4">
          We are committed to delivering your order accurately, in good condition, and on time.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Domestic Shipping</h2>
        <p className="mb-4">
          We offer free shipping on all domestic orders over $50. Orders under $50 are subject to a flat shipping rate of $5.
        </p>
        {/* Add more details as needed */}
      </div>
      <Footer />
    </>
  );
}
