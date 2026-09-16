import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
import { ArrowRight, Check, Sparkles, Filter } from 'lucide-react';

interface ServicesSectionProps {
  onEnquireService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onEnquireService }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'residential', label: 'Residential & Estates' },
    { id: 'commercial', label: 'Commercial & Hospitality' },
    { id: 'turnkey', label: 'Turnkey & Remodeling' },
    { id: 'specialized', label: 'Bespoke Millwork & Kitchens' },
  ];

  const filteredServices =
    filterCategory === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === filterCategory);

  return (
    <section id="services-section" className="py-24 sm:py-32 bg-[#F5F2EC] border-b border-[#EBE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center space-x-2">
              <span className="w-8 h-px bg-[#B89569]"></span>
              <span>Our Practice</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] tracking-tight leading-tight">
              Bespoke Services Tailored to High-Value Living.
            </h2>
            <p className="text-base text-[#78716C] font-light">
              From standalone coastal villas to bespoke modular kitchens and turnkey commercial flagships, our ateliers handle every phase with architectural precision.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <div className="flex items-center gap-2 whitespace-nowrap min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                    filterCategory === cat.id
                      ? 'bg-[#1C1917] text-[#FBF9F5] shadow-sm'
                      : 'bg-white/80 hover:bg-white text-[#78716C] hover:text-[#1C1917] border border-[#EBE6DD]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 12 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#EBE6DD] hover:border-[#C5A880] transition-all duration-500 group flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1"
              id={`service-card-${service.id}`}
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#E7E2DA]">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#E2CCA9] text-[10px] uppercase tracking-widest font-mono border border-white/20">
                  {service.tag}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#1C1917] group-hover:text-[#B89569] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#78716C] leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Key Deliverables Chips */}
                  <div className="pt-2 border-t border-[#F5F2EC]">
                    <div className="text-[11px] uppercase tracking-wider text-[#A8A29E] font-medium mb-2">
                      Key Deliverables
                    </div>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-[#57534E]">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center space-x-1.5 truncate">
                          <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Enquire CTA */}
                <div className="pt-4 border-t border-[#F5F2EC] flex items-center justify-between">
                  <button
                    onClick={() => onEnquireService(service.title)}
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#1C1917] group-hover:text-[#B89569] transition-colors"
                  >
                    <span>Enquire for Project</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[11px] font-mono text-[#A8A29E]">Ateliera Spec</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
