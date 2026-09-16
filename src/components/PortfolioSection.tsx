import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/mockData';
import { ProjectItem } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ArrowUpRight, MapPin, Maximize2, Layers } from 'lucide-react';

interface PortfolioSectionProps {
  onDiscussProject: (projectName: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onDiscussProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filterTabs = ['All', 'Residential', 'Villas', 'Apartments', 'Commercial', 'Hospitality'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="portfolio-section" className="py-24 sm:py-32 bg-[#FBF9F5] border-b border-[#EBE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center space-x-2">
              <span className="w-8 h-px bg-[#B89569]"></span>
              <span>Curated Portfolio</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] tracking-tight leading-tight">
              Selected Architectural Commissions.
            </h2>
            <p className="text-base text-[#78716C] font-light">
              Explore bespoke private residences, oceanfront villas, duplex penthouses, and hospitality flagships executed with unyielding craft.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <div className="flex items-center gap-2 whitespace-nowrap min-w-max">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedCategory(tab)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === tab
                      ? 'bg-[#1C1917] text-[#FBF9F5] shadow'
                      : 'bg-white text-[#78716C] hover:text-[#1C1917] border border-[#EBE6DD]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#EBE6DD] hover:border-[#C5A880] transition-all duration-500 flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-1.5"
              id={`portfolio-item-${project.id}`}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE6DF]">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#E2CCA9] text-[10px] uppercase font-mono tracking-wider border border-white/20">
                    {project.category}
                  </span>
                  {project.beforeImage && (
                    <span className="px-2.5 py-1 rounded-full bg-[#C5A880]/90 text-[#1C1917] text-[10px] uppercase font-sans font-semibold tracking-wider flex items-center space-x-1">
                      <Layers className="w-3 h-3" />
                      <span>Before / After</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center space-x-1 drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{project.location}</span>
                  </span>
                  <span className="font-mono text-[11px] drop-shadow text-white/90">
                    {project.area}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#1C1917] group-hover:text-[#B89569] transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-[#A8A29E] font-mono">{project.year}</span>
                  </div>

                  <p className="text-xs uppercase tracking-widest text-[#B89569] font-medium">
                    {project.style}
                  </p>

                  <p className="text-sm text-[#78716C] line-clamp-2 leading-relaxed font-light">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Clickable footer */}
                <div className="pt-3 border-t border-[#F5F2EC] flex items-center justify-between text-xs text-[#1C1917] font-medium uppercase tracking-wider group-hover:text-[#B89569] transition-colors">
                  <span>View Case Study &amp; Specs</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onDiscussSimilar={onDiscussProject}
        />

      </div>
    </section>
  );
};
