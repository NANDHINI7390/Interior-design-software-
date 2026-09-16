import React, { useState, useEffect, useRef } from 'react';
import { HERO_SLIDES } from '../data/mockData';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroVideoSliderProps {
  onExploreProjects: () => void;
  onBookConsultation: () => void;
}

export const HeroVideoSlider: React.FC<HeroVideoSliderProps> = ({
  onExploreProjects,
  onBookConsultation,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const slideDuration = 6500; // 6.5s per scene for optimal viewing

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  // Auto-advance slide timer and continuous progress indicator
  useEffect(() => {
    setProgress(0);
    const intervalTime = 50;
    const step = (intervalTime / slideDuration) * 100;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlideIndex((oldIndex) => (oldIndex + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(progressInterval);
  }, [currentSlideIndex]);

  // Handle seamless video playback per slide
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.muted = true;
        if (index === currentSlideIndex) {
          video.currentTime = 0;
          video.play().catch(() => {
            // Graceful fallback to background picture if autoplay paused
          });
        } else {
          video.pause();
        }
      }
    });
  }, [currentSlideIndex]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  };

  const handleSelectSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  // Touch swipe support for smooth mobile and tablet sliding
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      // Swiped left -> next
      handleNext();
    } else if (diff < -50) {
      // Swiped right -> prev
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="hero-video-section"
      className="relative w-full h-[85vh] sm:h-[90vh] min-h-[580px] max-h-[960px] bg-[#0E0D0C] overflow-hidden select-none flex items-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Architectural Media Layers */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* High-Resolution Picture Layer (Pre-rendered architectural still) */}
            <img
              src={slide.posterUrl}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center scale-100 transition-transform duration-[7000ms] ease-out filter brightness-[0.98] contrast-[1.03]"
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* Crystal-Clear 1080p Slow-Motion Seamless Video Layer */}
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={slide.videoUrl}
              autoPlay={isActive}
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-100 transition-opacity duration-1000"
            />

            {/* Classy Architectural Vignette & Gradient - Preserves crystal-clear video clarity while ensuring pristine text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none" />
          </div>
        );
      })}

      {/* Hero Central Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl space-y-4 sm:space-y-6">

          {/* Minimal, Elegant Single-Line Tag */}
          <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs tracking-[0.25em] text-[#E2CCA9] uppercase font-sans">
            <span className="w-6 h-px bg-[#C5A880]" />
            <span className="font-light tracking-[0.28em]">Bespoke Interior Architecture</span>
          </div>

          {/* Headline with Cormorant Garamond Serif Craft */}
          <h1
            id="hero-headline"
            className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#FBF9F5] font-light leading-[1.08] tracking-tight"
          >
            Spaces Designed Around <br />
            <span className="italic font-normal text-[#E2CCA9]">the Way You Live.</span>
          </h1>

          {/* Reduced Subtext: Short, Classy & Unobtrusive */}
          <p
            id="hero-subtext"
            className="text-sm sm:text-base text-white/85 max-w-md font-sans font-light leading-relaxed tracking-wide"
          >
            Bespoke architecture, noble natural materials, and turnkey interior sanctuaries.
          </p>

          {/* Refined Action CTAs */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onExploreProjects}
              className="group inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-full bg-[#C5A880] hover:bg-[#b89569] text-[#1C1917] font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              id="hero-btn-explore"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onBookConsultation}
              className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full bg-black/40 hover:bg-white/15 backdrop-blur-md text-white font-medium text-xs tracking-[0.18em] uppercase border border-white/25 hover:border-white/50 transition-all duration-300"
              id="hero-btn-consultation"
            >
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Refined Auto-Slide Scene Navigation & Cinema Status Bar */}
      <div className="absolute bottom-5 sm:bottom-8 left-0 right-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Direct Scene Selector Pills: Home | Kitchen | Cafe | Private Deck */}
          <div
            className="flex items-center space-x-1.5 sm:space-x-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/15 overflow-x-auto no-scrollbar max-w-full"
            role="tablist"
            aria-label="Hero architectural video scenes"
          >
            {HERO_SLIDES.map((slide, idx) => {
              const isSelected = idx === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`relative group px-3 sm:px-4 py-1.5 rounded-full text-xs transition-all duration-300 flex items-center space-x-2 whitespace-nowrap ${
                    isSelected
                      ? 'bg-white/20 text-white font-medium shadow-sm border border-white/20'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`View ${slide.shortCategory || slide.roomName} scene`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isSelected ? 'bg-[#C5A880]' : 'bg-white/40 group-hover:bg-white/80'
                    }`}
                  />
                  <span className="text-[11px] sm:text-xs font-sans tracking-wider uppercase">
                    {slide.shortCategory || slide.roomName}
                  </span>
                  {isSelected && (
                    <div className="w-5 sm:w-7 h-1 bg-white/20 rounded-full overflow-hidden ml-1">
                      <div
                        className="h-full bg-[#C5A880] rounded-full transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Scene Location & Arrow Controls */}
          <div className="flex items-center justify-between sm:justify-end space-x-4">
            
            {/* Active Scene Location Badge */}
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
                Scene 0{currentSlideIndex + 1} / 04 · Slow Motion
              </span>
              <span className="text-xs text-white/85 font-light tracking-wide truncate max-w-[200px]">
                {activeSlide.sceneDetail}
              </span>
            </div>

            {/* Minimalist Arrow Controls */}
            <div className="flex items-center space-x-2 ml-auto sm:ml-0">
              <button
                onClick={handlePrev}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-[#C5A880] text-white hover:text-[#1C1917] border border-white/20 hover:border-[#C5A880] flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow"
                aria-label="Previous scene"
                title="Previous scene"
                id="hero-slider-prev"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-[#C5A880] text-white hover:text-[#1C1917] border border-white/20 hover:border-[#C5A880] flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow"
                aria-label="Next scene"
                title="Next scene"
                id="hero-slider-next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
