import Header from '../app/components/header';
import Footer from '../app/components/footer';

export default function AboutUs() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <p className="mb-4">
          Our mission is to connect you with the finest artisans and merchants, providing you with access to unique products that reflect the rich cultural heritage of various communities.
        </p>
        {/* Add more details about the company’s history, mission, and vision */}
      </div>
      <Footer />
    </>
  );
}
