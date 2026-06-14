'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ProductCard, { RenderProduct } from './ProductCard';
import { getCachedProducts } from '@/lib/productsCache';

interface MachineryProps {
  onRequestQuote: (machineName: string) => void;
  hideHeader?: boolean;
}

export default function Machinery({ onRequestQuote, hideHeader = false }: MachineryProps) {
  const [products, setProducts] = useState<RenderProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const list = await getCachedProducts();
        setProducts(list);
      } catch (error) {
        console.error('Error loading products in Machinery:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Group products by category
  const categoriesMap = useMemo(() => {
    const map: Record<string, RenderProduct[]> = {};
    products.forEach((product) => {
      const cat = product.category ? product.category.trim() : 'General Machinery';
      if (!map[cat]) {
        map[cat] = [];
      }
      map[cat].push(product);
    });
    return map;
  }, [products]);

  const categoryNames = useMemo(() => {
    return Object.keys(categoriesMap).sort((a, b) => {
      // Keep 'General Machinery' at the end, otherwise sort alphabetically
      if (a === 'General Machinery') return 1;
      if (b === 'General Machinery') return -1;
      return a.localeCompare(b);
    });
  }, [categoriesMap]);

  return (
    <section className="py-16 md:py-24 lg:py-xl bg-surface-container-low scroll-mt-20 overflow-hidden" id="machinery">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Main Section Header */}
        {!hideHeader && (
          <div className="max-w-2xl space-y-4 mb-16 text-left">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary tracking-tight">
              Our Machinery
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant">
              Engineered for endurance and high-precision output. Discover our industrial product lineup categorized for your engineering needs.
            </p>
          </div>
        )}

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
          // Empty Catalog State
          <div className="text-center py-12 bg-white rounded-2xl border border-outline-variant/50 shadow-sm">
            <span className="material-symbols-outlined text-5xl text-primary/40 mb-3">
              precision_manufacturing
            </span>
            <p className="text-on-surface-variant font-medium">No products available at the moment.</p>
          </div>
        ) : (
          // Render grouped categories (Default layout)
          <div className="space-y-16">
            {categoryNames.map((categoryName) => {
              const categoryProducts = categoriesMap[categoryName];
              // In one category must show only 3 products
              const displayedProducts = categoryProducts.slice(0, 3);

              return (
                <div key={categoryName} className="border-b border-outline-variant/30 pb-12 last:border-b-0 last:pb-0">
                  {/* Category Title Subheading */}
                  <div className="flex items-center gap-3 border-l-4 border-accent pl-3 mb-8">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-primary tracking-tight capitalize">
                      {categoryName}
                    </h3>
                  </div>

                  {/* Horizontal scrolling on mobile, 3-column grid on desktop */}
                  <div className="flex overflow-x-auto no-scrollbar scroll-smooth gap-gutter pb-6 -mx-margin-mobile px-margin-mobile lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3">
                    {displayedProducts.map((product) => (
                      <div key={product.id} className="w-[80vw] sm:w-[48vw] lg:w-full shrink-0 lg:shrink flex">
                        <ProductCard 
                          product={product} 
                          onRequestQuote={onRequestQuote} 
                        />
                      </div>
                    ))}
                  </div>

                  {/* View More Link at the end of each category */}
                  <div className="mt-4 flex justify-end">
                    <Link 
                      href={`/categories/${encodeURIComponent(categoryName)}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent hover:text-accent/80 transition-colors group"
                    >
                      <span>view more ({categoryName})</span>
                      <span className="material-symbols-outlined text-sm font-bold transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
