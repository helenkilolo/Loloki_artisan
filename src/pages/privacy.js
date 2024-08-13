import Header from '../app/components/header';
import Footer from '../app/components/footer';

export default function Privacy() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="mb-4">
          We value your privacy and are committed to protecting your personal information. Please read our privacy policy to understand how we handle your data.
        </p>
        {/* Add detailed privacy policy */}
      </div>
      <Footer />
    </>
  );
}
