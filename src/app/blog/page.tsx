import BlogClient from './BlogClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Insights & Technical Engineering Blog | MB Engineering Works",
  description: "Read our engineering guides, maintenance checklists, and insights on B2B printing and converting machinery. Compiled by MB Engineering Works factory experts.",
  openGraph: {
    title: "Insights & Technical Engineering Blog | MB Engineering Works",
    description: "Read our engineering guides, maintenance checklists, and insights on B2B printing and converting machinery. Compiled by MB Engineering Works factory experts.",
    url: "https://www.mbengineering.online/blog",
    type: "website",
  },
};

export default function Page() {
  return <BlogClient />;
}
