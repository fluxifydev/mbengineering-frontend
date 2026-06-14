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
  if (data.content) {
    return String(data.content);
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
  const slug = data.slug || docSnap.id;

  // Resolve fields (handling camelCase, spaced keys, and lowercase keys)
  const title = data.mainTitle || data['main title'] || data.title || '';
  const category = data.tag || data.category || '';
  const summary = data.shortDescription || data['short description'] || data.summary || '';
  const readingTime = data.readTime || data['Read Time'] || data.readingTime || '';
  const imageUrl = data.coverImage || data['cover image'] || data.imageUrl || '';
  const date = formatBlogDate(data.date);
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

    if (snapshot.empty) {
      return blogArticles; // Fallback to static seed data
    }

    const fetchedBlogs = snapshot.docs.map(doc => mapDocToBlogArticle(doc));
    
    // Sort by date (descending, parsing dates or using position)
    return fetchedBlogs.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (!isNaN(dateA) && !isNaN(dateB)) {
        return dateB - dateA;
      }
      return 0;
    });
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
