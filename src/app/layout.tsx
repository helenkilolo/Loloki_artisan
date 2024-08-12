import { Inter } from "next/font/google";
import "./globals.css";
import "../fontawesome";
import Header from "./components/header";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> {/* This ensures the Header is included on all pages */}
        <main>{children}</main>
        <Footer /> {/* This ensures the Footer is included on all pages */}
      </body>
    </html>
  );
}




