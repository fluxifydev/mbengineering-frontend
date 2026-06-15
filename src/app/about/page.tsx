import AboutClient from './AboutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | MB Engineering Works",
  description: "Established in 2008, MB Engineering Works has transitioned from a specialized tooling workshop into a global powerhouse in high-precision converting and slitting machinery.",
  alternates: {
    canonical: '/about',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Us | MB Engineering Works",
    description: "Established in 2008, MB Engineering Works has transitioned from a specialized tooling workshop into a global powerhouse in high-precision converting and slitting machinery.",
    url: "https://www.mbengineering.online/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | MB Engineering Works",
    description: "Established in 2008, MB Engineering Works has transitioned from a specialized tooling workshop into a global powerhouse in high-precision converting and slitting machinery.",
  }
};

export default function Page() {
  return <AboutClient />;
}
