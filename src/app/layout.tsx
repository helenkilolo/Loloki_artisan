"use client"; // This line is essential to ensure that this file is treated as a client component

import { Inter } from "next/font/google";
import "./globals.css";
import "../fontawesome";
import Header from "./components/header";
import Footer from "./components/footer";
import { CartProvider } from '../context/CartContext'; // Ensure this import is correct

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider> {/* Make sure this wraps the entire content */}
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
