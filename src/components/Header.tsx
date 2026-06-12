'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
  onRequestQuote: () => void;
}

export default function Header({ onRequestQuote }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Machinery', href: '#machinery' },
    { label: 'Global Operations', href: '#global' },
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/60 h-20 transition-all duration-300">
      <nav className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-full">
        {/* Logo Section */}
        <a href="#" className="flex items-center gap-3 md:gap-4 shrink-0 transition-transform active:scale-[0.98]">
          <div className="relative h-10 w-10 md:h-12 md:w-12 flex items-center justify-center">
            <Image 
              alt="MB Engineering Works Logo" 
              className="object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8pfsrELa6NAoqq-Pdz2yF8hwdx2uUtdO9cTjwrZ2bqcUN_MZPpWKSSiLX2FFvFwc3EzK0xmTLTNkJxKFPdQN9EZSFVo-RT4Xch_r6v2D9W5tn-cXJZajWJqfdTBtEXm46S4bE1J1w5482nq9VfNj9fcRNzKDdHc1_5N8gp3PuUIn3FCek4KDIt9PHUtkDXAC_vi_vOxUNJDP_BAEfnCHnMeCVt4fkyfNrEYf6T3Ks9ZOq6yTjHEpXjdZr5Kc22mGxI1JwLB_EZ8A"
              fill
              sizes="(max-width: 768px) 40px, 48px"
              priority
            />
          </div>
          <span className="font-display text-base md:text-xl xl:text-2xl text-primary font-bold tracking-tight">
            MB Engineering Works
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              className="text-on-surface-variant hover:text-primary transition-colors text-[13px] xl:text-sm font-bold relative py-2 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" 
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <button 
            onClick={onRequestQuote}
            className="bg-primary text-white px-5 xl:px-6 py-2.5 rounded-lg font-button font-bold hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-primary/10 text-xs xl:text-sm"
          >
            Request Quote
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <button 
            onClick={onRequestQuote}
            className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary-container active:scale-[0.95] transition-all cursor-pointer shadow-md shadow-primary/10"
          >
            Quote
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-outline-variant rounded-lg text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined text-xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 bg-white border-b border-outline-variant shadow-xl z-40 transition-all duration-300 lg:hidden animate-fade-in">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                className="text-on-surface-variant hover:text-primary transition-colors font-bold text-base py-2.5 border-b border-outline-variant/30" 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
