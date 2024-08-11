import { Inter } from "next/font/google";
import Head from "next/head"; // Import Head for metadata
import "./globals.css";
import "../fontawesome";
import Header from "./components/header"; // Ensure the path and case are correct
import Footer from "./components/footer"; // Import the Footer component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Loloki Africa",
  description: "Explore unique African art crafted by talented artisans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </Head>
      <body className={inter.className}>
        <Header /> {/* This ensures the Header is included on all pages */}
        <main>{children}</main>
        <Footer /> {/* This ensures the Footer is included on all pages */}
      </body>
    </html>
  );
}




