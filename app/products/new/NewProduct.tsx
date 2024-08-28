"use client";
import { NotificationProvider, useNotification } from "@/app/contexts";
import { Product } from "@/app/definitions/types";
import { inter, poppins } from "@/app/fonts";
import Breadcrumb from "@/app/ui/BreadCrumb";
import { Button } from "@/app/ui/Button";
import { Input } from "@/app/ui/Input";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/app/utils/localStorage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const NewProductForm: React.FC = () => {
  const { push } = useRouter();
  const { notify } = useNotification();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [typedUrl, setTypedUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorImageUrl, setErrorImageUrl] = useState(false);

  useEffect(() => {
    setImageUrl(typedUrl);
    const handler = setTimeout(() => {
      setErrorImageUrl(false);
    }, 500); // 500ms debounce time

    return () => {
      // Clean up the timeout if the component is re-rendered or unmounted
      clearTimeout(handler);
    };
  }, [typedUrl]);

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, price, category, imageUrl }),
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      const newProduct: Product = await res.json();

      // Load existing products from localStorage
      const currentProducts: Product[] = loadFromLocalStorage() || [];

      // Check if the product already exists
      if (currentProducts.some((product) => product.id === newProduct.id)) {
        console.log("Product already exists in localStorage");
        return;
      }

      // Add the new product to the list
      const updatedProducts = [...currentProducts, newProduct];

      // Save the updated product list to localStorage
      saveToLocalStorage(updatedProducts);

      setTitle("");
      setPrice("");
      setCategory("");
      setImageUrl("");
      setLoading(false);
      notify("Succesful, you're being redirected.", "success");

      setTimeout(() => {
        push("/");
      }, 3000);

      return newProduct;
    } catch (error: any) {
      setError(error);
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { label: "Home", url: "/" },
    { label: "Products", url: "/" },
    { label: `Add Product`, url: `/products/new` },
  ];
  return (
    <main className="bg-[#FAFDFF] bg-vectorLines bg-center min-h-[calc(100vh_-_160px)]">
      <Breadcrumb links={links} />
      <section className="mx-auto flex justify-center items-center py-[72px] md:py-[88px]">
        <div className="container flex flex-col py-8 space-y-8 px-6 bg-white rounded-[10px] border-[0.5px] border-grey-100 max-w-xl w-[calc(100%_-_32px)] mx-auto">
          <div>
            <h1
              className={`${inter.className} cursor-pointer mb-[14px] text-3xl font-medium text-center`}
            >
              Add Product
            </h1>
            <p
              className={`${poppins.className} text-center text-grey-300 text-sm`}
            >
              Please enter the details of the product you want to add below.
            </p>
          </div>
          <form onSubmit={createProduct}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <Input
                type="text"
                id="price"
                value={price}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <Input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <Input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setTypedUrl(e.target.value)}
              />
              {errorImageUrl ? (
                <p className="text-red-500 text-xs mt-2">
                  Failed to load image. Please check the URL.
                </p>
              ) : (
                <div className="mt-2">
                  {imageUrl ? (
                    <div className="h-[200px] w-full">
                      <Image
                        src={imageUrl}
                        alt="Preview"
                        className="max-w-full w-full h-full border rounded-lg shadow-md object-scale-down"
                        onError={() => setErrorImageUrl(true)}
                        width={200}
                        height={200}
                        unoptimized
                      />
                    </div>
                  ) : (
                    <p className="text-gray-500 text-xs">
                      Image preview will be shown here...
                    </p>
                  )}
                </div>
              )}
            </div>
            <Button type="submit" loading={loading} className="w-full">
              Add Product
            </Button>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </form>
        </div>
      </section>
    </main>
  );
};

export default NewProductForm;
