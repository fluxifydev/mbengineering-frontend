'use client';

import React, { useState, useEffect } from 'react';
import ShaderCanvas from './ShaderCanvas';

interface HeroProps {
  onRequestQuote: () => void;
}

const slides = [
  {
    title: "Engineering Precision. Powering Productivity.",
    description: "Leveraging over 18 years of specialized engineering excellence, we design and manufacture high-performance converting, slitting, and printing machinery. Our bespoke B2B solutions are engineered for maximum efficiency, absolute precision, and global industrial leadership.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl7WjV1gzz4GSOnc14sfpD-OsA2R2tWgifgJgS7EBCFsgXqychb9aJHTWRwadGanIX5vfCtf7OT-TU6AoLhPWGIKUrFjq8qWDODbOQ6_l0YZXtCth2aOg02BhbIf30khqXQ52sDfHNZ4USwWFqNsjyk4hXsNTSvFEA7PL-VBEUiglDVYGkXYVS9i6dhddAZ-vdZ4dYvkVABYE5KjgpXPGIdUv-ExJjlMKJqTtLkA-wG3nI7uDL95hsdANLGBQ19QOMBGV6QaAwNtI",
  },
  {
    title: "Innovative Machinery. Trusted Worldwide.",
    description: "Serving customers across India and international markets, MB Engineering Works delivers reliable converting and printing machinery built for durability, precision, and long-term performance. Trusted by manufacturers who demand quality without compromise.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Custom Solutions for Modern Manufacturing.",
    description: "Every production line has unique requirements. We develop tailored machinery solutions that optimize workflow, improve productivity, and deliver consistent results, helping businesses stay competitive in an evolving industrial landscape.",
    image: "/custom-solutions.png",
  },
  {
    title: "Driving Industrial Excellence Since 2008.",
    description: "For nearly two decades, MB Engineering Works has empowered industries with innovative machinery, dependable technical support, and engineering expertise. Our commitment to quality continues to build lasting partnerships around the world.",
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Precision Slitting & Rewinding Technology.",
    description: "Offering high-speed performance, micron-level tension control, and superior edge-alignment, our slitter rewinders are built to handle paper, film, foils, and specialized substrates with zero deflection.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "End-to-End Engineering Partnership.",
    description: "From personalized engineering consultation and layout design to seamless onsite integration and 24/7 technical support, we ensure your production lines run at maximum efficiency.",
    image: "https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&q=80&w=1920",
  }
];

export default function Hero({ onRequestQuote }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const highlights = [
    { icon: 'check_circle', text: '18+ Years' },
    { icon: 'public', text: 'Global Exports' },
    { icon: 'settings_input_component', text: 'Custom Solutions' },
    { icon: 'support_agent', text: '24/7 Support' },
  ];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center overflow-hidden animate-fade-in py-12 md:py-20 lg:py-xl scroll-mt-20 group"
    >
      {/* Background Images & Overlays Fading Container */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover" 
              src={slide.image}
              loading={idx === 0 ? "eager" : "lazy"}
            />
            {/* Subtle dark overlay for depth, no colors */}
            <div className="absolute inset-0 z-11 bg-black/30" />
          </div>
        ))}
        
        {/* Permanent WebGL Shader Layer - placed on top of backgrounds but below content */}
        <div className="absolute inset-0 z-12 mix-blend-screen opacity-80 pointer-events-none">
          <ShaderCanvas />
        </div>
      </div>

      {/* Manual Slide Navigation Arrows */}
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

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-9 xl:col-span-8 space-y-6 md:space-y-8 bg-slate-950/60 backdrop-blur-md border border-white/10 p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-2xl">
          {/* ISO Cert Badge - Permanent */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-white/95 text-[10px] font-label uppercase tracking-widest font-bold">
            <span className="material-symbols-outlined text-sm text-primary-fixed-dim">verified</span>
            ISO 9001:2015 CERTIFIED PRECISION
          </div>

          {/* Heading and Description - Animated on Slide Change */}
          <div key={currentIndex} className="space-y-4 animate-fade-in-up">
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl md:leading-[1.1] text-white font-bold tracking-tight min-h-[2.2em] md:min-h-[2.2em]">
              {slides[currentIndex].title}
            </h1>
            
            <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-[640px] leading-relaxed min-h-[5em]">
              {slides[currentIndex].description}
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
            <a 
              href="#machinery"
              className="bg-white/10 backdrop-blur-md border border-white/25 text-white px-7 py-3.5 md:py-4 rounded-lg font-button font-bold text-sm md:text-base hover:bg-white/25 active:scale-[0.98] transition-all text-center flex items-center justify-center"
            >
              Explore Machines
            </a>
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((_, idx) => (
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
    </section>
  );
}
