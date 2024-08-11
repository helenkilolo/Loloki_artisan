import Link from 'next/link';
import Image from 'next/image';
import "../fontawesome";
import "./globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Header from './components/header';
import Footer from "./components/footer";

const HomePage = () => {
  return (
    <div className="font-poppins bg-primary-500 min-h-screen">
      {/* First Section */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/artisan.jpg"
            alt="Artisan working on a product"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold mb-4 text-black">Discover African Culture</h1>
          <p className="text-lg mb-6 text-white">
            Explore unique African art and products from talented artisans on Loloki's artisan marketplace. Immerse yourself in the beauty and craftsmanship of Africa's diverse cultures right from your home.
          </p>
          <Link href="/shop">
            <span className="bg-black text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-800">
              Shop Now
            </span>
          </Link>
        </div>
      </div>

      {/* Second Section */}
      <div className="bg-orange-500 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-4 text-black">
              Exploring African Culture Through Loloki's Artisan Marketplace
            </h2>
            <p className="text-lg mb-6 text-black">
              Immerse yourself in the beauty of African craftsmanship and creativity as you explore the diverse selection on Loloki's platform.
            </p>
            <div>
              <h3 className="text-2xl font-semibold text-black">Artisan Treasures Await</h3>
              <p className="text-black">
                Discover unique African art and products curated with care to bring the essence of Africa right to your home.
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-black">Cultural Richness Showcased</h3>
              <p className="text-black">
                Embrace the diverse colors and rich cultural heritage of Africa with every handmade piece from Loloki's marketplace.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src="/images/second_image.jpg"
              alt="Artisan working on a product"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className="bg-orange-500 py-16">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-8 text-black">Discover African Art and Products Here</h2>
  </div>
  <div className="w-full mx-auto max-w-screen-xl">
    <Image
      src="/images/third_image.jpg" // Replace with the actual path to your image
      alt="Banner showcasing African art"
      width={1920}
      height={600}
      className="object-cover rounded-lg"
    />
  </div>
  <div className="container mx-auto flex flex-col md:flex-row items-start justify-around py-8">
    <div className="w-full md:w-1/3 p-4 text-center">
      <h3 className="text-xl font-semibold text-black">Crafts</h3>
      <p className="text-black">
        Explore a vibrant collection of African crafts, jewelry, and textiles handmade by talented artisans. Each piece tells a unique story of culture and tradition.
      </p>
    </div>
    <div className="w-full md:w-1/3 p-4 text-center">
      <h3 className="text-xl font-semibold text-black">Art</h3>
      <p className="text-black">
        Delve into our exquisite selection of African artwork, including paintings, sculptures, and pottery that showcase the rich heritage and creativity of the continent.
      </p>
    </div>
    <div className="w-full md:w-1/3 p-4 text-center">
      <h3 className="text-xl font-semibold text-black">Products</h3>
      <p className="text-black">
        Experience the essence of Africa with our diverse range of authentic products, from traditional clothing and accessories to home decor items that reflect the beauty of the region.
      </p>
    </div>
  </div>
</div>



      {/* Fourth Section */}
      <div className="bg-orange-500 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-4 text-black">Discover Authentic African Art</h2>
            <p className="text-lg mb-6 text-black">
              Browse our curated collection of African art and products, showcasing the beauty and craftsmanship of the continent. Find unique pieces to adorn your space or gift to a loved one.
            </p>
            <Link href="/shop">
              <span className="bg-black text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-800">
                Shop Now
              </span>
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src="/images/fourth_image.jpg"
              alt="African Art"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Fifth Section */}
      <div className="bg-orange-500 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/fifth_image.jpeg"
              alt="African Treasures"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-4 text-black">Discover African Treasures</h2>
            <p className="text-lg mb-6 text-black">
              Immerse yourself in the rich culture of Africa with our handcrafted art and products, each piece telling a unique story of tradition and craftsmanship.
            </p>
            <Link href="/shop">
              <span className="bg-black text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-800">
                Shop Now
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Sixth Section - Testimonials */}
      <div className="bg-orange-500 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">Customers Love Loloki's African Art Collection</h2>
          <p className="text-lg mb-8 text-black">See What They Say</p>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="w-full md:w-1/3 p-4">
              <Image
                src="/images/customer1.jpeg" // Replace with actual customer image
                alt="Customer Ariadne Snyder"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <p className="text-black mb-2">"The craftsmanship and quality of the African art pieces from Loloki are truly exceptional. I am thrilled with my purchase and will definitely be a returning customer!"</p>
              <p className="text-black font-bold">- Ariadne Snyder</p>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <Image
                src="/images/customer2.jpeg" // Replace with actual customer image
                alt="Customer Lillian Pratt"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <p className="text-black mb-2">"As a collector of African art, I can confidently say that Loloki offers a unique selection of products that are both authentic and beautiful. Highly recommend!"</p>
              <p className="text-black font-bold">- Lillian Pratt</p>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <Image
                src="/images/customer3.jpeg" // Replace with actual customer image
                alt="Customer Kian Graham"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <p className="text-black mb-2">"I have had an amazing experience shopping on Loloki's website. The customer service was top-notch, and my order arrived promptly and in perfect condition. Thank you, Loloki!"</p>
              <p className="text-black font-bold">- Kian Graham</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Section - Contact */}
        <div className="bg-orange-500 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-4 text-black">Explore more</h2>
            <p className="text-lg text-black">123 Anywhere St.<br />Any City, St 12345</p>
            <p className="text-lg text-black">(123) 456-7890<br />hello@reallygreatsite.com</p>
            <h3 className="text-xl font-semibold mt-4 text-black">Business Hours</h3>
            <p className="text-black">Monday, Wednesday & Friday: 9:00 am to 5:00 pm</p>
            <p className="text-black">Tuesday, Thursday & Saturday: 8:00 am to 4:00 pm</p>
            <p className="text-black">Closed on Sundays</p>
            <h3 className="text-xl font-semibold mt-4 text-black">Get Social</h3>
            <div className="flex space-x-4 text-black">
            <Link href="https://facebook.com" legacyBehavior>
              <a> 
              <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
            </Link>
            <Link href="https://twitter.com" legacyBehavior>
              <a>
              <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </Link>
            <Link href="https://instagram.com" legacyBehavior>
              <a>
              <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src="/images/final_image.jpg" // Replace with the actual path to your image
              alt="Explore more"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


