import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Upload,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  X,
} from 'lucide-react';
import { LeadItem } from '../types';

interface ConsultationSectionProps {
  initialData?: {
    propertyType?: string;
    area?: number;
    budgetRange?: string;
    style?: string;
    service?: string;
    message?: string;
  };
  onSubmitLead: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  initialData,
  onSubmitLead,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [area, setArea] = useState('2,400 sq. ft.');
  const [budgetRange, setBudgetRange] = useState('$50,000 – $100,000');
  const [style, setStyle] = useState('Modern Minimal');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [floorPlanFile, setFloorPlanFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  // Sync initialData if updated from Estimator or Service card enquiry
  useEffect(() => {
    if (initialData) {
      if (initialData.propertyType) setPropertyType(initialData.propertyType);
      if (initialData.area) setArea(`${initialData.area} sq. ft.`);
      if (initialData.budgetRange) setBudgetRange(initialData.budgetRange);
      if (initialData.style) setStyle(initialData.style);
      if (initialData.service) {
        setMessage((prev) => (prev ? `${prev}\nInterested in: ${initialData.service}` : `Interested in: ${initialData.service}`));
      }
      if (initialData.message) {
        setMessage((prev) => (prev ? `${prev}\n${initialData.message}` : initialData.message || ''));
      }
    }
  }, [initialData]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFloorPlanFile(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedCode = `AT-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      onSubmitLead({
        name: name.trim() || 'Valued Client',
        clientName: name.trim() || 'Valued Client',
        email: email.trim() || 'client@ateliera.com',
        phone: phone.trim() || '+44 20 7946 0912',
        city: city.trim() || 'London',
        propertyType,
        area: area || '2,400 sq. ft.',
        budgetRange,
        preferredStyle: style,
        preferredDate: preferredDate || 'Immediate / Flexible',
        requirements: message.trim() || 'Turnkey interior inquiry',
        floorPlanUploaded: Boolean(floorPlanFile),
        source: 'Consultation Form',
      });

      setIsSubmitting(false);
      setSubmittedLeadId(generatedCode);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedLeadId(null);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setFloorPlanFile(null);
  };

  return (
    <section id="contact-section" className="py-24 sm:py-32 bg-[#FBF9F5] border-b border-[#EBE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B89569] font-medium flex items-center space-x-2">
            <span className="w-8 h-px bg-[#B89569]"></span>
            <span>Private Client Engagement</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] tracking-tight leading-tight">
            Schedule a Private Consultation.
          </h2>
          <p className="text-base text-[#78716C] font-light">
            Meet with our principal architects at our Mayfair studio or schedule a video session to review your architectural floor plans and lifestyle goals.
          </p>
        </div>

        {/* 2 Column Layout: Form vs Studio Desk Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-10 rounded-3xl border border-[#EBE6DD] shadow-xl relative" id="consultation-form-container">
            
            {submittedLeadId ? (
              /* Success Confirmation Card */
              <div className="py-8 text-center space-y-6 animate-fade-in" id="consultation-success-screen">
                <div className="w-16 h-16 bg-[#F5F2EC] rounded-full flex items-center justify-center mx-auto text-[#B89569]">
                  <CheckCircle className="w-8 h-8 text-[#B89569]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B89569]">
                    Consultation Request Confirmed
                  </span>
                  <h3 className="font-serif text-3xl font-light text-[#1C1917]">
                    Thank You, {name || 'Valued Client'}.
                  </h3>
                  <p className="text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
                    Your request has been routed to our Senior Design Partner. Dossier Reference Number:
                  </p>
                  <div className="inline-block px-4 py-2 rounded-xl bg-[#F5F2EC] font-mono text-base font-semibold text-[#1C1917] border border-[#EBE6DD]">
                    {submittedLeadId}
                  </div>
                </div>

                <div className="p-6 bg-[#FBF9F5] rounded-2xl border border-[#EBE6DD] text-xs text-left max-w-md mx-auto space-y-2 text-[#57534E]">
                  <div className="font-semibold text-[#1C1917] uppercase tracking-wider text-[11px]">
                    Next Steps:
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B89569]" />
                    <span>Our studio manager will call or WhatsApp within 4 business hours.</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B89569]" />
                    <span>We will assemble an initial project brief &amp; moodboard references.</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B89569]" />
                    <span>Lead recorded to the Ateliera CRM for executive review.</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-full bg-[#1C1917] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2825] transition-colors"
                >
                  Submit Another Project Inquiry
                </button>
              </div>
            ) : (
              /* Actual Consultation Lead Capture Form */
              <form onSubmit={handleSubmit} className="space-y-6" id="consultation-form">
                
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Vivienne Montgomery"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                      id="input-consultation-name"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. v.montgomery@estate.co.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                      id="input-consultation-email"
                    />
                  </div>
                </div>

                {/* Phone & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +44 7911 123456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                      id="input-consultation-phone"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                      City &amp; Country
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. London / Dubai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                      id="input-consultation-city"
                    />
                  </div>
                </div>

                {/* Property Type & Approximate Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                      Property Typology
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Apartment">Luxury Apartment / Flat</option>
                      <option value="Villa">Detached Villa / Country Estate</option>
                      <option value="Penthouse">Sky Penthouse / Duplex</option>
                      <option value="Commercial">Commercial / Boutique Hospitality</option>
                      <option value="Townhouse">Historic Townhouse / Brownstone</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                      Approximate Area
                    </label>
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. 3,500 sq. ft."
                      className="w-full p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                {/* Estimated Budget & Preferred Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                      Target Investment Scope
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="$35,000 – $75,000">$35,000 – $75,000 (Essential)</option>
                      <option value="$75,000 – $150,000">$75,000 – $150,000 (Signature Residence)</option>
                      <option value="$150,000 – $300,000">$150,000 – $300,000 (Bespoke Villa)</option>
                      <option value="$300,000+">$300,000+ (Ultra-Luxury Estate)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                      Preferred Style Language
                    </label>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Modern Minimal">Modern Minimal</option>
                      <option value="Contemporary Luxury">Contemporary Luxury</option>
                      <option value="Japandi">Japandi</option>
                      <option value="Classic Architectural">Classic Architectural</option>
                      <option value="Scandinavian Warm">Scandinavian Warm</option>
                      <option value="Undecided / Need Guidance">Undecided / Open to Guidance</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date for Consultation */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                    Preferred Consultation Window
                  </label>
                  <input
                    type="text"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    placeholder="e.g. Next Tuesday afternoon or Saturday morning"
                    className="w-full p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                {/* Floor Plan Upload Dropzone */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                    Floor Plan or Architect CAD (Optional)
                  </label>
                  <label className="border-2 border-dashed border-[#EBE6DD] hover:border-[#C5A880] p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#FBF9F5]">
                    <Upload className="w-6 h-6 text-[#B89569] mb-2" />
                    <span className="text-xs font-medium text-[#1C1917]">
                      {floorPlanFile ? floorPlanFile : 'Drag & drop PDF / CAD file or click to browse'}
                    </span>
                    <span className="text-[10px] text-[#A8A29E] mt-0.5">
                      PDF, DWG, PNG, JPEG up to 50MB
                    </span>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.dwg,.png,.jpg,.jpeg"
                    />
                  </label>
                </div>

                {/* Message / Requirements */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                    Project Vision &amp; Notes
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share any special requirements, timeline expectations, or design inspirations..."
                    className="w-full p-3.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880] resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#1C1917] hover:bg-[#2C2825] text-[#FBF9F5] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-xl hover:scale-101"
                  id="btn-submit-consultation"
                >
                  {isSubmitting ? (
                    <span>Registering Consultation...</span>
                  ) : (
                    <>
                      <span>Book Private Consultation</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#A8A29E]">
                  Confidentiality assured under Non-Disclosure Agreement (NDA) upon request.
                </p>
              </form>
            )}

          </div>

          {/* Studio Contact & Locations Desk (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Channels Card */}
            <div className="bg-white p-8 rounded-3xl border border-[#EBE6DD] shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-light text-[#1C1917]">
                Atelier Headquarters &amp; Gallery
              </h3>

              <div className="space-y-4 text-sm text-[#57534E]">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#B89569] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-[#1C1917]">London Mayfair Studio</div>
                    <div>42 Berkeley Square, Mayfair, London W1J 5AW, United Kingdom</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#B89569] flex-shrink-0" />
                  <div>
                    <span className="text-[#A8A29E] text-xs block">Studio Direct Line</span>
                    <a href="tel:+442079460912" className="text-[#1C1917] font-medium hover:text-[#B89569]">
                      +44 20 7946 0912
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#B89569] flex-shrink-0" />
                  <div>
                    <span className="text-[#A8A29E] text-xs block">Private Commissions</span>
                    <a href="mailto:concierge@ateliera-interiors.com" className="text-[#1C1917] font-medium hover:text-[#B89569]">
                      concierge@ateliera-interiors.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#B89569] flex-shrink-0" />
                  <div>
                    <span className="text-[#A8A29E] text-xs block">Studio Hours</span>
                    <span className="text-[#1C1917]">Monday – Saturday: 09:00 – 19:00 GMT</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Chat Button */}
              <div className="pt-4 border-t border-[#F5F2EC]">
                <a
                  href="https://wa.me/442079460912?text=Hello%20Ateliera%20Interiors%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20interior%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center space-x-2 shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Instantly</span>
                </a>
              </div>
            </div>

            {/* Architectural Map & Global Hubs */}
            <div className="bg-[#1C1917] text-[#FBF9F5] p-8 rounded-3xl border border-[#2C2825] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                  Global Presence
                </span>
                <span className="text-xs text-white/60 font-mono">4 Global Studios</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="font-serif text-sm font-semibold text-white">London</div>
                  <div className="text-white/60">Mayfair &amp; Chelsea</div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="font-serif text-sm font-semibold text-white">Dubai</div>
                  <div className="text-white/60">DIFC Gate Village</div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="font-serif text-sm font-semibold text-white">New York</div>
                  <div className="text-white/60">SoHo Crosby Street</div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="font-serif text-sm font-semibold text-white">Milan</div>
                  <div className="text-white/60">Via Montenapoleone</div>
                </div>
              </div>

              {/* Stylized Architectural Map Graphic Mockup */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/7] border border-white/10 bg-zinc-900 mt-2">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                  alt="Ateliera Global Network Map"
                  className="w-full h-full object-cover opacity-40 filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[11px] font-mono text-[#C5A880]">
                  International Turnkey Logistics Active
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
