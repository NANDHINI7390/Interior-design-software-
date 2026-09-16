import React from 'react';
import { ArrowUp, Instagram, Linkedin, Facebook, MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141210] text-[#FBF9F5] border-t border-[#2C2825] pt-20 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-1">
              <span className="font-serif text-3xl tracking-[0.2em] font-light text-white">
                ATELIERA
              </span>
              <div className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-sans">
                Architectural Interiors &amp; Décor
              </div>
            </div>

            <p className="text-sm text-white/60 font-light leading-relaxed max-w-sm">
              An international design atelier dedicated to crafting quiet, enduring, and sculptural residential and hospitality environments. From spatial architecture to custom millwork and turnkey handover.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C5A880] hover:text-[#1C1917] text-white/80 transition-colors flex items-center justify-center border border-white/10"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C5A880] hover:text-[#1C1917] text-white/80 transition-colors flex items-center justify-center border border-white/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C5A880] hover:text-[#1C1917] text-white/80 transition-colors flex items-center justify-center border border-white/10"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              Navigation
            </div>
            <ul className="space-y-2.5 text-xs text-white/70 uppercase tracking-wider">
              <li>
                <button
                  onClick={() => onNavigate('portfolio-section')}
                  className="hover:text-white transition-colors"
                >
                  Featured Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services-section')}
                  className="hover:text-white transition-colors"
                >
                  Design Disciplines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('styles-section')}
                  className="hover:text-white transition-colors"
                >
                  Architectural Styles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('process-section')}
                  className="hover:text-white transition-colors"
                >
                  The 6-Step Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('3d-visualization-section')}
                  className="hover:text-white transition-colors"
                >
                  3D Visualization
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('materials-section')}
                  className="hover:text-white transition-colors"
                >
                  Materials &amp; Finishes
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              Core Offerings
            </div>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>Residential Architectural Interiors</li>
              <li>Turnkey Luxury Villa Execution</li>
              <li>Modular Italian Kitchens</li>
              <li>Custom Dressing Rooms &amp; Wardrobes</li>
              <li>Bespoke Millwork &amp; Furniture</li>
              <li>Commercial Flagships &amp; Boutique Hotels</li>
            </ul>
          </div>

          {/* Studio Contact Column */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              Studio Inquiries
            </div>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <span>42 Berkeley Square, Mayfair, London W1J 5AW</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span>+44 20 7946 0912</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                <span>concierge@ateliera-interiors.com</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-[#C5A880] hover:text-white underline underline-offset-4 tracking-wider uppercase font-mono"
              >
                Studio Staff &amp; CRM Portal →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <div>
            &copy; {new Date().getFullYear()} ATELIERA INTERIORS LTD. All rights reserved. Private Architectural Practice.
          </div>
          
          <div className="flex items-center space-x-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy &amp; NDA</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Engagement</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center space-x-1 ml-4"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
