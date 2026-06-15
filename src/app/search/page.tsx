import SearchClient from './SearchClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Search Results | MB Engineering Works",
  description: "Search high-performance industrial converting, slitting, and printing machinery in the MB Engineering Works catalog.",
  alternates: {
    canonical: '/search',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Search Results | MB Engineering Works",
    description: "Search high-performance industrial converting, slitting, and printing machinery in the MB Engineering Works catalog.",
    url: "https://www.mbengineering.online/search",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Results | MB Engineering Works",
    description: "Search high-performance industrial converting, slitting, and printing machinery in the MB Engineering Works catalog.",
  }
};

export default function Page() {
  return <SearchClient />;
}
