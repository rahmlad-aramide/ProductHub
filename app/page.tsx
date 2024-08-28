import Products from "./ui/Products";

export default async function Home() {
  return (
    <main className="min-h-[calc(100vh_-_240px)] my-10">
      <h1 className="flex justify-center items-center font-semibold text-2xl md:text-4xl mt-10 mb-4 text-heading">
        Welcome to ProductHub
      </h1>
      <p className="text-paragraph text-center mb-10">
        Your One-Stop E-commerce Product Listing Platform
      </p>
      <Products />
    </main>
  );
}
