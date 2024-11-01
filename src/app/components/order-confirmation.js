// src/app/order-confirmation.tsx
import Link from 'next/link';
import Image from 'next/image';
import "../globals.css";
import Header from '../components/header';
import Footer from '../components/footer';

export default function OrderConfirmation() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Order Confirmation</h1>
        <p className="text-xl">Thank you for your purchase!</p>
        <p>Your order has been placed successfully.</p>
        <p>We will send you a confirmation email with the details of your order.</p>
      </div>
      <Footer />
    </>
  );
}
