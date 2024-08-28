"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Breadcrumb from "./BreadCrumb";
import { loadFromLocalStorage } from "../utils/localStorage";
import { Product } from "../definitions/types";
import { LoadingIndicator } from "../assets/svg";
import { ErrorIndicator } from "./ErrorIndicator";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);

  const product = loadFromLocalStorage()?.find(
    (p: Product) => p.id === Number(id)
  );

  useEffect(()=> {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-full min-h-[300px] justify-center items-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex w-full h-full min-h-[300px] justify-center items-center text-paragraph">
        <p>Product with the id {id} not found.</p>
      </div>
    );
  }

  const links = [
    { label: "Home", url: "/" },
    { label: "Products", url: "/" },
    { label: `${product.title}`, url: `/products/${id}` },
  ];
  return (
    <main className=" min-h-[calc(100vh_-_160px)]">
      <Breadcrumb links={links} />
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row max-w-3xl mx-auto">
          <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
            <Image
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-auto object-cover rounded-lg"
              width={300}
              height={300}
              unoptimized
            />
          </div>
          <div className="md:ml-8 my-auto w-full md:w-1/2 md:max-w-lg">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex justify-between items-center">
              <p className="text-xl font-medium">Price:</p>
              <p className="text-primary text-xl font-semibold my-2">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xl font-medium">Category:</p>
              <p className="text-gray-700 text-lg">{product.category}</p>
            </div>
            <p className="mt-4 text-paragraph">
              Experience the quality {product.title}, an innovation of{" "}
              {product.category}. It offers an exceptional value, combining
              cutting-edge features with reliable performance. Whether you're a
              professional or an enthusiast, {product.title} is designed to meet
              and exceed your expectations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
