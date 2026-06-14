import type { MetadataRoute } from 'next';
import { getCachedProducts } from '@/lib/productsCache';
import { getBlogs } from '@/lib/blogs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mbengineering.online';

  // Static routes
  const routes = [
    '',
    '/about',
    '/machines',
    '/services',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const products = await getCachedProducts();

    // Product detail page routes
    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Category page routes
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category?.trim().toLowerCase()).filter(Boolean))
    );
    const categoryRoutes = uniqueCategories.map((category) => ({
      url: `${baseUrl}/categories/${encodeURIComponent(category!)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // Blog articles routes dynamically fetched from Firestore
    const blogs = await getBlogs();
    const blogRoutes = blogs.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...routes, ...productRoutes, ...categoryRoutes, ...blogRoutes];
  } catch (e) {
    console.error('Sitemap generation failed:', e);
    return routes;
  }
}
