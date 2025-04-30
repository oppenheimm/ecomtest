/* app/page.tsx ---------------------------------------------------------- */
import { datocms } from '@/lib/datocms';
import Hero from '@/components/home/Hero';
import BrandGrid from '@/components/home/BrandGrid';

/* GraphQL query – matches the fields you created in DatoCMS */
const QUERY = /* GraphQL */ `
  {
    allHomepages(first: 1) {
      heroHeadline
      heroCtaLabel
      heroCtaHref
      heroImage {
        url
        width
        height
      }
      brandUrls        # tag-list field (string OR [string])
    }
  }
`;

type HomeDTO = {
  heroHeadline: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  heroImage: { url: string; width: number; height: number };
  brandUrls: string | string[];
};

export const revalidate = 300; // rebuild every 5 min

export default async function Home() {
  const { allHomepages } = await datocms.request<{ allHomepages: HomeDTO[] }>(
    QUERY
  );

  const home = allHomepages[0];

  /* ───── normalise brandUrls into an array ───── */
  const rawBrandUrls: string[] =
    Array.isArray(home.brandUrls)
      ? home.brandUrls
      : (home.brandUrls ?? '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

  const brands = rawBrandUrls.map((url) => {
    const slug = url.split('/').filter(Boolean).pop() ?? url;
    return {
      name: slug.replace(/[-_]/g, ' ').toUpperCase(),
      href: url,
      /* placeholder logo; swap when you have real assets */
      logo: { url: '/placeholder-logo.svg', width: 200, height: 80 },
    };
  });

  return (
    <>
      <Hero
        image={home.heroImage}
        headline={home.heroHeadline}
        cta={{ label: home.heroCtaLabel, href: home.heroCtaHref }}
      />

      <BrandGrid brands={brands} />
    </>
  );
}
