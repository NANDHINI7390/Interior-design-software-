import React, { useRef, useEffect } from 'react';

interface HeroVideoSliderProps {
  onExploreProjects?: () => void;
  onBookConsultation: () => void;
}

export const HeroVideoSlider: React.FC<HeroVideoSliderProps> = ({
  onBookConsultation,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure seamless autoplay on all browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay handled gracefully by poster fallback
        });
      }
    }
  }, []);

  return (
    <section
      id="hero-cinematic-film"
      className="relative w-full h-[90vh] sm:h-[94vh] min-h-[620px] max-h-[1040px] bg-[#0E0D0C] overflow-hidden select-none flex items-center"
      aria-label="Ateliera Interiors Walkthrough Film"
    >
      {/* 
        Continuous Luxury Architectural Film Layer:
        Begins with an exterior view of the villa in golden hour light,
        then dollies forward into the entrance, double-height living sanctuary,
        dining pavilion with wood ceiling & garden view, bespoke kitchen,
        and tranquil master suite, smoothly looping.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/ateliera-film.mp4"
          poster="/assets/film-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.03]"
        />

        {/* 
          Refined Editorial Shadow: 
          Subtle gradient crafted to guarantee crisp typographic contrast
          while leaving the interior film and camera movement completely open.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Hero Minimalist Typography & Single CTA */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full py-16 sm:py-24">
        <div className="max-w-2xl sm:max-w-3xl space-y-8 sm:space-y-10">
          
          {/* Headline: Only the three requested lines */}
          <h1
            id="hero-headline"
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-[#FBF9F5] font-light leading-[1.06] tracking-tight"
          >
            See the space.
            <span className="block italic text-[#E5D2B8] font-normal mt-1 sm:mt-2">
              Feel the design.
            </span>
            <span className="block text-white/95 mt-1 sm:mt-2">
              Imagine living in it.
            </span>
          </h1>

          {/* Single Elegant "Book a Consultation" CTA */}
          <div className="pt-2">
            <button
              onClick={onBookConsultation}
              id="hero-btn-consultation"
              className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#C5A880] hover:bg-[#D4BC96] text-[#1C1917] font-medium text-xs sm:text-sm tracking-[0.22em] uppercase transition-all duration-500 shadow-2xl hover:shadow-[0_0_35px_rgba(197,168,128,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Book a Consultation
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
