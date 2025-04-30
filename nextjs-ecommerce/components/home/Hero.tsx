import Image from 'next/image';
import Link from 'next/link';

export default function Hero({
  image,
  headline,
  cta,
}: {
  image: { url: string; width: number; height: number };
  headline: string;
  cta: { label: string; href: string };
}) {
  // build the optimized URL *inside* the component
  const optimizedUrl = `${image.url}?fm=webp&fit=crop&w=1920&h=700`;

  return (
    <section className="relative w-full h-[60vh] lg:h-[70vh]">
      <Image
        src={optimizedUrl}
        alt={headline}
        fill
        sizes="100vw"
        quality={90}
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white tracking-tight drop-shadow-sm">
        {headline}
       </h1>

        <Link
          href={cta.href}
          className="px-8 py-3 bg-white text-black font-medium rounded hover:bg-gray-100 transition"
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
