import SearchClient from './SearchClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Search Results | MB Engineering Works",
  description: "Search high-performance industrial converting, slitting, and printing machinery in the MB Engineering Works catalog.",
  openGraph: {
    title: "Search Results | MB Engineering Works",
    description: "Search high-performance industrial converting, slitting, and printing machinery in the MB Engineering Works catalog.",
    url: "https://www.mbengineering.online/search",
    type: "website",
  },
};

export default function Page() {
  return <SearchClient />;
}
