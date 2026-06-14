'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Machinery from '@/components/Machinery';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';

export default function MachinesClient() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenQuote = (machineName: string = '') => {
    setSelectedMachine(machineName);
    setIsQuoteOpen(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header onRequestQuote={() => handleOpenQuote('Machinery Catalog Page Inquiry')} />

      <main className="pt-20">
        <div className="bg-surface py-6 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">Our Machinery</h1>
          <p className="text-on-surface-variant mt-2 text-sm sm:text-base max-w-4xl leading-relaxed">Explore our lineup of industrial converting, slitting, and printing machinery.Engineered for endurance and high-precision output. Discover our industrial product lineup categorized for your engineering needs.</p>
        </div>

        <Machinery onRequestQuote={handleOpenQuote} hideHeader={true} />
      </main>

      <Footer />

      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
        initialMachine={selectedMachine} 
      />

      {/* Scroll to Top */}
      {showScrollTop && (
        <button 
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-[0.95] transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <span className="material-symbols-outlined text-3xl">arrow_upward</span>
        </button>
      )}
    </>
  );
}
