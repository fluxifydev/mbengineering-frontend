import BlogDetailClient from './BlogDetailClient';
import { getBlogs, getBlogBySlug } from '@/lib/blogs';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const articles = await getBlogs();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);

  if (article) {
    return {
      title: `${article.title} | MB Engineering Works Blog`,
      description: article.summary,
      openGraph: {
        title: `${article.title} | MB Engineering Works Blog`,
        description: article.summary,
        url: `https://www.mbengineering.online/blog/${slug}`,
        images: [{ url: article.imageUrl, alt: article.title }],
        type: "article",
        publishedTime: article.date,
      },
      twitter: {
        card: "summary_large_image",
        title: `${article.title} | MB Engineering Works Blog`,
        description: article.summary,
        images: [article.imageUrl],
      }
    };
  }

  return {
    title: 'Technical Article | MB Engineering Works',
    description: 'B2B precision engineering and industrial converting machinery articles.',
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);
  return <BlogDetailClient slug={slug} initialArticle={article} />;
}
