'use client';

import { useEffect } from 'react';

export default function Parallax() {
  useEffect(() => {
    const handler = () => {
      document
        .querySelectorAll<HTMLElement>('[data-speed]')
        .forEach((el) => {
          const speed = parseFloat(el.dataset.speed ?? '1');
          el.style.transform = `translateY(${window.scrollY * (1 - speed)}px)`;
        });
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return null;
}
