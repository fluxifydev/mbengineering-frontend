'use client';

import React from 'react';
import Image from 'next/image';

export default function Timeline() {
  const milestones = [
    {
      year: '2008',
      title: 'The Inception',
      description: 'Founded MB Engineering Works in Coimbatore, India, establishing our baseline in custom manufacturing and basic converting tools.',
      isLast: false,
    },
    {
      year: '2015',
      title: 'First Export: Saudi Arabia',
      description: 'Successfully delivered custom-configured printing and slitting equipment to Riyadh, marking our official entry into Middle Eastern export markets.',
      isLast: false,
    },
    {
      year: 'Present',
      title: 'European & Asian Expansion',
      description: 'Secured export projects across Poland, Thailand, Germany, and the UAE, expanding our international footprint with advanced high-speed slitter rewinders.',
      isLast: true,
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-xl bg-inverse-surface text-white animate-fade-in scroll-mt-20" id="global">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-gutter items-center">
          
          {/* Milestone List Column */}
          <div className="col-span-12 lg:col-span-6 space-y-6 md:space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight leading-tight">
              Our Global Milestone Journey
            </h2>
            
            <div className="space-y-0">
              {milestones.map((item, idx) => (
                <div key={idx} className="flex gap-4 md:gap-6 relative">
                  {/* Vertical Connection Line */}
                  {!item.isLast && (
                    <div className="absolute left-4 top-10 bottom-0 w-px bg-white/20" />
                  )}
                  
                  {/* Indicator Dot */}
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 relative z-10 border-4 border-inverse-surface">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                  
                  {/* Content details */}
                  <div className="pb-8 md:pb-10">
                    <span className="font-label text-primary-fixed-dim text-sm md:text-base font-bold uppercase tracking-wider">
                      {item.year}
                    </span>
                    <h4 className="text-base md:text-lg font-bold mt-1 text-white leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-white/60 mt-1.5 text-xs md:text-sm leading-relaxed max-w-md">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive World Map Column */}
          <div className="col-span-12 lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl h-[280px] sm:h-[380px] md:h-[450px] lg:h-[500px] border border-white/10 bg-slate-900 group w-full">
            {/* Ambient Shader-like Overlay */}
            <div className="absolute inset-0 bg-primary/20 z-10 pointer-events-none mix-blend-overlay group-hover:bg-primary/10 transition-colors duration-300" />
            
            <Image 
              alt="Global Export Connectivity Map"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEgqm76GUdOW0elRPEYE5Tqr-MoUw9zdCzwj7fopqw_UDKevJYttBavlbRhsxbvlmThgGUMTCtsM26zRVNeSDegg-U5K1uvv--9rb7pdZMmasPJVJ9_4dgzkr8wxB0HNDpKRj8DEsOJj4AJM0g5WFZ_musNpCHWLKjKRJCBumAXG7LF_szGa1sVEANzuOmwAEBTvCYYmnuk0_z6oAG1OVLag8Xw0r6cgo-z-_jQbJNmX3XZWtK14gS_ZUTcxm1Dv11LS9ms0OZDno"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            
            {/* Map Labels Floating Panel */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto z-20 bg-slate-950/90 backdrop-blur-md p-5 md:p-6 border border-white/10 rounded-xl max-w-sm">
              <h5 className="text-[10px] md:text-xs font-bold mb-3 uppercase tracking-wider font-label text-primary-fixed-dim">
                Active Export Markets
              </h5>
              <div className="flex flex-wrap gap-2">
                {['Poland', 'Saudi Arabia', 'Thailand', 'UAE', 'Vietnam', 'Germany'].map((country) => (
                  <span 
                    key={country} 
                    className="bg-primary/30 border border-white/10 px-2.5 py-1 rounded text-[10px] md:text-xs font-semibold hover:bg-primary/45 transition-colors cursor-default"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
