import { mockProducts } from "@/app/data/mockProducts";
import { Metadata } from "next";
import ProductDetails from "@/app/ui/ProductDetails";

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
    title: `${product.title} - ProductHub`,
    description: `Buy ${product.title} for just $${product.price}. Find more products in the ${product.category} category.`,
    keywords: `${product.title}, ${product.category}, e-commerce, ProductHub`,
  };
}

const Page: React.FC = () => {
  return <ProductDetails />;
};

export default Page;
