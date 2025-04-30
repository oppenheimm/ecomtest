import { NextResponse } from 'next/server';
import { gql } from '@apollo/client';
import { createMagentoClient } from '@/lib/magento';  // adjust if your helper path differs

export async function GET() {
  const client = createMagentoClient();

  const QUERY = gql`
    {
      storeConfig {
        store_name
        base_currency_code
      }
    }
  `;

  const { data } = await client.query({ query: QUERY });
  return NextResponse.json(data.storeConfig);
}
