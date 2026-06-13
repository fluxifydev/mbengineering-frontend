import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { RenderProduct } from '@/components/ProductCard';

let cachedProducts: RenderProduct[] | null = null;

export async function getCachedProducts(): Promise<RenderProduct[]> {
  if (cachedProducts) {
    return cachedProducts;
  }
  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      cachedProducts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          description: data.description || '',
          imageUrl: data.imageUrl || '',
          specifications: data.specifications || [],
          brochureUrl: data.brochureUrl || '',
          category: data.category || '',
          subcategory: data.subcategory || '',
          imageUrls: data.imageUrls || [],
        };
      });
      return cachedProducts;
    }
  } catch (error) {
    console.error('Error fetching products for cache:', error);
  }
  return [];
}
