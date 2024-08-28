import { NotificationProvider } from "@/app/contexts";
import EditProductForm from "./EditProduct";
import { Metadata } from "next";
import { mockProducts } from "@/app/data/mockProducts";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = mockProducts.find((p) => p.id.toString() === params.id);

  if (!product) {
    return {
      title: "Product not found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: `Edit ${product.title} - ProductHub`,
    description: `Find more products in the ${product.category} category.`,
    keywords: `${product.title}, ${product.category}, e-commerce, ProductHub`,
  };
}

export default function Home({ params }: { params: { id: string } }) {
  return (
    <NotificationProvider>
      <EditProductForm id={params.id} />
    </NotificationProvider>
  );
}
