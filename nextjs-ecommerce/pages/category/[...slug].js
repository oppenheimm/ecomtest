import Head from 'next/head';
import ProductCard from '@/components/product/ProductCard';

/* --- GraphQL helper -------------------------------------------------- */
async function fetchCategoryProducts(slugPath) {
  const res = await fetch('http://localhost:3000/api/magento/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query ($slug: String!) {
          categoryProducts(slug: $slug) {
            items {
              id
              sku
              name
              price {
                regularPrice {
                  amount {
                    value
                    currency
                  }
                }
              }
              small_image {
                url
                label
              }
            }
          }
        }
      `,
      variables: { slug: slugPath },
    }),
    cache: 'no-store',
  });
  const json = await res.json();
  return json.data.categoryProducts.items;
}

/* --- Next.js data ---------------------------------------------------- */
export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const slugArray = params.slug || [];
  const slugPath = slugArray.join('/');          // e.g. "men/shirts"
  const items = await fetchCategoryProducts(slugPath);

  return {
    props: { slugArray, items },
    revalidate: 30,
  };
}

/* --- Page component -------------------------------------------------- */
export default function CategoryPage({ slugArray, items }) {
  const title = slugArray
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' / ');

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center">{title}</h1>
        <p className="text-center text-gray-600 mb-12">
          Explore our latest {title.toLowerCase()} collection curated just for you.
        </p>
        {items.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found in this category yet.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((product) => (
              <li key={product.id}>
                <ProductCard p={product} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
