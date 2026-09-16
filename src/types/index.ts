export interface ServiceItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'turnkey' | 'specialized';
  description: string;
  deliverables: string[];
  imageUrl: string;
  tag: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client?: string;
  location: string;
  category: 'Residential' | 'Villas' | 'Apartments' | 'Commercial' | 'Hospitality';
  style: string;
  area: string;
  year: string;
  shortDescription: string;
  concept: string;
  scopeOfWork: string[];
  materialsUsed: { name: string; type: string; color: string }[];
  images: string[];
  beforeImage?: string;
  afterImage?: string;
}

export interface DesignStyle {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  keyElements: string[];
  colorPalette: string[];
  imageUrl: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: string;
  description: string;
  texture: string;
  imageUrl: string;
  origin: string;
}

export interface PackageItem {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  recommendedFor: string;
  features: string[];
  popular?: boolean;
}

export type LeadStatus =
  | 'New Enquiry'
  | 'Contacted'
  | 'Consultation Scheduled'
  | 'Site Visit'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Confirmed'
  | 'Project Completed'
  | 'Lost';

export interface LeadItem {
  id: string;
  name?: string;
  clientName: string;
  phone: string;
  email: string;
  city: string;
  propertyType: string;
  area?: string;
  propertySize?: string;
  projectScope?: string;
  requirements?: string;
  budgetRange?: string;
  estimatedBudget?: string;
  preferredStyle?: string;
  timeline?: string;
  status: LeadStatus | string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string[];
  assignedDesigner?: string;
  source?: string;
  floorPlanUploaded?: boolean;
  createdAt: string;
  nextFollowUp?: string;
}

export interface ConsultationItem {
  id: string;
  leadId?: string;
  clientName: string;
  propertyType?: string;
  contactNumber?: string;
  appointmentType?: string;
  mode?: string;
  date: string;
  time?: string;
  timeSlot?: string;
  location?: string;
  assignedArchitect?: string;
  assignedDesigner?: string;
  status: string;
  projectContext?: string;
}

export interface QuotationLineItem {
  id: string;
  item: string;
  description?: string;
  category?: string;
  cost?: number;
  amount?: number;
}

export interface QuotationItem {
  id: string;
  quotationNumber?: string;
  clientName: string;
  propertyDetails?: string;
  scope?: string;
  date?: string;
  validUntil?: string;
  totalAmount: number;
  items?: QuotationLineItem[];
  breakdown: { item: string; cost: number }[];
  taxPercentage?: number;
  discountPercentage?: number;
  notes?: string;
  status: 'Draft' | 'Sent' | 'Approved' | 'Declined' | string;
}

export type Quotation = QuotationItem;

export interface ActiveProject {
  id: string;
  projectName: string;
  clientName: string;
  propertyType: string;
  stage: 'Design & 3D Approval' | 'Material Procurement' | 'Civil & Fit-out' | 'Finishing & Styling' | 'Handover Preparation';
  progressPercentage: number;
  totalBudget: number;
  amountReceived: number;
  targetCompletionDate: string;
  leadArchitect: string;
}
