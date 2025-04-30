import { NextResponse } from 'next/server';

/**
 * Super-minimal GraphQL stub that responds to the one query your
 * demo needs (`storeConfig`) and a sample `products` query.
 */
export async function POST() {
  const data = {
    data: {
      storeConfig: {
        store_name: 'Mock Store',
        base_currency_code: 'USD',
      },
      products: {
        items: [
          {
            id: 1,
            sku: 'demo-sku-1',
            name: 'Demo T-Shirt',
            price_range: {
              minimum_price: { regular_price: { value: 19.99 } },
            },
          },
          {
            id: 2,
            sku: 'demo-sku-2',
            name: 'Demo Hoodie',
            price_range: {
              minimum_price: { regular_price: { value: 39.99 } },
            },
          },
        ],
      },
    },
  };

  return NextResponse.json(data);
}
