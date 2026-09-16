import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, Check, ArrowRight, Info, Sliders, ShieldCheck } from 'lucide-react';

interface ProjectEstimatorProps {
  onTransferToConsultation: (estimateData: {
    propertyType: string;
    area: number;
    rooms: string;
    budgetRange: string;
    breakdownText: string;
  }) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  onTransferToConsultation,
}) => {
  // Inputs
  const [propertyType, setPropertyType] = useState<string>('apartment');
  const [area, setArea] = useState<number>(2400);
  const [rooms, setRooms] = useState<string>('3bhk');
  const [kitchenReq, setKitchenReq] = useState<string>('italian');
  const [wardrobeReq, setWardrobeReq] = useState<string>('fluted-walkin');
  const [livingRoomLevel, setLivingRoomLevel] = useState<string>('grand');
  const [lightingLevel, setLightingLevel] = useState<string>('architectural');
  const [furnitureLevel, setFurnitureLevel] = useState<string>('bespoke');
  const [isTurnkey, setIsTurnkey] = useState<boolean>(true);

  // Dynamic Calculation Logic based on luxury market rates ($ per sq ft + room modular components)
  const calculation = useMemo(() => {
    // Baseline rate per sq ft based on property type
    let baseRatePerSqFt = 45; // standard luxury base
    if (propertyType === 'villa') baseRatePerSqFt = 65;
    if (propertyType === 'penthouse') baseRatePerSqFt = 70;
    if (propertyType === 'commercial') baseRatePerSqFt = 55;

    // Area base cost
    let subtotal = area * baseRatePerSqFt;

    // Kitchen cost
    let kitchenCost = 0;
    if (kitchenReq === 'modular-acrylic') kitchenCost = 18000;
    else if (kitchenReq === 'italian') kitchenCost = 35000;
    else if (kitchenReq === 'bespoke-quartzite') kitchenCost = 55000;

    // Wardrobes
    let wardrobeCost = 0;
    if (wardrobeReq === 'standard-lacquered') wardrobeCost = 14000;
    else if (wardrobeReq === 'fluted-walkin') wardrobeCost = 28000;
    else if (wardrobeReq === 'leather-island') wardrobeCost = 45000;

    // Living Room
    let livingCost = 0;
    if (livingRoomLevel === 'minimal') livingCost = 12000;
    else if (livingRoomLevel === 'grand') livingCost = 25000;
    else if (livingRoomLevel === 'double-height') livingCost = 42000;

    // Lighting
    let lightingCost = 0;
    if (lightingLevel === 'ambient') lightingCost = 10000;
    else if (lightingLevel === 'architectural') lightingCost = 22000;
    else if (lightingLevel === 'lutron-automation') lightingCost = 38000;

    // Furniture
    let furnitureCost = 0;
    if (furnitureLevel === 'curated') furnitureCost = 20000;
    else if (furnitureLevel === 'bespoke') furnitureCost = 45000;
    else if (furnitureLevel === 'artisan-commission') furnitureCost = 75000;

    // Add component costs
    const componentsTotal = kitchenCost + wardrobeCost + livingCost + lightingCost + furnitureCost;
    subtotal += componentsTotal;

    // Turnkey execution management & civil fit-out margin
    if (isTurnkey) {
      subtotal = subtotal * 1.15; // 15% dedicated project engineering & civil management
    }

    const minEstimate = Math.round((subtotal * 0.9) / 1000) * 1000;
    const maxEstimate = Math.round((subtotal * 1.15) / 1000) * 1000;

    return {
      minEstimate,
      maxEstimate,
      subtotal: Math.round(subtotal),
      kitchenCost,
      wardrobeCost,
      livingCost,
      lightingCost,
      furnitureCost,
    };
  }, [
    propertyType,
    area,
    rooms,
    kitchenReq,
    wardrobeReq,
    livingRoomLevel,
    lightingLevel,
    furnitureLevel,
    isTurnkey,
  ]);

  const formattedBudget = `$${calculation.minEstimate.toLocaleString()} – $${calculation.maxEstimate.toLocaleString()}`;

  const handleTransfer = () => {
    const breakdownText = `Property: ${propertyType.toUpperCase()} (${area} sq. ft., ${rooms.toUpperCase()}) | Kitchen: ${kitchenReq} | Wardrobes: ${wardrobeReq} | Turnkey: ${isTurnkey ? 'Yes' : 'No'}`;
    onTransferToConsultation({
      propertyType: propertyType === 'villa' ? 'Luxury Villa' : propertyType === 'penthouse' ? 'Duplex Penthouse' : 'Apartment',
      area,
      rooms,
      budgetRange: formattedBudget,
      breakdownText,
    });
  };

  return (
    <section id="estimator-section" className="py-24 sm:py-32 bg-[#FBF9F5] border-b border-[#EBE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center space-x-2">
            <span className="w-8 h-px bg-[#B89569]"></span>
            <span>Transparent Calculation</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] tracking-tight leading-tight">
            Interactive Project Budget Estimator.
          </h2>
          <p className="text-base text-[#78716C] font-light">
            Model your property dimensions, architectural specifications, and bespoke joinery preferences to calculate an immediate indicative investment scope.
          </p>
        </div>

        {/* Main Estimator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form Column (8 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#EBE6DD] shadow-sm space-y-8">
            
            {/* 1. Property Type */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                1. Property Typology
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'apartment', label: 'Apartment' },
                  { id: 'villa', label: 'Luxury Villa' },
                  { id: 'penthouse', label: 'Penthouse' },
                  { id: 'commercial', label: 'Commercial' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setPropertyType(t.id)}
                    className={`py-3 px-3 rounded-xl text-xs font-medium uppercase tracking-wider transition-all border ${
                      propertyType === t.id
                        ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                        : 'bg-[#FBF9F5] text-[#78716C] border-[#EBE6DD] hover:border-[#C5A880]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Approximate Area (Slider) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium">
                  2. Approximate Floor Area
                </label>
                <span className="font-mono text-base font-medium text-[#1C1917] px-3 py-1 bg-[#F5F2EC] rounded-lg border border-[#EBE6DD]">
                  {area.toLocaleString()} sq. ft.
                </span>
              </div>
              <input
                type="range"
                min={800}
                max={12000}
                step={200}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-[#EBE6DD] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
              />
              <div className="flex justify-between text-[11px] text-[#A8A29E] font-mono">
                <span>800 sq ft</span>
                <span>4,000 sq ft</span>
                <span>8,000 sq ft</span>
                <span>12,000+ sq ft</span>
              </div>
            </div>

            {/* 3. Number of Rooms */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                3. Room Configuration
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[
                  { id: '2bhk', label: '2 BHK' },
                  { id: '3bhk', label: '3 BHK' },
                  { id: '4bhk', label: '4 BHK' },
                  { id: '5bhk+', label: '5+ BHK' },
                  { id: 'estate', label: 'Estate' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRooms(r.id)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-medium uppercase transition-all border text-center ${
                      rooms === r.id
                        ? 'bg-[#1C1917] text-white border-[#1C1917]'
                        : 'bg-[#FBF9F5] text-[#78716C] border-[#EBE6DD] hover:border-[#C5A880]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Modular Kitchen Requirement */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                4. Kitchen Specification
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'modular-acrylic', title: 'German Acrylic', desc: 'Sleek matte handleless' },
                  { id: 'italian', title: 'Italian Veneer & Island', desc: 'Veneer + Quartz waterfall' },
                  { id: 'bespoke-quartzite', title: 'Bespoke Quartzite', desc: 'Full Calacatta & wine wall' },
                ].map((k) => (
                  <button
                    key={k.id}
                    onClick={() => setKitchenReq(k.id)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      kitchenReq === k.id
                        ? 'bg-[#F5F2EC] border-[#C5A880] shadow-sm ring-1 ring-[#C5A880]'
                        : 'bg-[#FBF9F5] border-[#EBE6DD] hover:border-[#C5A880]/50'
                    }`}
                  >
                    <div className="text-xs font-medium text-[#1C1917]">{k.title}</div>
                    <div className="text-[10px] text-[#78716C]">{k.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Wardrobes & Millwork */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                5. Wardrobe &amp; Joinery Requirement
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'standard-lacquered', title: 'Lacquered Soft-Close', desc: 'Floor-to-ceiling clean line' },
                  { id: 'fluted-walkin', title: 'Fluted Glass Walk-In', desc: 'Integrated LED & glass' },
                  { id: 'leather-island', title: 'Master Dressing Suite', desc: 'Leather drawers & vanity island' },
                ].map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWardrobeReq(w.id)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      wardrobeReq === w.id
                        ? 'bg-[#F5F2EC] border-[#C5A880] shadow-sm ring-1 ring-[#C5A880]'
                        : 'bg-[#FBF9F5] border-[#EBE6DD] hover:border-[#C5A880]/50'
                    }`}
                  >
                    <div className="text-xs font-medium text-[#1C1917]">{w.title}</div>
                    <div className="text-[10px] text-[#78716C]">{w.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Lighting & Furniture Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                  6. Lighting Design
                </label>
                <select
                  value={lightingLevel}
                  onChange={(e) => setLightingLevel(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="ambient">Ambient Recessed Spotlights</option>
                  <option value="architectural">Architectural Cove &amp; Accent Layers</option>
                  <option value="lutron-automation">Full Lutron Smart Automation System</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                  7. Custom Furniture Tier
                </label>
                <select
                  value={furnitureLevel}
                  onChange={(e) => setFurnitureLevel(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="curated">Curated Designer Sourcing</option>
                  <option value="bespoke">Bespoke In-House Made-to-Order</option>
                  <option value="artisan-commission">1-of-1 Commissioned Artisan Art &amp; Stone</option>
                </select>
              </div>
            </div>

            {/* Turnkey Execution Toggle */}
            <div className="p-4 bg-[#F5F2EC] rounded-2xl flex items-center justify-between border border-[#EBE6DD]">
              <div className="space-y-0.5">
                <div className="text-xs font-medium text-[#1C1917] flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B89569]" />
                  <span>Full Turnkey Execution &amp; Site Supervision</span>
                </div>
                <div className="text-[11px] text-[#78716C]">
                  Includes civil, MEP, material freight, and dedicated site engineer.
                </div>
              </div>
              <input
                type="checkbox"
                checked={isTurnkey}
                onChange={(e) => setIsTurnkey(e.target.checked)}
                className="w-5 h-5 rounded accent-[#1C1917] cursor-pointer"
              />
            </div>

          </div>

          {/* Real-time Calculation Summary Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-[#1C1917] text-[#FBF9F5] rounded-3xl p-8 shadow-2xl border border-[#2C2825] space-y-8">
              
              <div className="space-y-2 border-b border-white/15 pb-6">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
                  Indicative Atelier Estimate
                </span>
                <div className="text-3xl sm:text-4xl font-serif text-[#FBF9F5] font-light tracking-tight">
                  {formattedBudget}
                </div>
                <div className="text-xs text-white/60 font-light flex items-center space-x-1.5 pt-1">
                  <Info className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
                  <span className="italic">
                    Indicative estimate — final quotation after consultation.
                  </span>
                </div>
              </div>

              {/* Component breakdown summary */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-white/70">
                  <span>Architectural Spatial Fit-out ({area} sq. ft.)</span>
                  <span className="font-mono text-white">Included</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Modular Kitchen Tier</span>
                  <span className="font-mono text-white">${calculation.kitchenCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Custom Wardrobes &amp; Joinery</span>
                  <span className="font-mono text-white">${calculation.wardrobeCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Lighting &amp; Electrical Architecture</span>
                  <span className="font-mono text-white">${calculation.lightingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Bespoke Furniture Allowance</span>
                  <span className="font-mono text-white">${calculation.furnitureCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Turnkey Project Management</span>
                  <span className="font-mono text-[#C5A880]">{isTurnkey ? '15% Dedicated' : 'Self-Managed'}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/15 space-y-3">
                <button
                  onClick={handleTransfer}
                  className="w-full py-4 rounded-full bg-[#C5A880] hover:bg-[#B39060] text-[#1C1917] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-xl hover:scale-102"
                  id="btn-transfer-estimate"
                >
                  <span>Book Consultation With This Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-white/50 leading-relaxed">
                  Locks in priority consultation slot with principal architect.
                </p>
              </div>

            </div>

            {/* Trust note card */}
            <div className="p-6 rounded-2xl bg-white border border-[#EBE6DD] space-y-2 text-xs text-[#78716C]">
              <div className="font-medium text-[#1C1917] flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-[#B89569]" />
                <span>Zero Cost Overruns Guarantee</span>
              </div>
              <p>
                Our finalized Bill of Quantities (BOQ) establishes hard-capped line item pricing for materials, carpentry, and labor before commencement.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
