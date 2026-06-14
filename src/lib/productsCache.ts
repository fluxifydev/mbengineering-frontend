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
          name: typeof data.name === 'string' ? data.name : '',
          description: typeof data.description === 'string' ? data.description : '',
          imageUrl: typeof data.imageUrl === 'string' ? data.imageUrl : '',
          specifications: Array.isArray(data.specifications) ? data.specifications : [],
          brochureUrl: typeof data.brochureUrl === 'string' ? data.brochureUrl : '',
          category: typeof data.category === 'string' ? data.category : '',
          subcategory: typeof data.subcategory === 'string' ? data.subcategory : '',
          imageUrls: Array.isArray(data.imageUrls) 
            ? data.imageUrls.filter((url: any): url is string => typeof url === 'string' && url.trim() !== '') 
            : [],
        };
      });
      return cachedProducts;
    }
  } catch (error) {
    console.error('Error fetching products for cache:', error);
  }
  return [];
}
