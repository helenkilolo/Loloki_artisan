import Header from '../app/components/header';
import Footer from '../app/components/footer';

export default function Careers() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Careers</h1>
        <p className="mb-4">
          Join our team and help us build the future of online marketplaces. Explore our current job openings below.
        </p>
        {/* List current job openings */}
      </div>
      <Footer />
    </>
  );
}
