import React from 'react';
import { Calendar, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

interface FinalCTAProps {
  onBookConsultation: () => void;
  onExplorePortfolio: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onBookConsultation,
  onExplorePortfolio,
}) => {
  return (
    <section className="py-24 sm:py-32 bg-[#1C1917] text-[#FBF9F5] relative overflow-hidden border-t border-[#2C2825]">
      {/* Subtle architectural atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.12),transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono uppercase tracking-[0.25em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          <span>Private Client Commission</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight leading-[1.15] text-[#FBF9F5] max-w-3xl mx-auto">
          Every enduring sanctuary begins with a thoughtful conversation.
        </h2>

        {/* Supporting description */}
        <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
          Whether you hold architectural blueprints, an estate awaiting comprehensive metamorphosis, or a nascent vision, our partners invite you to share your project aspirations.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBookConsultation}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C5A880] hover:bg-[#D4BC96] text-[#1C1917] font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 cursor-pointer"
            id="final-cta-book-btn"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Consultation</span>
          </button>

          <button
            onClick={onExplorePortfolio}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white/90 hover:text-white border border-white/15 text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer"
            id="final-cta-portfolio-btn"
          >
            <span>Explore Portfolio</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>

        {/* Direct Studio Contact Bar */}
        <div className="pt-12 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-white/60 font-light">
          <div className="flex items-center justify-center space-x-2">
            <MapPin className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
            <span>Mayfair, London • Manhattan, NY</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Phone className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
            <span>Direct Desk: +44 20 7946 0912</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Mail className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
            <span>concierge@ateliera-interiors.com</span>
          </div>
        </div>

      </div>
    </section>
  );
};
