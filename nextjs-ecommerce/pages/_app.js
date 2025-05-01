// pages/_app.js  (pages-router wrapper)
import '@/app/globals.css';                 // keep Tailwind & base styles
import PageLayout from '@/components/layout/PageLayout';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

/* Keep fonts on every pages-router page */
export function reportWebVitals() {
  document.body.classList.add(
    geistSans.variable,
    geistMono.variable,
    'antialiased',
    'text-black'
  );
}
