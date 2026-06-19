'use client';

import React, { useState, useEffect } from 'react';
import ShaderCanvas from './ShaderCanvas';
import { getBanners } from '@/lib/banners';

interface HeroProps {
  onRequestQuote: () => void;
}

interface SlideItem {
  title: string;
  description: string;
  image: string;
  alt: string;
  buttonText: string;
  buttonLink?: string;
}

export default function Hero({ onRequestQuote }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSlides, setActiveSlides] = useState<SlideItem[]>([]);
  const [loading, setLoading] = useState(true);

  const highlights = [
    { icon: 'check_circle', text: '18+ Years' },
    { icon: 'public', text: 'Global Exports' },
    { icon: 'settings_input_component', text: 'Custom Solutions' },
    { icon: 'support_agent', text: '24/7 Support' },
  ];

  useEffect(() => {
    async function loadDynamicBanners() {
      try {
        const fetched = await getBanners();
        if (fetched && fetched.length > 0) {
          const mapped = fetched.map(b => ({
            title: b.title,
            description: b.description,
            image: b.imageUrl,
            alt: b.title,
            buttonText: b.buttonText || 'Explore Machines',
            buttonLink: b.buttonLink
          }));
          setActiveSlides(mapped);
        }
      } catch (err) {
        console.error('Failed to load dynamic banners:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDynamicBanners();
  }, []);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex, activeSlides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  if (loading) {
    return (
      <section 
        className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center overflow-hidden py-12 md:py-20 lg:py-xl scroll-mt-20 bg-slate-950"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-12 mix-blend-screen opacity-80 pointer-events-none">
            <ShaderCanvas />
          </div>
        </div>
        <div className="relative z-20 max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop w-full flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  const hasSlides = activeSlides.length > 0;

  return (
    <section 
      className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center overflow-hidden animate-fade-in py-12 md:py-20 lg:py-xl scroll-mt-20 group bg-slate-950"
    >
      {/* Background Images & Overlays Fading Container */}
      <div className="absolute inset-0 z-0">
        {hasSlides && activeSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              alt={slide.alt}
              className="absolute inset-0 w-full h-full object-cover" 
              src={slide.image}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        
        {/* Permanent WebGL Shader Layer - placed on top of backgrounds but below content */}
        <div className="absolute inset-0 z-12 mix-blend-screen opacity-80 pointer-events-none">
          <ShaderCanvas />
        </div>
      </div>

      {/* Manual Slide Navigation Arrows */}
      {hasSlides && activeSlides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 active:scale-90 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
            aria-label="Previous Slide"
          >
            <span className="material-symbols-outlined text-2xl md:text-3xl">chevron_left</span>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 active:scale-90 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
            aria-label="Next Slide"
          >
            <span className="material-symbols-outlined text-2xl md:text-3xl">chevron_right</span>
          </button>
        </>
      )}

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-9 xl:col-span-8 space-y-6 md:space-y-8 bg-primary/25 backdrop-blur-md border border-white/15 p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-2xl">
          {/* ISO Cert Badge - Permanent */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-white/95 text-[10px] font-label uppercase tracking-widest font-bold">
            <span className="material-symbols-outlined text-sm text-primary-fixed-dim">verified</span>
            ISO 9001:2015 CERTIFIED PRECISION
          </div>

          {/* Heading and Description - Animated on Slide Change */}
          <div key={hasSlides ? currentIndex : 'coming-soon'} className="space-y-4 animate-fade-in-up">
            <h1 className="sr-only">MB Engineering Works – Precision Engineering & Industrial Machinery</h1>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl md:leading-[1.1] text-white font-bold tracking-tight min-h-[2.2em] md:min-h-[2.2em]">
              {hasSlides ? activeSlides[currentIndex]?.title : "Coming Soon!"}
            </h2>
            
            <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-[640px] leading-relaxed min-h-[5em]">
              {hasSlides 
                ? activeSlides[currentIndex]?.description 
                : "Our new high-performance converting, slitting, and printing machinery slideshow and custom solutions updates are coming soon. Stay tuned!"}
            </p>
          </div>

          {/* CTA Buttons - Permanent */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button 
              onClick={onRequestQuote}
              className="bg-accent text-white px-7 py-3.5 md:py-4 rounded-lg font-button font-bold text-sm md:text-base hover:brightness-110 hover:shadow-lg hover:shadow-accent/30 active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              Get a Free Consultation
            </button>
            {hasSlides && (
              <a 
                href={activeSlides[currentIndex]?.buttonLink || "#machinery"}
                className="bg-white/10 backdrop-blur-md border border-white/25 text-white px-7 py-3.5 md:py-4 rounded-lg font-button font-bold text-sm md:text-base hover:bg-white/25 active:scale-[0.98] transition-all text-center flex items-center justify-center"
              >
                {activeSlides[currentIndex]?.buttonText || 'Explore Machines'}
              </a>
            )}
          </div>

          {/* Inline Highlight Points - Permanent */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 md:pt-10 border-t border-white/10">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-white/95 font-label text-[10px] md:text-xs uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-primary-fixed-dim text-base md:text-lg shrink-0">{h.icon}</span>
                {h.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicator Dots at Bottom */}
      {hasSlides && activeSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex 
                  ? 'bg-accent w-8' 
                  : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
