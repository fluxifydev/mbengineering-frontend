'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    country: '',
    requirement: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactDetails = [
    { icon: 'call', title: 'Call Us Directly', value: '+91 93453 23173', href: 'tel:+919345323173' },
    { icon: 'mail', title: 'Email Inquiries', value: 'mbengineeringworks50@gmail.com', href: 'mailto:mbengineeringworks50@gmail.com' },
    { icon: 'location_on', title: 'Factory HQ', value: '48, Lakshmi Nagar, 3rd St, Sanganoor, Coimbatore, Tamil Nadu 641027', href: 'https://maps.app.goo.gl/qR7GCzRoCARhMnLi9' },
  ];

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
    if (!formData.requirement.trim()) newErrors.requirement = 'Please let us know your requirement';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await addDoc(collection(db, 'inquiries'), {
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        country: formData.country,
        requirement: formData.requirement,
        createdAt: serverTimestamp(),
      });

      setIsSubmitted(true);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        country: '',
        requirement: '',
      });
    } catch (err: any) {
      console.error('Error saving contact inquiry:', err);
      setSubmitError('Failed to send inquiry. Please try again or connect via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppChat = () => {
    window.open('https://wa.me/919345323173?text=Hello%20MB%20Engineering%20Works%20sales%20team!', '_blank');
  };

  return (
    <section className="py-16 md:py-24 lg:py-xl animate-fade-in scroll-mt-20" id="contact">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
        
        {/* Contact Split Grid */}
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-gutter items-start">
          
          {/* Info Details Column */}
          <div className="col-span-12 lg:col-span-5 space-y-6 md:space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
              Let's Discuss Your Project
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed">
              Get in touch with our engineering office today. We are available to review technical parameters, provide custom layout drawings, and issue comprehensive B2B quotations.
            </p>
            
            <div className="space-y-6">
              {contactDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-xl">{detail.icon}</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-sm md:text-base text-primary leading-tight">{detail.title}</h5>
                    {detail.href !== '#' ? (
                      <a href={detail.href} className="text-on-surface-variant hover:text-primary transition-colors text-xs sm:text-sm md:text-base font-semibold mt-1 inline-block">
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-on-surface-variant text-xs sm:text-sm md:text-base font-semibold mt-1">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Panel */}
            <div className="pt-6 border-t border-outline-variant/60">
              <h5 className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                Quick Connect
              </h5>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={handleWhatsAppChat}
                  className="bg-[#25D366] text-white px-5 py-3 rounded-lg font-button font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#20ba56] transition-all cursor-pointer shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current shrink-0">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                  WhatsApp Inquiry
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('name-input');
                    if (el) el.focus();
                  }}
                  className="bg-primary text-white px-5 py-3 rounded-lg font-button font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-primary-container transition-all cursor-pointer shadow-md shadow-primary/10"
                >
                  Schedule Call
                </button>
              </div>
            </div>
          </div>

          {/* Form Card Column */}
          <div className="col-span-12 lg:col-span-7 bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-outline-variant relative">
            {isSubmitted && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 sm:p-8 text-center space-y-4 z-10 animate-fade-in">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <span className="material-symbols-outlined text-4xl">check</span>
                </div>
                <h4 className="text-lg font-bold text-primary">Inquiry Received</h4>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-[360px] leading-relaxed">
                  Thank you for contacting MB Engineering. We have received your project details and will send a follow-up email shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-primary font-bold hover:underline cursor-pointer pt-2"
                >
                  Send another message
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-label text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Full Name</label>
                  <input 
                    id="name-input"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-outline-variant rounded-lg p-3 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="Enter your name"
                  />
                  {errors.fullName && <p className="text-xs text-error font-medium">{errors.fullName}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-label text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Company Name</label>
                  <input 
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full border border-outline-variant rounded-lg p-3 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="Enter company name"
                  />
                  {errors.companyName && <p className="text-xs text-error font-medium">{errors.companyName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-label text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-outline-variant rounded-lg p-3 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="name@company.com"
                  />
                  {errors.email && <p className="text-xs text-error font-medium">{errors.email}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-label text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Country</label>
                  <input 
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full border border-outline-variant rounded-lg p-3 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="Enter country"
                  />
                  {errors.country && <p className="text-xs text-error font-medium">{errors.country}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-label text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Machine Requirement</label>
                <textarea 
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  rows={4}
                  className="w-full border border-outline-variant rounded-lg p-3 text-xs sm:text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                  placeholder="Tell us about your production needs..."
                />
                {errors.requirement && <p className="text-xs text-error font-medium">{errors.requirement}</p>}
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
                className="w-full bg-accent text-white py-3.5 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:brightness-110 hover:shadow-lg hover:shadow-accent/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Sending inquiry...' : 'Submit Technical Inquiry'}
              </button>
            </form>
          </div>
        </div>

        {/* Location Map Section Banner */}
        <div className="border border-outline-variant rounded-2xl overflow-hidden bg-white shadow-lg flex flex-col md:flex-row items-stretch">
          {/* Map Visual Decoration */}
          <div className="w-full md:w-1/2 min-h-[200px] md:min-h-[250px] relative bg-surface-container-highest flex items-center justify-center overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-40 blueprint-grid" />
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <span className="material-symbols-outlined text-[150px] md:text-[180px] text-primary">map</span>
            </div>
            
            <div className="absolute w-40 h-40 md:w-48 md:h-48 bg-primary/5 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:w-24 bg-primary/10 rounded-full" />
            </div>
            
            <div className="relative z-10 text-center p-6 space-y-2">
              <span className="material-symbols-outlined text-3xl md:text-4xl text-primary animate-bounce">location_on</span>
              <h4 className="font-display font-bold text-base md:text-lg text-primary">Factory Visit Portal</h4>
              <p className="text-[10px] md:text-xs text-on-surface-variant font-medium">Book a facility walkthrough during production hours.</p>
            </div>
          </div>
          
          {/* Location Text & Directions Action */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between items-start space-y-6">
            <div className="space-y-4">
              <h4 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl md:text-2xl">apartment</span>
                Visit Our Facility
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant font-semibold leading-relaxed">
                Lakshmi nagar, 48, 3rd St, Laxmi Nagar, Sanganoor, Coimbatore, Tamil Nadu 641027
              </p>
              <p className="text-[10px] sm:text-xs text-on-surface-variant/75 font-medium">
                Open for technical walkthroughs Mon-Sat, 9:00 AM - 6:00 PM
              </p>
            </div>
            
            <a 
              href="https://maps.app.goo.gl/qR7GCzRoCARhMnLi9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-3 rounded-lg font-button font-bold text-xs sm:text-sm hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer block"
            >
              Get Directions
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
