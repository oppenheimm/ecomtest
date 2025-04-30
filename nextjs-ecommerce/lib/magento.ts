// lib/magento.ts
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
  } from '@apollo/client';
  
  /**
   * Reads MAGENTO_GRAPHQL_ENDPOINT (and optional MAGENTO_TOKEN)
   * from .env.local and returns a ready-to-use Apollo Client.
   */
  export function createMagentoClient(): ApolloClient<NormalizedCacheObject> {
    if (!process.env.MAGENTO_GRAPHQL_ENDPOINT) {
      throw new Error('Missing MAGENTO_GRAPHQL_ENDPOINT in .env.local');
    }
  
    return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: new HttpLink({
        uri: process.env.MAGENTO_GRAPHQL_ENDPOINT,
        headers: process.env.MAGENTO_TOKEN
          ? { Authorization: `Bearer ${process.env.MAGENTO_TOKEN}` }
          : {},
        fetch,
      }),
      cache: new InMemoryCache(),
    });
  }
  