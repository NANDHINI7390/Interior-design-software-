import React from 'react';
import { STUDIO_STATS, STUDIO_PILLARS } from '../data/mockData';
import { Sparkles, Award, Compass, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface AboutStudioProps {
  onLearnMore?: () => void;
  onBookConsultation: () => void;
}

export const AboutStudio: React.FC<AboutStudioProps> = ({ onBookConsultation }) => {
  return (
    <section id="about-section" className="py-24 sm:py-32 bg-[#FBF9F5] relative overflow-hidden border-b border-[#EBE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Sub-Eyebrow */}
        <div className="flex flex-col items-start space-y-3 mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center space-x-2">
            <span className="w-8 h-px bg-[#B89569]"></span>
            <span>The Studio Philosophy</span>
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-[#1C1917] tracking-tight max-w-3xl leading-[1.15]">
            Quiet Architectural Luxury, Crafted for Daily Rituals.
          </h2>
        </div>

        {/* Studio Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Editorial Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Ateliera Interior Studio Concept"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Floating Quote Stamp */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-xl">
                <p className="font-serif italic text-lg text-[#1C1917]">
                  &ldquo;A room should feel inevitable—as though every beam, slab of stone, and beam of natural light had waited centuries to welcome you home.&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between text-xs tracking-widest uppercase text-[#78716C]">
                  <span>Elena Vance &amp; Marcus Sterling</span>
                  <span className="text-[#B89569]">Founding Partners</span>
                </div>
              </div>
            </div>

            {/* Subtle decorative frame */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#C5A880]/50 rounded-tl-xl pointer-events-none" />
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#C5A880]/50 rounded-br-xl pointer-events-none" />
          </div>

          {/* Core Approach & Text Column */}
          <div className="lg:col-span-6 space-y-8">
            <p className="text-lg sm:text-xl text-[#44403C] font-light leading-relaxed">
              At <strong className="font-medium text-[#1C1917]">Ateliera Interiors</strong>, we reject ostentatious trends in favor of enduring proportion, organic tactile materiality, and acoustic calm. Whether transforming a 12,000-sq-ft private villa or an intimate sky penthouse, we take full custody from initial sketch to the final styling cushion.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {STUDIO_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white border border-[#EBE6DD] hover:border-[#C5A880] transition-colors group shadow-sm hover:shadow-md"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F5F2EC] flex items-center justify-center text-[#B89569] font-mono text-xs font-semibold mb-3 group-hover:bg-[#C5A880] group-hover:text-white transition-colors">
                    0{idx + 1}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#1C1917] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#78716C] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookConsultation}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#2E2A27] text-[#FBF9F5] text-xs uppercase tracking-[0.2em] font-medium transition-all"
              >
                <span>Schedule a Studio Meeting</span>
                <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
              </button>
              <span className="text-xs text-[#78716C] tracking-wider uppercase">
                Private In-Person &amp; Virtual Consultations
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Banner */}
        <div className="mt-20 pt-12 border-t border-[#EBE6DD]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {STUDIO_STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#1C1917] tracking-tight">
                  <span className="text-[#B89569]">{stat.value}</span>
                </div>
                <div className="text-sm uppercase tracking-widest font-medium text-[#1C1917]">
                  {stat.label}
                </div>
                <div className="text-xs text-[#78716C]">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
