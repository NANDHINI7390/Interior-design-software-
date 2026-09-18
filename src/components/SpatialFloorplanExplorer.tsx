import React, { useState } from 'react';
import {
  Compass,
  Maximize2,
  Layers,
  Sparkles,
  ArrowRight,
  Sun,
  Volume2,
  Eye,
  CheckCircle,
  MapPin,
} from 'lucide-react';

interface SpatialFloorplanExplorerProps {
  onEnquireRoom: (roomName: string) => void;
}

interface SpatialZone {
  id: string;
  index: string;
  name: string;
  category: string;
  sqft: number;
  sqm: number;
  ceilingHeight: string;
  orientation: string;
  acousticRating: string;
  keyFeature: string;
  materials: string[];
  perspectiveImage: string;
  blueprintCoordinates: { x: number; y: number }; // percentage on floorplan
  description: string;
}

const SPATIAL_ZONES: SpatialZone[] = [
  {
    id: 'foyer',
    index: '01',
    name: 'The Grand Entrance Portal & Foyer',
    category: 'Arrival & Transition',
    sqft: 480,
    sqm: 45,
    ceilingHeight: '4.2m (13.8 ft)',
    orientation: 'North-East Diffused Light',
    acousticRating: 'STC 48 (Damped Limestone)',
    keyFeature: 'Monolithic pivot bronze door & recessed travertine reflection trough',
    materials: ['Roman Travertine', 'Cast Patinated Bronze', 'Lime Plaster'],
    perspectiveImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    blueprintCoordinates: { x: 18, y: 52 },
    description: 'A sensory threshold resetting the exterior tempo. Slabs of hand-honed travertine anchor the floor, while subtle floor-wash LEDs outline continuous stone massing.',
  },
  {
    id: 'living',
    index: '02',
    name: 'Double-Height Living Sanctuary',
    category: 'Formal Reception',
    sqft: 1450,
    sqm: 135,
    ceilingHeight: '5.8m (19.0 ft)',
    orientation: 'South-West Full Daylight',
    acousticRating: 'STC 52 (Micro-Perforated Wood Ceiling)',
    keyFeature: 'Floor-to-ceiling glass envelope with hand-carved limestone fireplace',
    materials: ['Belgian Linen', 'Smoked Bavarian Oak', 'Honed Vicenza Stone'],
    perspectiveImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    blueprintCoordinates: { x: 42, y: 46 },
    description: 'The architectural heart of the residence. Soaring vertical proportions are balanced by low-slung Italian modular seating, bespoke acoustic wood ceiling baffles, and panoramic courtyard vistas.',
  },
  {
    id: 'kitchen',
    index: '03',
    name: 'Bespoke Culinary Studio & Scullery',
    category: 'Culinary Architecture',
    sqft: 680,
    sqm: 63,
    ceilingHeight: '3.4m (11.2 ft)',
    orientation: 'East Morning Sunrise',
    acousticRating: 'STC 45 (Acoustic Plaster)',
    keyFeature: '4.2-meter monolithic quartzite waterfall island with touchless Gaggenau integration',
    materials: ['Taj Mahal Quartzite', 'Smoked Eucalyptus Joinery', 'Brushed Brass'],
    perspectiveImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
    blueprintCoordinates: { x: 74, y: 35 },
    description: 'Where Michelin-level ergonomics meets quiet sculptural beauty. All preparation appliances, extraction systems, and refrigeration are concealed behind touch-latch smoked timber facades.',
  },
  {
    id: 'dining',
    index: '04',
    name: 'Courtyard Dining Pavilion',
    category: 'Intimate Gathering',
    sqft: 520,
    sqm: 48,
    ceilingHeight: '3.6m (11.8 ft)',
    orientation: 'South Ambient Golden Hour',
    acousticRating: 'STC 50 (Felt Lined Coves)',
    keyFeature: 'Custom 12-seat solid walnut table beneath sculptural bronze pendant ring',
    materials: ['American Black Walnut', 'Fluted Calacatta Marble', 'Raw Silk Drapery'],
    perspectiveImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
    blueprintCoordinates: { x: 55, y: 72 },
    description: 'Framed by pocketing glass walls that vanish into garden courtyards. Ambient lighting is calibrated to 2200K candle-warmth to flatter guests and dining rituals.',
  },
  {
    id: 'master',
    index: '05',
    name: 'Primary Penthouse Suite & Spa',
    category: 'Private Sanctuary',
    sqft: 980,
    sqm: 91,
    ceilingHeight: '3.8m (12.5 ft)',
    orientation: 'South-East Soft Dawn',
    acousticRating: 'STC 58 (Hospitality Isolation)',
    keyFeature: 'Floating upholstered headboard wall with monolithic soaking tub overlooking private gardens',
    materials: ['Bouclé Wool', 'French White Oak', 'Arabescato Corchia Marble'],
    perspectiveImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
    blueprintCoordinates: { x: 26, y: 22 },
    description: 'An acoustic and sensory cocoon designed around circadian sleep science. Integrated blackout drapery, hidden climate diffusers, and warm textured tactile finishes soothe the senses.',
  },
  {
    id: 'terrace',
    index: '06',
    name: 'Sunset Verandah & Infinity Pool',
    category: 'Indoor-Outdoor Living',
    sqft: 1800,
    sqm: 167,
    ceilingHeight: 'Open Sky',
    orientation: 'West Horizon Dusk',
    acousticRating: 'Ambient Water Cascade Soundscape',
    keyFeature: 'Sunken fire lounge, outdoor kitchen grill, and cantilevered infinity edge',
    materials: ['Aged Burmese Teak', 'Thermal Flamed Granite', 'Marine-Grade Steel'],
    perspectiveImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    blueprintCoordinates: { x: 82, y: 78 },
    description: 'Seamless extension of the interior flooring into exterior teak terraces. Sunken firepit and perimeter water channels dissolve the barrier between architecture and landscape.',
  },
];

