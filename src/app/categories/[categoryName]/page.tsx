'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import ProductCard, { RenderProduct } from '@/components/ProductCard';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const rawCategoryName = params?.categoryName as string;
  const categoryName = decodeURIComponent(rawCategoryName || '');

  const [products, setProducts] = useState<RenderProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState('');

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const allProducts = snapshot.docs.map(doc => {
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

          // Filter by category case-insensitively
          const filtered = allProducts.filter(
            p => (p.category ? p.category.trim().toLowerCase() : 'general machinery') === categoryName.toLowerCase()
          );
          setProducts(filtered);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products from Firestore:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchCategoryProducts();
    }
  }, [categoryName]);

  const handleOpenQuote = (machineName: string = '') => {
    setSelectedMachine(machineName);
    setIsQuoteOpen(true);
  };

  // Group filtered products by subcategory
  const subcategoriesMap: Record<string, RenderProduct[]> = {};
  products.forEach((product) => {
    const subcat = product.subcategory ? product.subcategory.trim() : 'General';
    if (!subcategoriesMap[subcat]) {
      subcategoriesMap[subcat] = [];
    }
    subcategoriesMap[subcat].push(product);
  });

  const subcategoryNames = Object.keys(subcategoriesMap).sort((a, b) => {
    if (a === 'General') return 1;
    if (b === 'General') return -1;
    return a.localeCompare(b);
  });

  const hasSubcategories = products.some(
    p => p.subcategory && p.subcategory.trim() !== ''
  );

  return (
    <>
      {/* Header */}
      <Header onRequestQuote={() => handleOpenQuote('General Category Inquiry')} />

      <main className="pt-28 pb-16 md:pt-32 md:pb-24 w-full px-margin-mobile md:px-margin-desktop min-h-[70vh] flex flex-col space-y-10">
        
        {/* Back and Page Header */}
        <div className="space-y-4">
          <button 
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-primary font-bold text-xs sm:text-sm hover:underline cursor-pointer group shrink-0"
          >
            <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            Back to Machinery Catalog
          </button>
          
          <div className="space-y-2 w-full">
            <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary tracking-tight capitalize leading-tight">
              {categoryName}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
              Explore our full range of industrial converting and printing solutions under the {categoryName} sector.
            </p>
          </div>
        </div>

        {loading ? (
          // Loading skeleton state
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-outline-variant/60 overflow-hidden shadow-lg flex flex-col justify-between h-[410px] sm:h-[430px] lg:h-[450px]"
              >
                <div className="h-44 sm:h-48 lg:h-52 overflow-hidden bg-slate-100/70 animate-pulse flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined text-3xl">precision_manufacturing</span>
                </div>
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-5 bg-slate-100/80 animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-slate-100/80 animate-pulse rounded w-5/6" />
                    <div className="h-4 bg-slate-100/80 animate-pulse rounded w-2/3" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="h-10 bg-slate-100/80 animate-pulse rounded-lg w-full" />
                    <div className="flex gap-2">
                      <div className="h-10 bg-slate-100/80 animate-pulse rounded-lg flex-1" />
                      <div className="h-10 bg-slate-100/80 animate-pulse rounded-lg flex-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          // Empty State
          <div className="text-center py-16 bg-white rounded-2xl border border-outline-variant/50 shadow-sm flex-1 flex flex-col justify-center items-center">
            <span className="material-symbols-outlined text-5xl text-primary/40 mb-3 animate-pulse">
              precision_manufacturing
            </span>
            <h3 className="font-bold text-lg text-primary">No Machinery Found</h3>
            <p className="text-on-surface-variant max-w-sm mt-1 text-sm">
              We currently don't have catalog models listed under this category. Please check back later or send an inquiry.
            </p>
          </div>
        ) : !hasSubcategories ? (
          // Simple Grid Layout when no subcategories are defined
          <div className="flex overflow-x-auto no-scrollbar scroll-smooth gap-gutter pb-6 -mx-margin-mobile px-margin-mobile lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onRequestQuote={handleOpenQuote} 
              />
            ))}
          </div>
        ) : (
          // Grouped Vertical Subcategory Sections
          <div className="space-y-12">
            {subcategoryNames.map((subcategoryName) => {
              const subcatProducts = subcategoriesMap[subcategoryName];
              if (subcatProducts.length === 0) return null;

              return (
                <div key={subcategoryName} className="border-b border-outline-variant/30 pb-10 last:border-b-0 last:pb-0">
                  {/* Subcategory Title */}
                  <div className="flex items-center gap-2 mb-6 pl-2.5 border-l-2 border-primary/70">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-primary tracking-tight capitalize leading-none">
                      {subcategoryName}
                    </h3>
                  </div>

                  {/* 3-column Grid for products in this subcategory */}
                  <div className="flex overflow-x-auto no-scrollbar scroll-smooth gap-gutter pb-6 -mx-margin-mobile px-margin-mobile lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3">
                    {subcatProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onRequestQuote={handleOpenQuote} 
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Quote Inquiry Modal */}
      <QuoteModal 
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialMachine={selectedMachine}
      />
    </>
  );
}
