export interface Timestamp {
  time: string;
  title: string;
}
export interface Speaker {
  id: string;
  name: string;
  designation: string;
  company: string;
  linkedin?: string;
  image?: string;
}
export interface Event {
  id: string;
  title: string;
  date: string; // ISO
  duration?: string;
  youtubeLink?: string;
  registrationLink?: string;
  attendees?: number;
  speakerName?: string;
  speakerLinkedin?: string;
  speakerDesignation?: string;
  speakerCompany?: string;
  speakers?: Speaker[];
  posterImage?: string;
  summary?: string;
  status: "upcoming" | "past" | "ongoing";
  category?: string;
  timestamps?: Timestamp[];
}
export interface Scholarship {
  id: string;
  title: string;
  link: string;
  provider: string;
  benefit: string;
  eligibility: string;
  openDate: string;
  keywords?: string[];
}
export interface Hackathon {
  id: string;
  name: string;
  link: string;
  organisedBy: string;
  benefit: string;
  eligibility: string;
  duration: string;
  openDate: string;
  keywords?: string[];
}
export interface Resource {
  id: string;
  title: string;
  category: string;
  link?: string;
  author?: string;
  authorLinkedin?: string;
  description?: string;
  image?: string;
  keywords?: string[];
}
export interface PersonToFollow {
  id: string;
  name: string;
  domain: string;
  linkedin?: string;
  linkedinImage?: string;
  twitter?: string;
  instagram?: string;
  portfolio?: string;
  summary?: string;
  image?: string;
}
export interface TeamMember {
  id: string;
  name: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  city?: string;
  state?: string;
  role?: string;
  description?: string; // what they've contributed to the community — shown on card hover
  status?: "current" | "past"; // defaults to "current" if not set
}
export interface Mentor extends TeamMember {
  designation: string;
  company: string;
}
export interface Initiative {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  url?: string;
  color: "pink" | "lavender" | "peach" | "rose" | "violet";
  icon?: string;
}
export interface Partner {
  id: string;
  name: string;
  logo?: string;
  url?: string;
  type: "community" | "sponsor";
}
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  image?: string;
}