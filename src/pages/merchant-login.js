import Header from '../app/components/header';
import Footer from '../app/components/footer';

export default function MerchantLogin() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Merchant Login</h1>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
            <input type="email" id="email" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
            <input type="password" id="password" className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
          </div>
          <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-lg">Login</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
