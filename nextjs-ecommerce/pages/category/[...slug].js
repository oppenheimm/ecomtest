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
              price
              image
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
  const slugPath = slugArray.join('/');          // "herrar/fatnadur"
  const items = await fetchCategoryProducts(slugPath);

  return {
    props: { slugArray, items },
    revalidate: 30,
  };
}

/* --- Page component -------------------------------------------------- */
export default function CategoryPage({ slugArray, items }) {
  const title = slugArray.map((s) => s.toUpperCase()).join(' / ');

  return (
    <>
      <Head><title>{title}</title></Head>
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>

        {items.length === 0 ? (
          <p>Engar vörur í þessum flokki ennþá.</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {items.map((p) => (
              <li key={p.id}>
                <ProductCard p={p} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
