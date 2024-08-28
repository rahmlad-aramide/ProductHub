import { mockProducts } from "@/app/data/mockProducts";
import { NextResponse } from "next/server";

// Handle GET request to fetch all products
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const productId = parseInt(params.id, 10);
  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// Handle DELETE request to delete a product by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const productId = params.id;

  const productIndex = mockProducts.findIndex(
    (p) => p.id === parseInt(productId),
  );
  console.log(productIndex);

  if (productIndex === -1) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  // Remove the product from the array (simulating deletion)
  mockProducts.splice(productIndex, 1);

  return NextResponse.json({ message: "Product deleted successfully" });
}

// Handle PUT request to update an existing product by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const productId = params.id;
  const body = await req.json();

  // Find the index of the product to update
  const productIndex = mockProducts.findIndex(
    (p) => p.id === parseInt(productId, 10),
  );

  if (productIndex === -1) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  // Update the product
  const updatedProduct = { ...mockProducts[productIndex], ...body };
  mockProducts[productIndex] = updatedProduct;

  return NextResponse.json(updatedProduct);
}
