import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { X, MapPin, Maximize2, Calendar, Sparkles, CheckCircle, ArrowRight, Layers } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onDiscussSimilar: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onDiscussSimilar,
}) => {
  if (!project) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const hasBeforeAfter = Boolean(project.beforeImage && project.afterImage);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - container.left) / container.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, pos)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-[#FBF9F5] rounded-3xl overflow-hidden shadow-2xl border border-[#EBE6DD] max-h-[92vh] flex flex-col my-auto"
        id="project-detail-modal"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-[#EBE6DD] bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#1C1917] text-[#FBF9F5] text-[10px] uppercase tracking-widest font-mono">
              {project.category}
            </span>
            <span className="text-xs text-[#78716C] uppercase tracking-wider flex items-center space-x-1 truncate max-w-[160px] sm:max-w-none">
              <MapPin className="w-3.5 h-3.5 text-[#B89569] flex-shrink-0" />
              <span className="truncate">{project.location}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#F5F2EC] hover:bg-[#EBE6DD] text-[#1C1917] transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8 sm:space-y-10">
          
          {/* Project Title Header */}
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light text-[#1C1917] tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#57534E] font-light max-w-3xl leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Media Showcase: Main Gallery OR Before/After Comparison */}
          <div className="space-y-4">
            {/* View Mode Switcher */}
            {hasBeforeAfter && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="inline-flex items-center space-x-1.5 sm:space-x-2 p-1 bg-[#EBE6DD] rounded-full text-xs overflow-x-auto no-scrollbar max-w-full">
                  <button
                    onClick={() => setShowBeforeAfter(false)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-wider transition-all whitespace-nowrap text-[11px] sm:text-xs ${
                      !showBeforeAfter
                        ? 'bg-[#1C1917] text-white shadow'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Gallery ({project.images.length})
                  </button>
                  <button
                    onClick={() => setShowBeforeAfter(true)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center space-x-1 whitespace-nowrap text-[11px] sm:text-xs ${
                      showBeforeAfter
                        ? 'bg-[#B89569] text-white shadow'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Before &amp; After</span>
                  </button>
                </div>
                <span className="text-xs text-[#78716C] font-mono hidden sm:inline-block">
                  Completed {project.year}
                </span>
              </div>
            )}

            {/* Interactive Before / After View */}
            {showBeforeAfter && hasBeforeAfter ? (
              <div className="space-y-2">
                <div
                  className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-[#EBE6DD] shadow-lg"
                  onMouseMove={handleSliderMove}
                  onTouchMove={handleSliderMove}
                >
                  {/* After Image (Full background) */}
                  <img
                    src={project.afterImage}
                    alt="After Finished Interior"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 text-[#E2CCA9] text-xs font-mono tracking-wider backdrop-blur-md uppercase">
                    After / Finished Atelier Space
                  </div>

                  {/* Before Image (Clipped overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={project.beforeImage}
                      alt="Before Renovation"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', minWidth: '100%' }}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white/90 text-xs font-mono tracking-wider backdrop-blur-md uppercase">
                      Before / Raw Site Condition
                    </div>
                  </div>

                  {/* Draggable Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 cursor-ew-resize"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1C1917] text-[#C5A880] border-2 border-white flex items-center justify-center text-xs font-mono shadow-xl">
                      ⇄
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center text-[#78716C] italic font-serif">
                  Drag the slider across to view site transformation from raw structure to finished interior.
                </p>
              </div>
            ) : (
              /* Standard Gallery Carousel */
              <div className="space-y-3">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/10 shadow-lg border border-[#EBE6DD]">
                  <img
                    src={project.images[activeImageIndex]}
                    alt={`${project.title} view ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs font-mono">
                    {activeImageIndex + 1} / {project.images.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {project.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === i
                          ? 'border-[#C5A880] scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Project Specifications Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-[#EBE6DD]">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#A8A29E]">Property Style</div>
              <div className="font-serif text-lg text-[#1C1917] font-medium">{project.style}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#A8A29E]">Total Area</div>
              <div className="font-serif text-lg text-[#1C1917] font-medium">{project.area}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#A8A29E]">Location</div>
              <div className="font-serif text-lg text-[#1C1917] font-medium">{project.location}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#A8A29E]">Client Typology</div>
              <div className="font-serif text-lg text-[#1C1917] font-medium">{project.client || 'Private Client'}</div>
            </div>
          </div>

          {/* Concept & Scope of Work */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xl font-serif font-medium text-[#1C1917]">
                The Design Concept
              </h3>
              <p className="text-[#57534E] text-base leading-relaxed font-light">
                {project.concept}
              </p>

              {/* Material Swatches Palette */}
              <div className="pt-4 space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-[#A8A29E] font-medium">
                  Bespoke Materials Palette
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.materialsUsed.map((mat, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-[#EBE6DD] flex items-center space-x-3 shadow-sm"
                    >
                      <span
                        className="w-7 h-7 rounded-full border border-black/10 flex-shrink-0 shadow-inner"
                        style={{ backgroundColor: mat.color }}
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-medium text-[#1C1917] truncate">{mat.name}</div>
                        <div className="text-[10px] text-[#78716C] uppercase">{mat.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scope of Work Checklist */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#EBE6DD] space-y-4">
              <h3 className="text-lg font-serif font-medium text-[#1C1917] flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#B89569]" />
                <span>Scope of Execution</span>
              </h3>
              <ul className="space-y-2.5">
                {project.scopeOfWork.map((scope, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs text-[#57534E]">
                    <CheckCircle className="w-4 h-4 text-[#B89569] flex-shrink-0 mt-0.5" />
                    <span>{scope}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Bottom CTA */}
          <div className="pt-6 border-t border-[#EBE6DD] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F5F2EC] p-6 rounded-2xl">
            <div>
              <div className="font-serif text-xl text-[#1C1917]">Envisioning a similar space?</div>
              <div className="text-xs text-[#78716C]">
                Our principals will review your floor plan and prepare preliminary spatial layouts.
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onDiscussSimilar(project.title);
              }}
              className="px-6 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#2C2825] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center space-x-2 shadow-lg"
            >
              <span>Discuss a Similar Project</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
