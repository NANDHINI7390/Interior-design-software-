import React from 'react';
import { PACKAGES_DATA } from '../data/mockData';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PackagesSectionProps {
  onRequestPackageQuote: (packageName: string) => void;
  onOpenEstimator?: () => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onRequestPackageQuote,
}) => {
  return (
    <section id="packages-section" className="py-24 sm:py-32 bg-[#F5F2EC] border-b border-[#EBE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center justify-center space-x-2">
            <span className="w-8 h-px bg-[#B89569]"></span>
            <span>Engagement Frameworks</span>
            <span className="w-8 h-px bg-[#B89569]"></span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] tracking-tight">
            Curated Atelier Service Packages.
          </h2>
          <p className="text-base text-[#78716C] font-light">
            Every residence is unique. While our commissions are tailored to individual architecture, these three engagement models provide transparent structures for our design and turnkey execution services.
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES_DATA.map((pkg) => {
            const isSignature = pkg.popular;
            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-500 relative ${
                  isSignature
                    ? 'bg-[#1C1917] text-[#FBF9F5] shadow-2xl scale-102 lg:-translate-y-2 border-2 border-[#C5A880]'
                    : 'bg-white text-[#1C1917] border border-[#EBE6DD] shadow-sm hover:shadow-xl'
                }`}
                id={`package-card-${pkg.id}`}
              >
                {/* Popular Pill */}
                {isSignature && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C5A880] text-[#1C1917] font-semibold text-[10px] uppercase tracking-[0.25em] shadow-md">
                    Most Requested Engagement
                  </div>
                )}

                <div className="space-y-6">
                  {/* Package Title & Subtitle */}
                  <div className="space-y-3 border-b border-current/10 pb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide">
                        {pkg.name}
                      </h3>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          isSignature
                            ? 'bg-white/10 text-[#C5A880]'
                            : 'bg-[#F5F2EC] text-[#78716C]'
                        }`}
                      >
                        Atelier Tier
                      </span>
                    </div>
                    <p className={`text-xs uppercase tracking-wider ${isSignature ? 'text-[#C5A880]' : 'text-[#B89569]'}`}>
                      {pkg.subtitle}
                    </p>

                    {/* Starting Investment Baseline */}
                    <div className="pt-2">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-[#C5A880]">
                          {pkg.startingPrice}
                        </span>
                        <span className={`text-xs uppercase tracking-wider ${isSignature ? 'text-white/60' : 'text-[#78716C]'}`}>
                          starts from
                        </span>
                      </div>
                      {pkg.currencyNote && (
                        <p className={`text-[11px] mt-1 ${isSignature ? 'text-white/60' : 'text-[#8C837A]'}`}>
                          {pkg.currencyNote}
                        </p>
                      )}
                    </div>

                    <p className={`text-xs leading-relaxed pt-1 ${isSignature ? 'text-white/70' : 'text-[#78716C]'}`}>
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Recommended For */}
                  <div className="text-xs font-medium space-y-1">
                    <span className={`block uppercase text-[10px] tracking-wider ${isSignature ? 'text-white/50' : 'text-[#A8A29E]'}`}>
                      Recommended Scope
                    </span>
                    <span className={isSignature ? 'text-white/90' : 'text-[#44403C]'}>
                      {pkg.recommendedFor}
                    </span>
                  </div>

                  {/* Feature Inclusions Checklist */}
                  <div className="space-y-3 pt-2">
                    <span className={`block uppercase text-[10px] tracking-wider ${isSignature ? 'text-white/50' : 'text-[#A8A29E]'}`}>
                      Package Inclusions
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5 text-xs">
                          <Check
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isSignature ? 'text-[#C5A880]' : 'text-[#B89569]'
                            }`}
                          />
                          <span className={`leading-relaxed ${isSignature ? 'text-white/80' : 'text-[#57534E]'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-8 mt-8 border-t border-current/10 space-y-3">
                  <button
                    onClick={() => onRequestPackageQuote(pkg.name)}
                    className={`w-full py-4 rounded-full font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer ${
                      isSignature
                        ? 'bg-[#C5A880] hover:bg-[#B39060] text-[#1C1917]'
                        : 'bg-[#1C1917] hover:bg-[#2C2825] text-white'
                    }`}
                  >
                    <span>Select Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className={`text-[11px] text-center italic ${isSignature ? 'text-white/50' : 'text-[#A8A29E]'}`}>
                    Itemized architectural BOQ drafted during consultation
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Studio Assurance Note */}
        <div className="mt-14 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8C837A] font-mono">
            Every engagement includes dedicated project directorship, weekly progress logs, and a 5-year studio craft warranty.
          </p>
        </div>

      </div>
    </section>
  );
};
