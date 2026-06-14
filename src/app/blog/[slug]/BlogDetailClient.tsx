'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { blogArticles, BlogArticle } from '@/lib/blogData';

interface BlogDetailClientProps {
  slug: string;
  initialArticle: BlogArticle | null;
}

export default function BlogDetailClient({ slug, initialArticle }: BlogDetailClientProps) {
  const router = useRouter();
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

  const article = initialArticle;

  if (!article) {
    return (
      <>
        <Header onRequestQuote={() => setIsQuoteOpen(true)} />
        <main className="pt-28 pb-16 md:pt-32 md:pb-24 max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop min-h-[50vh] flex flex-col items-center justify-center text-center space-y-6">
          <span className="material-symbols-outlined text-6xl text-primary animate-bounce">article</span>
          <h2 className="font-display text-3xl font-bold text-primary">Article Not Found</h2>
          <p className="text-on-surface-variant max-w-[480px]">
            The requested engineering article does not exist or has been moved.
          </p>
          <button 
            onClick={() => router.push('/blog')}
            className="bg-primary text-white px-8 py-3 rounded-lg font-button font-bold text-sm hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer"
          >
            Return to Blog List
          </button>
        </main>
        <Footer />
      </>
    );
  }

  // Parse custom markdown paragraphs/headers for simple rendering
  const renderContent = () => {
    return article.content.split('\n\n').map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={idx} className="font-display text-2xl sm:text-3xl font-bold text-primary mt-10 mb-5">
            {trimmed.replace('# ', '')}
          </h1>
        );
      }

      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-display text-xl sm:text-2xl font-bold text-primary mt-8 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-display text-lg font-bold text-primary mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      if (trimmed.startsWith('#### ')) {
        return (
          <h4 key={idx} className="font-display text-base font-bold text-primary mt-4 mb-2">
            {trimmed.replace('#### ', '')}
          </h4>
        );
      }

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n');
        return (
          <ul key={idx} className="list-disc pl-6 space-y-2 my-4 text-xs sm:text-sm md:text-base text-on-surface-variant font-medium">
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>{item.replace(/^[*|-]\s+/, '')}</li>
            ))}
          </ul>
        );
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed.split('\n');
        return (
          <ol key={idx} className="list-decimal pl-6 space-y-2 my-4 text-xs sm:text-sm md:text-base text-on-surface-variant font-medium">
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>{item.replace(/^\d+\.\s+/, '')}</li>
            ))}
          </ol>
        );
      }

      if (trimmed === '---') {
        return <hr key={idx} className="border-outline-variant/40 my-8" />;
      }

      return (
        <p key={idx} className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed font-medium mb-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <>
      <Header onRequestQuote={() => handleOpenQuote('Blog Article Inquiry')} />

      <main className="pt-28 pb-16 md:pt-32 md:pb-24 max-w-[960px] mx-auto px-margin-mobile md:px-margin-desktop space-y-8 min-h-[70vh]">
        {/* Back Link */}
        <button 
          onClick={() => router.push('/blog')}
          className="inline-flex items-center gap-2 text-primary font-bold text-xs sm:text-sm hover:underline cursor-pointer group shrink-0"
        >
          <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
          Back to Articles
        </button>

        {/* Article Header info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant/80 font-semibold font-label">
            <span className="bg-primary/5 text-primary px-2.5 py-1 rounded">{article.category}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readingTime}</span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium italic border-l-4 border-accent pl-4 py-1">
            {article.summary}
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-outline-variant/60 bg-slate-100 shadow-md">
          <Image 
            alt={article.title}
            src={article.imageUrl}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Article Content Layout */}
        <div className="prose prose-slate max-w-none pt-4">
          {renderContent()}
        </div>

        {/* Call to Action Box inside Blog Post */}
        <div className="mt-12 p-6 sm:p-8 bg-surface-container rounded-xl border border-outline-variant/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-left">
            <h4 className="font-display text-lg font-bold text-primary">Need a customized engineering solution?</h4>
            <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
              We design and configure slitting rewinders, converting machinery, and flexo presses tailored to your specs.
            </p>
          </div>
          <button 
            onClick={() => handleOpenQuote(`Inquiry: ${article.title}`)}
            className="bg-accent text-white px-6 py-3 rounded-lg font-button font-bold text-xs sm:text-sm hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shadow-md"
          >
            Get Free Consultation
          </button>
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
