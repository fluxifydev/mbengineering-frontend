'use client';

import React from 'react';

export default function Stats() {
  const stats = [
    { icon: 'history', value: '18+', label: 'YEARS EXPERIENCE' },
    { icon: 'precision_manufacturing', value: '500+', label: 'MACHINES DELIVERED' },
    { icon: 'language', value: '3+', label: 'EXPORT COUNTRIES' },
    { icon: 'handshake', value: '100%', label: 'COMMITMENT' },
  ];

  return (
    <section className="relative py-12 md:py-16 lg:py-xl bg-inverse-surface overflow-hidden animate-fade-in">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-3 group stat-card transition-standard">
              <span className="material-symbols-outlined text-primary-fixed-dim text-3xl md:text-5xl stat-icon inline-block transition-transform duration-300">
                {stat.icon}
              </span>
              <div className="text-white font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
                {stat.value}
              </div>
              <div className="text-white/60 font-label text-[9px] md:text-xs tracking-widest font-bold uppercase leading-normal">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
