'use client';

import React, { useRef } from 'react';

export default function VideoGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const videos = [
    {
      id: 'm_IjuZdX1gU',
      title: 'High-Speed Paper Converting Machinery',
      desc: 'Operational showcase of our advanced converting systems, engineering high-speed performance with zero material slippage.',
      src: 'https://www.youtube.com/embed/m_IjuZdX1gU?si=ofJvM87_RcQMw8nu'
    },
    {
      id: 'h_m3qTkRVbc',
      title: 'Precision Slitting & Rewinding System',
      desc: 'Demonstration of rotary slitting blades and high-accuracy tension control mechanics operating at full B2B production capacity.',
      src: 'https://www.youtube.com/embed/h_m3qTkRVbc?si=zNQlp1RB1gzZWk5q'
    },
    {
      id: 'riMOARXuUuU',
      title: 'Fully Automated Slitter-Printer Setup',
      desc: 'An in-depth look at our integrated PLC touchscreen control and automatic slitting, converting, and inline flexo printing line.',
      src: 'https://www.youtube.com/embed/riMOARXuUuU?si=IR-K9-Gl8PmLzwxy'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-xl bg-surface-container-low scroll-mt-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Title & Navigation controls */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12">
          <div className="max-w-2xl space-y-4 text-left">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary tracking-tight">
              Machinery In Action
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant">
              Watch our high-performance converting, slitting, and printing systems operating at peak capacity.
            </p>
          </div>
          
          {/* Navigation Controls (Visible on md+) */}
          <div className="hidden md:flex gap-3 shrink-0">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-outline-variant hover:border-primary hover:bg-white text-primary flex items-center justify-center cursor-pointer transition-all active:scale-[0.95]"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-outline-variant hover:border-primary hover:bg-white text-primary flex items-center justify-center cursor-pointer transition-all active:scale-[0.95]"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Video Slider Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth gap-gutter pb-6 -mx-margin-mobile px-margin-mobile lg:mx-0 lg:px-0"
        >
          {videos.map((video) => (
            <div 
              key={video.id}
              className="w-[85vw] sm:w-[50vw] lg:w-[calc(33.333%-16px)] shrink-0 bg-white rounded-xl border border-outline-variant/60 overflow-hidden shadow-lg hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col"
            >
              {/* Responsive Video Iframe Wrapper */}
              <div className="relative aspect-video w-full bg-black shadow-inner">
                <iframe 
                  src={video.src}
                  title={video.title}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-primary tracking-tight leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                    {video.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
