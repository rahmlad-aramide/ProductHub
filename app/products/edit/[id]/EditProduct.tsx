"use client";
import { useNotification } from "@/app/contexts";
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

const EditProductForm = ({ id }: { id: string }) => {
  const { push } = useRouter();
  const { notify } = useNotification();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [typedUrl, setTypedUrl] = useState<string>("");
  const [errorImageUrl, setErrorImageUrl] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<{
    products: boolean;
    submit: boolean;
  }>({ products: true, submit: false });

  const fetchProducts = async () => {
    setLoading({ ...loading, products: true });
    setError(null);
    try {
      let products = loadFromLocalStorage();
      if (!products) {
        const res = await fetch(`/api/products`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        products = await res.json();
        saveToLocalStorage(products);
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
      setError(error.message || "An error occurred");
    } finally {
      setLoading({ ...loading, products: false });
    }
  };
  useEffect(() => {
    fetchProducts();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Fetch the products from localStorage
    const fetchedProducts = loadFromLocalStorage();
    if (fetchedProducts) {
      console.log(fetchedProducts);
      // Find the product with the matching id
      const productToEdit = fetchedProducts.find(
        (product: Product) => product.id === Number(id),
      );

      // If the product is found, set the states
      if (productToEdit) {
        setTitle(productToEdit.title);
        setPrice(productToEdit.price);
        setCategory(productToEdit.category);
        setTypedUrl(productToEdit.imageUrl);
      }
    }
    //eslint-disable-next-line
  }, []);

  const updateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading({ ...loading, submit: true });

    // Load the current products from localStorage
    const products = loadFromLocalStorage() || [];

    // Find the index of the product to update
    const productIndex = products.findIndex(
      (product: any) => product.id === Number(id),
    );

    if (productIndex === -1) {
      console.error("Product not found");
      return;
    }

    // Update the product information
    const updatedProduct = {
      ...products[productIndex],
      title,
      price,
      category,
      imageUrl,
    };

    // Replace the old product with the updated one
    products[productIndex] = updatedProduct;

    // Save the updated products list back to localStorage
    saveToLocalStorage(products);

    // simulate api call loading state using timeout
    setTimeout(() => {
      setTitle("");
      setPrice("");
      setCategory("");
      setImageUrl("");
      setLoading({ ...loading, submit: false });
      notify("Update succesful, you're being redirected.", "success");
    }, 1000);

    setTimeout(() => {
      push("/");
    }, 3000);
  };

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

  const links = [
    { label: "Home", url: "/" },
    { label: "Products", url: "/" },
    { label: `Edit Product`, url: `/products/edit/${id}` },
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
              Update Product
            </h1>
            <p
              className={`${poppins.className} text-center text-grey-300 text-sm`}
            >
              Please enter updated details of the product below.
            </p>
          </div>
          <form onSubmit={updateProduct}>
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
                Price ($)
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
            <Button type="submit" loading={loading.submit} className="w-full">
              Update Product
            </Button>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </form>
        </div>
      </section>
    </main>
  );
};

export default EditProductForm;
