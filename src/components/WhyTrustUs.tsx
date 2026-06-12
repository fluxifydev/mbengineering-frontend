'use client';

import React from 'react';

export default function WhyTrustUs() {
  const cards = [
    {
      icon: 'military_tech',
      title: '18+ Years Experience',
      description: 'Unrivaled domain expertise since 2008 in designing complex industrial systems.',
    },
    {
      icon: 'target',
      title: 'Technical Precision',
      description: 'Micron-level accuracy ensuring seamless production for high-volume operations.',
    },
    {
      icon: 'architecture',
      title: 'Customization',
      description: 'Bespoke engineering tailored to your unique material and workflow requirements.',
    },
    {
      icon: 'public',
      title: 'Global Exports',
      description: 'Proven track record with successful installations in Europe and the Middle East.',
    },
    {
      icon: 'verified',
      title: 'Quality Standards',
      description: 'Rigorous multi-stage testing protocols before any machine leaves our floor.',
    },
    {
      icon: 'headset_mic',
      title: 'Lifetime Support',
      description: 'Responsive technical assistance and genuine spare parts availability.',
    },
    {
      icon: 'lightbulb',
      title: 'Continuous Innovation',
      description: 'Investing in R&D to integrate the latest automation and IoT technologies.',
    },
    {
      icon: 'sentiment_satisfied',
      title: 'Customer First',
      description: 'A 98% client retention rate built on transparency and value delivery.',
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
