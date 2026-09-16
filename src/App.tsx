import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroVideoSlider } from './components/HeroVideoSlider';
import { AboutStudio } from './components/AboutStudio';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { DesignStylesSection } from './components/DesignStylesSection';
import { DesignProcessSection } from './components/DesignProcessSection';
import { Visualization3DShowcase } from './components/Visualization3DShowcase';
import { MaterialsShowcase } from './components/MaterialsShowcase';
import { PackagesSection } from './components/PackagesSection';
import { ProjectEstimator } from './components/ProjectEstimator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ConsultationSection } from './components/ConsultationSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { MOCK_LEADS, MOCK_CONSULTATIONS, MOCK_QUOTATIONS } from './data/mockData';
import { LeadItem, ConsultationItem, QuotationItem } from './types';
import { MessageSquare, Shield, Sparkles, Check } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'client' | 'admin'>('client');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistent leads in local storage
  const [leads, setLeads] = useState<LeadItem[]>(() => {
    const saved = localStorage.getItem('ateliera_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return MOCK_LEADS;
      }
    }
    return MOCK_LEADS;
  });

  // Persistent consultations
  const [consultations, setConsultations] = useState<ConsultationItem[]>(() => {
    const saved = localStorage.getItem('ateliera_consultations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return MOCK_CONSULTATIONS;
      }
    }
    return MOCK_CONSULTATIONS;
  });

  const [quotations] = useState<QuotationItem[]>(MOCK_QUOTATIONS);

  // Prefill state for the consultation form
  const [consultationPrefill, setConsultationPrefill] = useState<{
    propertyType?: string;
    area?: number;
    budgetRange?: string;
    style?: string;
    service?: string;
    message?: string;
  }>({});

  useEffect(() => {
    localStorage.setItem('ateliera_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('ateliera_consultations', JSON.stringify(consultations));
  }, [consultations]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const scrollToSection = (id: string) => {
    if (activeView === 'admin') {
      setActiveView('client');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handlers for cross-component interactions
  const handleEnquireService = (serviceName: string) => {
    setConsultationPrefill({
      service: serviceName,
      message: `I am interested in scheduling an architectural review for: ${serviceName}.`,
    });
    scrollToSection('contact-section');
  };

  const handleDiscussProject = (projectName: string) => {
    setConsultationPrefill({
      message: `I viewed the '${projectName}' case study and would like to discuss a similar architectural scope.`,
    });
    scrollToSection('contact-section');
  };

  const handleSelectStyle = (styleName: string) => {
    setConsultationPrefill({
      style: styleName,
      message: `I would like to explore our residence designed in the '${styleName}' aesthetic language.`,
    });
    scrollToSection('contact-section');
  };

  const handleRequestPackageQuote = (packageName: string) => {
    setConsultationPrefill({
      message: `Requesting custom quotation and scope dossier for the ${packageName} atelier package.`,
    });
    scrollToSection('contact-section');
  };

  const handleTransferEstimate = (estimateData: {
    propertyType: string;
    area: number;
    rooms: string;
    budgetRange: string;
    breakdownText: string;
  }) => {
    setConsultationPrefill({
      propertyType: estimateData.propertyType,
      area: estimateData.area,
      budgetRange: estimateData.budgetRange,
      message: `Estimator Calculation: ${estimateData.breakdownText} (Indicative: ${estimateData.budgetRange})`,
    });
    scrollToSection('contact-section');
    showToast(`Calculated estimate (${estimateData.budgetRange}) transferred to consultation form.`);
  };

  const handleNewLeadSubmit = (leadData: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => {
    const newLead: LeadItem = {
      ...leadData,
      id: `AT-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
      status: 'New',
    };
    setLeads((prev) => [newLead, ...prev]);
    showToast(`Lead registered: ${newLead.name} (${newLead.budgetRange}). Appears in Admin CRM.`);
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadItem['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    showToast(`Lead ${leadId} status updated to: ${newStatus}`);
  };

  const handleAddLeadNote = (leadId: string, note: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              notes: [...(l.notes || []), `${new Date().toLocaleDateString()}: ${note}`],
            }
          : l
      )
    );
    showToast('Internal note recorded for design team.');
  };

  const handleScheduleConsultation = (consultationData: Omit<ConsultationItem, 'id'>) => {
    const newConsultation: ConsultationItem = {
      ...consultationData,
      id: `CNS-${Math.floor(100 + Math.random() * 900)}`,
    };
    setConsultations((prev) => [newConsultation, ...prev]);
    showToast(`Consultation confirmed with ${consultationData.clientName} for ${consultationData.date}.`);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] font-sans antialiased selection:bg-[#C5A880] selection:text-[#1C1917]">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-[#1C1917] text-[#FBF9F5] border border-[#C5A880] shadow-2xl flex items-center space-x-3 text-xs max-w-sm animate-fade-in">
          <div className="w-6 h-6 rounded-full bg-[#C5A880] text-[#1C1917] flex items-center justify-center font-bold flex-shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-light">{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Header
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBookConsultation={() => scrollToSection('contact-section')}
        onOpenEstimator={() => scrollToSection('estimator-section')}
        leadsCount={leads.filter((l) => l.status === 'New').length}
      />

      {/* View Switcher: Client Experience vs Admin CRM */}
      {activeView === 'client' ? (
        <main id="client-experience-container">
          {/* 1. Cinematic Video Hero Section */}
          <HeroVideoSlider
            onExploreProjects={() => scrollToSection('portfolio-section')}
            onBookConsultation={() => scrollToSection('contact-section')}
          />

          {/* 2. About The Studio */}
          <AboutStudio
            onBookConsultation={() => scrollToSection('contact-section')}
          />

          {/* 3. Services Grid */}
          <ServicesSection
            onEnquireService={handleEnquireService}
          />

          {/* 4 & 5. Projects Portfolio & Interactive Detail / Before-After Modal */}
          <PortfolioSection
            onDiscussProject={handleDiscussProject}
          />

          {/* 6. Design Styles */}
          <DesignStylesSection
            onSelectStyle={handleSelectStyle}
          />

          {/* 7. Design Process (6-Step Roadmap) */}
          <DesignProcessSection
            onStartProcess={() => scrollToSection('contact-section')}
          />

          {/* 8. 3D Visualization Showcase */}
          <Visualization3DShowcase
            onBookConsultation={() => scrollToSection('contact-section')}
          />

          {/* Tactile Materials & Finishes */}
          <MaterialsShowcase
            onRequestSwatchBox={() => {
              setConsultationPrefill({
                message: 'Requesting the curated Ateliera Material Swatch Box (Carrara Marble, Bavarian Smoked Oak, Linen textures).',
              });
              scrollToSection('contact-section');
            }}
          />

          {/* 10. Service Packages */}
          <PackagesSection
            onRequestPackageQuote={handleRequestPackageQuote}
            onOpenEstimator={() => scrollToSection('estimator-section')}
          />

          {/* 11. Interactive Budget Estimator */}
          <ProjectEstimator
            onTransferToConsultation={handleTransferEstimate}
          />

          {/* 9. Testimonials & Client Reviews */}
          <TestimonialsSection />

          {/* 12 & 13. Consultation Booking & Studio Contact */}
          <ConsultationSection
            initialData={consultationPrefill}
            onSubmitLead={handleNewLeadSubmit}
          />

          {/* 14. Footer */}
          <Footer
            onNavigate={scrollToSection}
            onOpenAdmin={() => {
              setActiveView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : (
        /* Admin CRM View */
        <AdminDashboard
          leads={leads}
          consultations={consultations}
          quotations={quotations}
          onUpdateLeadStatus={handleUpdateLeadStatus}
          onAddLeadNote={handleAddLeadNote}
          onScheduleConsultation={handleScheduleConsultation}
          onBackToClientView={() => {
            setActiveView('client');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/442079460912?text=Hello%20Ateliera%20Interiors%2C%20I%20would%20like%20to%20inquire%20about%20a%20turnkey%20interior%20project."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-full bg-[#1C1917] text-white border border-[#C5A880] shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2.5 group"
        title="Direct Studio WhatsApp Desk"
        id="floating-whatsapp-btn"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <MessageSquare className="w-4 h-4 text-[#C5A880]" />
        <span className="hidden sm:inline-block text-xs uppercase tracking-wider font-mono pr-1 text-[#FBF9F5]">
          Studio WhatsApp
        </span>
      </a>

    </div>
  );
}
