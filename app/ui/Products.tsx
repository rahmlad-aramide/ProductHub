"use client";
import { useEffect, useState } from "react";
import ProductCard from "../ui/ProductCard";
import { Product } from "../definitions/types";
import { ErrorIndicator } from "./ErrorIndicator";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";
import { SkeletonCard, SkeletonFilter } from "./Skeletons";

const Products: React.FC = () => {
  const { push } = useRouter();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [rangeMaxPrice, setRangeMaxPrice] = useState<number>(1000); // Static maxPrice for the range input
  const [dynamicMaxPrice, setDynamicMaxPrice] = useState<number>(1000); // Dynamic maxPrice based on current products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let products:Product[] = loadFromLocalStorage();
      if (!products) {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        products = await res.json();
        saveToLocalStorage(products);
      }
      if (products && products.length > 0) {
        const highestPrice = Math.max(...products.map((p) => p.price));
        setDynamicMaxPrice(highestPrice);
        if (highestPrice > rangeMaxPrice) {
          setRangeMaxPrice(highestPrice);
        }
        setProducts(products);
      } else {
        setProducts([]);
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = (id: number) => {
    if (products) {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(
        updatedProducts.filter((product) => {
          return (
            (selectedCategory === "All" ||
              product.category === selectedCategory) &&
            product.price >= minPrice &&
            product.price <= dynamicMaxPrice
          );
        })
      );
      saveToLocalStorage(updatedProducts);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products) {
      setFilteredProducts(
        products.filter((product) => {
          return (
            (selectedCategory === "All" ||
              product.category === selectedCategory) &&
            product.price >= minPrice &&
            product.price <= dynamicMaxPrice
          );
        })
      );
    }
  }, [selectedCategory, minPrice, dynamicMaxPrice, products]);

  if (loading) {
    return (
      <section className="container mx-auto px-4 md:px-8">
        <SkeletonFilter />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return <ErrorIndicator error={error} retryFunc={fetchProducts} />;
  }

  if (!products || products.length === 0) {
    return (
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row mb-6 justify-end border-y py-3 px-3">
          <Button
            onClick={() => push("/products/new")}
            className="my-2 lg:my-0"
          >
            Add New
          </Button>
        </div>
        <div className="flex w-full h-full min-h-[300px] justify-center items-center text-paragraph">
          <p>No product(s) found.</p>
        </div>
      </section>
    );
  }

  const categories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  return (
    <section className="container mx-auto px-4 md:px-8">
      <div className="flex flex-col lg:flex-row mb-6 justify-between items-center border-y py-3 px-3">
        <div className="flex items-center flex-row-reverse md:flex-row justify-between lg:justify-center gap-4 w-full lg:w-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <label htmlFor="category" className="mr-4 mb-2 md:mb-0">
              Category:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded p-2"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 lg:space-y-0 gap-2">
            <label
              htmlFor="priceRange"
              className="mr-0 md:mr-2 whitespace-nowrap"
            >
              Price (min - max):
            </label>
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0">
              <input
                type="range"
                id="minPrice"
                min="0"
                max={rangeMaxPrice}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="mr-0 lg:mr-4"
              />
              <input
                type="range"
                id="maxPrice"
                min="0"
                max={rangeMaxPrice}
                value={dynamicMaxPrice}
                onChange={(e) => setDynamicMaxPrice(Number(e.target.value))}
              />
            </div>
            <span className="lg:whitespace-nowrap lg:ml-4">
              ${minPrice.toFixed(2)} - ${dynamicMaxPrice.toFixed(2)}
            </span>
          </div>
        </div>
        <Button
          onClick={() => push("/products/new")}
          className="my-2 lg:my-0 self-end"
        >
          Add New
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="flex w-full h-full min-h-[300px] justify-center items-center text-paragraph sm:col-span-2 lg:col-span-3 xl:col-span-4">
            No product(s) matches your filter
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              imageUrl={product.imageUrl}
              onDelete={deleteProduct}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Products;
