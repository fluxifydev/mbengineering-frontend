'use client';

import React from 'react';

export default function WhyTrustUs() {
  const cards = [
    {
      icon: 'military_tech',
      title: '18+ Years Experience',
      description: 'Nearly two decades of design and engineering expertise building complex, high-reliability industrial machinery.',
    },
    {
      icon: 'target',
      title: 'Technical Precision',
      description: 'Micron-level manufacturing tolerance ensuring flawless, vibration-free operation under high-volume production cycles.',
    },
    {
      icon: 'architecture',
      title: 'Customization',
      description: 'Bespoke, client-first design tailored to your specific material thickness, web width, and workflow dynamics.',
    },
    {
      icon: 'public',
      title: 'Global Exports',
      description: 'A certified export footprint with successful, heavy-duty machinery installations operating in Europe and the Middle East.',
    },
    {
      icon: 'verified',
      title: 'Quality Standards',
      description: 'Strict multi-stage verification and load testing protocols conducted before any equipment is cleared for dispatch.',
    },
    {
      icon: 'headset_mic',
      title: 'Lifetime Support',
      description: 'Prompt, engineer-led technical assistance coupled with long-term guaranteed availability of authentic replacement parts.',
    },
    {
      icon: 'lightbulb',
      title: 'Continuous Innovation',
      description: 'Continuous R&D investments dedicated to integrating smart automation, PLC systems, and remote IoT diagnostics.',
    },
    {
      icon: 'sentiment_satisfied',
      title: 'Customer First',
      description: 'An exceptional 98% client retention rate built upon transparent commercial practices and long-term value delivery.',
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-xl animate-fade-in scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Title Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary tracking-tight">Why Industry Leaders Trust Us</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto mt-4 text-sm sm:text-base">
            Merging nearly two decades of engineering heritage with future-ready innovation.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {cards.map((card, i) => (
            <div 
              key={i} 
              className="p-6 md:p-8 bg-surface rounded-xl border border-outline-variant hover:border-primary hover:bg-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
            >
              <span className="material-symbols-outlined text-3xl md:text-4xl text-primary mb-4 transition-transform duration-300 group-hover:scale-108">
                {card.icon}
              </span>
              <h4 className="font-bold text-base md:text-lg mb-2 text-primary">{card.title}</h4>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
