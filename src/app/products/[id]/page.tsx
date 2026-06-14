import ProductDetailClient from './ProductDetailClient';
import type { Metadata } from 'next';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const name = data.name || 'Industrial Machine';
      const description = data.description || 'Precision engineering solution by MB Engineering Works.';
      const imageUrl = data.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuA8pfsrELa6NAoqq-Pdz2yF8hwdx2uUtdO9cTjwrZ2bqcUN_MZPpWKSSiLX2FFvFwc3EzK0xmTLTNkJxKFPdQN9EZSFVo-RT4Xch_r6v2D9W5tn-cXJZajWJqfdTBtEXm46S4bE1J1w5482nq9VfNj9fcRNzKDdHc1_5N8gp3PuUIn3FCek4KDIt9PHUtkDXAC_vi_vOxUNJDP_BAEfnCHnMeCVt4fkyfNrEYf6T3Ks9ZOq6yTjHEpXjdZr5Kc22mGxI1JwLB_EZ8A";
      return {
        title: `${name} | MB Engineering Works`,
        description: description,
        openGraph: {
          title: `${name} | MB Engineering Works`,
          description: description,
          url: `https://www.mbengineering.online/products/${id}`,
          images: [{ url: imageUrl, alt: name }],
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: `${name} | MB Engineering Works`,
          description: description,
          images: [imageUrl],
        }
      };
    }
  } catch (error) {
    console.error('Error fetching metadata for product:', error);
  }

  return {
    title: 'Precision Machinery Model | MB Engineering Works',
    description: 'High-performance industrial machinery designed and manufactured by MB Engineering Works.',
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  let productJsonLd: any = null;

  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const name = data.name || 'Industrial Machine';
      const description = data.description || 'Precision engineering solution by MB Engineering Works.';
      const imageUrl = data.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuA8pfsrELa6NAoqq-Pdz2yF8hwdx2uUtdO9cTjwrZ2bqcUN_MZPpWKSSiLX2FFvFwc3EzK0xmTLTNkJxKFPdQN9EZSFVo-RT4Xch_r6v2D9W5tn-cXJZajWJqfdTBtEXm46S4bE1J1w5482nq9VfNj9fcRNzKDdHc1_5N8gp3PuUIn3FCek4KDIt9PHUtkDXAC_vi_vOxUNJDP_BAEfnCHnMeCVt4fkyfNrEYf6T3Ks9ZOq6yTjHEpXjdZr5Kc22mGxI1JwLB_EZ8A";
      productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": name,
        "image": imageUrl,
        "description": description,
        "brand": {
          "@type": "Brand",
          "name": "MB Engineering Works"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "0",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "priceType": "https://schema.org/ListPrice",
            "description": "Contact for B2B pricing quote"
          },
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "MB Engineering Works"
          }
        }
      };
    }
  } catch (error) {
    console.error('Error fetching dynamic JSON-LD for product page:', error);
  }

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <ProductDetailClient id={id} />
    </>
  );
}
