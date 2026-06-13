'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import QuoteModal from '@/components/QuoteModal';
import { getCachedProducts } from '@/lib/productsCache';
import { RenderProduct } from '@/components/ProductCard';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams?.get('q') || '';

  const [products, setProducts] = useState<RenderProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getCachedProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products for search page:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    const cleanQuery = query.toLowerCase().trim();
    return products.filter((product) => {
      const nameMatch = product.name?.toLowerCase().includes(cleanQuery);
      const categoryMatch = product.category?.toLowerCase().includes(cleanQuery);
      const subcategoryMatch = product.subcategory?.toLowerCase().includes(cleanQuery);
      return nameMatch || categoryMatch || subcategoryMatch;
    });
  }, [products, query]);

  const handleOpenQuote = (machineName: string = '') => {
    setSelectedMachine(machineName);
    setIsQuoteOpen(true);
  };

  return (
    <>
      <Header onRequestQuote={() => handleOpenQuote('General Search Inquiry')} />

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
            <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
              Search Results
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
              Showing search results for &ldquo;<span className="text-primary font-bold">{query}</span>&rdquo;
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
        ) : filteredProducts.length === 0 ? (
          // Empty State
          <div className="text-center py-16 bg-white rounded-2xl border border-outline-variant/50 shadow-sm flex-1 flex flex-col justify-center items-center">
            <span className="material-symbols-outlined text-5xl text-primary/40 mb-3 animate-pulse">
              search_off
            </span>
            <h3 className="font-bold text-lg text-primary">No Matching Machinery Found</h3>
            <p className="text-on-surface-variant max-w-sm mt-1 text-sm">
              We couldn&apos;t find any catalog models matching &ldquo;{query}&rdquo;. Please try different search keywords or contact us for custom options.
            </p>
          </div>
        ) : (
          // Search results Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter animate-fade-in">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onRequestQuote={handleOpenQuote} 
              />
            ))}
          </div>
        )}
      </main>

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

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
