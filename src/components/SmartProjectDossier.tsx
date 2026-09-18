import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Clipboard,
  Check,
  ArrowRight,
  Sliders,
  Layers,
  FileText,
  Compass,
  Palette,
  Maximize2,
  Calendar,
  DollarSign,
  Building,
  RefreshCw,
} from 'lucide-react';

interface SmartProjectDossierProps {
  onTransferToConsultation: (dossierData: {
    propertyType: string;
    area: number;
    budgetRange: string;
    style: string;
    message: string;
  }) => void;
  showToast: (message: string) => void;
}

interface ParsedDossier {
  typology: string;
  sqft: number;
  styleName: string;
  styleVibe: string;
  budgetProjection: string;
  timelineEstimate: string;
  detectedRooms: string[];
  recommendedMaterials: { name: string; type: string; color: string }[];
  keyDirectives: string[];
}

const PRESET_INSPIRATIONS = [
  {
    label: 'Cotswolds Heritage Manor',
    text: `Looking to renovate a 5,200 sq ft historic country manor. We want to preserve exposed stone walls while introducing modern Belgian linen minimalism, a double-height kitchen with bookmatched Calacatta Viola island, a walk-in wine room, and an acoustic master dressing suite. Budget around $320,000 - $400,000. Target completion in 7 months.`,
  },
  {
    label: 'Tribeca High-Ceiling Duplex',
    text: `Purchased a 3,800 sq ft penthouse in Tribeca with 18ft ceilings. Focus on warm brutalism with blackened steel accents, smoked European oak wall panelling, custom cantilevered staircase, integrated circadian lighting cove, and a chef's scullery. Aiming for an investment around $260,000 - $350,000.`,
  },
  {
    label: 'Japandi Oceanfront Villa',
    text: `Brand new 6,500 sq ft coastal residence. Seeking serene Japandi architectural flow with floor-to-ceiling glass, raw travertine floors, fluted white ash joinery, sunken outdoor lounge with teak deck and reflecting pool. Prioritizing acoustic quietness and natural textures. Budget $450,000+, timeline flexible.`,
  },
];

