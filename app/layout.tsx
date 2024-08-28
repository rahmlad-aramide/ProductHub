import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "ProductHub - Your One-Stop Shop",
  description:
    "Browse and manage products in ProductHub, your go-to product listing platform.",
  keywords: "e-commerce, products, shop, ProductHub",
  authors: [{ name: "Abdrahman Oladimeji" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
