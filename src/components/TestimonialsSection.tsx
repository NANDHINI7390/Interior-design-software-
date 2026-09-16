import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section id="testimonials-section" className="py-24 sm:py-32 bg-[#FBF9F5] border-b border-[#EBE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center space-x-2">
              <span className="w-8 h-px bg-[#B89569]"></span>
              <span>Client Endorsements</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] tracking-tight leading-tight">
              Trusted by Discerning Homeowners &amp; Commercial Leaders.
            </h2>
            <p className="text-base text-[#78716C] font-light">
              Read first-hand accounts of our architectural process, material transparency, and turnkey delivery.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white border border-[#EBE6DD] hover:border-[#C5A880] text-[#1C1917] transition-colors shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white border border-[#EBE6DD] hover:border-[#C5A880] text-[#1C1917] transition-colors shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials 4-Card Grid (with highlighted active on mobile/tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((t, idx) => {
            const isHighlighted = idx === activeIndex;
            return (
              <div
                key={t.id}
                onClick={() => setActiveIndex(idx)}
                className={`p-7 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 ${
                  isHighlighted
                    ? 'bg-white border-[#C5A880] shadow-xl ring-1 ring-[#C5A880] -translate-y-1'
                    : 'bg-white/60 hover:bg-white border-[#EBE6DD] shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 text-[#C5A880]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-[#44403C] font-serif italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#F5F2EC] flex items-center space-x-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#EBE6DD]"
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-medium text-[#1C1917] truncate flex items-center space-x-1">
                      <span>{t.name}</span>
                    </h4>
                    <div className="text-[11px] text-[#B89569] font-medium truncate">
                      {t.title}
                    </div>
                    <div className="text-[10px] text-[#A8A29E] font-mono truncate">
                      {t.project}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 pt-10 border-t border-[#EBE6DD] flex flex-wrap items-center justify-between gap-6 text-xs text-[#78716C] uppercase tracking-wider font-mono">
          <span className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#B89569]" />
            <span>100% On-Budget Guarantee</span>
          </span>
          <span className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#B89569]" />
            <span>Dedicated Site Architect</span>
          </span>
          <span className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#B89569]" />
            <span>10-Year Structural Fit-Out Warranty</span>
          </span>
          <span className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#B89569]" />
            <span>Weekly Photo Milestones via Portal</span>
          </span>
        </div>

      </div>
    </section>
  );
};
