'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Services from '@/components/Services';
import VideoGallery from '@/components/VideoGallery';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';

export default function ServicesClient() {
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
      <Header onRequestQuote={() => handleOpenQuote('Services Page Inquiry')} />

      <main className="pt-20">
        <div className="bg-surface py-6 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">Our Services</h1>
          <p className="text-on-surface-variant mt-2 text-sm sm:text-base">Engineering consultations, custom layouts, manufacturing, and 24/7 technical support.</p>
        </div>

        <Services />
        <VideoGallery />
        <Testimonials />
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
