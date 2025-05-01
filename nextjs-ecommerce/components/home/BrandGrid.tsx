'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BrandGrid({
  brands,
}: {
  brands: {
    name: string;
    logo: { url: string; width: number; height: number };
    href: string;
  }[];
}) {
  return (
    <section className="bg-white text-black py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Vörumerkin</h2>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 place-items-center">
          {brands.map((b) => (
            <li key={b.name} className="w-full flex items-center justify-center">
              <Link
                href={b.href}
                className="block md:grayscale hover:grayscale-0 md:hover:scale-105 transition"
              >
                <Image
                  src={b.logo.url}
                  alt={b.name}
                  width={b.logo.width}
                  height={b.logo.height}
                  className="object-contain max-h-16"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
