import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Sparkles,
  Layers,
  ArrowRight,
  Check,
  PackageCheck,
  Compass,
  Sliders,
} from 'lucide-react';

interface Material {
  id: string;
  name: string;
  category: string;
  origin: string;
  texture: string;
  hexColor: string;
  imageUrl: string;
  tactileDescription: string;
}

const ATELIER_MATERIALS: Material[] = [
  {
    id: 'calacatta-viola',
    name: 'Calacatta Viola Marble',
    category: 'Noble Stone',
    origin: 'Carrara, Italy',
    texture: 'Honed Silk Matte',
    hexColor: '#63374B',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tactileDescription: 'Deep cabernet-wine breccia veining running through soft creamy calcite stone.',
  },
  {
    id: 'smoked-oak',
    name: 'Smoked Bavarian Oak',
    category: 'Architectural Timber',
    origin: 'Black Forest, Germany',
    texture: 'Wire-Brushed Natural Oil',
    hexColor: '#534232',
    imageUrl: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80',
    tactileDescription: 'Fumed with ammonia vapors to deepen tannins, preserving open pore tactile grain.',
  },
  {
    id: 'unlacquered-brass',
    name: 'Unlacquered Aged Brass',
    category: 'Artisanal Metal',
    origin: 'Milan, Italy',
    texture: 'Hand-Rubbed Satin Wax',
    hexColor: '#BFA06B',
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    tactileDescription: 'Living metal finish that patinates organically over time with touch and air.',
  },
  {
    id: 'belgian-boucle',
    name: 'Flemish Bouclé Wool',
    category: 'High-Performance Textile',
    origin: 'Flanders, Belgium',
    texture: 'Heavy Looped Natural Curl',
    hexColor: '#E6E1D8',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    tactileDescription: 'Spun from virgin undyed merino wool loops for peerless tactile coziness.',
  },
  {
    id: 'roman-travertine',
    name: 'Tivoli Vein-Cut Travertine',
    category: 'Sedimentary Stone',
    origin: 'Tivoli, Italy',
    texture: 'Open Pores Hand-Washed',
    hexColor: '#D3C8B4',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    tactileDescription: 'Sedimentary linear bands celebrating mineral depth, keeping barefoot floors cool.',
  },
  {
    id: 'taj-mahal-quartzite',
    name: 'Taj Mahal Cristallo Quartzite',
    category: 'Monolithic Quartzite',
    origin: 'Bahia, Brazil',
    texture: 'Leathered Thermal Finish',
    hexColor: '#DDD6CA',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    tactileDescription: 'Translucent crystalline layers resisting heat, citrus acidity, and knife marks.',
  },
];

interface TactileMaterialStudioProps {
  onRequestSwatchBox: (selectedMaterials: string[]) => void;
}

