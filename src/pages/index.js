import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "../fontawesome";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faGlobe, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Header from "../app/components/header";
import Footer from "../app/components/footer";

const heroImages = [
  '/images/africanfab1.jpg',
  '/images/afri16.jpg',
  '/images/afric3.jpg',
  '/images/afric1.jpg',
  '/images/afric2.jpg',
  '/images/afric5.jpg',
  '/images/afric6.jpg',
  '/images/afric17.jpg',
];

const testimonials = [
  {
    text: "The craftsmanship and quality of the African art pieces from Loloki are truly exceptional.",
    name: "Muloko Kyalo",
    image: "/images/customer1.jpeg",
  },
  {
    text: "Loloki offers a unique selection of products that are both authentic and beautiful.",
    name: "Jane Mumbua",
    image: "/images/customer2.jpeg",
  },
  {
    text: "The customer service was top-notch, and my order arrived promptly and in perfect condition.",
    name: "Voevi Nzula",
    image: "/images/customer3.jpeg",
  },
];

const products = [
  {
    name: "Product 1",
    image: "/images/afric1.jpg",
  },
  {
    name: "Product 2",
    image: "/images/afric6.jpg",
  },
  {
    name: "Product 3",
    image: "/images/afric3.jpg",
  },
  {
    name: "Product 4",
    image: "/images/afric2.jpg",
  },
  {
    name: "Product 5",
    image: "/images/afric17.jpg",
  },
  {
    name: "Product 6",
    image: "/images/afric7.jpg",
  },
  {
    name: "Product 6",
    image: "/images/kate1.jpg",
  },
  {
    name: "Product 6",
    image: "/images/afric4.jpg",
  },
];

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prevTestimonial) => (prevTestimonial + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-poppins bg-primary-500 min-h-screen">

      {/* Hero Section with Dynamic Slideshow */}
      <div className="relative w-full h-screen overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image src={image} alt={`Slide ${index}`} fill={true} style={{ objectFit: 'cover' }} />
          </div>
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Discover African Culture</h1>
        </div>
      </div>

      {/* Interactive Features Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-16">
        <div className="group relative">
          <Image
            src="/images/africanfab1.jpg"
            alt="Feature 1"
            fill={true}
            style={{ objectFit: 'cover' }}
            className="rounded-lg group-hover:opacity-75 transition-opacity duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-xl font-bold">Feature 1: Authentic Crafts</p>
          </div>
        </div>
        <div className="group relative">
          <Image
            src="/images/bea1.jpg"
            alt="Feature 2"
            fill={true}
            style={{ objectFit: 'cover' }}
            className="rounded-lg group-hover:opacity-75 transition-opacity duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-xl font-bold">Feature 2: Unique Art</p>
          </div>
        </div>
        <div className="group relative">
          <Image
            src="/images/kate3.jpg"
            alt="Feature 3"
            fill={true}
            style={{ objectFit: 'cover' }}
            className="rounded-lg group-hover:opacity-75 transition-opacity duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-xl font-bold">Feature 3: Cultural Products</p>
          </div>
        </div>
      </div>

      {/* Curated Collections with Hover Effects */}
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-16">
        {products.map((product, index) => (
          <div key={index} className="group relative">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg">{product.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials Slider with User Quotes */}
      <div className="text-center py-16">
        <div className="relative w-full h-64 overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center transition-opacity duration-1000 ${
                index === currentTestimonial ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image src={testimonial.image} alt={testimonial.name} width={150} height={150} className="rounded-full mb-4" />
              <p className="text-black mb-2">&quot;{testimonial.text}&quot;</p>
              <p className="text-black font-bold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Highlight of Unique Selling Points */}
      <div className="container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Loloki?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <FontAwesomeIcon icon={faHandHoldingHeart} size="3x" className="text-orange-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Authentic Products</h3>
            <p className="text-black">Each product is hand-selected to ensure authenticity and quality.</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faGlobe} size="3x" className="text-orange-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Global Reach</h3>
            <p className="text-black">We connect artisans from Africa with buyers worldwide.</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faLeaf} size="3x" className="text-orange-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Eco-Friendly</h3>
            <p className="text-black">Our products are sustainably sourced and environmentally friendly.</p>
          </div>
        </div>
      </div>

      {/* Engaging Call-to-Action Section */}
      <div className="bg-black py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Join Our Artisan Community</h2>
          <p className="text-white mb-8">Ready to discover and support African artisans? Start exploring now.</p>
          <Link href="/sell-with-us" legacyBehavior>
            <a className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-600">
              Get Started
            </a>
          </Link>
        </div>
      </div>

      {/* Contact & Social Media Integration */}
      <div className="bg-gray-800 py-16 text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg">46902 Nairobi, Nairobi City, St Biashara</p>
            <p className="text-lg">(+254) 726-356473</p>
            <p className="text-lg">helenkilolo@gmail.com</p>
            <h3 className="text-xl font-semibold mt-4">Business Hours</h3>
            <p>Monday, Wednesday & Friday: 9:00 am to 5:00 pm</p>
            <p>Tuesday, Thursday & Saturday: 8:00 am to 4:00 pm</p>
            <p>Closed on Sundays</p>
            <h3 className="text-xl font-semibold mt-4">Get Social</h3>
            <div className="flex space-x-4">
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
              src="/images/afric15.jpg"
              alt="Contact Us"
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

