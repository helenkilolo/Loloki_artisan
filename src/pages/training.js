import Header from '../app/components/header';
import Footer from '../app/components/footer';

export default function Training() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Merchant Training</h1>
        <p className="mb-4">
          We provide extensive training resources to help you succeed in our marketplace.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Available Training Programs</h2>
        <ul className="list-disc pl-5">
          <li>How to set up your shop</li>
          <li>Marketing strategies for your products</li>
          <li>Understanding our platform's tools and features</li>
        </ul>
        {/* Add more details as needed */}
      </div>
      <Footer />
    </>
  );
}
