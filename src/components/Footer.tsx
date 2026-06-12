'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  const solutions = [
    { label: 'CNC Machining', href: '#' },
    { label: 'Hydraulic Systems', href: '#' },
    { label: 'Automated Assembly', href: '#' },
    { label: 'Custom Converting', href: '#' },
  ];

  const company = [
    { label: 'Our Story', href: '#about' },
    { label: 'Global Support', href: '#global' },
    { label: 'Careers', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ];

  return (
    <footer className="bg-inverse-surface text-white border-t border-white/10 pt-16 pb-6 lg:pt-xl lg:pb-base mt-auto">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-gutter">
        {/* Brand Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="flex items-center gap-4">
            <Image 
              alt="MB Engineering Works Logo" 
              className="h-10 w-auto" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8pfsrELa6NAoqq-Pdz2yF8hwdx2uUtdO9cTjwrZ2bqcUN_MZPpWKSSiLX2FFvFwc3EzK0xmTLTNkJxKFPdQN9EZSFVo-RT4Xch_r6v2D9W5tn-cXJZajWJqfdTBtEXm46S4bE1J1w5482nq9VfNj9fcRNzKDdHc1_5N8gp3PuUIn3FCek4KDIt9PHUtkDXAC_vi_vOxUNJDP_BAEfnCHnMeCVt4fkyfNrEYf6T3Ks9ZOq6yTjHEpXjdZr5Kc22mGxI1JwLB_EZ8A"
              width={150}
              height={40}
            />
            <span className="font-display text-xl text-white font-bold tracking-tight">MB Engineering Works</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-[360px] font-medium">
            Precision Engineered for Industry. Since 2008, MB Engineering Works has been setting the industry standard for high-performance slitting, converting, and printing systems globally.
          </p>
          <div className="flex gap-4">
            <a 
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors text-white/80" 
              href="#"
              aria-label="Public info"
            >
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
            <a 
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors text-white/80" 
              href="mailto:mbengineeringworks50@gmail.com"
              aria-label="Email"
            >
              <span className="material-symbols-outlined text-sm">mail</span>
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-bold mb-6 text-primary-fixed-dim uppercase text-[10px] md:text-[11px] font-label tracking-widest">Solutions</h5>
            <ul className="space-y-4 text-xs md:text-sm text-white/60">
              {solutions.map((item) => (
                <li key={item.label}>
                  <a className="hover:text-white transition-colors font-medium" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-primary-fixed-dim uppercase text-[10px] md:text-[11px] font-label tracking-widest">Company</h5>
            <ul className="space-y-4 text-xs md:text-sm text-white/60">
              {company.map((item) => (
                <li key={item.label}>
                  <a className="hover:text-white transition-colors font-medium" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h5 className="font-bold mb-6 text-primary-fixed-dim uppercase text-[10px] md:text-[11px] font-label tracking-widest">Global Support</h5>
            <p className="text-xs text-white/40 mb-4 font-medium leading-relaxed">Dedicated support lines for international partners.</p>
            <div className="bg-white/5 p-5 rounded-lg border border-white/10 transition-colors hover:border-white/20">
              <div className="text-[9px] md:text-[10px] font-bold text-primary-fixed-dim font-label tracking-wider mb-1.5">SUPPORT HOTLINE</div>
              <div className="text-sm font-mono font-bold text-white flex flex-col gap-1.5">
                <a href="tel:+919345323173" className="hover:text-primary-fixed-dim transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">call</span> +91 93453 23173
                </a>
                <a href="tel:+919087771626" className="hover:text-primary-fixed-dim transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">call</span> +91 90877 71626
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop mt-12 md:mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] md:text-[10px] uppercase font-label tracking-widest text-white/40 text-center md:text-left">
        <div>© 2024 MB Engineering Works. All Rights Reserved. Precision Engineered for Industry.</div>
        <div className="flex gap-6 md:gap-8">
          <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-white transition-colors" href="#">Compliance</a>
          <a className="hover:text-white transition-colors" href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