export const TactileMaterialStudio: React.FC<TactileMaterialStudioProps> = ({
  onRequestSwatchBox,
}) => {
  // Lighting mode: dawn (2700K), midday (5000K), twilight (2200K)
  const [sunlightMode, setSunlightMode] = useState<'dawn' | 'midday' | 'twilight'>('midday');
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'calacatta-viola',
    'smoked-oak',
    'unlacquered-brass',
    'belgian-boucle',
  ]);

  const toggleMaterialSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((m) => m !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // replace last
        setSelectedIds([...selectedIds.slice(1), id]);
      }
    }
  };

  const selectedMaterials = ATELIER_MATERIALS.filter((m) => selectedIds.includes(m.id));

  // Lighting overlay styles
  const lightingFilters = {
    dawn: 'sepia(18%) hue-rotate(-12deg) brightness(96%) contrast(102%)',
    midday: 'brightness(102%) contrast(105%)',
    twilight: 'sepia(38%) hue-rotate(-24deg) brightness(88%) contrast(108%)',
  };

  const lightingDescriptions = {
    dawn: '2,700K Morning Dawn · Warm angled ambient light highlighting tactile stone relief',
    midday: '5,000K Pure Zenith Sunlight · Unfiltered true-to-life pigment and vein accuracy',
    twilight: '2,200K Evening Candle-Glow · Intimate, moody warmth for evening entertaining',
  };

  return (
    <section
      id="tactile-studio-section"
      className="py-24 sm:py-32 bg-[#FBF9F5] relative overflow-hidden border-b border-[#EBE6DD]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center space-x-2">
              <span className="w-8 h-px bg-[#B89569]"></span>
              <span>Tactile Atelier</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] tracking-tight leading-tight">
              Circadian Sun Study &amp; Flatlay Studio.
            </h2>
            <p className="text-base text-[#78716C] font-light leading-relaxed">
              Materials do not exist in a vacuum; they transform under natural daylight. Select materials to compose your tactile flatlay, then test how daylight shifts their warmth from dawn to dusk.
            </p>
          </div>

          {/* Circadian Sun Study Mode Buttons */}
          <div className="flex items-center space-x-1.5 p-1.5 rounded-full bg-white border border-[#EBE6DD] shadow-sm">
            <button
              onClick={() => setSunlightMode('dawn')}
              className={`px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                sunlightMode === 'dawn'
                  ? 'bg-[#C5A880] text-[#1C1917] font-semibold shadow'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Dawn 2700K</span>
            </button>

            <button
              onClick={() => setSunlightMode('midday')}
              className={`px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                sunlightMode === 'midday'
                  ? 'bg-[#1C1917] text-[#FBF9F5] font-semibold shadow'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Zenith 5000K</span>
            </button>

            <button
              onClick={() => setSunlightMode('twilight')}
              className={`px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                sunlightMode === 'twilight'
                  ? 'bg-[#4A3222] text-[#F5EBE1] font-semibold shadow'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dusk 2200K</span>
            </button>
          </div>
        </div>

        {/* Circadian daylight banner */}
        <div className="mb-8 p-3.5 rounded-2xl bg-white border border-[#EBE6DD] flex items-center justify-between text-xs text-[#78716C]">
          <span className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
            <strong className="text-[#1C1917] font-medium">Active Lighting Calibration:</strong>
            <span>{lightingDescriptions[sunlightMode]}</span>
          </span>
          <span className="hidden sm:inline-block font-mono text-[11px] text-[#A8A29E]">
            Real-time optical rendering
          </span>
        </div>

        {/* Main Stage: Material Library Selector + Interactive Flatlay Composition Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Material Selection Grid (6 Columns) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#1C1917] font-medium">
                Noble Material Archive (Choose up to 4)
              </span>
              <span className="text-xs font-mono text-[#B89569]">
                {selectedIds.length} of 4 Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ATELIER_MATERIALS.map((mat) => {
                const isSelected = selectedIds.includes(mat.id);
                return (
                  <div
                    key={mat.id}
                    onClick={() => toggleMaterialSelection(mat.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-2.5 ${
                      isSelected
                        ? 'bg-white border-[#C5A880] shadow-md ring-1 ring-[#C5A880]/50 -translate-y-0.5'
                        : 'bg-white/70 hover:bg-white border-[#EBE6DD] hover:border-[#C5A880]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#B89569]">
                        {mat.category}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] transition-colors ${
                          isSelected
                            ? 'bg-[#1C1917] text-white border-[#1C1917]'
                            : 'border-[#EBE6DD] text-transparent'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-serif text-base text-[#1C1917] font-medium leading-tight">
                        {mat.name}
                      </h4>
                      <p className="text-xs text-[#78716C] mt-0.5">{mat.origin}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#F5F2EB] text-[11px]">
                      <span className="font-mono text-[#A8A29E]">Finish:</span>
                      <span className="text-[#1C1917] font-sans font-medium">{mat.texture}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Curated Flatlay Board (Right Column) */}
          <div className="lg:col-span-6 bg-[#1C1917] text-white rounded-3xl p-6 sm:p-8 border border-[#332E2A] shadow-2xl flex flex-col justify-between space-y-6">
            
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A880]">
                    Bespoke Curated Flatlay Canvas
                  </span>
                  <h3 className="font-serif text-2xl text-white font-light mt-0.5">
                    Your Personalized Palette
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#C5A880]">
                  {sunlightMode.toUpperCase()} LIGHT
                </span>
              </div>

              {/* Flatlay visual representation under active circadian lighting filter */}
              <div
                className="grid grid-cols-2 gap-3.5 transition-all duration-700"
                style={{ filter: lightingFilters[sunlightMode] }}
              >
                {selectedMaterials.map((mat) => (
                  <div
                    key={mat.id}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 group shadow-lg"
                  >
                    <img
                      src={mat.imageUrl}
                      alt={mat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                      <span
                        className="w-3 h-3 rounded-full border border-white/40"
                        style={{ backgroundColor: mat.hexColor }}
                      />
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white/80 bg-black/50 px-2 py-0.5 rounded-full">
                        {mat.origin.split(',')[0]}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="font-serif text-sm font-medium leading-tight">
                        {mat.name}
                      </p>
                      <p className="text-[10px] text-white/70 font-mono mt-0.5">
                        {mat.texture}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Swatch Details Summary */}
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A880] block">
                  Harmonized Spatial Synergy:
                </span>
                <p className="text-xs text-white/80 font-light leading-relaxed">
                  Combining {selectedMaterials.map((m) => m.name).join(', ')} establishes a sensory contrast of cool geological stone, warm open-pore organic timber, and deep tactile acoustic textiles.
                </p>
              </div>
            </div>

            {/* Request physical swatch box CTA */}
            <div className="pt-2">
              <button
                onClick={() => onRequestSwatchBox(selectedMaterials.map((m) => m.name))}
                className="w-full inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-full bg-[#C5A880] hover:bg-[#D4BC96] text-[#1C1917] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl cursor-pointer"
              >
                <PackageCheck className="w-4 h-4" />
                <span>Request Physical Swatch Box with this Palette</span>
              </button>
              <p className="text-center text-[10px] font-mono text-white/40 mt-2">
                Hand-delivered in a presentation cedar box with material spec sheets
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
