'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function PageLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ───── top announcement bar ───── */}
      <div className="w-full bg-black text-white text-xs sm:text-sm text-center py-2">
        Free shipping over €75  •  30-day returns
      </div>

      {/* ───── sticky header ───── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div
          className={twMerge(
            'mx-auto max-w-7xl h-16 flex items-center justify-between px-4',
            'text-black'
          )}
        >
          {/* mobile menu button */}
          <button
            className="md:hidden text-2xl"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>

          {/* left desktop nav */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/category/women">Women</Link>
            <Link href="/category/men">Men</Link>
            <Link href="/category/kids">Kids</Link>
            <Link href="/sale">Sale</Link>
          </nav>

          {/* centered logo */}
          <Link href="/" className="text-2xl font-bold">
            BESTSELLER
            <span className="text-primary">.is</span>
          </Link>

          {/* right-hand icons */}
          <div className="flex items-center gap-4 text-xl">
            <Link href="/search" aria-label="Search">
              🔍
            </Link>
            <Link href="/customer" aria-label="Account">
              👤
            </Link>
            <Link href="/wishlist" aria-label="Wishlist">
              ❤️
            </Link>
            <Link href="/cart" aria-label="Cart">
              🛒
            </Link>
          </div>
        </div>

        {/* mobile slide-down nav (basic) */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 space-y-2 text-sm">
            <Link href="/category/women" onClick={() => setMobileOpen(false)}>
              Women
            </Link>
            <Link href="/category/men" onClick={() => setMobileOpen(false)}>
              Men
            </Link>
            <Link href="/category/kids" onClick={() => setMobileOpen(false)}>
              Kids
            </Link>
            <Link href="/sale" onClick={() => setMobileOpen(false)}>
              Sale
            </Link>
            <Link href="/brands" onClick={() => setMobileOpen(false)}>
              Brands
            </Link>
          </div>
        )}
      </header>

      {/* ───── main page content ───── */}
      <main className="min-h-[calc(100vh-4rem)] text-black">{children}</main>

      {/* ───── footer (simplified for now) ───── */}
      <footer className="bg-gray-100 mt-16 text-black text-sm">
        <div className="mx-auto max-w-7xl grid gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="font-semibold mb-2">Customer Service</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/returns">Returns</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          {/* add more columns later */}
        </div>
        <div className="border-t text-center text-xs py-4">
          © 2025 Bestseller Iceland
        </div>
      </footer>
    </>
  );
}
