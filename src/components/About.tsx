'use client';

import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <section className="py-16 md:py-24 lg:py-xl blueprint-grid animate-fade-in scroll-mt-20" id="about">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-12 gap-y-12 lg:gap-x-gutter items-center">
        {/* Story Text Column */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <h4 className="text-primary font-label text-xs tracking-[0.2em] uppercase font-bold">Established 2008</h4>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-primary leading-tight font-bold tracking-tight">
            Crafting Excellence in Every Component.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed">
            MB Engineering Works was founded with a singular vision: to redefine industrial standards through precision engineering. Since 2008, we have evolved from a specialized workshop into a global machinery powerhouse.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-white border-l-4 border-primary shadow-sm rounded-r-lg">
              <h5 className="font-bold text-primary mb-2 uppercase text-[11px] font-label tracking-wider">Mission</h5>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                To empower manufacturers with high-efficiency machinery that minimizes downtime and maximizes output through relentless innovation.
              </p>
            </div>
            <div className="p-6 bg-white border-l-4 border-secondary shadow-sm rounded-r-lg">
              <h5 className="font-bold text-secondary mb-2 uppercase text-[11px] font-label tracking-wider">Vision</h5>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                To be the global benchmark for converting and printing solutions, recognized for technical superiority and unwavering integrity.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Showcase Column */}
        <div className="col-span-12 lg:col-span-6 relative group w-full">
          <div className="absolute -inset-4 bg-primary/5 rounded-xl transition-all duration-300 group-hover:bg-primary/10" />
          <div className="relative z-10 w-full aspect-video rounded-lg overflow-hidden shadow-2xl border border-outline-variant bg-white">
            <Image 
              alt="High Precision CNC Manufacturing Part"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1Pj4TEMtfLKVcTwfVTyyQDKXotrVrdGsDHcAp4jd-PPPvTm2J2gwq3RLxx26gyV7IEyMdTza1fEpwgpkCsCGzblx4nXU1r6Iojp_FWYJCPUUs9mz9e8V9c3sanKSKGFw7YCCw7Wtn8Tkv4D3D8GxQMRmzSYwBpHO9djUQP-RyaaN-1es7wc1vNMYvVYti7hcNZ-wHuqtGbQSJShgeVBVawxhPYdSnX2llgMAEEKJH5e8HHj-T3zlAegzs95G4VaqZlHlxFKjkfQM"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
