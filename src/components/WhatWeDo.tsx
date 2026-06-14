import React from 'react';
import Image from 'next/image';

export default function WhatWeDo() {
  return (
    <section className="py-16 md:py-24 lg:py-xl bg-surface scroll-mt-20 border-b border-outline-variant/30 animate-fade-in" id="what-we-do">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-12 gap-y-12 lg:gap-x-gutter items-center">
        
        {/* Visual Showcase Column (Left on desktop to alternate with About section) */}
        <div className="col-span-12 lg:col-span-6 relative group w-full order-last lg:order-first">
          <div className="absolute -inset-4 bg-primary/5 rounded-xl transition-all duration-300 group-hover:bg-primary/10" />
          <div className="relative z-10 w-full aspect-video rounded-lg overflow-hidden shadow-2xl border border-outline-variant bg-white">
            <Image 
              alt="Advanced B2B printing, slitting and converting machinery manufactured by MB Engineering Works"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              src="/what-we-do-machinery.png"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Text Details Column */}
        <div className="col-span-12 lg:col-span-6 space-y-6 lg:pl-6">
          <h4 className="text-accent font-label text-xs tracking-[0.2em] uppercase font-bold">Our Capabilities</h4>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-primary leading-tight font-bold tracking-tight">
            What We Do
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">
            MB Engineering Works designs and manufactures advanced machines used in printing, slitting, and converting industries. The company produces high-quality equipment such as billing roll printing machines, tape slitting machines, and rewinding systems that help businesses improve production speed and efficiency.
          </p>
          <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">
            Their machines are built with precision, durability, and ease of operation in mind, making them suitable for B2B applications in both small startups and large-scale industries. In addition to manufacturing, they provide installation support, technical guidance, and training to customers. With a strong focus on performance and reliability, MB Engineering Works helps businesses streamline operations and achieve consistent, high-quality output.
          </p>
        </div>

      </div>
    </section>
  );
}
