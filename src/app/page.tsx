import HomeClient from './HomeClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "MB Engineering Works | Precision Engineering Solutions",
  description: "MB Engineering Works | 18+ years of high-performance converting, slitting & printing machinery. Custom B2B solutions for global leaders.",
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "MB Engineering Works | Precision Engineering Solutions",
    description: "MB Engineering Works | 18+ years of high-performance converting, slitting & printing machinery. Custom B2B solutions for global leaders.",
    url: "https://www.mbengineering.online",
    siteName: "MB Engineering Works",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8pfsrELa6NAoqq-Pdz2yF8hwdx2uUtdO9cTjwrZ2bqcUN_MZPpWKSSiLX2FFvFwc3EzK0xmTLTNkJxKFPdQN9EZSFVo-RT4Xch_r6v2D9W5tn-cXJZajWJqfdTBtEXm46S4bE1J1w5482nq9VfNj9fcRNzKDdHc1_5N8gp3PuUIn3FCek4KDIt9PHUtkDXAC_vi_vOxUNJDP_BAEfnCHnMeCVt4fkyfNrEYf6T3Ks9ZOq6yTjHEpXjdZr5Kc22mGxI1JwLB_EZ8A",
        width: 1200,
        height: 630,
        alt: "MB Engineering Works Logo",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MB Engineering Works | Precision Engineering Solutions",
    description: "MB Engineering Works | 18+ years of high-performance converting, slitting & printing machinery. Custom B2B solutions for global leaders.",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuA8pfsrELa6NAoqq-Pdz2yF8hwdx2uUtdO9cTjwrZ2bqcUN_MZPpWKSSiLX2FFvFwc3EzK0xmTLTNkJxKFPdQN9EZSFVo-RT4Xch_r6v2D9W5tn-cXJZajWJqfdTBtEXm46S4bE1J1w5482nq9VfNj9fcRNzKDdHc1_5N8gp3PuUIn3FCek4KDIt9PHUtkDXAC_vi_vOxUNJDP_BAEfnCHnMeCVt4fkyfNrEYf6T3Ks9ZOq6yTjHEpXjdZr5Kc22mGxI1JwLB_EZ8A"],
  }
};

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MB Engineering Works",
    "url": "https://www.mbengineering.online",
    "logo": "https://lh3.googleusercontent.com/aida-public/AB6AXuA8pfsrELa6NAoqq-Pdz2yF8hwdx2uUtdO9cTjwrZ2bqcUN_MZPpWKSSiLX2FFvFwc3EzK0xmTLTNkJxKFPdQN9EZSFVo-RT4Xch_r6v2D9W5tn-cXJZajWJqfdTBtEXm46S4bE1J1w5482nq9VfNj9fcRNzKDdHc1_5N8gp3PuUIn3FCek4KDIt9PHUtkDXAC_vi_vOxUNJDP_BAEfnCHnMeCVt4fkyfNrEYf6T3Ks9ZOq6yTjHEpXjdZr5Kc22mGxI1JwLB_EZ8A",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919345323173",
      "contactType": "customer service",
      "areaServed": "Worldwide",
      "availableLanguage": ["en", "hi", "ta"]
    }
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MB Engineering Works",
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuA8pfsrELa6NAoqq-Pdz2yF8hwdx2uUtdO9cTjwrZ2bqcUN_MZPpWKSSiLX2FFvFwc3EzK0xmTLTNkJxKFPdQN9EZSFVo-RT4Xch_r6v2D9W5tn-cXJZajWJqfdTBtEXm46S4bE1J1w5482nq9VfNj9fcRNzKDdHc1_5N8gp3PuUIn3FCek4KDIt9PHUtkDXAC_vi_vOxUNJDP_BAEfnCHnMeCVt4fkyfNrEYf6T3Ks9ZOq6yTjHEpXjdZr5Kc22mGxI1JwLB_EZ8A",
    "@id": "https://www.mbengineering.online/#localbusiness",
    "url": "https://www.mbengineering.online",
    "telephone": "+919345323173",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Coimbatore",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "postalCode": "641001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 11.0168,
      "longitude": 76.9558
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
