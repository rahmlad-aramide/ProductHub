import { NotificationProvider } from "@/app/contexts";
import NewProductForm from "./NewProduct";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Add Product - ProductHub`,
    description: `Add a new product to ProductHub. Find more products in our various product categories.`,
    keywords: `add-product, e-commerce, ProductHub`,
  };
}

export default function Home() {
  return (
    <NotificationProvider>
      <NewProductForm />
    </NotificationProvider>
  );
}
