import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { blogArticles, BlogArticle } from './blogData';

// Helper to format Firestore dates to readable string
function formatBlogDate(dateValue: any): string {
  if (!dateValue) {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // If it's a Firestore Timestamp
  if (typeof dateValue.toDate === 'function') {
    return dateValue.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // If it's a Date object
  if (dateValue instanceof Date) {
    return dateValue.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // If it's a string, return as is
  return String(dateValue);
}

// Helper to construct markdown content from separate h1, h2, h3, h4 and paragraph fields if content is absent
function buildBlogContent(data: any): string {
  // If content is already a string
  if (data.content && typeof data.content === 'string') {
    return data.content;
  }

  // If content (or blocks) is an array of blocks from the Dynamic Content Builder
  const rawBlocks = data.content || data.blocks || data.contentBlocks;
  if (Array.isArray(rawBlocks)) {
    const markdownParts: string[] = [];
    for (const block of rawBlocks) {
      if (!block) continue;
      const type = String(block.type || block.tag || '').toLowerCase().trim();
      const text = String(block.text || block.value || block.content || block.textVal || '').trim();
      if (!text) continue;

      if (type === 'h1' || type === 'heading1' || type === 'heading 1') {
        markdownParts.push(`# ${text}`);
      } else if (type === 'h2' || type === 'heading2' || type === 'heading 2') {
        markdownParts.push(`## ${text}`);
      } else if (type === 'h3' || type === 'heading3' || type === 'heading 3') {
        markdownParts.push(`### ${text}`);
      } else if (type === 'h4' || type === 'heading4' || type === 'heading 4') {
        markdownParts.push(`#### ${text}`);
      } else if (type === 'paragraph' || type === 'p' || type === 'text') {
        markdownParts.push(text);
      } else {
        markdownParts.push(text);
      }
    }
    return markdownParts.join('\n\n');
  }

  const parts: string[] = [];

  // Match the user's specific backend fields
  if (data.h1) parts.push(`# ${data.h1}`);
  
  if (data.paragraph) {
    if (Array.isArray(data.paragraph)) {
      parts.push(...data.paragraph.map((p: any) => String(p)));
    } else {
      parts.push(String(data.paragraph));
    }
  }

  if (data.h2) parts.push(`## ${data.h2}`);
  if (data.h3) parts.push(`### ${data.h3}`);
  if (data.h4) parts.push(`#### ${data.h4}`);

  return parts.join('\n\n');
}

// Convert Firestore document snapshot to BlogArticle object
function mapDocToBlogArticle(docSnap: any): BlogArticle {
  const data = docSnap.data();
  const slug = typeof data.slug === 'string' ? data.slug.trim() : docSnap.id;

  // Resolve fields safely, converting numbers/primitives and checking objects
  let title = '';
  const rawTitle = data.mainTitle || data['main title'] || data.title;
  if (rawTitle !== undefined && rawTitle !== null && typeof rawTitle !== 'object') {
    title = String(rawTitle).trim();
  }

  let category = '';
  const rawCategory = data.tag || data.category;
  if (rawCategory !== undefined && rawCategory !== null && typeof rawCategory !== 'object') {
    category = String(rawCategory).trim();
  }

  let summary = '';
  const rawSummary = data.shortDescription || data['short description'] || data.summary;
  if (rawSummary !== undefined && rawSummary !== null && typeof rawSummary !== 'object') {
    summary = String(rawSummary).trim();
  }

  let readingTime = '';
  const rawReadingTime = data.readTime || data['Read Time'] || data.readingTime;
  if (rawReadingTime !== undefined && rawReadingTime !== null && typeof rawReadingTime !== 'object') {
    readingTime = String(rawReadingTime).trim();
  }

  let imageUrl = '';
  const rawImageUrl = data.coverImageUrl || data.coverImage || data['cover image'] || data.imageUrl || data.cover_image || data.image;
  if (typeof rawImageUrl === 'string') {
    imageUrl = rawImageUrl.trim();
  } else if (rawImageUrl && typeof rawImageUrl === 'object') {
    const objUrl = rawImageUrl.secure_url || rawImageUrl.secureUrl || rawImageUrl.url || rawImageUrl.optimizedUrl || rawImageUrl.originalUrl;
    if (typeof objUrl === 'string') {
      imageUrl = objUrl.trim();
    }
  }

  const date = formatBlogDate(data.date || data.createdAt);
  const content = buildBlogContent(data);

  return {
    slug,
    title,
    summary,
    date,
    readingTime,
    imageUrl,
    content,
    category
  };
}

// Fetch all blogs from Firestore (with static fallback)
export async function getBlogs(): Promise<BlogArticle[]> {
  try {
    const q = collection(db, 'blogs');
    const snapshot = await getDocs(q);

    interface SortingArticle {
      article: BlogArticle;
      timestamp: number;
    }

    const fetchedBlogs: SortingArticle[] = [];
    if (!snapshot.empty) {
      snapshot.docs.forEach(doc => {
        const article = mapDocToBlogArticle(doc);
        const data = doc.data();
        let timestamp = 0;
        if (data.createdAt && typeof data.createdAt.seconds === 'number') {
          timestamp = data.createdAt.seconds * 1000;
        } else if (data.date) {
          const parsed = new Date(formatBlogDate(data.date)).getTime();
          timestamp = isNaN(parsed) ? Date.now() : parsed;
        } else {
          timestamp = Date.now();
        }
        fetchedBlogs.push({ article, timestamp });
      });
    }

    // Merge Firestore articles with preset static articles.
    const mergedBlogs = [...fetchedBlogs];
    for (const staticArticle of blogArticles) {
      if (!mergedBlogs.some(b => b.article.slug === staticArticle.slug)) {
        const parsed = new Date(staticArticle.date).getTime();
        const timestamp = isNaN(parsed) ? 0 : parsed;
        mergedBlogs.push({ article: staticArticle, timestamp });
      }
    }
    
    // Sort all blogs by timestamp (descending, newest first)
    mergedBlogs.sort((a, b) => b.timestamp - a.timestamp);
    
    return mergedBlogs.map(item => item.article);
  } catch (error) {
    console.error('Error fetching blogs from Firestore:', error);
    return blogArticles; // Safe fallback on error
  }
}

// Fetch a single blog by slug (with static fallback)
export async function getBlogBySlug(slug: string): Promise<BlogArticle | null> {
  try {
    const q = collection(db, 'blogs');
    const snapshot = await getDocs(q);

    // Search inside the Firestore documents
    const docMatch = snapshot.docs.find(doc => {
      const data = doc.data();
      return doc.id === slug || data.slug === slug;
    });

    if (docMatch) {
      return mapDocToBlogArticle(docMatch);
    }
  } catch (error) {
    console.error(`Error fetching blog by slug '${slug}' from Firestore:`, error);
  }

  // Fallback to static search if Firestore does not contain this slug
  return blogArticles.find(a => a.slug === slug) || null;
}
