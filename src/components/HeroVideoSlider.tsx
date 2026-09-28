import React, { useState, useEffect } from 'react';
import japandiDiningImg from '../assets/images/japandi_dining_hero_1789723006000.jpg';
import sunlitLivingImg from '../assets/images/hero_sunlit_living_1790569151376.jpg';
import minimalKitchenImg from '../assets/images/hero_minimal_kitchen_1790569161848.jpg';
import luminousSuiteImg from '../assets/images/hero_luminous_suite_1790569172694.jpg';

interface HeroVideoSliderProps {
  onExploreProjects?: () => void;
  onBookConsultation: () => void;
}

interface SlideItem {
  id: string;
  image: string;
  alt: string;
  roomTag: string;
  roomTitle: string;
  description: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 'dining-pavilion',
    image: japandiDiningImg,
    alt: 'Sunlit Japandi Dining Pavilion with warm blonde wood and organic pendant',
    roomTag: '01 / 04 · Dining Atelier',
    roomTitle: 'Japandi Dining Pavilion',
    description: 'Natural oak joinery, woven curves & streaming golden hour daylight.',
  },
  {
    id: 'living-sanctuary',
    image: sunlitLivingImg,
    alt: 'Sun-drenched luxury living room with travertine table and herringbone oak floors',
    roomTag: '02 / 04 · Living Sanctuary',
    roomTitle: 'Sunlit Living Sanctuary',
    description: 'Double-height volume, honed travertine & gentle architectural window shadows.',
  },
  {
    id: 'minimal-kitchen',
    image: minimalKitchenImg,
    alt: 'Bright modern kitchen with white oak cabinetry and Calacatta marble waterfall island',
    roomTag: '03 / 04 · Culinary Studio',
    roomTitle: 'Calacatta Marble Kitchen',
    description: 'Honed waterfall marble, rift-cut oak & luminous morning exposure.',
  },
  {
    id: 'luminous-suite',
    image: luminousSuiteImg,
    alt: 'Serene master bedroom suite with natural wood bed and soft textured linen',
    roomTag: '04 / 04 · Master Quarters',
    roomTitle: 'Luminous Primary Suite',
    description: 'Limewash serenity, acoustic linen textiles & tranquil warm sunlight.',
  },
];

const AUTO_SLIDE_INTERVAL = 5500; // 5.5 seconds per slide for relaxed luxury viewing

export const HeroVideoSlider: React.FC<HeroVideoSliderProps> = ({
  onBookConsultation,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Smooth auto-advancing slideshow with no player panel
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section
      id="hero-auto-slideshow"
      className="relative w-full h-[90vh] sm:h-[94vh] min-h-[640px] max-h-[1080px] bg-[#F7F5F0] overflow-hidden select-none flex items-center"
      aria-label="Ateliera Interiors Luminous Auto Slideshow"
    >
      {/* 
        Bright, Luminous Interior Photography Auto-Slideshow:
        Authentic, warm, sun-drenched architectural spaces as requested.
        NO heavy black digital shadows; natural daylight with realistic window shadows.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transform transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* 
          Ultra-gentle warm scrim: 
          Keeps photography bright and clear while guaranteeing effortless typography legibility.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-10 pointer-events-none" />
      </div>

      {/* Hero Content: Crisp Editorial Typography */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full py-12 sm:py-20">
        <div className="max-w-2xl sm:max-w-3xl space-y-6 sm:space-y-8">
          
          {/* Active Room Indicator Pill */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[#FBF9F5] shadow-lg animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#E5D2B8] animate-pulse" />
            <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium">
              {SLIDES[currentIndex].roomTag}
            </span>
          </div>

          {/* Headline: Clean, elegant architectural statement */}
          <h1
            id="hero-headline"
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-[#FBF9F5] font-light leading-[1.08] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)]"
          >
            See the space.
            <span className="block italic text-[#E8D7C0] font-normal mt-1 sm:mt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              Feel the design.
            </span>
            <span className="block text-white/95 mt-1 sm:mt-2 drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)]">
              Imagine living in it.
            </span>
          </h1>

          {/* Slide Description Caption */}
          <p className="text-white/90 text-sm sm:text-base font-light max-w-lg leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
            {SLIDES[currentIndex].description}
          </p>

          {/* Single Elegant "Book a Consultation" CTA */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onBookConsultation}
              id="hero-btn-consultation"
              className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#C5A880] hover:bg-[#D4BC96] text-[#1C1917] font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase transition-all duration-300 shadow-2xl hover:shadow-[0_0_35px_rgba(197,168,128,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Book a Consultation
            </button>
          </div>

        </div>
      </div>

      {/* Discreet Slide Indicators (Minimal, elegant, non-intrusive) */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center gap-2 pointer-events-auto">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer h-1.5 ${
              idx === currentIndex
                ? 'w-8 bg-[#C5A880]'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}: ${slide.roomTitle}`}
          />
        ))}
      </div>
    </section>
  );
};
