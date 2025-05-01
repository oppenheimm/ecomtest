'use client';

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
  /* Ask Dato for an optimised WebP crop */
  const optimizedUrl = `${image.url}?fm=webp&fit=crop&w=1920&h=700`;

  return (
    <section
      data-speed="0.6"
      className="relative w-full h-[60vh] lg:h-[70vh] will-change-transform overflow-hidden"
    >
      {/* Background image with blur-up placeholder */}
      <Image
        src={optimizedUrl}
        alt={headline}
        fill
        sizes="100vw"
        quality={90}
        placeholder="blur"
        blurDataURL={`${image.url}?w=10&blur=30&fm=jpg`}
        className="object-cover"
        priority
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white tracking-tight drop-shadow-sm">
          {headline}
        </h1>
        <Link
          href={cta.href}
          className="pointer-events-auto px-8 py-3 bg-white text-black font-medium rounded hover:bg-black hover:text-white transition-colors"
        >
          {cta.label}
        </Link>
      </div>

      {/* Down-arrow cue */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center pointer-events-none">
        <span className="animate-bounce text-white text-2xl">⌄</span>
      </div>
    </section>
  );
}
