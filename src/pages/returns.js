import Header from '../app/components/header';
import Footer from '../app/components/footer';

export default function Returns() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Returns and Refunds</h1>
        <p className="mb-4">
          Our goal is to ensure you are completely satisfied with your purchase. If you're not entirely happy with your purchase, we're here to help.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
        <p className="mb-4">
          You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it.
        </p>
        {/* Add more details as needed */}
      </div>
      <Footer />
    </>
  );
}

