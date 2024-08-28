import { mockProducts } from '@/app/data/mockProducts';
import { NextResponse } from 'next/server';
import generateUniqueId from "generate-unique-id";

// Handle GET request to fetch products
export async function GET() {
  return NextResponse.json(mockProducts);
}

// Handle POST request to create a new product
export async function POST(req: Request) {
  const uid = generateUniqueId({
    length: 10,
    useLetters: false
  });
  const body = await req.json();
  const newProduct = {
    id: Number(uid),
    ...body,
  };

  mockProducts.push(newProduct);

  return NextResponse.json(newProduct, { status: 201 });
}