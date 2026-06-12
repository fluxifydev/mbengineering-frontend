'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface RenderProduct {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  imageUrls?: string[];
  specifications: { key: string; value: string }[];
  brochureUrl?: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<RenderProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct({
            id: docSnap.id,
            name: data.name || '',
            description: data.description || '',
            imageUrl: data.imageUrl || '',
            imageUrls: data.imageUrls || data.images || [],
            specifications: data.specifications || [],
            brochureUrl: data.brochureUrl || '',
          });
          setActiveImageIdx(0);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product details from Firestore:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  if (loading) {
    return (
      <>
        <Header onRequestQuote={() => setIsQuoteOpen(true)} />
        <main className="pt-28 pb-16 md:pt-32 md:pb-24 max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop space-y-12">
          <div className="h-6 bg-slate-100 animate-pulse rounded w-32" />
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-gutter items-start">
            <div className="col-span-12 lg:col-span-7 space-y-4">
              <div className="w-full aspect-[4/3] rounded-2xl bg-slate-100 animate-pulse" />
            </div>
            <div className="col-span-12 lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <div className="h-10 bg-slate-100 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-slate-100 animate-pulse rounded w-1/4" />
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-100 animate-pulse rounded w-full" />
                <div className="h-4 bg-slate-100 animate-pulse rounded w-5/6" />
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-slate-100 animate-pulse rounded w-1/3" />
                <div className="border border-outline-variant/60 rounded-xl overflow-hidden bg-slate-50 p-4 space-y-3">
                  <div className="h-4 bg-slate-100 animate-pulse rounded w-full" />
                  <div className="h-4 bg-slate-100 animate-pulse rounded w-full" />
                  <div className="h-4 bg-slate-100 animate-pulse rounded w-full" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header onRequestQuote={() => setIsQuoteOpen(true)} />
        <main className="pt-28 pb-16 md:pt-32 md:pb-24 max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop min-h-[50vh] flex flex-col items-center justify-center text-center space-y-6">
          <span className="material-symbols-outlined text-6xl text-primary animate-bounce">precision_manufacturing</span>
          <h2 className="font-display text-3xl font-bold text-primary">Machinery Model Not Found</h2>
          <p className="text-on-surface-variant max-w-[480px]">
            The requested industrial machine model does not exist in our catalog database or may have been updated.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="bg-primary text-white px-8 py-3 rounded-lg font-button font-bold text-sm hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-primary/10"
          >
            Return to Homepage
          </button>
        </main>
        <Footer />
      </>
    );
  }

  // Build the list of images to render (prefers multiple images from backend, otherwise single imageUrl)
  const images = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls
    : (product.imageUrl ? [product.imageUrl] : []);

  const handleWhatsAppChat = () => {
    const msg = encodeURIComponent(`Hello MB Engineering Works,\n\nI am interested in your *${product.name}* and would like to receive detailed specifications and delivery timelines.\n\nProduct Page: ${window.location.origin}/products/${product.id}`);
    window.open(`https://wa.me/919345323173?text=${msg}`, '_blank');
  };

  const handleBrochureDownload = () => {
    if (product.brochureUrl) {
      window.open(product.brochureUrl, '_blank');
    } else {
      alert(`Engineering brochure is not currently uploaded for ${product.name}. Please request a quote for detailed catalog parameters.`);
    }
  };

  return (
    <>
      <Header onRequestQuote={() => setIsQuoteOpen(true)} />
      
      <main className="pt-28 pb-16 md:pt-32 md:pb-24 max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop space-y-12">
        {/* Back navigation */}
        <button 
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 text-primary font-bold text-xs sm:text-sm hover:underline cursor-pointer group shrink-0"
        >
          <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
          Back to Machinery Catalog
        </button>

        {/* Product Details Split Grid */}
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-gutter items-start">
          
          {/* Left Column: Image Viewer Gallery */}
          <div className="col-span-12 lg:col-span-7 space-y-4">
            {/* Active Image frame */}
            <div 
              onClick={() => images.length > 0 && setIsLightboxOpen(true)}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-outline-variant/60 bg-slate-100 shadow-md cursor-zoom-in group/image"
            >
              {images.length > 0 ? (
                <>
                  <Image 
                    alt={`${product.name} active display`}
                    className="object-cover group-hover/image:scale-[1.02] transition-transform duration-500" 
                    src={images[activeImageIdx]}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                  {/* Magnifying badge on hover */}
                  <div className="absolute bottom-4 right-4 bg-slate-900/60 backdrop-blur-sm text-white p-2.5 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">zoom_in</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 gap-2">
                  <span className="material-symbols-outlined text-5xl">precision_manufacturing</span>
                  <span className="text-xs font-bold font-label uppercase tracking-wider">No Image Available</span>
                </div>
              )}
            </div>

            {/* Thumbnail selector row (rendered if multiple images exist) */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
                {images.map((img, idx) => {
                  const isActive = activeImageIdx === idx;
                  return (
                    <button 
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-20 sm:w-24 aspect-video rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${isActive ? 'border-primary shadow-md scale-102' : 'border-outline-variant/60 opacity-70 hover:opacity-100'}`}
                      aria-label={`Select product detail view ${idx + 1}`}
                    >
                      <Image 
                        alt={`${product.name} detail view ${idx + 1}`}
                        className="object-cover" 
                        src={img}
                        fill
                        sizes="96px"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Descriptions, Specs, and Actions */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
            {/* Titles */}
            <div className="space-y-3">
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-xs font-label uppercase tracking-widest text-secondary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
                Industrial Machinery Class-A
              </p>
            </div>

            {/* Description Copy */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-primary">Overview & Capability</h3>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* B2B Technical Specifications Grid */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-primary">Technical Parameters</h3>
              {product.specifications && product.specifications.length > 0 ? (
                <div className="border border-outline-variant/60 rounded-xl overflow-hidden bg-white shadow-sm">
                  {product.specifications.map((spec, idx) => (
                    <div 
                      key={idx} 
                      className={`grid grid-cols-2 p-3.5 sm:p-4 text-xs sm:text-sm ${idx !== 0 ? 'border-t border-outline-variant/30' : ''} ${idx % 2 === 0 ? 'bg-surface-container-low/50' : 'bg-white'}`}
                    >
                      <span className="font-bold text-primary">{spec.key}</span>
                      <span className="text-on-surface-variant font-semibold text-right sm:text-left">{spec.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-on-surface-variant italic font-medium">
                  Technical specifications are currently being updated by the engineering team.
                </p>
              )}
            </div>

            {/* B2B Call-To-Action buttons */}
            <div className="pt-4 border-t border-outline-variant/50 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setIsQuoteOpen(true)}
                className="flex-1 bg-accent text-white py-3.5 rounded-lg font-button font-bold text-xs sm:text-sm hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-accent/25 text-center"
              >
                Inquiry Now
              </button>
              <button 
                onClick={handleBrochureDownload}
                className="flex-1 border border-outline-variant py-3.5 rounded-lg font-button font-bold text-xs sm:text-sm hover:bg-surface-container transition-all cursor-pointer text-on-surface-variant text-center"
              >
                Download Brochure
              </button>
              <button 
                onClick={handleWhatsAppChat}
                className="bg-[#25D366] text-white px-6 py-3.5 rounded-lg font-button font-bold text-xs sm:text-sm hover:bg-[#20ba56] active:scale-[0.98] transition-all cursor-pointer shadow-md text-center flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current shrink-0">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                WhatsApp Inquiry
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* Inquiry Quote Modal Popup */}
      <QuoteModal 
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialMachine={product.name}
      />

      {/* Lightbox Modal Popup */}
      {isLightboxOpen && images.length > 0 && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/95 backdrop-blur-md animate-fade-in select-none">
          {/* Backdrop Click */}
          <div 
            className="absolute inset-0 cursor-zoom-out" 
            onClick={() => setIsLightboxOpen(false)}
          />
          
          {/* Close Button */}
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors cursor-pointer z-10 flex items-center justify-center p-2 rounded-full bg-slate-900/50 hover:bg-slate-900/80 backdrop-blur-sm border border-white/10"
            aria-label="Close lightbox"
          >
            <span className="material-symbols-outlined text-2xl font-bold">close</span>
          </button>
          
          {/* Main Image View */}
          <div className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="relative w-full h-full">
              <Image 
                alt={`${product.name} large view`}
                src={images[activeImageIdx]}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            
            {/* Image Counter & Title Pill */}
            <div className="mt-4 text-center z-10 bg-slate-900/60 backdrop-blur-sm border border-white/10 px-5 py-2 rounded-full">
              <p className="text-white text-xs font-bold tracking-wider font-label uppercase">
                {product.name} — {activeImageIdx + 1} of {images.length}
              </p>
            </div>
          </div>

          {/* Navigation Arrows for Lightbox if multiple images */}
          {images.length > 1 && (
            <>
              {/* Left Arrow */}
              <button 
                onClick={() => setActiveImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 p-3 bg-slate-900/50 hover:bg-slate-900/85 text-white/80 hover:text-white rounded-lg border border-white/10 cursor-pointer backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined font-bold">chevron_left</span>
              </button>
              {/* Right Arrow */}
              <button 
                onClick={() => setActiveImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 p-3 bg-slate-900/50 hover:bg-slate-900/85 text-white/80 hover:text-white rounded-lg border border-white/10 cursor-pointer backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                aria-label="Next image"
              >
                <span className="material-symbols-outlined font-bold">chevron_right</span>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
