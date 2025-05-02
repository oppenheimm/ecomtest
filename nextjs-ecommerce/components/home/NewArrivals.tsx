// components/home/NewArrivals.tsx
import Link from 'next/link';
import Image from 'next/image';
import { datocms } from '@/lib/datocms';

type ProductDTO = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: { url: string; width: number; height: number };
};

export default async function NewArrivals() {
  // fetch the 8 most recent products from DatoCMS
  const QUERY = /* GraphQL */ `
    {
      allProducts(orderBy: _createdAt_DESC, first: 8) {
        id
        slug
        name
        price
        image {
          url
          width
          height
        }
      }
    }
  `;
  const { allProducts } = await datocms.request<{ allProducts: ProductDTO[] }>(
    QUERY
  );

  return (
    <section className="bg-white text-black py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Nýjar vörur</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {allProducts.map((p) => (
            <li key={p.id}>
              <Link
                href={`/product/${p.slug}`}
                className="block border rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <div className="relative aspect-[3/4] bg-gray-100">
                  <Image
                    src={p.image.url}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 12.5vw, (min-width: 768px) 16vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-2">
                  <p className="text-sm mb-1">{p.name}</p>
                  <p className="font-semibold">€{p.price.toFixed(2)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
