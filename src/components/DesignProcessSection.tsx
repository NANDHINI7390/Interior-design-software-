import React from 'react';
import { PROCESS_STEPS } from '../data/mockData';
import { PhoneCall, Compass, Layers, Eye, FileCheck, Key, CheckCircle, ArrowRight } from 'lucide-react';

interface DesignProcessSectionProps {
  onStartProcess: () => void;
}

export const DesignProcessSection: React.FC<DesignProcessSectionProps> = ({ onStartProcess }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5 text-[#B89569]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#B89569]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#B89569]" />;
      case 'Eye':
        return <Eye className="w-5 h-5 text-[#B89569]" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-[#B89569]" />;
      case 'Key':
        return <Key className="w-5 h-5 text-[#B89569]" />;
      default:
        return <CheckCircle className="w-5 h-5 text-[#B89569]" />;
    }
  };

  return (
    <section id="process-section" className="py-24 sm:py-32 bg-[#FBF9F5] border-b border-[#EBE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center space-x-2">
              <span className="w-8 h-px bg-[#B89569]"></span>
              <span>The Atelier Methodology</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] tracking-tight leading-tight">
              A 6-Step Pathway from Concept to Turnkey Handover.
            </h2>
            <p className="text-base text-[#78716C] font-light">
              Transparent, disciplined and meticulous. We eliminate construction ambiguity with guaranteed timelines and weekly milestone accountability.
            </p>
          </div>

          <button
            onClick={onStartProcess}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#1C1917] text-[#FBF9F5] hover:bg-[#2C2825] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md"
          >
            <span>Begin Step 01 Today</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </button>
        </div>

        {/* 6 Steps Sequential Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="bg-white p-8 rounded-3xl border border-[#EBE6DD] hover:border-[#C5A880] transition-all duration-300 shadow-sm hover:shadow-xl relative flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header row with step number and duration */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F2EC] group-hover:bg-[#C5A880]/20 flex items-center justify-center transition-colors">
                    {getIcon(step.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-serif font-light text-[#C5A880]">
                      {step.stepNumber}
                    </span>
                    <span className="block text-[11px] font-mono uppercase tracking-wider text-[#A8A29E]">
                      {step.duration}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-serif font-medium text-[#1C1917] group-hover:text-[#B89569] transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-[#78716C] leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="pt-6 mt-6 border-t border-[#F5F2EC]">
                <div className="text-[10px] uppercase font-mono tracking-widest text-[#B89569] mb-2.5">
                  Client Deliverables
                </div>
                <ul className="space-y-1.5 text-xs text-[#57534E]">
                  {step.deliverables.map((item, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1 h-1 rounded-full bg-[#B89569]" />
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
