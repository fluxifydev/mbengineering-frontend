'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { BlogArticle } from '@/lib/blogData';

interface BlogClientProps {
  initialArticles: BlogArticle[];
}

export default function BlogClient({ initialArticles }: BlogClientProps) {
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
      <Header onRequestQuote={() => handleOpenQuote('Blog Page Inquiry')} />

      <main className="pt-28 pb-16 md:pt-32 md:pb-24 max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop space-y-12 min-h-[70vh]">
        {/* Header Title */}
        <div className="space-y-4 text-left">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Engineering Insights & Articles
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
            Technical guides, machinery reviews, maintenance checklists, and B2B converting industry updates authored by the MB Engineering Works technical team.
          </p>
        </div>

        {/* Blog Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {initialArticles.map((article) => (
            <article 
              key={article.slug}
              className="bg-white rounded-xl border border-outline-variant/60 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Featured Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100/70 flex items-center justify-center text-slate-400">
                {article.imageUrl ? (
                  <Image 
                    alt={article.title}
                    src={article.imageUrl}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                ) : (
                  <span className="material-symbols-outlined text-4xl">article</span>
                )}
                <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md font-label">
                  {article.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant/80 font-semibold font-label">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-primary group-hover:text-primary-container leading-snug transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-3 leading-relaxed font-medium">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between">
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent hover:text-accent/80 transition-colors group/link"
                  >
                    <span>Read Full Article</span>
                    <span className="material-symbols-outlined text-sm font-bold transition-transform group-hover/link:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
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
