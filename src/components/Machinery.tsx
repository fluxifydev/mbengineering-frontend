'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

interface MachineryProps {
  onRequestQuote: (machineName: string) => void;
}

interface RenderProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  specifications: { key: string; value: string }[];
  brochureUrl?: string;
}

export default function Machinery({ onRequestQuote }: MachineryProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [products, setProducts] = useState<RenderProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const list = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || '',
              description: data.description || '',
              imageUrl: data.imageUrl || '',
              specifications: data.specifications || [],
              brochureUrl: data.brochureUrl || '',
            };
          });
          setProducts(list);
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
    fetchProducts();
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-16 md:py-24 lg:py-xl bg-surface-container-low scroll-mt-20 overflow-hidden" id="machinery">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary tracking-tight">Advanced Machinery</h2>
            <p className="text-sm sm:text-base text-on-surface-variant">
              Engineered for endurance and high-precision output. Discover our core product lineup for the converting and printing industry.
            </p>
          </div>
          {/* Slider Chevrons */}
          <div className="flex gap-2.5 self-end shrink-0">
            <button 
              onClick={() => handleScroll('left')}
              className="p-3 border border-outline-variant rounded-lg hover:bg-white active:scale-95 transition-all cursor-pointer flex items-center justify-center text-on-surface-variant hover:text-primary"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className="p-3 bg-primary text-white rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center justify-center shadow-md shadow-primary/10"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Products Flex / Grid Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth gap-gutter pb-6 -mx-margin-mobile px-margin-mobile lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3"
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-outline-variant/60 overflow-hidden shadow-lg w-[80vw] sm:w-[48vw] lg:w-auto shrink-0 lg:shrink flex flex-col justify-between h-[350px] sm:h-[380px] lg:h-[400px]"
              >
                <div className="h-40 sm:h-44 lg:h-48 overflow-hidden bg-slate-100/70 animate-pulse flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined text-3xl">precision_manufacturing</span>
                </div>
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-5 bg-slate-100/80 animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-slate-100/80 animate-pulse rounded w-5/6" />
                    <div className="h-4 bg-slate-100/80 animate-pulse rounded w-2/3" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="h-10 bg-slate-100/80 animate-pulse rounded-lg" />
                    <div className="h-10 bg-slate-100/80 animate-pulse rounded-lg" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <Link 
                key={product.id} 
                href={`/products/${product.id}`}
                className="bg-white rounded-xl border border-outline-variant/60 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 w-[80vw] sm:w-[48vw] lg:w-auto shrink-0 lg:shrink flex flex-col justify-between h-[350px] sm:h-[380px] lg:h-[400px] cursor-pointer group hover:border-primary/55"
              >
                {/* Media container */}
                <div className="h-40 sm:h-44 lg:h-48 overflow-hidden relative bg-slate-100/70 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
                  {product.imageUrl ? (
                    <Image 
                      alt={product.name}
                      src={product.imageUrl}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 80vw, (max-width: 1024px) 48vw, 33vw"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-3xl transition-transform group-hover:scale-105">precision_manufacturing</span>
                  )}
                </div>

                {/* Text content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between overflow-hidden">
                  <div className="space-y-2.5 min-w-0">
                    <h3 className="font-display text-base sm:text-lg font-bold text-primary truncate leading-tight group-hover:text-primary-container">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-3 font-medium leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRequestQuote(product.name);
                      }}
                      className="h-10 border border-outline-variant hover:bg-surface-container rounded-lg flex items-center justify-center text-xs font-bold text-on-surface-variant cursor-pointer transition-all active:scale-[0.97]"
                    >
                      Enquire Now
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const msg = encodeURIComponent(`Hello, I would like to inquire about the ${product.name} parameters and options.`);
                        window.open(`https://wa.me/919345323173?text=${msg}`, '_blank');
                      }}
                      className="h-10 bg-[#25D366]/90 hover:bg-[#25D366] text-white rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer transition-all active:scale-[0.97]"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      WhatsApp
                    </button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* View All Products Link */}
        <div className="mt-12 text-center">
          <span className="text-primary font-bold border-b-2 border-primary pb-0.5 text-xs sm:text-sm cursor-default select-none">
            View All Products
          </span>
        </div>
      </div>
    </section>
  );
}
