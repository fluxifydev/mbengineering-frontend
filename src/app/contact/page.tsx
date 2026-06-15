import ContactClient from './ContactClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Our Factory | MB Engineering Works",
  description: "Get in touch with the MB Engineering Works engineering team for a free consultation or custom B2B machinery quote. Locate our factory and call support.",
  alternates: {
    canonical: '/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Our Factory | MB Engineering Works",
    description: "Get in touch with the MB Engineering Works engineering team for a free consultation or custom B2B machinery quote. Locate our factory and call support.",
    url: "https://www.mbengineering.online/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Our Factory | MB Engineering Works",
    description: "Get in touch with the MB Engineering Works engineering team for a free consultation or custom B2B machinery quote. Locate our factory and call support.",
  }
};

export default function Page() {
  return <ContactClient />;
}
