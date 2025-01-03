"use client";

import { Inter } from "next/font/google";
import "../app/globals.css"; 
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import '../fontawesome';
import { CartProvider } from '../context/CartContext'; 
import { UserProvider } from '../context/UserContext'; 
import { AuthProvider } from '../context/authContext'; // Import AuthProvider

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider> {/* Wrap everything in AuthProvider */}
      <UserProvider>
        <CartProvider>
          <div className={inter.className}>
            <Header />
            <main>
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}
