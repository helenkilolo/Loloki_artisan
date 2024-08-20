import Link from 'next/link';
import Image from 'next/image';
import Header from '../app/components/header';
import Footer from '../app/components/footer';

const SellWithUs = () => {
  return (
    <div className="min-h-screen bg-orange-300 flex flex-col items-center text-black">
      
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center py-20 bg-cover bg-center relative" style={{ backgroundImage: "url('/images/sellwithus-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">Sell With Us</h1>
          <p className="text-xl text-white mb-6">Join our platform and reach thousands of customers.</p>
          <Link href="/register" legacyBehavior>
            <a className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold text-lg">Get Started</a>
          </Link>
        </div>
      </section>

      {/* Why Sell With Us Section */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Why Sell With Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <i className="fas fa-chart-line text-orange-500 text-5xl mb-4"></i>
            <h3 className="text-2xl font-semibold mb-2">Expand Your Reach</h3>
            <p>Access a large customer base and boost your sales.</p>
          </div>
          <div className="text-center">
            <i className="fas fa-shipping-fast text-orange-500 text-5xl mb-4"></i>
            <h3 className="text-2xl font-semibold mb-2">Easy Shipping</h3>
            <p>We handle the logistics so you can focus on your business.</p>
          </div>
          <div className="text-center">
            <i className="fas fa-money-bill-wave text-orange-500 text-5xl mb-4"></i>
            <h3 className="text-2xl font-semibold mb-2">Competitive Fees</h3>
            <p>Enjoy low transaction fees and transparent pricing.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 px-8">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Image src="/images/register.jpg" alt="Register" width={300} height={200} className="rounded-lg mx-auto mb-4"/>
            <h3 className="text-2xl font-semibold mb-2">1. Register</h3>
            <p>Create your account and set up your store in minutes.</p>
          </div>
          <div className="text-center">
            <Image src="/images/upload-products.jpg" alt="Upload Products" width={300} height={200} className="rounded-lg mx-auto mb-4"/>
            <h3 className="text-2xl font-semibold mb-2">2. Upload Products</h3>
            <p>List your products with detailed descriptions and photos.</p>
          </div>
          <div className="text-center">
            <Image src="/images/start-selling.jpg" alt="Start Selling" width={300} height={200} className="rounded-lg mx-auto mb-4"/>
            <h3 className="text-2xl font-semibold mb-2">3. Start Selling</h3>
            <p>Start receiving orders and grow your business.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Sellers Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-xl mb-4">&quot;Selling on this platform has significantly boosted my business. The process is seamless and the support team is always there to help.&quot;</p>
            <p className="font-semibold text-orange-500">&mdash; John Doe, Artisan</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-xl mb-4">&quot;I love how easy it is to manage my store and track my sales. The platform has helped me reach new customers every day.&quot;</p>
            <p className="font-semibold text-orange-500">&mdash; Jane Smith, Designer</p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-gray-100 py-16 px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">How much does it cost to sell?</h3>
            <p>We charge a small transaction fee on each sale. There are no upfront costs to join.</p>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">How do I get paid?</h3>
            <p>Payments are processed securely and transferred directly to your bank account.</p>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Can I sell internationally?</h3>
            <p>Yes, our platform supports international shipping and payments.</p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Ready to Join Us?</h2>
        <Link href="/register" legacyBehavior>
          <a className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg font-semibold text-lg">Apply Now</a>
        </Link>
      </section>

    </div>
  );
};

export default SellWithUs;

