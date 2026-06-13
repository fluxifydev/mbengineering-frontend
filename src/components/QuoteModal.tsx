'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMachine?: string;
}

export default function QuoteModal({ isOpen, onClose, initialMachine = '' }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    country: '',
    machineRequirement: initialMachine,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.machineRequirement.trim()) newErrors.machineRequirement = 'Please describe your requirement';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/mvznwoqv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.companyName,
          email: formData.email,
          country: formData.country,
          machineRequirement: formData.machineRequirement,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form to Formspree');
      }

      // Save to Firebase (Optional, but good to keep if it exists)
      try {
        await addDoc(collection(db, 'quotes'), {
          fullName: formData.fullName,
          companyName: formData.companyName,
          email: formData.email,
          country: formData.country,
          machineRequirement: formData.machineRequirement,
          createdAt: serverTimestamp(),
        });
      } catch (fbErr) {
        console.error('Firebase save error (silent fallback):', fbErr);
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error saving quote inquiry:', err);
      setSubmitError('Failed to submit quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      country: '',
      machineRequirement: '',
    });
    setErrors({});
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto flex items-start sm:items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Fixed Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
        onClick={handleReset}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-outline-variant overflow-hidden z-10 transition-all duration-300 animate-fade-in-up my-auto">
        {/* Header decoration */}
        <div className="h-2 bg-gradient-to-r from-primary to-accent shrink-0" />
        
        {/* Close Button */}
        <button 
          onClick={handleReset}
          className="absolute top-5 right-5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer z-20 flex items-center justify-center p-1 rounded-full hover:bg-slate-100"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
        </button>

        {isSubmitted ? (
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
              <span className="material-symbols-outlined text-4xl sm:text-5xl">verified</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary">Inquiry Submitted</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-[480px] mx-auto leading-relaxed">
              Thank you for your interest in MB Engineering Works. A senior technical sales specialist will review your specifications and reach out to you within 24 hours.
            </p>
            <div className="pt-2">
              <button 
                onClick={handleReset}
                className="bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-button text-xs sm:text-sm font-bold hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-primary/10"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 md:p-10">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1.5 tracking-tight">Request Technical Quote</h3>
            <p className="text-on-surface-variant text-xs sm:text-sm mb-6 leading-relaxed">
              Provide your production parameters below, and our team will engineer a custom solution.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1">
                  <label className="text-label text-[10px] sm:text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-outline-variant rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="Enter your name"
                  />
                  {errors.fullName && <p className="text-[10px] sm:text-xs text-error font-semibold mt-0.5">{errors.fullName}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-label text-[10px] sm:text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Company Name</label>
                  <input 
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full border border-outline-variant rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="Enter your company"
                  />
                  {errors.companyName && <p className="text-[10px] sm:text-xs text-error font-semibold mt-0.5">{errors.companyName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1">
                  <label className="text-label text-[10px] sm:text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-outline-variant rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="name@company.com"
                  />
                  {errors.email && <p className="text-[10px] sm:text-xs text-error font-semibold mt-0.5">{errors.email}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-label text-[10px] sm:text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Country</label>
                  <input 
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full border border-outline-variant rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="Enter your country"
                  />
                  {errors.country && <p className="text-[10px] sm:text-xs text-error font-semibold mt-0.5">{errors.country}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-label text-[10px] sm:text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Machine Requirement Details</label>
                <textarea 
                  value={formData.machineRequirement}
                  onChange={(e) => setFormData({ ...formData, machineRequirement: e.target.value })}
                  rows={4}
                  className="w-full border border-outline-variant rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                  placeholder="Material specs, printing widths, slitting speed requirements, etc."
                />
                {errors.machineRequirement && <p className="text-[10px] sm:text-xs text-error font-semibold mt-0.5">{errors.machineRequirement}</p>}
              </div>

              {submitError && (
                <div className="bg-red-50/80 border border-red-200 text-red-600 p-3 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  <span>{submitError}</span>
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-white py-3.5 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:brightness-110 shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Specifications...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">send</span>
                    Submit Technical Inquiry
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
