'use client';

import React, { useState } from 'react';

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      title: 'Consultation & Design',
      icon: 'engineering',
      details: 'We start by evaluating your material elasticity, web width limits, and production targets. Our engineers then develop custom 3D CAD blueprints tailored to your specific shopfloor requirements.',
    },
    {
      title: 'Precision Manufacturing',
      icon: 'build',
      details: 'Leveraging advanced multi-axis CNC centers, we produce core mechanical components with sub-micron tolerances, assembled under strict internal quality controls.',
    },
    {
      title: 'Rigorous Testing',
      icon: 'fact_check',
      details: 'Every unit undergoes a comprehensive 48-hour dry-run and stress test. We meticulously calibrate active tension controls, pneumatic alignments, and cutting mechanisms.',
    },
    {
      title: 'Global Logistics',
      icon: 'local_shipping',
      details: 'We secure your machinery in vacuum-sealed, marine-grade wooden crates, managing all export documentation, customs clearances, and door-to-door sea/air logistics.',
    },
    {
      title: 'On-site Commissioning',
      icon: 'settings',
      details: 'Our commissioning team deploys directly to your facility to supervise assembly, integrate power systems, and conduct hands-on training for your operating crew.',
    },
  ];

  const steps = [
    { num: '1', title: 'Consultation', duration: 'Day 1-7' },
    { num: '2', title: 'Design', duration: 'Day 8-20' },
    { num: '3', title: 'Testing', duration: 'Day 45-50' },
    { icon: 'rocket_launch', title: 'Delivery', duration: 'Global', isSpecial: true },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-xl scroll-mt-20 animate-fade-in" id="services">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Title Block */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary tracking-tight">
            End-to-End Technical Services
          </h2>
          <p className="text-on-surface-variant max-w-[640px] mx-auto mt-4 text-sm sm:text-base">
            We provide end-to-end engineering support—from initial CAD modeling and stress testing to site calibration and life-long maintenance.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter items-stretch">
          
          {/* Left Navigation Tabs */}
          <div className="lg:col-span-4 flex overflow-x-auto no-scrollbar gap-2.5 pb-4 -mx-margin-mobile px-margin-mobile lg:mx-0 lg:px-0 lg:flex-col lg:space-y-3 lg:justify-center">
            {services.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <button 
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`p-3.5 rounded-xl flex items-center gap-3.5 group cursor-pointer transition-all duration-200 border text-left shrink-0 lg:shrink ${isActive ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10' : 'border-outline-variant hover:bg-surface-container bg-white text-on-surface-variant'}`}
                >
                  <span className={`material-symbols-outlined transition-transform duration-300 group-hover:scale-105 text-lg md:text-xl ${isActive ? 'text-white' : 'text-primary'}`}>
                    {item.icon}
                  </span>
                  <span className="font-bold text-xs md:text-sm tracking-tight">{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Right Process Card */}
          <div className="lg:col-span-8 bg-surface-container-low p-6 md:p-10 rounded-2xl border border-outline-variant flex flex-col justify-between space-y-10">
            
            {/* Dynamic Active Tab Details */}
            <div className="space-y-3.5">
              <h4 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-primary">
                {services[activeTab].title}
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
                {services[activeTab].details}
              </p>
            </div>

            {/* Process Timeline Steps */}
            <div className="space-y-6">
              <h5 className="font-label text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary">
                Our Standard Production Timeline
              </h5>
              
              <div className="flex flex-col md:flex-row justify-between items-center relative gap-6 md:gap-0 pt-2">
                {/* Connector Line for Desktop */}
                <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-outline-variant/60 z-0" />
                
                {steps.map((s, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center space-y-3 relative z-10 w-full">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-md transition-all duration-300 shrink-0 ${s.isSpecial ? 'bg-accent hover:scale-105' : 'bg-primary'}`}>
                      {s.icon ? (
                        <span className="material-symbols-outlined text-lg">{s.icon}</span>
                      ) : (
                        s.num
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-primary">{s.title}</div>
                      <div className="text-[9px] md:text-[10px] text-on-surface-variant font-label uppercase tracking-wider mt-0.5">
                        {s.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Panel */}
            <div className="p-5 md:p-6 bg-white rounded-xl border-l-4 border-accent shadow-sm">
              <p className="text-xs md:text-sm italic text-on-surface-variant leading-relaxed">
                "The engineering depth during the design phase saved us significant material waste during commissioning. MB Engineering's approach is systematic and incredibly professional."
              </p>
              <div className="mt-3.5 font-bold text-[10px] text-primary font-label uppercase tracking-wide">
                — Technical Director, Warsaw Print Group
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
