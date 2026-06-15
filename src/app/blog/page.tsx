import BlogClient from './BlogClient';
import { getBlogs } from '@/lib/blogs';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Insights & Technical Engineering Blog | MB Engineering Works",
  description: "Read our engineering guides, maintenance checklists, and insights on B2B printing and converting machinery. Compiled by MB Engineering Works factory experts.",
  alternates: {
    canonical: '/blog',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Insights & Technical Engineering Blog | MB Engineering Works",
    description: "Read our engineering guides, maintenance checklists, and insights on B2B printing and converting machinery. Compiled by MB Engineering Works factory experts.",
    url: "https://www.mbengineering.online/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Technical Engineering Blog | MB Engineering Works",
    description: "Read our engineering guides, maintenance checklists, and insights on B2B printing and converting machinery. Compiled by MB Engineering Works factory experts.",
  }
};

export default async function Page() {
  const articles = await getBlogs();
  return <BlogClient initialArticles={articles} />;
}
