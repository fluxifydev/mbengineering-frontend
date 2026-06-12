'use client';

import React from 'react';
import Image from 'next/image';
import ShaderCanvas from './ShaderCanvas';

interface HeroProps {
  onRequestQuote: () => void;
}

export default function Hero({ onRequestQuote }: HeroProps) {
  const highlights = [
    { icon: 'check_circle', text: '18+ Years' },
    { icon: 'public', text: 'Global Exports' },
    { icon: 'settings_input_component', text: 'Custom Solutions' },
    { icon: 'support_agent', text: '24/7 Support' },
  ];

  return (
    <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center overflow-hidden animate-fade-in py-12 md:py-20 lg:py-xl scroll-mt-20">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <Image 
          alt="Advanced Machining Facility"
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl7WjV1gzz4GSOnc14sfpD-OsA2R2tWgifgJgS7EBCFsgXqychb9aJHTWRwadGanIX5vfCtf7OT-TU6AoLhPWGIKUrFjq8qWDODbOQ6_l0YZXtCth2aOg02BhbIf30khqXQ52sDfHNZ4USwWFqNsjyk4hXsNTSvFEA7PL-VBEUiglDVYGkXYVS9i6dhddAZ-vdZ4dYvkVABYE5KjgpXPGIdUv-ExJjlMKJqTtLkA-wG3nI7uDL95hsdANLGBQ19QOMBGV6QaAwNtI"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-gradient z-10" />
        
        {/* Permanent WebGL Shader Layer */}
        <div className="absolute inset-0 z-15 mix-blend-screen opacity-80">
          <ShaderCanvas />
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-8 xl:col-span-7 space-y-6 md:space-y-8 animate-fade-in-up">
          {/* ISO Cert Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-white/95 text-[10px] font-label uppercase tracking-widest font-bold">
            <span className="material-symbols-outlined text-sm text-primary-fixed-dim">verified</span>
            ISO 9001:2015 CERTIFIED PRECISION
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl md:leading-[1.1] text-white font-bold tracking-tight">
            Engineering Precision.<br />Powering Productivity.
          </h1>
          
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
            Leveraging over 18 years of specialized engineering excellence, we design and manufacture high-performance converting, slitting, and printing machinery. Our bespoke B2B solutions are engineered for maximum efficiency, absolute precision, and global industrial leadership.
          </p>

          {/* CTA Buttons */}
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

          {/* Inline Highlight Points */}
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
    </section>
  );
}
