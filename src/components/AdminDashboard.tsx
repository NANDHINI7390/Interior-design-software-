import React, { useState } from 'react';
import { LeadItem, ConsultationItem, QuotationItem } from '../types';
import {
  Users,
  Calendar,
  FolderKanban,
  DollarSign,
  Download,
  Filter,
  Search,
  Plus,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  FileText,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

interface AdminDashboardProps {
  leads: LeadItem[];
  consultations: ConsultationItem[];
  quotations: QuotationItem[];
  onUpdateLeadStatus: (leadId: string, newStatus: LeadItem['status']) => void;
  onAddLeadNote: (leadId: string, note: string) => void;
  onScheduleConsultation: (consultation: Omit<ConsultationItem, 'id'>) => void;
  onBackToClientView: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  leads,
  consultations,
  quotations,
  onUpdateLeadStatus,
  onAddLeadNote,
  onScheduleConsultation,
  onBackToClientView,
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'consultations' | 'quotations'>('leads');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(leads[0] || null);
  const [newNoteText, setNewNoteText] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // New Consultation Form state
  const [consultDate, setConsultDate] = useState('2025-05-18');
  const [consultTime, setConsultTime] = useState('14:00');
  const [consultMode, setConsultMode] = useState<'In-Person Studio' | 'Site Visit' | 'Virtual Video'>('In-Person Studio');
  const [consultArchitect, setConsultArchitect] = useState('Marcus Sterling (Principal)');

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.propertyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate Pipeline KPIs
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const scheduledCount = consultations.length;
  const wonCount = leads.filter((l) => l.status === 'Won').length;

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'City', 'Property Type', 'Area', 'Budget', 'Status'];
    const rows = leads.map((l) => [
      l.id,
      l.createdAt,
      `"${l.name}"`,
      `"${l.phone}"`,
      l.email,
      l.city,
      `"${l.propertyType}"`,
      `"${l.area}"`,
      `"${l.budgetRange}"`,
      l.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ateliera_crm_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;
    onAddLeadNote(selectedLead.id, newNoteText.trim());
    setNewNoteText('');
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    onScheduleConsultation({
      clientName: selectedLead.name,
      propertyType: selectedLead.propertyType,
      date: consultDate,
      time: consultTime,
      mode: consultMode,
      assignedArchitect: consultArchitect,
      status: 'Confirmed',
    });

    onUpdateLeadStatus(selectedLead.id, 'Consultation Scheduled');
    setShowScheduleModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC] text-[#1C1917] pt-24 pb-20 select-none" id="admin-crm-view">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Executive Header Banner */}
        <div className="bg-[#1C1917] text-[#FBF9F5] rounded-3xl p-8 shadow-xl border border-[#2C2825] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded bg-[#C5A880]/20 text-[#C5A880] text-[10px] font-mono uppercase tracking-widest border border-[#C5A880]/30">
                Ateliera Studio Suite
              </span>
              <span className="text-xs text-white/50 font-mono">Lead Intelligence &amp; Quotation Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-tight">
              Executive CRM &amp; Pipeline Portal
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl font-light">
              Demonstrating to interior design business owners how captured digital inquiries are qualified, converted to studio consultations, and turned into profitable commissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-medium border border-white/20 flex items-center space-x-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onBackToClientView}
              className="px-5 py-2.5 rounded-full bg-[#C5A880] hover:bg-[#B39060] text-[#1C1917] text-xs uppercase tracking-wider font-semibold shadow-md flex items-center space-x-2 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Switch to Client Experience</span>
            </button>
          </div>
        </div>

        {/* 4 Core Business KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#EBE6DD] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#78716C] uppercase tracking-wider font-mono">
              <span>Total Inquiries</span>
              <Users className="w-4 h-4 text-[#B89569]" />
            </div>
            <div className="text-3xl sm:text-4xl font-serif font-light text-[#1C1917]">
              {totalLeadsCount}
            </div>
            <div className="text-xs text-emerald-600 font-medium flex items-center space-x-1">
              <span>+{newLeadsCount} uncontacted leads</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#EBE6DD] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#78716C] uppercase tracking-wider font-mono">
              <span>Consultations Booked</span>
              <Calendar className="w-4 h-4 text-[#B89569]" />
            </div>
            <div className="text-3xl sm:text-4xl font-serif font-light text-[#1C1917]">
              {scheduledCount}
            </div>
            <div className="text-xs text-[#78716C]">
              Next slot: In-Person Mayfair Studio
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#EBE6DD] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#78716C] uppercase tracking-wider font-mono">
              <span>Ongoing Commissions</span>
              <FolderKanban className="w-4 h-4 text-[#B89569]" />
            </div>
            <div className="text-3xl sm:text-4xl font-serif font-light text-[#1C1917]">
              {wonCount + 4}
            </div>
            <div className="text-xs text-[#78716C]">
              In active construction &amp; millwork
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#EBE6DD] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#78716C] uppercase tracking-wider font-mono">
              <span>Active Pipeline Value</span>
              <DollarSign className="w-4 h-4 text-[#B89569]" />
            </div>
            <div className="text-3xl sm:text-4xl font-serif font-light text-[#B89569]">
              $2.45M
            </div>
            <div className="text-xs text-[#78716C]">
              High-value residential scope
            </div>
          </div>
        </div>

        {/* CRM Navigation Tabs */}
        <div className="w-full overflow-x-auto no-scrollbar border-b border-[#EBE6DD] pb-4">
          <div className="flex items-center space-x-2 whitespace-nowrap min-w-max">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                activeTab === 'leads'
                  ? 'bg-[#1C1917] text-white shadow'
                  : 'text-[#78716C] hover:text-[#1C1917] bg-white sm:bg-transparent border sm:border-0 border-[#EBE6DD]'
              }`}
            >
              Leads &amp; Enquiries ({filteredLeads.length})
            </button>
            <button
              onClick={() => setActiveTab('consultations')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                activeTab === 'consultations'
                  ? 'bg-[#1C1917] text-white shadow'
                  : 'text-[#78716C] hover:text-[#1C1917] bg-white sm:bg-transparent border sm:border-0 border-[#EBE6DD]'
              }`}
            >
              Consultation Agenda ({consultations.length})
            </button>
            <button
              onClick={() => setActiveTab('quotations')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                activeTab === 'quotations'
                  ? 'bg-[#1C1917] text-white shadow'
                  : 'text-[#78716C] hover:text-[#1C1917] bg-white sm:bg-transparent border sm:border-0 border-[#EBE6DD]'
              }`}
            >
              Proposals &amp; Quotations ({quotations.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Leads & Enquiries */}
        {activeTab === 'leads' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Leads List (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EBE6DD] shadow-sm overflow-hidden flex flex-col">
              
              {/* Filter bar */}
              <div className="p-4 sm:p-5 border-b border-[#EBE6DD] flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#FBF9F5]">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-[#A8A29E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, city, style..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#EBE6DD] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Filter className="w-3.5 h-3.5 text-[#78716C]" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 rounded-xl bg-white border border-[#EBE6DD] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">New Only</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Consultation Scheduled">Consultation Scheduled</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              {/* Leads List Items */}
              <div className="divide-y divide-[#F5F2EC] max-h-[600px] overflow-y-auto">
                {filteredLeads.map((lead) => {
                  const isSelected = selectedLead?.id === lead.id;
                  return (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`p-5 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#FBF9F5] border-l-4 border-[#C5A880]'
                          : 'hover:bg-[#FBF9F5]/70'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-serif text-lg font-medium text-[#1C1917]">
                            {lead.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#A8A29E]">
                            {lead.city}
                          </span>
                        </div>

                        <div className="text-xs text-[#78716C] flex flex-wrap items-center gap-2">
                          <span>{lead.propertyType}</span>
                          <span>•</span>
                          <span>{lead.area}</span>
                          <span>•</span>
                          <span className="text-[#1C1917] font-medium font-mono">{lead.budgetRange}</span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        <span
                          className={`text-[10px] uppercase font-mono px-2.5 py-1 rounded-full font-medium ${
                            lead.status === 'New'
                              ? 'bg-amber-100 text-amber-800'
                              : lead.status === 'Consultation Scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : lead.status === 'Won'
                              ? 'bg-emerald-100 text-emerald-800'
                              : lead.status === 'Proposal Sent'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-zinc-100 text-zinc-700'
                          }`}
                        >
                          {lead.status}
                        </span>
                        <span className="text-[10px] text-[#A8A29E] font-mono">
                          {lead.createdAt}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Selected Lead Details & Actions (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EBE6DD] shadow-sm p-6 sm:p-8 space-y-6 sticky top-28">
              {selectedLead ? (
                <>
                  <div className="flex items-center justify-between border-b border-[#EBE6DD] pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B89569]">
                        Lead Dossier: {selectedLead.id}
                      </span>
                      <h3 className="text-2xl font-serif font-light text-[#1C1917]">
                        {selectedLead.name}
                      </h3>
                    </div>

                    <button
                      onClick={() => setShowScheduleModal(true)}
                      className="px-3.5 py-1.5 rounded-full bg-[#1C1917] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#2C2825] flex items-center space-x-1 shadow"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Book Slot</span>
                    </button>
                  </div>

                  {/* Status Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                      Pipeline Stage
                    </label>
                    <select
                      value={selectedLead.status}
                      onChange={(e) => onUpdateLeadStatus(selectedLead.id, e.target.value as LeadItem['status'])}
                      className="w-full p-2.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="New">New Lead</option>
                      <option value="Contacted">Contacted via Phone/WhatsApp</option>
                      <option value="Consultation Scheduled">Consultation Scheduled</option>
                      <option value="Proposal Sent">Proposal &amp; BOQ Sent</option>
                      <option value="Won">Won / Project Commenced</option>
                      <option value="Lost">Lost / Archived</option>
                    </select>
                  </div>

                  {/* Contact Info Table */}
                  <div className="space-y-2.5 text-xs bg-[#FBF9F5] p-4 rounded-2xl border border-[#EBE6DD]">
                    <div className="flex items-center space-x-2 text-[#57534E]">
                      <Phone className="w-4 h-4 text-[#B89569] flex-shrink-0" />
                      <a href={`tel:${selectedLead.phone}`} className="hover:underline text-[#1C1917] font-medium">
                        {selectedLead.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-[#57534E]">
                      <Mail className="w-4 h-4 text-[#B89569] flex-shrink-0" />
                      <a href={`mailto:${selectedLead.email}`} className="hover:underline text-[#1C1917]">
                        {selectedLead.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-[#57534E]">
                      <MapPin className="w-4 h-4 text-[#B89569] flex-shrink-0" />
                      <span>{selectedLead.city}</span>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#FBF9F5] rounded-xl border border-[#EBE6DD]">
                      <span className="text-[#A8A29E] block text-[10px] uppercase">Property</span>
                      <span className="font-medium text-[#1C1917]">{selectedLead.propertyType}</span>
                    </div>
                    <div className="p-3 bg-[#FBF9F5] rounded-xl border border-[#EBE6DD]">
                      <span className="text-[#A8A29E] block text-[10px] uppercase">Area</span>
                      <span className="font-medium text-[#1C1917]">{selectedLead.area}</span>
                    </div>
                    <div className="p-3 bg-[#FBF9F5] rounded-xl border border-[#EBE6DD]">
                      <span className="text-[#A8A29E] block text-[10px] uppercase">Budget Scope</span>
                      <span className="font-medium text-[#1C1917] font-mono">{selectedLead.budgetRange}</span>
                    </div>
                    <div className="p-3 bg-[#FBF9F5] rounded-xl border border-[#EBE6DD]">
                      <span className="text-[#A8A29E] block text-[10px] uppercase">Preferred Style</span>
                      <span className="font-medium text-[#1C1917]">{selectedLead.preferredStyle}</span>
                    </div>
                  </div>

                  {/* Client Requirements Text */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#A8A29E] font-medium">
                      Client Brief Notes
                    </span>
                    <p className="text-xs text-[#57534E] bg-[#FBF9F5] p-3 rounded-xl border border-[#EBE6DD] italic">
                      &ldquo;{selectedLead.requirements}&rdquo;
                    </p>
                  </div>

                  {/* Studio Internal Notes */}
                  <div className="space-y-2 border-t border-[#EBE6DD] pt-4">
                    <span className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                      Private Studio Notes
                    </span>
                    
                    {selectedLead.notes && selectedLead.notes.length > 0 ? (
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {selectedLead.notes.map((note, i) => (
                          <div key={i} className="text-xs p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/60 text-[#44403C]">
                            {note}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-[#A8A29E] italic">No internal notes yet.</div>
                    )}

                    <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Add note for design team..."
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        className="flex-1 p-2 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#1C1917] text-white text-xs uppercase font-medium hover:bg-[#2C2825]"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-[#A8A29E]">Select a lead to inspect details</div>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Scheduled Consultations */}
        {activeTab === 'consultations' && (
          <div className="bg-white rounded-3xl border border-[#EBE6DD] shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE6DD] pb-6">
              <div>
                <h3 className="text-2xl font-serif font-light text-[#1C1917]">
                  Consultation Calendar &amp; Sessions
                </h3>
                <p className="text-xs text-[#78716C]">
                  Confirmed design meetings with principal architects.
                </p>
              </div>

              <span className="text-xs font-mono text-[#B89569] uppercase tracking-wider">
                Syncs with Google Calendar / Office365
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultations.map((c) => (
                <div key={c.id} className="p-6 rounded-2xl bg-[#FBF9F5] border border-[#EBE6DD] space-y-4 shadow-sm hover:border-[#C5A880] transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#1C1917] text-[#C5A880]">
                      {c.mode}
                    </span>
                    <span className="text-xs text-emerald-700 font-medium">
                      {c.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-xl font-medium text-[#1C1917]">{c.clientName}</h4>
                    <div className="text-xs text-[#78716C]">{c.propertyType}</div>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#57534E] border-t border-[#EBE6DD] pt-3 font-mono">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-[#B89569]" />
                      <span>{c.date} at {c.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#B89569]" />
                      <span>Architect: {c.assignedArchitect}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Proposals & Quotations */}
        {activeTab === 'quotations' && (
          <div className="bg-white rounded-3xl border border-[#EBE6DD] shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE6DD] pb-6">
              <div>
                <h3 className="text-2xl font-serif font-light text-[#1C1917]">
                  Generated Quotations &amp; BOQ Estimates
                </h3>
                <p className="text-xs text-[#78716C]">
                  Itemized architectural pricing summaries issued to prospective clients.
                </p>
              </div>

              <span className="text-xs font-mono text-[#B89569] uppercase tracking-wider">
                Digital Signature Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quotations.map((q) => (
                <div key={q.id} className="p-6 rounded-2xl bg-[#FBF9F5] border border-[#EBE6DD] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B89569]">{q.id}</span>
                      <h4 className="font-serif text-xl font-medium text-[#1C1917]">{q.clientName}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-serif text-[#1C1917] font-light">${q.totalAmount.toLocaleString()}</div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">{q.status}</span>
                    </div>
                  </div>

                  <div className="text-xs text-[#78716C] font-mono">
                    Scope: {q.scope} • Valid until {q.validUntil}
                  </div>

                  <div className="border-t border-[#EBE6DD] pt-3 space-y-1 text-xs">
                    {q.breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-[#57534E]">
                        <span>{item.item}</span>
                        <span className="font-mono text-[#1C1917]">${item.cost.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Consultation Modal */}
        {showScheduleModal && selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#EBE6DD] space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B89569]">
                  Schedule Studio Consultation
                </span>
                <h3 className="font-serif text-2xl font-light text-[#1C1917]">
                  {selectedLead.name}
                </h3>
              </div>

              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                    Session Date
                  </label>
                  <input
                    type="date"
                    value={consultDate}
                    onChange={(e) => setConsultDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-xs text-[#1C1917]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                    Time Slot
                  </label>
                  <input
                    type="time"
                    value={consultTime}
                    onChange={(e) => setConsultTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-xs text-[#1C1917]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                    Meeting Format
                  </label>
                  <select
                    value={consultMode}
                    onChange={(e) => setConsultMode(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-xs text-[#1C1917]"
                  >
                    <option value="In-Person Studio">In-Person Mayfair Studio</option>
                    <option value="Site Visit">On-Site Property Walkthrough</option>
                    <option value="Virtual Video">Virtual Video Consultation</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#A8A29E] font-medium block">
                    Assign Principal
                  </label>
                  <select
                    value={consultArchitect}
                    onChange={(e) => setConsultArchitect(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DD] text-xs text-[#1C1917]"
                  >
                    <option value="Marcus Sterling (Principal)">Marcus Sterling (Principal)</option>
                    <option value="Elena Vance (Design Director)">Elena Vance (Design Director)</option>
                    <option value="Julian Ross (Senior Architect)">Julian Ross (Senior Architect)</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4 border-t border-[#EBE6DD]">
                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(false)}
                    className="flex-1 py-3 rounded-full border border-[#EBE6DD] text-xs uppercase font-medium text-[#78716C] hover:bg-[#F5F2EC]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-full bg-[#1C1917] text-white text-xs uppercase font-medium hover:bg-[#2C2825]"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
