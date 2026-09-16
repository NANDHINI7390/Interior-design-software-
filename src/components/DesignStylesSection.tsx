import React, { useState } from 'react';
import { DESIGN_STYLES } from '../data/mockData';
import { Sparkles, ArrowRight, Palette } from 'lucide-react';

interface DesignStylesSectionProps {
  onSelectStyle: (styleName: string) => void;
}

export const DesignStylesSection: React.FC<DesignStylesSectionProps> = ({ onSelectStyle }) => {
  const [activeStyleId, setActiveStyleId] = useState<string>(DESIGN_STYLES[0].id);

  const currentStyle = DESIGN_STYLES.find((s) => s.id === activeStyleId) || DESIGN_STYLES[0];

  return (
    <section id="styles-section" className="py-24 sm:py-32 bg-[#F5F2EC] border-b border-[#EBE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center space-x-2">
            <span className="w-8 h-px bg-[#B89569]"></span>
            <span>Aesthetic Languages</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] tracking-tight leading-tight">
            Design Styles Interpreted Through Luxury.
          </h2>
          <p className="text-base text-[#78716C] font-light">
            We adapt global architectural design idioms to your property&apos;s geographical orientation, natural daylight, and lifestyle sensibilities.
          </p>
        </div>

        {/* Style Selector Buttons */}
        <div className="w-full overflow-x-auto no-scrollbar pb-3 mb-8 sm:mb-10">
          <div className="flex gap-2 whitespace-nowrap min-w-max">
            {DESIGN_STYLES.map((style) => {
              const isSelected = style.id === activeStyleId;
              return (
                <button
                  key={style.id}
                  onClick={() => setActiveStyleId(style.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 font-medium ${
                    isSelected
                      ? 'bg-[#1C1917] text-[#FBF9F5] shadow-md scale-102'
                      : 'bg-white/80 hover:bg-white text-[#78716C] hover:text-[#1C1917] border border-[#EBE6DD]'
                  }`}
                >
                  {style.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Style Feature Display */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#EBE6DD] shadow-xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Style Visual Column */}
          <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[360px] lg:min-h-[500px]">
            <img
              src={currentStyle.imageUrl}
              alt={currentStyle.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880]">Style Dossier</span>
                <div className="font-serif text-xl sm:text-2xl font-light">{currentStyle.name}</div>
              </div>
              <span className="text-[10px] sm:text-xs tracking-widest uppercase bg-black/50 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-white/20">
                {currentStyle.subtitle}
              </span>
            </div>
          </div>

          {/* Style Details & Swatches Column */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6 sm:space-y-8 bg-[#FBF9F5]">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B89569]">
                  Architectural Vocabulary
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917]">
                  {currentStyle.name}
                </h3>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed font-light">
                  {currentStyle.description}
                </p>
              </div>

              {/* Key Elements Checklist */}
              <div className="space-y-2 pt-2 border-t border-[#EBE6DD]">
                <div className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium">
                  Signature Architectural Signatures
                </div>
                <ul className="space-y-2 text-xs text-[#44403C]">
                  {currentStyle.keyElements.map((el, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Curated Color Swatches */}
              <div className="space-y-2 pt-2 border-t border-[#EBE6DD]">
                <div className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium flex items-center space-x-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#B89569]" />
                  <span>Curated Tone Palette</span>
                </div>
                <div className="flex items-center space-x-3">
                  {currentStyle.colorPalette.map((color, i) => (
                    <div key={i} className="text-center group">
                      <div
                        className="w-9 h-9 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-110"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[9px] font-mono text-[#78716C] uppercase mt-1 block">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-[#EBE6DD]">
              <button
                onClick={() => onSelectStyle(currentStyle.name)}
                className="w-full py-3.5 rounded-full bg-[#1C1917] hover:bg-[#2E2A27] text-[#FBF9F5] text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <span>Explore {currentStyle.name} For Your Home</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
