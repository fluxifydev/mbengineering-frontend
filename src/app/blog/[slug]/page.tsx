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
      alternates: {
        canonical: `/blog/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
      },
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
    alternates: {
      canonical: `/blog/${slug}`,
    },
    robots: {
      index: false,
      follow: true,
    }
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);

  let blogJsonLd: Record<string, unknown> | null = null;
  if (article) {
    let isoDate: string;
    try {
      const parsedDate = new Date(article.date);
      isoDate = !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : new Date().toISOString();
    } catch {
      isoDate = new Date().toISOString();
    }

    blogJsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.summary,
      "image": article.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuA8pfsrELa6NAoqq-Pdz2yF8hwdx2uUtdO9cTjwrZ2bqcUN_MZPpWKSSiLX2FFvFwc3EzK0xmTLTNkJxKFPdQN9EZSFVo-RT4Xch_r6v2D9W5tn-cXJZajWJqfdTBtEXm46S4bE1J1w5482nq9VfNj9fcRNzKDdHc1_5N8gp3PuUIn3FCek4KDIt9PHUtkDXAC_vi_vOxUNJDP_BAEfnCHnMeCVt4fkyfNrEYf6T3Ks9ZOq6yTjHEpXjdZr5Kc22mGxI1JwLB_EZ8A",
      "datePublished": isoDate,
      "author": {
        "@type": "Organization",
        "name": "MB Engineering Works",
        "url": "https://www.mbengineering.online"
      },
      "publisher": {
        "@type": "Organization",
        "name": "MB Engineering Works",
        "logo": {
          "@type": "ImageObject",
          "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuA8pfsrELa6NAoqq-Pdz2yF8hwdx2uUtdO9cTjwrZ2bqcUN_MZPpWKSSiLX2FFvFwc3EzK0xmTLTNkJxKFPdQN9EZSFVo-RT4Xch_r6v2D9W5tn-cXJZajWJqfdTBtEXm46S4bE1J1w5482nq9VfNj9fcRNzKDdHc1_5N8gp3PuUIn3FCek4KDIt9PHUtkDXAC_vi_vOxUNJDP_BAEfnCHnMeCVt4fkyfNrEYf6T3Ks9ZOq6yTjHEpXjdZr5Kc22mGxI1JwLB_EZ8A"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.mbengineering.online/blog/${slug}`
      }
    };
  }

  return (
    <>
      {blogJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
      )}
      <BlogDetailClient slug={slug} initialArticle={article} />
    </>
  );
}