export const SmartProjectDossier: React.FC<SmartProjectDossierProps> = ({
  onTransferToConsultation,
  showToast,
}) => {
  const [inputText, setInputText] = useState<string>(PRESET_INSPIRATIONS[0].text);
  const [copied, setCopied] = useState(false);

  // Intelligent architectural brief parser
  const parsedDossier = useMemo<ParsedDossier>(() => {
    const raw = inputText.toLowerCase();

    // 1. Detect Footprint
    const sqftMatch = raw.match(/(\d{1,2}[,\d]*)(\s*)(sq\s*ft|sqft|square\s*feet|sqm|sq\s*m)/i);
    let extractedSqft = 4200;
    if (sqftMatch) {
      const num = parseInt(sqftMatch[1].replace(/,/g, ''), 10);
      if (!isNaN(num) && num > 200 && num < 60000) {
        extractedSqft = sqftMatch[3].toLowerCase().includes('m') ? Math.round(num * 10.764) : num;
      }
    }

    // 2. Detect Typology
    let typology = 'Private Estate / Villa';
    if (raw.includes('penthouse') || raw.includes('duplex') || raw.includes('loft') || raw.includes('apartment')) {
      typology = 'Sky Penthouse / High-Rise';
    } else if (raw.includes('manor') || raw.includes('heritage') || raw.includes('townhouse')) {
      typology = 'Heritage Townhouse / Manor';
    } else if (raw.includes('coastal') || raw.includes('waterfront') || raw.includes('beach')) {
      typology = 'Coastal Sanctuary Villa';
    } else if (raw.includes('commercial') || raw.includes('office') || raw.includes('headquarters')) {
      typology = 'Executive Flagship / Studio';
    }

    // 3. Detect Style DNA
    let styleName = 'Contemporary Quiet Luxury';
    let styleVibe = 'Earthy warmth, organic stone textures, and tailored millwork';
    let recommendedMaterials = [
      { name: 'Roman Travertine', type: 'Stone', color: '#D8CFBC' },
      { name: 'Smoked French Oak', type: 'Wood', color: '#6A5745' },
      { name: 'Raw Belgian Linen', type: 'Textile', color: '#E5DFD5' },
      { name: 'Brushed Champagne Brass', type: 'Metal', color: '#C5A880' },
    ];

    if (raw.includes('japandi') || raw.includes('kyoto') || raw.includes('wabi')) {
      styleName = 'Organic Japandi Sanctuary';
      styleVibe = 'Low-profile geometry, fluted light ash, and acoustic serene tranquility';
      recommendedMaterials = [
        { name: 'Hinoki Cypress Wood', type: 'Wood', color: '#DFC5A4' },
        { name: 'Honed Basalt Stone', type: 'Stone', color: '#3A3937' },
        { name: 'Washi Textured Glass', type: 'Glass', color: '#F1EFEA' },
        { name: 'Raw Bouclé Wool', type: 'Textile', color: '#E8E3DB' },
      ];
    } else if (raw.includes('brutalism') || raw.includes('steel') || raw.includes('concrete') || raw.includes('blackened')) {
      styleName = 'Refined Architectural Brutalism';
      styleVibe = 'Monolithic massing, poured micro-terrazzo, patinated bronze, and bold spatial scale';
      recommendedMaterials = [
        { name: 'Nero Marquina Marble', type: 'Marble', color: '#1E1D1C' },
        { name: 'Hot-Rolled Blackened Steel', type: 'Metal', color: '#2B2B2A' },
        { name: 'Cast Concrete Finish', type: 'Composite', color: '#9E9A92' },
        { name: 'American Walnut', type: 'Wood', color: '#4E3827' },
      ];
    } else if (raw.includes('heritage') || raw.includes('classic') || raw.includes('parisian') || raw.includes('fresco')) {
      styleName = 'Classical Reimagined';
      styleVibe = 'Restored moldings, chevron European oak, bookmatched marble, and tailored silk panels';
      recommendedMaterials = [
        { name: 'Calacatta Viola Marble', type: 'Marble', color: '#683646' },
        { name: 'Aged Hungarian Oak', type: 'Wood', color: '#B59B7C' },
        { name: 'Antique Burnished Brass', type: 'Metal', color: '#A38855' },
        { name: 'Damask Silk Gauze', type: 'Textile', color: '#ECE8E1' },
      ];
    }

    // 4. Detect Rooms
    const roomsList = [
      { key: 'kitchen', label: 'Culinary Studio & Scullery' },
      { key: 'living', label: 'Double-Height Living Salon' },
      { key: 'dining', label: 'Sculptural Dining Pavilion' },
      { key: 'master', label: 'Primary Penthouse Suite' },
      { key: 'bed', label: 'Guest Sleeping Quarters' },
      { key: 'dressing', label: 'Walk-In Dressing Gallery' },
      { key: 'wardrobe', label: 'Bespoke Wardrobe Joinery' },
      { key: 'wine', label: 'Sommelier Wine Vault' },
      { key: 'terrace', label: 'Sunset Teak Verandah' },
      { key: 'bath', label: 'Monolithic Stone Bath Suite' },
      { key: 'office', label: 'Executive Library & Study' },
    ];

    const detectedRooms = roomsList
      .filter((r) => raw.includes(r.key))
      .map((r) => r.label);

    if (detectedRooms.length === 0) {
      detectedRooms.push('Full Turnkey Spatial Program', 'Living Sanctuary', 'Chef Kitchen', 'Master Suite');
    }

    // 5. Budget & Timeline
    let budgetProjection = '$250,000 – $400,000';
    if (extractedSqft > 6000 || raw.includes('450,000') || raw.includes('500,000')) {
      budgetProjection = '$450,000 – $750,000+ (Estate Tier)';
    } else if (extractedSqft < 2500) {
      budgetProjection = '$120,000 – $220,000';
    }

    let timelineEstimate = '16 – 22 Weeks (Turnkey Delivery)';
    if (raw.includes('month')) {
      timelineEstimate = '6 – 8 Months Target Handover';
    }

    // 6. Directives summary
    const keyDirectives = [
      `Spatial footprint engineered at ~${extractedSqft.toLocaleString()} sq. ft.`,
      `Material schema focused on ${recommendedMaterials.map((m) => m.name).slice(0, 2).join(' & ')}`,
      `Bespoke joinery integration with concealed architectural lighting`,
      `Acoustically buffered private suites & master dressing gallery`,
    ];

    return {
      typology,
      sqft: extractedSqft,
      styleName,
      styleVibe,
      budgetProjection,
      timelineEstimate,
      detectedRooms,
      recommendedMaterials,
      keyDirectives,
    };
  }, [inputText]);

  const handleCopyFormatted = () => {
    const formattedDossier = `
ATELIERA ARCHITECTURAL PROJECT DOSSIER
======================================
Project Typology: ${parsedDossier.typology}
Spatial Area: ${parsedDossier.sqft.toLocaleString()} sq. ft.
Aesthetic Language: ${parsedDossier.styleName} (${parsedDossier.styleVibe})
Indicative Investment: ${parsedDossier.budgetProjection}
Delivery Timeline: ${parsedDossier.timelineEstimate}

SPATIAL PROGRAM INCLUDED:
${parsedDossier.detectedRooms.map((r) => `• ${r}`).join('\n')}

RECOMMENDED NOBLE MATERIALS:
${parsedDossier.recommendedMaterials.map((m) => `• ${m.name} (${m.type})`).join('\n')}

RAW CLIENT INSPIRATION:
"${inputText.trim()}"
======================================
Generated via Ateliera Intelligent Atelier Engine
    `.trim();

    navigator.clipboard.writeText(formattedDossier);
    setCopied(true);
    showToast('Architectural Dossier copied to clipboard in pristine markdown.');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleTransfer = () => {
    onTransferToConsultation({
      propertyType: parsedDossier.typology,
      area: parsedDossier.sqft,
      budgetRange: parsedDossier.budgetProjection,
      style: parsedDossier.styleName,
      message: `Parsed Dossier: ${parsedDossier.typology} (~${parsedDossier.sqft} sq ft, ${parsedDossier.styleName}). Client Notes: "${inputText.slice(0, 220)}..."`,
    });
  };

  return (
    <section
      id="smart-dossier-section"
      className="py-24 sm:py-32 bg-[#F5F2EC] relative overflow-hidden border-b border-[#E3DDD1]"
    >
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center space-x-2">
              <span className="w-8 h-px bg-[#B89569]"></span>
              <span>Proprietary Innovation</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] tracking-tight leading-tight">
              The Intelligent Brief Dossier.
            </h2>
            <p className="text-base text-[#78716C] font-light leading-relaxed">
              Skip cumbersome forms. Paste your raw wishlist, Pinterest links, floorplan notes, or an email from your broker. Our architectural parser structures your vision into an executive project brief.
            </p>
          </div>

          {/* Quick preset selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#A8A29E] font-mono mr-1">
              Sample Briefs:
            </span>
            {PRESET_INSPIRATIONS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(preset.text)}
                className="px-3.5 py-1.5 rounded-full text-xs font-serif bg-white/80 hover:bg-white text-[#1C1917] border border-[#E3DDD1] hover:border-[#C5A880] transition-all shadow-sm"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Interactive Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Tactile Copy-and-Paste Editor */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DDD1] shadow-xl flex flex-col space-y-6">
            <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#C5A880] animate-pulse" />
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#1C1917] font-semibold">
                  Raw Inspiration &amp; Notes Input
                </span>
              </div>
              <button
                onClick={() => setInputText('')}
                className="text-xs text-[#A8A29E] hover:text-[#1C1917] font-mono transition-colors"
              >
                Clear Canvas
              </button>
            </div>

            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={10}
                placeholder="Paste anything here: e.g. 'We are remodeling our 4,500 sq ft penthouse. We want minimalist oak, floor-to-ceiling glass, bookmatched marble, wine cellar, budget $300k, completion by autumn...'"
                className="w-full p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#1C1917] font-sans leading-relaxed resize-y placeholder:text-[#A8A29E] transition-all outline-none"
              />
              <span className="absolute bottom-3 right-4 text-[10px] font-mono text-[#A8A29E]">
                {inputText.length} chars · Live Semantic Parsing
              </span>
            </div>

            {/* Feature Highlight Pills */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D5] text-center">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#A8A29E]">
                  Extraction
                </span>
                <span className="text-xs font-semibold text-[#1C1917]">
                  Instant Typology
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D5] text-center">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#A8A29E]">
                  Material Map
                </span>
                <span className="text-xs font-semibold text-[#1C1917]">
                  Artisanal Swatches
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D5] text-center">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#A8A29E]">
                  Integration
                </span>
                <span className="text-xs font-semibold text-[#1C1917]">
                  1-Click CRM Intake
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleCopyFormatted}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#2D2A26] text-[#FBF9F5] text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-md cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Clipboard className="w-4 h-4 text-[#C5A880]" />}
                <span>{copied ? 'Dossier Copied!' : 'Copy Formatted Brief'}</span>
              </button>

              <button
                onClick={handleTransfer}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-full bg-[#C5A880] hover:bg-[#D4BC96] text-[#1C1917] text-xs uppercase tracking-[0.18em] font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>Book With This Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: The Architectural Spec Dossier Deck */}
          <div className="lg:col-span-6 bg-[#1C1917] text-[#FBF9F5] rounded-3xl p-6 sm:p-8 border border-[#332E2A] shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Architectural stamp badge */}
            <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
              <Compass className="w-24 h-24 text-[#C5A880]" />
            </div>

            <div className="space-y-6 relative z-10">
              {/* Card Meta Top */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A880]">
                    Architectural Commission Brief
                  </span>
                  <h3 className="font-serif text-2xl text-white font-light mt-0.5">
                    {parsedDossier.typology}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-white/50 block">REF: AT-{parsedDossier.sqft}</span>
                  <span className="text-xs font-mono text-[#C5A880]">Verified Active</span>
                </div>
              </div>

              {/* Spatial Proportions & Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-white/50">
                    Spatial Footprint
                  </span>
                  <span className="text-sm sm:text-base font-serif text-white">
                    {parsedDossier.sqft.toLocaleString()} sq. ft.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-white/50">
                    Style DNA
                  </span>
                  <span className="text-xs sm:text-sm font-serif text-[#C5A880] truncate block">
                    {parsedDossier.styleName}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-white/50">
                    Est. Investment
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-white">
                    {parsedDossier.budgetProjection.split(' ')[0]}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-white/50">
                    Timeline
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-white">
                    {parsedDossier.timelineEstimate.split(' ')[0]} wks
                  </span>
                </div>
              </div>

              {/* Material Palette Swatches */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A880] block">
                  Harmonized Noble Material Schema
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {parsedDossier.recommendedMaterials.map((mat, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2.5"
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/30 flex-shrink-0"
                        style={{ backgroundColor: mat.color }}
                      />
                      <div className="overflow-hidden">
                        <span className="block text-[11px] font-medium text-white truncate">
                          {mat.name}
                        </span>
                        <span className="block text-[9px] font-mono text-white/50 uppercase">
                          {mat.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spatial Program Tags */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A880] block">
                  Spatial Program Extracted ({parsedDossier.detectedRooms.length} Zones)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {parsedDossier.detectedRooms.map((room, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-white/10 text-white/90 text-xs font-light border border-white/10"
                    >
                      {room}
                    </span>
                  ))}
                </div>
              </div>

              {/* Atelier Architectural Directives */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                  Atelier Execution Notes:
                </span>
                <ul className="space-y-1.5 text-xs text-white/80 font-light">
                  {parsedDossier.keyDirectives.map((d, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Guarantee Banner */}
            <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span className="font-mono text-[10px] text-[#C5A880]">
                ✦ Studio Confidentiality Protected
              </span>
              <span className="font-light">
                Directly connects to Lead Architect
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
