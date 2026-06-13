'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCachedProducts } from '@/lib/productsCache';
import { RenderProduct } from './ProductCard';

interface HeaderProps {
  onRequestQuote: () => void;
}

const siteSections = [
  { label: 'Home', href: '/', keywords: 'home landing main top hero' },
  { label: 'Products', href: '/#machinery', keywords: 'products machinery machine lineup models slitter converting printing' },
  { label: 'About Us', href: '/#about', keywords: 'about us story company history established 2008 mission vision cnc' },
  { label: 'Services', href: '/#services', keywords: 'services process flows manufacturing technical layout custom support' },
  { label: 'Global Operations', href: '/#global', keywords: 'global operations export timeline milestones international support' },
  { label: 'Contact Us', href: '/#contact', keywords: 'contact us contacts technical inquiry quote address map directions factory' },
];

export default function Header({ onRequestQuote }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<RenderProduct[]>([]);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/#machinery' },
    { label: 'Contacts', href: '/#contact' },
    { label: 'About Us', href: '/#about' },
  ];

  // Fetch products on mount for instant header searching
  useEffect(() => {
    const fetchProductsForSearch = async () => {
      try {
        const data = await getCachedProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products for header search:', err);
      }
    };
    fetchProductsForSearch();
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
        setSearchQuery('');
      }
    }
    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded]);

  // Focus search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Filter products and site headings based on query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { products: [], sections: [] };
    const cleanQuery = searchQuery.toLowerCase().trim();

    const matchedProducts = products.filter(p => 
      p.name?.toLowerCase().includes(cleanQuery) || 
      p.category?.toLowerCase().includes(cleanQuery)
    );

    const matchedSections = siteSections.filter(s => 
      s.label.toLowerCase().includes(cleanQuery) || 
      s.keywords.toLowerCase().includes(cleanQuery)
    );

    return { products: matchedProducts, sections: matchedSections };
  }, [products, searchQuery]);

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.trim();
    setIsSearchExpanded(false);
    setSearchQuery('');
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleProductClick = (productId: string) => {
    setIsSearchExpanded(false);
    setSearchQuery('');
    router.push(`/products/${productId}`);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/60 h-20 transition-all duration-300">
      <nav className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-full relative">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 md:gap-4 shrink-0 transition-transform active:scale-[0.98]">
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
        </Link>

        {/* Desktop Navigation & Expandable Search Bar */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center max-w-2xl mx-auto">
          {!isSearchExpanded ? (
            <>
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  className="text-on-surface-variant hover:text-primary transition-colors text-[13px] xl:text-sm font-bold relative py-2 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" 
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
              {/* Desktop Search Toggle Button */}
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center justify-center rounded-lg hover:bg-surface-container"
                aria-label="Open search bar"
              >
                <span className="material-symbols-outlined text-xl">search</span>
              </button>
            </>
          ) : (
            <div className="w-full relative group animate-slide-down">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70 group-focus-within:text-primary transition-colors text-xl pointer-events-none select-none">
                search
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
                placeholder="Search products or website sections..."
                className="w-full pl-12 pr-12 py-2.5 bg-white border border-outline-variant/65 rounded-xl text-xs sm:text-sm font-semibold text-primary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
              <button
                onClick={() => {
                  setIsSearchExpanded(false);
                  setSearchQuery('');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70 hover:text-primary transition-colors flex items-center justify-center p-1 rounded-full hover:bg-surface-container cursor-pointer"
                aria-label="Close search"
              >
                <span className="material-symbols-outlined text-lg font-bold">close</span>
              </button>
            </div>
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center shrink-0">
          <button 
            onClick={onRequestQuote}
            className="bg-primary text-white px-5 xl:px-6 py-2.5 rounded-lg font-button font-bold hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-primary/10 text-xs xl:text-sm"
          >
            Request Quote
          </button>
        </div>

        {/* Mobile Action Buttons (Search toggle, Quote, Burger Menu) */}
        <div className="flex items-center gap-1.5 lg:hidden shrink-0">
          <button
            onClick={() => setIsSearchExpanded(true)}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center justify-center rounded-lg hover:bg-surface-container"
            aria-label="Open mobile search"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <button 
            onClick={onRequestQuote}
            className="bg-primary text-white px-3.5 py-2 rounded-lg text-xs font-bold hover:bg-primary-container active:scale-[0.95] transition-all cursor-pointer shadow-md shadow-primary/10"
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

        {/* Mobile Full-Screen Header Search Overlay */}
        {isSearchExpanded && (
          <div className="absolute inset-0 bg-surface flex items-center px-margin-mobile gap-3 lg:hidden z-50 animate-slide-down">
            <div className="relative flex-1 group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-lg pointer-events-none select-none">
                search
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
                placeholder="Search catalog or sections..."
                className="w-full pl-9 pr-9 py-2 bg-white border border-outline-variant/65 rounded-xl text-xs font-semibold text-primary outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 hover:text-primary transition-colors flex items-center justify-center p-0.5 rounded-full hover:bg-surface-container cursor-pointer"
                  aria-label="Clear search"
                >
                  <span className="material-symbols-outlined text-base font-bold">close</span>
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setIsSearchExpanded(false);
                setSearchQuery('');
              }}
              className="text-primary font-bold text-xs shrink-0 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </nav>

      {/* Slide-down Search Suggestions / Results Dropdown */}
      {isSearchExpanded && searchQuery.trim() && (
        <div 
          ref={dropdownRef}
          className="fixed top-20 inset-x-0 bg-white border-b border-outline-variant shadow-2xl z-40 max-h-[75vh] overflow-y-auto animate-slide-down"
        >
          <div className="max-w-[720px] mx-auto px-margin-mobile md:px-margin-desktop py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Matching Products */}
              <div className="space-y-4">
                <h4 className="text-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/30 pb-2">
                  Matching Products ({searchResults.products.length})
                </h4>
                {searchResults.products.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.products.slice(0, 5).map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container transition-all text-left group cursor-pointer"
                      >
                        <div className="relative w-12 h-12 rounded bg-slate-100/70 border border-outline-variant/40 overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                          {product.imageUrl ? (
                            <Image 
                              alt={product.name} 
                              src={product.imageUrl} 
                              fill 
                              className="object-cover" 
                              sizes="48px"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-xl">precision_manufacturing</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-sm text-primary truncate group-hover:text-accent transition-colors">
                            {product.name}
                          </div>
                          <div className="text-[10px] font-semibold text-secondary uppercase tracking-wider mt-0.5 truncate font-label">
                            {product.category}
                          </div>
                        </div>
                      </button>
                    ))}
                    {searchResults.products.length > 5 && (
                      <button
                        onClick={handleSearchSubmit}
                        className="text-xs font-bold text-accent hover:underline pl-2 pt-1 block cursor-pointer"
                      >
                        + {searchResults.products.length - 5} more products (View all)
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-on-surface-variant/80 italic pl-2">No matching products found.</p>
                )}
              </div>

              {/* Right Column: Site Sections */}
              <div className="space-y-4">
                <h4 className="text-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/30 pb-2">
                  Site Sections ({searchResults.sections.length})
                </h4>
                {searchResults.sections.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.sections.map((sec) => (
                      <Link
                        key={sec.label}
                        href={sec.href}
                        onClick={() => {
                          setIsSearchExpanded(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-container transition-all text-left group cursor-pointer font-sans"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                          <span className="material-symbols-outlined text-base">
                            {sec.label === 'Home' ? 'home' : sec.label === 'Products' ? 'precision_manufacturing' : sec.label === 'Contact Us' ? 'mail' : 'info'}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-primary group-hover:text-accent transition-colors">
                            {sec.label}
                          </div>
                          <div className="text-[10px] text-on-surface-variant font-medium mt-0.5">
                            Navigate to section
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-on-surface-variant/80 italic pl-2">No matching sections found.</p>
                )}
              </div>
            </div>

            {/* Bottom Bar: Press enter to search */}
            {(searchResults.products.length > 0 || searchResults.sections.length > 0) && (
              <div className="mt-6 pt-4 border-t border-outline-variant/40 flex justify-between items-center text-xs text-on-surface-variant font-semibold px-2">
                <span>Press <kbd className="px-1.5 py-0.5 bg-surface-container border border-outline-variant rounded font-mono text-[10px]">Enter</kbd> to search all products</span>
                <button
                  onClick={handleSearchSubmit}
                  className="text-accent hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  View Full Results
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 bg-white border-b border-outline-variant shadow-xl z-40 transition-all duration-300 lg:hidden animate-fade-in">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                className="text-on-surface-variant hover:text-primary transition-colors font-bold text-base py-2.5 border-b border-outline-variant/30" 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
