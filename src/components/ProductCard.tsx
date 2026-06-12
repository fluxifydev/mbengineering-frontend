'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface RenderProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  specifications: { key: string; value: string }[];
  brochureUrl?: string;
  category?: string;
  subcategory?: string;
  imageUrls?: string[];
}

interface ProductCardProps {
  product: RenderProduct;
  onRequestQuote: (machineName: string) => void;
}

export default function ProductCard({ product, onRequestQuote }: ProductCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Construct a beautiful, premium, prefilled WhatsApp message
    const messageText = `Hello MB Engineering Works,\n\nI am interested in your *${product.name}* and would like to receive technical specifications, pricing, and availability details.\n\nProduct Page: ${window.location.origin}/products/${product.id}`;
    const encodedMessage = encodeURIComponent(messageText);
    
    window.open(`https://wa.me/919345323173?text=${encodedMessage}`, '_blank');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-xl border border-outline-variant/60 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 w-[80vw] sm:w-[48vw] lg:w-full shrink-0 lg:shrink flex flex-col justify-between h-[410px] sm:h-[430px] lg:h-[450px] cursor-pointer group hover:border-primary/55 select-none"
    >
      {/* Media container */}
      <div className="h-44 sm:h-48 lg:h-52 overflow-hidden relative bg-slate-100/70 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors shrink-0">
        {product.imageUrl ? (
          <Image 
            alt={product.name}
            src={product.imageUrl}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 48vw, 33vw"
          />
        ) : (
          <span className="material-symbols-outlined text-3xl transition-transform group-hover:scale-105">
            precision_manufacturing
          </span>
        )}
      </div>

      {/* Text content & buttons */}
      <div className="p-5 flex-1 flex flex-col justify-between overflow-hidden">
        <div className="space-y-2 min-w-0">
          <h3 className="font-display text-base sm:text-lg font-bold text-primary truncate leading-tight group-hover:text-primary-container">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-3 font-medium leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* 3 Buttons Grid */}
        <div className="space-y-2 pt-3 shrink-0">
          {/* Button 1: View for more details */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCardClick();
            }}
            className="w-full h-10 border border-primary text-primary hover:bg-primary/5 rounded-lg flex items-center justify-center text-xs font-bold transition-all active:scale-[0.97] cursor-pointer"
          >
            View for more details
          </button>
          
          <div className="flex gap-2">
            {/* Button 2: Enquiry Now */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRequestQuote(product.name);
              }}
              className="flex-1 h-10 border border-outline-variant hover:bg-surface-container rounded-lg flex items-center justify-center text-xs font-bold text-on-surface-variant cursor-pointer transition-all active:scale-[0.97]"
            >
              Enquiry Now
            </button>
            
            {/* Button 3: WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="flex-1 h-10 bg-[#25D366]/90 hover:bg-[#25D366] text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold cursor-pointer transition-all active:scale-[0.97]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current shrink-0">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
