'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Timeline from '@/components/Timeline';
import WhyTrustUs from '@/components/WhyTrustUs';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';

export default function AboutClient() {
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
      <Header onRequestQuote={() => handleOpenQuote('About Us Page Inquiry')} />

      <main className="pt-20">
        <div className="bg-surface py-6 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">About Us</h1>
          <p className="text-on-surface-variant mt-2 text-sm sm:text-base">MB Engineering Works history, milestones, and core values.</p>
        </div>

        <About />
        <Stats />
        <Timeline />
        <WhyTrustUs />
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
