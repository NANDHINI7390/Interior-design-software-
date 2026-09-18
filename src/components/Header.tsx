import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Calendar,
  Shield,
  Phone,
  ArrowRight,
  Check,
  Compass,
  FileText,
  Layers,
  Sparkles,
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface HeaderProps {
  activeView: 'client' | 'admin';
  onViewChange: (view: 'client' | 'admin') => void;
  onBookConsultation: () => void;
  onOpenEstimator: () => void;
  leadsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onViewChange,
  onBookConsultation,
  onOpenEstimator,
  leadsCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when menu drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (activeView === 'admin') {
      onViewChange('client');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#141210]/95 backdrop-blur-md text-[#FBF9F5] shadow-lg border-b border-[#2C2825] py-2.5 sm:py-3.5'
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent text-white py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Brand Identity - Responsive font sizing with luxury diamond symbol instead of dot */}
            <div
              onClick={() => {
                if (activeView === 'admin') onViewChange('client');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer group flex flex-col select-none min-w-0 shrink"
              id="brand-logo"
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="font-serif text-sm min-[360px]:text-base sm:text-xl lg:text-2xl xl:text-3xl tracking-[0.08em] min-[360px]:tracking-[0.12em] sm:tracking-[0.18em] font-light text-[#FBF9F5] group-hover:text-[#C5A880] transition-colors whitespace-nowrap">
                  ATELIERA INTERIORS
                </span>
                {/* Refined architectural diamond symbol replacing the previous dot */}
                <span className="text-[#C5A880] text-[9px] sm:text-xs select-none shrink-0 leading-none">
                  ◆
                </span>
              </div>
            </div>

            {/* Desktop Navigation - Responsive spacing across laptop & desktop screens */}
            <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-8 text-xs tracking-[0.18em] uppercase font-sans shrink-0">
              <button
                onClick={() => {
                  if (activeView === 'admin') onViewChange('client');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-[#C5A880] transition-colors py-1 cursor-pointer"
                id="nav-home"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('portfolio-section')}
                className="text-white/80 hover:text-[#C5A880] transition-colors py-1 cursor-pointer"
                id="nav-portfolio"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('services-section')}
                className="text-white/80 hover:text-[#C5A880] transition-colors py-1 cursor-pointer"
                id="nav-services"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about-section')}
                className="text-white/80 hover:text-[#C5A880] transition-colors py-1 cursor-pointer"
                id="nav-about"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('process-section')}
                className="text-white/80 hover:text-[#C5A880] transition-colors py-1 cursor-pointer"
                id="nav-process"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection('contact-section')}
                className="text-white/80 hover:text-[#C5A880] transition-colors py-1 cursor-pointer"
                id="nav-contact"
              >
                Contact
              </button>
            </nav>

            {/* Right CTAs - Fully responsive on mobile, tablet & desktop */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
              
              {/* Consultation CTA Button - Renamed to 'Book a Consultation' with responsive sizing */}
              <button
                onClick={onBookConsultation}
                className="inline-flex items-center space-x-1 sm:space-x-2 px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full bg-[#C5A880] hover:bg-[#D4BC96] text-[#1C1917] font-medium text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.16em] uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer shrink-0"
                id="header-cta-book"
                title="Book a Consultation"
              >
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">Book a Consultation</span>
                <span className="sm:hidden whitespace-nowrap">Book</span>
              </button>

              {/* Hamburger / Menu Trigger (Clean & Responsive) */}
              <button
                onClick={() => setMenuOpen(true)}
                className="p-1.5 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
                aria-label="Open Studio Menu"
                id="header-menu-toggle"
              >
                <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden md:inline text-[11px] uppercase tracking-wider font-sans pr-1">
                  Menu
                </span>
                {leadsCount > 0 && (
                  <Sparkles className="w-3 h-3 text-[#C5A880] animate-pulse shrink-0" />
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Slide-over Luxury Menu Drawer (Hosts CRM Demo + Full Directory) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative z-10 w-full max-w-md bg-[#181614] text-[#FBF9F5] h-full shadow-2xl border-l border-[#2C2825] flex flex-col justify-between overflow-y-auto p-6 sm:p-8">
            
            {/* Header with Close */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div>
                <span className="font-serif text-xl tracking-[0.2em] font-light text-[#FBF9F5]">
                  ATELIERA
                </span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#C5A880]">
                  Studio Concierge &amp; Portal
                </span>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CRM & Client Demo Switcher */}
            <div className="my-5 p-4 rounded-2xl bg-[#221F1C] border border-[#C5A880]/30 shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-[#C5A880]" />
                  <span className="text-xs uppercase tracking-wider font-medium text-[#FBF9F5]">
                    Studio Portal
                  </span>
                </div>
                {leadsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#C5A880] text-[#1C1917] text-[10px] font-bold">
                    {leadsCount} New Inquiries
                  </span>
                )}
              </div>

              <p className="text-xs text-white/60 mb-3 font-light leading-relaxed">
                Toggle between the Public Client Experience and the Executive Studio CRM.
              </p>

              <div className="grid grid-cols-2 gap-2 bg-[#141210] p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => {
                    onViewChange('client');
                    setMenuOpen(false);
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-medium uppercase tracking-wider transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer ${
                    activeView === 'client'
                      ? 'bg-[#C5A880] text-[#1C1917] font-semibold shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
                  id="menu-toggle-client"
                >
                  {activeView === 'client' && <Check className="w-3.5 h-3.5" />}
                  <span>Client View</span>
                </button>

                <button
                  onClick={() => {
                    onViewChange('admin');
                    setMenuOpen(false);
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-medium uppercase tracking-wider transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer ${
                    activeView === 'admin'
                      ? 'bg-[#C5A880] text-[#1C1917] font-semibold shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
                  id="menu-toggle-admin"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin CRM</span>
                </button>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="space-y-1.5 text-xs uppercase tracking-[0.2em] font-sans flex-1">
              <button
                onClick={() => {
                  if (activeView === 'admin') onViewChange('client');
                  setMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-left py-3 px-3 rounded-lg hover:bg-white/5 text-white/90 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Home</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('portfolio-section')}
                className="w-full text-left py-3 px-3 rounded-lg hover:bg-white/5 text-white/90 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Projects</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('services-section')}
                className="w-full text-left py-3 px-3 rounded-lg hover:bg-white/5 text-white/90 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Services</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('about-section')}
                className="w-full text-left py-3 px-3 rounded-lg hover:bg-white/5 text-white/90 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>About</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('process-section')}
                className="w-full text-left py-3 px-3 rounded-lg hover:bg-white/5 text-white/90 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Process</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('contact-section')}
                className="w-full text-left py-3 px-3 rounded-lg hover:bg-white/5 text-white/90 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Contact</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onBookConsultation();
                }}
                className="w-full text-left py-3 px-3 rounded-lg bg-[#C5A880]/20 text-[#C5A880] font-semibold transition-colors flex items-center justify-between cursor-pointer mt-2"
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book a Consultation</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Studio Contact & Concierge Information */}
            <div className="pt-5 border-t border-white/10 space-y-3">
              <div className="text-xs text-white/60 space-y-1 font-light">
                <div className="text-white/80 font-medium tracking-wider uppercase text-[10px] text-[#C5A880]">
                  Global Design Studios
                </div>
                <div>London • Dubai • New York • Milan</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href="tel:+442079460912"
                  className="flex-1 py-2.5 px-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Call Studio</span>
                </a>
                <a
                  href="https://wa.me/442079460912?text=Hello%20Ateliera%20Interiors%2C%20I%20would%20like%20to%20inquire%20about%20a%20turnkey%20interior%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs tracking-wider uppercase font-medium flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

