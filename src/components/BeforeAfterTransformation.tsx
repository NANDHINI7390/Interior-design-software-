import React, { useState, useRef, useCallback } from 'react';
import {
  Layers,
  Sparkles,
  ArrowLeftRight,
  Maximize2,
  CheckCircle2,
  Clock,
  TrendingUp,
  Hammer,
} from 'lucide-react';

interface TransformationCase {
  id: string;
  title: string;
  location: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  timeline: string;
  valueAppreciation: string;
  intervention: string;
  description: string;
}

const TRANSFORMATION_CASES: TransformationCase[] = [
  {
    id: 'mayfair',
    title: 'Mayfair Sky Residence',
    location: 'London, UK',
    category: 'Penthouse Conversion',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    beforeLabel: 'Phase 0: Raw Demolition & Structural Shell',
    afterLabel: 'Phase Handover: Ateliera Turnkey Sanctuary',
    timeline: '22 Weeks',
    valueAppreciation: '+42% Asset Valuation',
    intervention: 'Removed 3 non-bearing dividing walls to create a unified 18-meter reception salon',
    description: 'We took custody of a derelict, water-damaged shell and transformed it into a world-class penthouse with acoustic wall panels, bookmatched Nero Marquina accents, and circadian lighting.',
  },
  {
    id: 'beverly',
    title: 'Villa Althea Estate',
    location: 'Beverly Hills, California',
    category: 'Estate Architecture',
    beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    beforeLabel: 'Phase 0: Dated 1990s Partitioning',
    afterLabel: 'Phase Handover: Mediterranean Minimalist Pavilion',
    timeline: '26 Weeks',
    valueAppreciation: '+38% Equity Expansion',
    intervention: 'Introduced 6-meter lime-washed barrel vaults and seamless micro-terrazzo floor',
    description: 'Replaced dark cramped compartmentalized rooms with expansive vaulted archways that draw California golden-hour sunlight through olive trees into limestone living pavilions.',
  },
  {
    id: 'como',
    title: 'Grand Belvedere Suite',
    location: 'Lake Como, Italy',
    category: 'Heritage Restoration',
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85',
    beforeLabel: 'Phase 0: Historic Decay & Aging Infrastructure',
    afterLabel: 'Phase Handover: Calacatta Viola & Fresco Masterpiece',
    timeline: '18 Weeks',
    valueAppreciation: 'AD100 Heritage Award Nominee',
    intervention: 'Micro-restored 19th-century ceiling frescoes while concealing modern thermal HVAC',
    description: 'A painstaking historical preservation commission balancing Italian heritage artisanal stonework with modern soundproofing and bespoke unlacquered satin brass bathroom suites.',
  },
];

export const BeforeAfterTransformation: React.FC = () => {
  const [activeCase, setActiveCase] = useState<TransformationCase>(TRANSFORMATION_CASES[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section
      id="transformation-lens-section"
      className="py-24 sm:py-32 bg-[#FBF9F5] relative overflow-hidden border-b border-[#EBE6DD]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center space-x-2">
              <span className="w-8 h-px bg-[#B89569]"></span>
              <span>Architectural Metamorphosis</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] tracking-tight leading-tight">
              The Dual-Lens Transformation.
            </h2>
            <p className="text-base text-[#78716C] font-light leading-relaxed">
              Drag the tactile brass divider to reveal the transition from raw structural shell to finished architectural sanctuary.
            </p>
          </div>

          {/* Project selector */}
          <div className="flex flex-wrap items-center gap-2">
            {TRANSFORMATION_CASES.map((tc) => (
              <button
                key={tc.id}
                onClick={() => {
                  setActiveCase(tc);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-full text-xs font-serif transition-all ${
                  activeCase.id === tc.id
                    ? 'bg-[#1C1917] text-[#FBF9F5] shadow'
                    : 'bg-white text-[#78716C] hover:text-[#1C1917] border border-[#EBE6DD]'
                }`}
              >
                {tc.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Slider Stage */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[16/9] min-h-[380px] max-h-[660px] rounded-3xl overflow-hidden shadow-2xl border border-[#EBE6DD] cursor-ew-resize select-none group"
        >
          {/* After Image (Full Base) */}
          <img
            src={activeCase.afterImg}
            alt={`${activeCase.title} - After`}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Before Image (Clipped by slider position) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={activeCase.beforeImg}
              alt={`${activeCase.title} - Before`}
              className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
              style={{ width: containerRef.current?.clientWidth || '100%' }}
            />
            {/* Grayscale filter to highlight raw construction */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Vertical Divider Line with Brass Knob */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-[#C5A880] shadow-[0_0_12px_rgba(197,168,128,0.8)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1C1917] border-2 border-[#C5A880] text-[#C5A880] flex items-center justify-center shadow-2xl">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>

          {/* Floating Badges */}
          <div className="absolute top-6 left-6 z-10 pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white/90 text-xs font-mono uppercase tracking-wider border border-white/20">
              Before: Demolition Shell
            </span>
          </div>

          <div className="absolute top-6 right-6 z-10 pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full bg-[#C5A880]/95 backdrop-blur-md text-[#1C1917] text-xs font-mono font-semibold uppercase tracking-wider shadow-lg">
              After: Ateliera Turnkey
            </span>
          </div>

          {/* Instruction hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 text-xs font-mono tracking-widest uppercase pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            Drag or Hover to Reveal Transformation
          </div>
        </div>

        {/* Transformation Metrics Dossier */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="p-6 rounded-2xl bg-white border border-[#EBE6DD] shadow-sm">
            <div className="flex items-center space-x-2 text-[#B89569] mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest">Turnkey Timeline</span>
            </div>
            <p className="text-xl font-serif text-[#1C1917] font-medium">{activeCase.timeline}</p>
            <p className="text-xs text-[#78716C] mt-1">From demolition to final art curation</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EBE6DD] shadow-sm">
            <div className="flex items-center space-x-2 text-[#B89569] mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest">Capital Impact</span>
            </div>
            <p className="text-xl font-serif text-[#1C1917] font-medium">{activeCase.valueAppreciation}</p>
            <p className="text-xs text-[#78716C] mt-1">Independent real estate appraisal</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EBE6DD] shadow-sm sm:col-span-2">
            <div className="flex items-center space-x-2 text-[#B89569] mb-2">
              <Hammer className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest">Structural Intervention</span>
            </div>
            <p className="text-sm font-sans text-[#1C1917] font-medium leading-snug">{activeCase.intervention}</p>
            <p className="text-xs text-[#78716C] mt-1">{activeCase.description}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
