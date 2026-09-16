import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Shield, Phone, MessageSquare, ArrowRight, Check } from 'lucide-react';

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
            ? 'bg-[#141210]/95 backdrop-blur-md text-[#FBF9F5] shadow-lg border-b border-[#2C2825] py-3.5'
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent text-white py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Identity */}
            <div
              onClick={() => {
                if (activeView === 'admin') onViewChange('client');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer group flex flex-col select-none"
              id="brand-logo"
            >
              <div className="flex items-center space-x-2">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] font-light text-[#FBF9F5] group-hover:text-[#C5A880] transition-colors">
                  ATELIERA
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.32em] text-white/60 font-sans mt-0.5">
                Interior Architecture
              </span>
            </div>

            {/* Desktop Navigation - Concise, Elegant, Spaced */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-sans">
              <button
                onClick={() => scrollToSection('portfolio-section')}
                className="text-white/80 hover:text-[#C5A880] transition-colors py-1"
                id="nav-portfolio"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('services-section')}
                className="text-white/80 hover:text-[#C5A880] transition-colors py-1"
                id="nav-services"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('styles-section')}
                className="text-white/80 hover:text-[#C5A880] transition-colors py-1"
                id="nav-styles"
              >
                Styles
              </button>
              <button
                onClick={() => scrollToSection('process-section')}
                className="text-white/80 hover:text-[#C5A880] transition-colors py-1"
                id="nav-process"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection('3d-visualization-section')}
                className="text-white/80 hover:text-[#C5A880] transition-colors py-1"
                id="nav-3d"
              >
                3D Studio
              </button>
              <button
                onClick={() => scrollToSection('estimator-section')}
                className="text-[#C5A880] hover:text-[#e4cdab] transition-colors font-medium py-1"
                id="nav-estimator"
              >
                Estimator
              </button>
            </nav>

            {/* Right CTAs & Menu Trigger */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
              {/* Consultation CTA Button */}
              <button
                onClick={onBookConsultation}
                className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#C5A880] hover:bg-[#b89569] text-[#1C1917] font-medium text-xs tracking-[0.16em] uppercase transition-all duration-300 shadow-md hover:shadow-lg"
                id="header-cta-book"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Book Consultation</span>
                <span className="sm:hidden">Consult</span>
              </button>

              {/* Hamburger / Menu Trigger (Clean & Responsive) */}
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all flex items-center space-x-2"
                aria-label="Open Studio Menu"
                id="header-menu-toggle"
              >
                <Menu className="w-4 h-4" />
                <span className="hidden md:inline text-[11px] uppercase tracking-wider font-sans pr-1">
                  Menu
                </span>
                {leadsCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
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
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CRM & Client Demo Switcher (Positioned inside the Menu Bar / Hamburger Menu as requested) */}
            <div className="my-6 p-4 rounded-2xl bg-[#221F1C] border border-[#C5A880]/30 shadow-inner">
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
                  className={`py-2 px-3 rounded-lg text-xs font-medium uppercase tracking-wider transition-all text-center flex items-center justify-center space-x-1.5 ${
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
                  className={`py-2 px-3 rounded-lg text-xs font-medium uppercase tracking-wider transition-all text-center flex items-center justify-center space-x-1.5 ${
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
            <div className="space-y-1 text-sm uppercase tracking-[0.18em] font-sans flex-1">
              <button
                onClick={() => scrollToSection('portfolio-section')}
                className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-[#C5A880] transition-colors flex items-center justify-between"
              >
                <span>Curated Projects</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('services-section')}
                className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-[#C5A880] transition-colors flex items-center justify-between"
              >
                <span>Services &amp; Offerings</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('styles-section')}
                className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-[#C5A880] transition-colors flex items-center justify-between"
              >
                <span>Design Styles</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('process-section')}
                className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-[#C5A880] transition-colors flex items-center justify-between"
              >
                <span>The 6-Step Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('3d-visualization-section')}
                className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-white/5 text-[#C5A880] transition-colors flex items-center justify-between"
              >
                <span>3D Virtual Studio</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('materials-section')}
                className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-[#C5A880] transition-colors flex items-center justify-between"
              >
                <span>Materials &amp; Finishes</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('packages-section')}
                className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-[#C5A880] transition-colors flex items-center justify-between"
              >
                <span>Atelier Packages</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('estimator-section')}
                className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-white/5 text-[#C5A880] transition-colors flex items-center justify-between"
              >
                <span>Budget Estimator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
              <button
                onClick={() => scrollToSection('contact-section')}
                className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-[#C5A880] transition-colors flex items-center justify-between"
              >
                <span>Private Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
            </div>

            {/* Studio Contact & Concierge Information */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="text-xs text-white/60 space-y-1 font-light">
                <div className="text-white/80 font-medium tracking-wider uppercase text-[11px] text-[#C5A880]">
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
                  className="flex-1 py-2.5 px-3 rounded-full border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
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
