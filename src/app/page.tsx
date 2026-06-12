'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Machinery from '@/components/Machinery';
import WhyTrustUs from '@/components/WhyTrustUs';
import Timeline from '@/components/Timeline';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';

export default function Home() {
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

  const handleWhatsAppChat = () => {
    window.open('https://wa.me/919876543210?text=Hello%20MB%20Engineering%20Works!', '_blank');
  };

  return (
    <>
      {/* Navigation Header */}
      <Header onRequestQuote={() => handleOpenQuote('General Inquiry')} />

      {/* Main Sections */}
      <main className="pt-20">
        
        {/* Hero Banner */}
        <Hero onRequestQuote={() => handleOpenQuote('Consultation Inquiry')} />

        {/* Dashboard Numbers */}
        <Stats />

        {/* Brand / Story */}
        <About />

        {/* Core Products Lineup */}
        <Machinery onRequestQuote={handleOpenQuote} />

        {/* Value Proposition Bento Grid */}
        <WhyTrustUs />

        {/* Export Timelines / Milestones */}
        <Timeline />

        {/* Process Flows & Testimonials */}
        <Services />
        
        {/* Testimonials Review Cards */}
        <Testimonials />

        {/* Contact Submission & Maps */}
        <Contact />

      </main>

      {/* Footer Branding Links */}
      <Footer />

      {/* Request Quote Dialog Popup */}
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
        initialMachine={selectedMachine} 
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
        {/* WhatsApp Chat Launcher */}
        <button 
          onClick={handleWhatsAppChat}
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-[0.95] transition-all cursor-pointer hover:shadow-[#25D366]/30"
          aria-label="Chat on WhatsApp"
        >
          <span className="material-symbols-outlined text-3xl">chat</span>
        </button>

        {/* Scroll To Top Anchor */}
        {showScrollTop && (
          <button 
            onClick={handleScrollToTop}
            className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-[0.95] transition-all cursor-pointer hover:shadow-primary/30 animate-fade-in"
            aria-label="Scroll to top"
          >
            <span className="material-symbols-outlined text-3xl">arrow_upward</span>
          </button>
        )}
      </div>
    </>
  );
}
