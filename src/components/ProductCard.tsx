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
              className="flex-1 h-10 bg-[#25D366]/90 hover:bg-[#25D366] text-white rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer transition-all active:scale-[0.97]"
            >
              <span className="material-symbols-outlined text-sm font-bold">chat</span>
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
