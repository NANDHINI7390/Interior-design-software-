import React, { useState } from 'react';
import { MATERIALS_DATA } from '../data/mockData';
import { MaterialItem } from '../types';
import { Sparkles, Compass, Check, ArrowRight } from 'lucide-react';

interface MaterialsShowcaseProps {
  onRequestSwatchBox: () => void;
}

export const MaterialsShowcase: React.FC<MaterialsShowcaseProps> = ({ onRequestSwatchBox }) => {
  const [activeMaterial, setActiveMaterial] = useState<MaterialItem>(MATERIALS_DATA[0]);

  return (
    <section id="materials-section" className="py-24 sm:py-32 bg-[#FBF9F5] border-b border-[#EBE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center space-x-2">
              <span className="w-8 h-px bg-[#B89569]"></span>
              <span>Tactile Library</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] tracking-tight leading-tight">
              Noble Materials &amp; Artisanal Finishes.
            </h2>
            <p className="text-base text-[#78716C] font-light">
              True luxury is tactile. We hand-select continuous marble veins from Carrara, smoke oak in Bavaria, and commission hand-loomed textiles in Flanders.
            </p>
          </div>

          <button
            onClick={onRequestSwatchBox}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#2C2825] text-[#FBF9F5] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md"
          >
            <span>Request Tactile Swatch Box</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </button>
        </div>

        {/* Materials Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* List of Material Categories */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MATERIALS_DATA.map((mat) => {
              const isSelected = mat.id === activeMaterial.id;
              return (
                <div
                  key={mat.id}
                  onClick={() => setActiveMaterial(mat)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-white border-[#C5A880] shadow-lg scale-[1.02]'
                      : 'bg-white/60 hover:bg-white border-[#EBE6DD] hover:border-[#C5A880]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B89569]">
                      {mat.category}
                    </span>
                    <span className="text-xs text-[#A8A29E]">{mat.origin}</span>
                  </div>

                  <h3 className="text-lg font-serif font-medium text-[#1C1917]">
                    {mat.name}
                  </h3>

                  <div className="text-xs text-[#78716C] font-mono flex items-center space-x-1">
                    <span>Finish:</span>
                    <span className="text-[#1C1917] font-sans">{mat.texture}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Material Deep Dive Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl overflow-hidden border border-[#EBE6DD] shadow-xl">
            <div className="relative aspect-[16/10] overflow-hidden bg-black/10">
              <img
                src={activeMaterial.imageUrl}
                alt={activeMaterial.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#E2CCA9] text-xs font-mono">
                {activeMaterial.origin}
              </div>
            </div>

            <div className="p-8 space-y-4 bg-[#FBF9F5]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-widest text-[#B89569]">
                  {activeMaterial.category}
                </span>
                <span className="text-xs text-[#78716C] font-mono">
                  Texture: {activeMaterial.texture}
                </span>
              </div>

              <h3 className="text-2xl font-serif font-medium text-[#1C1917]">
                {activeMaterial.name}
              </h3>

              <p className="text-sm text-[#57534E] leading-relaxed font-light">
                {activeMaterial.description}
              </p>

              <div className="pt-4 border-t border-[#EBE6DD] flex items-center justify-between">
                <span className="text-xs text-[#78716C]">
                  Directly imported &amp; custom-fabricated
                </span>
                <span className="text-xs font-medium text-[#1C1917] flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89569]" />
                  <span>100% Provenance Certified</span>
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
