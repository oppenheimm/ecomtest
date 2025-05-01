import { NextResponse } from 'next/server';

const DB = {
  'herrar/fatnadur': [
    {
      id: 1,
      sku: 'shirt-001',
      name: 'Classic Oxford Shirt',
      price: 49.99,
      image: '/demo/herrar/fatnadur/shirt.jpg',
    },
    {
      id: 2,
      sku: 'jeans-001',
      name: 'Slim Fit Jeans',
      price: 69.99,
      image: '/demo/herrar/fatnadur/jeans.jpg',
    },
  ],
  'herrar/skor': [
    {
      id: 3,
      sku: 'sneaker-001',
      name: 'Retro Sneaker',
      price: 59.99,
      image: '/demo/herrar/skor/sneaker.jpg',
    },
  ],
  domur: [
    {
      id: 4,
      sku: 'dress-001',
      name: 'Summer Floral Dress',
      price: 79.99,
      image: '/demo/domur/dress.jpg',
    },
  ],
};

export async function POST(request: Request) {
  const { query, variables } = await request.json();

  // we only care about `categoryProducts(slug: "...")` queries
  const match = query.match(/categoryProducts\s*\(\s*slug:\s*"(.*?)"/);
  const slug = match?.[1] ?? '';

  const items = DB[slug] ?? [];

  return NextResponse.json({
    data: {
      categoryProducts: {
        items,
      },
    },
  });
}
