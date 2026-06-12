'use client';

import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      initials: 'AJ',
      name: 'Ahmed J.',
      role: 'Production Manager, Riyadh',
      text: '"Their billing roll printing machine has been running 24/7 for three years with zero major breakdowns. The precision is unmatched."',
    },
    {
      initials: 'MS',
      name: 'Marek S.',
      role: 'COO, Poland Packaging',
      text: '"Finding a partner for customized converting machines was hard until we met MB. They understood our technical specs perfectly."',
    },
    {
      initials: 'KP',
      name: 'Krittin P.',
      role: 'Owner, Thai Industrial Solutions',
      text: '"Excellent after-sales support. Their engineers were on a call with us until 2 AM to resolve a setup issue. Highly recommended."',
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-xl bg-surface-container-high animate-fade-in overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary tracking-tight">
            Industry Voices
          </h2>
        </div>

        {/* Testimonials Flex / Grid */}
        <div className="flex overflow-x-auto no-scrollbar scroll-smooth gap-gutter pb-6 -mx-margin-mobile px-margin-mobile lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3">
          {reviews.map((r, i) => (
            <div 
              key={i} 
              className="bg-white p-6 sm:p-8 rounded-xl border border-outline-variant hover:shadow-lg hover:border-primary transition-all duration-300 w-[80vw] sm:w-[48vw] lg:w-auto shrink-0 lg:shrink flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                {/* 5 Stars Rating */}
                <div className="flex gap-0.5 text-amber-500 shrink-0">
                  {[...Array(5)].map((_, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="material-symbols-outlined text-lg sm:text-xl"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      star
                    </span>
                  ))}
                </div>
                
                <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed italic">
                  {r.text}
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-outline-variant/60 flex items-center gap-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-fixed-dim flex items-center justify-center font-bold text-xs sm:text-sm text-primary uppercase shadow-inner shrink-0">
                  {r.initials}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm md:text-base text-primary leading-tight">{r.name}</div>
                  <div className="text-[10px] sm:text-xs text-on-surface-variant/90 font-medium mt-0.5">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
