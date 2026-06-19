import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export interface HeroBanner {
  id?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  createdAt?: any;
}

/**
 * Fetch all banners from Firestore collection "banners" sorted by createdAt descending.
 * Maps dynamic and legacy fields safely.
 */
export async function getBanners(): Promise<HeroBanner[]> {
  try {
    const q = query(collection(db, 'banners'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const fetchedBanners: HeroBanner[] = [];
    if (!snapshot.empty) {
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        
        // Safely resolve properties matching standard and custom fields
        const title = String(data.mainTitle || data.title || data.heading || '').trim();
        const description = String(data.shortDescription || data.description || '').trim();
        const buttonText = String(data.button || data.buttonText || 'Explore Machines').trim();
        const buttonLink = String(data.buttonLink || data.buttonUrl || data.buttonURL || data.link || data.url || data.btnLink || '').trim();
        
        // Resolve image url from Cloudinary response object or string
        let imageUrl = '';
        const rawImageUrl = data.imageUrl || data.image || data.coverImageUrl;
        if (typeof rawImageUrl === 'string') {
          imageUrl = rawImageUrl.trim();
        } else if (rawImageUrl && typeof rawImageUrl === 'object') {
          imageUrl = String(rawImageUrl.secure_url || rawImageUrl.secureUrl || rawImageUrl.url || '').trim();
        }

        // Only include if we have a title and image
        if (title && imageUrl) {
          fetchedBanners.push({
            id: doc.id,
            title,
            description,
            buttonText,
            buttonLink,
            imageUrl,
            createdAt: data.createdAt
          });
        }
      });
    }

    return fetchedBanners;
  } catch (error) {
    console.error('Error fetching banners from Firestore:', error);
    return [];
  }
}