export const SpatialFloorplanExplorer: React.FC<SpatialFloorplanExplorerProps> = ({
  onEnquireRoom,
}) => {
  const [selectedZone, setSelectedZone] = useState<SpatialZone>(SPATIAL_ZONES[1]);
  const [activeTab, setActiveTab] = useState<'perspective' | 'blueprint'>('perspective');

  return (
    <section
      id="floorplan-explorer-section"
      className="py-24 sm:py-32 bg-[#171615] text-[#FBF9F5] relative overflow-hidden border-b border-[#292623]"
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-medium flex items-center space-x-2">
              <span className="w-8 h-px bg-[#C5A880]"></span>
              <span>Architectural Spatial Intelligence</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight leading-tight">
              Interactive Spatial Floorplan.
            </h2>
            <p className="text-base text-white/70 font-light leading-relaxed">
              Navigate the spatial choreography of our signature 6,000-sq-ft private villa. Click across architectural zones to examine daylight orientation, ceiling volumes, and noble material specifications.
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-full border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('perspective')}
              className={`px-4 py-2 rounded-full uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                activeTab === 'perspective'
                  ? 'bg-[#C5A880] text-[#1C1917] font-semibold shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>4K Perspective</span>
            </button>
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`px-4 py-2 rounded-full uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                activeTab === 'blueprint'
                  ? 'bg-[#C5A880] text-[#1C1917] font-semibold shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>CAD Plan Coordinates</span>
            </button>
          </div>
        </div>

        {/* Spatial Zone Buttons Bar */}
        <div className="overflow-x-auto no-scrollbar pb-3 mb-8">
          <div className="flex items-center space-x-2 min-w-max">
            {SPATIAL_ZONES.map((zone) => {
              const isSelected = zone.id === selectedZone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-4 py-3 rounded-2xl text-left border transition-all duration-300 flex items-center space-x-3 cursor-pointer ${
                    isSelected
                      ? 'bg-white/15 border-[#C5A880] text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded ${
                      isSelected ? 'bg-[#C5A880] text-[#1C1917] font-bold' : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {zone.index}
                  </span>
                  <div>
                    <span className="block text-xs font-serif font-medium leading-tight">
                      {zone.name}
                    </span>
                    <span className="block text-[10px] font-mono text-white/40">
                      {zone.sqft} sq. ft. · {zone.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage: Perspective / Blueprint + Architectural Specification Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Visual Showcase (Perspective or Interactive Blueprint CAD) */}
          <div className="lg:col-span-7 bg-[#100F0E] rounded-3xl overflow-hidden border border-white/15 relative min-h-[440px] flex flex-col justify-between shadow-2xl">
            {activeTab === 'perspective' ? (
              <div className="relative w-full h-full min-h-[460px] overflow-hidden group">
                <img
                  src={selectedZone.perspectiveImage}
                  alt={selectedZone.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Hotspot pin overlay */}
                <div className="absolute top-6 left-6 flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#C5A880]/40 text-[#C5A880] text-xs font-mono uppercase tracking-wider">
                    Zone {selectedZone.index} · {selectedZone.category}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <h4 className="font-serif text-2xl sm:text-3xl font-light">
                    {selectedZone.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 font-light max-w-xl leading-relaxed">
                    {selectedZone.description}
                  </p>
                </div>
              </div>
            ) : (
              /* CAD Floorplan Blueprint Interactive View */
              <div className="relative w-full h-full min-h-[460px] p-8 flex flex-col justify-between bg-[#0D0C0B]">
                {/* Simulated Architectural Floorplan CAD Lines */}
                <svg
                  className="w-full h-[360px] stroke-[#C5A880]/30"
                  viewBox="0 0 800 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer Walls */}
                  <rect x="50" y="30" width="700" height="340" strokeWidth="2.5" stroke="#C5A880]/70" />
                  
                  {/* Foyer Partition */}
                  <line x1="50" y1="180" x2="220" y2="180" strokeWidth="1.5" />
                  <line x1="220" y1="30" x2="220" y2="280" strokeWidth="1.5" />
                  <text x="70" y="110" fill="#ffffff70" fontSize="12" fontFamily="monospace">01 FOYER</text>

                  {/* Living Salon */}
                  <rect x="230" y="40" width="280" height="230" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="250" y="150" fill="#C5A880" fontSize="14" fontFamily="serif">02 LIVING SANCTUARY</text>
                  <text x="250" y="170" fill="#ffffff60" fontSize="10" fontFamily="monospace">5.8M CEILING HEIGHT</text>

                  {/* Culinary Studio */}
                  <rect x="520" y="40" width="220" height="150" strokeWidth="1.5" />
                  <text x="540" y="110" fill="#ffffff70" fontSize="12" fontFamily="monospace">03 CULINARY STUDIO</text>

                  {/* Dining Pavilion */}
                  <rect x="420" y="280" width="180" height="80" strokeWidth="1.5" />
                  <text x="440" y="325" fill="#ffffff70" fontSize="12" fontFamily="monospace">04 DINING</text>

                  {/* Master Suite */}
                  <rect x="60" y="190" width="150" height="170" strokeWidth="1.5" />
                  <text x="80" y="280" fill="#ffffff70" fontSize="12" fontFamily="monospace">05 MASTER SUITE</text>

                  {/* Sunset Terrace */}
                  <rect x="610" y="200" width="130" height="160" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="625" y="280" fill="#ffffff70" fontSize="12" fontFamily="monospace">06 DECK &amp; POOL</text>
                </svg>

                {/* Active zone marker */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-[#C5A880]/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-[#C5A880] animate-ping" />
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#C5A880]">Active Zone Focus</span>
                      <p className="text-sm font-serif text-white">{selectedZone.name}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-white/60">
                    Coords: X: {selectedZone.blueprintCoordinates.x}% | Y: {selectedZone.blueprintCoordinates.y}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Architectural Specification Dossier Column */}
          <div className="lg:col-span-5 bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A880]">
                  Architectural Metric Dossier
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mt-1">
                  {selectedZone.name}
                </h3>
                <p className="text-xs text-white/50 font-mono mt-1">
                  {selectedZone.category} · Spatial Index #{selectedZone.index}
                </p>
              </div>

              {/* Proportions Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] font-mono uppercase text-white/50">
                    Floor Area
                  </span>
                  <span className="text-base font-serif text-white">
                    {selectedZone.sqft} sq. ft. <span className="text-xs text-white/40">({selectedZone.sqm} m²)</span>
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] font-mono uppercase text-white/50">
                    Ceiling Clearance
                  </span>
                  <span className="text-base font-serif text-[#C5A880]">
                    {selectedZone.ceilingHeight}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] font-mono uppercase text-white/50 flex items-center space-x-1">
                    <Sun className="w-3 h-3 text-[#C5A880]" />
                    <span>Solar Orientation</span>
                  </span>
                  <span className="text-xs font-sans text-white/90">
                    {selectedZone.orientation}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] font-mono uppercase text-white/50 flex items-center space-x-1">
                    <Volume2 className="w-3 h-3 text-[#C5A880]" />
                    <span>Acoustic Damping</span>
                  </span>
                  <span className="text-xs font-sans text-white/90">
                    {selectedZone.acousticRating}
                  </span>
                </div>
              </div>

              {/* Key Architectural Feature */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A880] block">
                  Signature Millwork &amp; Detail:
                </span>
                <p className="text-xs text-white/90 font-light leading-relaxed">
                  {selectedZone.keyFeature}
                </p>
              </div>

              {/* Material Palette in this zone */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                  Specified Noble Materials:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedZone.materials.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white font-light flex items-center space-x-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      <span>{m}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Enquire CTA */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => onEnquireRoom(selectedZone.name)}
                className="w-full inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-full bg-[#C5A880] hover:bg-[#D4BC96] text-[#1C1917] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>Inquire on {selectedZone.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
