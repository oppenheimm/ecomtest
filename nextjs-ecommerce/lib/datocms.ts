import { GraphQLClient } from 'graphql-request';

export const datocms = new GraphQLClient(
  'https://graphql.datocms.com/',
  {
    headers: { authorization: `Bearer ${process.env.DATOCMS_API_TOKEN!}` },
    fetch,
  }
);
