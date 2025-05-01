import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: number;
  sku: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.sku}`}
      className="block border rounded-lg overflow-hidden hover:shadow-md transition"
    >
      <div className="relative aspect-[3/4] bg-gray-100">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="p-3">
        <p className="text-sm mb-1">{p.name}</p>
        <p className="font-semibold">${p.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
