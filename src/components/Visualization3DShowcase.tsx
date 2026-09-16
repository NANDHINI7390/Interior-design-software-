import React, { useState } from 'react';
import { Eye, Layers, Sun, Sparkles, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface Visualization3DShowcaseProps {
  onBookConsultation: () => void;
}

export const Visualization3DShowcase: React.FC<Visualization3DShowcaseProps> = ({
  onBookConsultation,
}) => {
  const [renderMode, setRenderMode] = useState<'render' | 'wireframe' | 'lighting'>('render');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  const hotspots = [
    {
      id: 0,
      title: 'Monolithic Calacatta Island',
      description: 'Bookmatched 40mm mitered waterfall edge with under-counter ambient strip illumination.',
      top: '60%',
      left: '48%',
    },
    {
      id: 1,
      title: 'Smoked Eucalyptus Joinery',
      description: 'Zero-hardware touch-latch acoustic panels concealing integrated Sub-Zero refrigeration.',
      top: '38%',
      left: '75%',
    },
    {
      id: 2,
      title: 'Circadian Light Cove',
      description: '2700K to 4000K circadian LED simulation calculating sunrise and dusk ambient reflections.',
      top: '18%',
      left: '32%',
    },
  ];

  return (
    <section id="3d-visualization-section" className="py-24 sm:py-32 bg-[#1C1917] text-[#FBF9F5] relative overflow-hidden border-b border-[#2C2825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-medium flex items-center space-x-2">
              <span className="w-8 h-px bg-[#C5A880]"></span>
              <span>Proprietary 3D Atelier</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-tight text-white leading-tight">
              See Your Space Before We Build It.
            </h2>
            <p className="text-base text-white/70 font-light">
              We eliminate on-site ambiguity. Step into millimeter-precise 4K photorealistic spatial simulations showing real daylight angles, custom joinery, and tactile material textures prior to execution.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="w-full lg:w-auto overflow-x-auto no-scrollbar pb-1">
            <div className="inline-flex items-center p-1.5 rounded-full bg-white/10 border border-white/15 text-xs whitespace-nowrap min-w-max">
              <button
                onClick={() => setRenderMode('render')}
                className={`px-3.5 sm:px-4 py-2 rounded-full uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                  renderMode === 'render'
                    ? 'bg-[#C5A880] text-[#1C1917] font-semibold shadow'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>4K Photoreal</span>
              </button>

              <button
                onClick={() => setRenderMode('wireframe')}
                className={`px-3.5 sm:px-4 py-2 rounded-full uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                  renderMode === 'wireframe'
                    ? 'bg-[#C5A880] text-[#1C1917] font-semibold shadow'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Wireframe</span>
              </button>

              <button
                onClick={() => setRenderMode('lighting')}
                className={`px-3.5 sm:px-4 py-2 rounded-full uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                  renderMode === 'lighting'
                    ? 'bg-[#C5A880] text-[#1C1917] font-semibold shadow'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Sunlight Study</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Visualizer Canvas Window */}
        <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-black/60 shadow-2xl aspect-[16/9] min-h-[300px] max-h-[640px] group select-none">
          
          {/* Main Visual depending on mode */}
          <img
            src={
              renderMode === 'render'
                ? 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1800&q=85'
                : renderMode === 'wireframe'
                ? 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80'
                : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85'
            }
            alt="3D Spatial Visualization Model"
            className={`w-full h-full object-cover transition-all duration-700 ${
              renderMode === 'wireframe' ? 'filter grayscale contrast-150 invert-[0.1]' : ''
            } ${renderMode === 'lighting' ? 'sepia-[0.25] brightness-110' : ''}`}
          />

          {/* Interactive Annotation Hotspots (Render mode) */}
          {renderMode === 'render' &&
            hotspots.map((spot) => (
              <div
                key={spot.id}
                style={{ top: spot.top, left: spot.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                onClick={() => setActiveHotspot(spot.id)}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#C5A880] opacity-75"></span>
                  <button
                    className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold transition-transform hover:scale-125 shadow-xl ${
                      activeHotspot === spot.id
                        ? 'bg-[#C5A880] text-black scale-110'
                        : 'bg-black/70 text-white'
                    }`}
                  >
                    +
                  </button>
                </div>

                {/* Hotspot Floating Tooltip */}
                {activeHotspot === spot.id && (
                  <div className={`absolute top-8 w-56 sm:w-64 p-3.5 sm:p-4 rounded-xl bg-black/95 backdrop-blur-md border border-[#C5A880]/50 text-white shadow-2xl z-30 animate-fade-in pointer-events-auto ${
                    parseInt(spot.left) > 60 ? 'right-0' : 'left-0'
                  }`}>
                    <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#C5A880] mb-1">
                      Material Specification
                    </div>
                    <div className="font-serif text-xs sm:text-sm font-semibold mb-1">{spot.title}</div>
                    <div className="text-[11px] sm:text-xs text-white/80 leading-relaxed font-light">
                      {spot.description}
                    </div>
                  </div>
                )}
              </div>
            ))}

          {/* Canvas HUD Status Badges */}
          <div className="absolute top-6 left-6 flex items-center space-x-2">
            <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[#C5A880] text-[11px] font-mono tracking-widest uppercase border border-white/10 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Engine: Unreal Architecture 5.4</span>
            </span>
          </div>

          <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs font-mono border border-white/10 hidden sm:flex items-center space-x-3">
            <span>Accuracy: ±2mm</span>
            <span className="text-white/30">|</span>
            <span>Raytraced Global Illumination</span>
          </div>
        </div>

        {/* Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-sm font-serif font-medium text-white flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Zero Expensive Change Orders</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Catch spatial bottlenecks and appliance clearances in 3D before committing civil work or procuring stone slabs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-sm font-serif font-medium text-white flex items-center space-x-2">
              <Sun className="w-4 h-4 text-[#C5A880]" />
              <span>Diurnal Daylight Calculations</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Observe how solar azimuth angles hit your breakfast banquette at 08:30 AM vs sunset golden hour across living rooms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-sm font-serif font-medium text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Exact Material Reflections</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Honed marble, fluted timber, and textured bouclé respond optically to artificial accent downlights with physical fidelity.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onBookConsultation}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#C5A880] hover:bg-[#B89569] text-[#1C1917] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl hover:scale-102"
          >
            <span>Request 3D Study For Your Floor Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
