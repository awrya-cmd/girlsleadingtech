import type { Speaker, Event, TeamMember, Mentor, Partner, Testimonial, PersonToFollow, Resource } from "./types";
import { realEvents } from "./events-real";

export const speakers: Speaker[] = [
  { id: "1", name: "Aarushi Sharma", designation: "Senior SDE", company: "Microsoft" },
  { id: "2", name: "Riya Patel", designation: "Product Manager", company: "Google" },
  { id: "3", name: "Sneha Iyer", designation: "ML Engineer", company: "Adobe" },
  { id: "4", name: "Priya Nair", designation: "Engineering Lead", company: "Atlassian" },
  { id: "5", name: "Ananya Gupta", designation: "Founder", company: "Lumen Labs" },
  { id: "6", name: "Mehak Verma", designation: "Staff Engineer", company: "Stripe" },
  { id: "7", name: "Tara Bhatia", designation: "Data Scientist", company: "Netflix" },
  { id: "8", name: "Ishita Roy", designation: "Security Engineer", company: "Cloudflare" },
];

export const events: Event[] = realEvents.length ? realEvents : [
  {
    id: "evt-001",
    title: "Breaking into Big Tech — Mock Interview Workshop",
    date: "2026-05-18",
    duration: "90 min",
    speakerName: "Aarushi Sharma",
    speakerDesignation: "Senior SDE",
    speakerCompany: "Microsoft",
    summary: "A live workshop walking through behavioural and DSA rounds with real feedback.",
    status: "upcoming",
    registrationLink: "#",
  },
  {
    id: "evt-002",
    title: "From Student to Founder — Building Lumen Labs",
    date: "2026-05-25",
    duration: "60 min",
    speakerName: "Ananya Gupta",
    speakerDesignation: "Founder",
    speakerCompany: "Lumen Labs",
    summary: "An honest conversation about founding journeys, fundraising and building teams.",
    status: "upcoming",
    registrationLink: "#",
  },
  {
    id: "evt-003",
    title: "ML Engineering in Production",
    date: "2026-06-08",
    duration: "75 min",
    speakerName: "Sneha Iyer",
    speakerDesignation: "ML Engineer",
    speakerCompany: "Adobe",
    summary: "Real-world MLOps, model monitoring and the messy parts no tutorial covers.",
    status: "upcoming",
    registrationLink: "#",
  },
  {
    id: "evt-101",
    title: "Designing for Delight — A PM's Playbook",
    date: "2026-03-12",
    duration: "60 min",
    speakerName: "Riya Patel",
    speakerDesignation: "Product Manager",
    speakerCompany: "Google",
    summary: "How to think like a PM and ship products people love.",
    status: "past",
    youtubeLink: "https://youtube.com/@girlsleadingtech",
  },
  {
    id: "evt-102",
    title: "The Engineering Leadership Track",
    date: "2026-02-20",
    duration: "60 min",
    speakerName: "Priya Nair",
    speakerDesignation: "Engineering Lead",
    speakerCompany: "Atlassian",
    summary: "From IC to manager — what changes, what stays the same, and what nobody warns you about.",
    status: "past",
    youtubeLink: "https://youtube.com/@girlsleadingtech",
  },
  {
    id: "evt-103",
    title: "Cloud Security 101",
    date: "2026-01-15",
    duration: "75 min",
    speakerName: "Ishita Roy",
    speakerDesignation: "Security Engineer",
    speakerCompany: "Cloudflare",
    summary: "Threat models, zero trust and how to build security into your daily workflow.",
    status: "past",
    youtubeLink: "https://youtube.com/@girlsleadingtech",
  },
];

export const getEvent = (id: string) => events.find((e) => e.id === id);

export const team: TeamMember[] = [
  { id: "t1", name: "Manik", role: "Operations", city: "Delhi", state: "DL" },
  { id: "t2", name: "Laxmi", role: "Events", city: "Bangalore", state: "KA" },
  { id: "t3", name: "Priyanka", role: "Resources", city: "Mumbai", state: "MH" },
  { id: "t4", name: "Meghali", role: "Outreach", city: "Pune", state: "MH" },
  { id: "t5", name: "Rwitama", role: "Speakers", city: "Kolkata", state: "WB" },
  { id: "t6", name: "Keshvi", role: "Research", city: "Ahmedabad", state: "GJ" },
  { id: "t7", name: "Priyesi", role: "Community", city: "Hyderabad", state: "TS" },
  { id: "t8", name: "Mudita", role: "Partnerships", city: "Chennai", state: "TN" },
  { id: "t9", name: "Suhani", role: "Design", city: "Jaipur", state: "RJ" },
  { id: "t10", name: "Riya", role: "Design", city: "Lucknow", state: "UP" },
];

export const mentors: Mentor[] = [
  { id: "m1", name: "Dr. Kavita Iyer", designation: "Director of Engineering", company: "Salesforce" },
  { id: "m2", name: "Sushmita Rao", designation: "VP Product", company: "Razorpay" },
  { id: "m3", name: "Anjali Mehra", designation: "Principal SDE", company: "Amazon" },
  { id: "m4", name: "Pooja Sinha", designation: "Founder & CEO", company: "BloomTech" },
  { id: "m5", name: "Devika Nair", designation: "Staff ML", company: "Meta" },
  { id: "m6", name: "Sara Kapoor", designation: "Engineering Manager", company: "Shopify" },
];

export const contributors: TeamMember[] = [
  { id: "c1", name: "Naina Reddy", city: "Hyderabad", state: "TS" },
  { id: "c2", name: "Aditi Joshi", city: "Pune", state: "MH" },
  { id: "c3", name: "Simran Kaur", city: "Chandigarh", state: "PB" },
  { id: "c4", name: "Tanvi Shah", city: "Surat", state: "GJ" },
  { id: "c5", name: "Kriti Bansal", city: "Delhi", state: "DL" },
  { id: "c6", name: "Ria Menon", city: "Kochi", state: "KL" },
];

export const partners: Partner[] = [
  { id: "p1", name: "Devfolio", type: "community" },
  { id: "p2", name: "Polygon", type: "community" },
  { id: "p3", name: "GitHub Education", type: "community" },
  { id: "p4", name: "Replit", type: "community" },
  { id: "p5", name: "Major League Hacking", type: "community" },
  { id: "p6", name: "Lovable", type: "community" },
  { id: "p7", name: "Postman", type: "community" },
  { id: "p8", name: "Linode", type: "community" },
];

export const testimonials: Testimonial[] = [
  {
    id: "ts1",
    quote: "GLT didn't just open doors — it built bridges. I went from intimidated to interviewing at FAANG in under a year.",
    name: "Anushka R.",
    role: "SDE Intern, Microsoft",
  },
  {
    id: "ts2",
    quote: "Finding a community of women who genuinely cheer for each other changed my entire career trajectory.",
    name: "Bhavna S.",
    role: "ML Engineer, Adobe",
  },
  {
    id: "ts3",
    quote: "The speakers, the mentors, the late-night hackathon energy — GLT feels like home for builders.",
    name: "Charvi P.",
    role: "Final-year CSE student",
  },
  {
    id: "ts4",
    quote: "I shipped my first open-source PR after a Code at Christmas session. Now I maintain three repos.",
    name: "Devika N.",
    role: "Open Source Contributor",
  },
];

export const peopleToFollow: PersonToFollow[] = [
  { id: "pf1", name: "Andrew Ng", domain: "AI / ML", linkedin: "https://www.linkedin.com/in/andrewyng/", summary: "Co-founder of Coursera and DeepLearning.AI. One of the most influential voices in modern AI." },
  { id: "pf2", name: "Naval Ravikant", domain: "Finance & Business", twitter: "https://x.com/naval", summary: "AngelList founder. Sharp essays on wealth, leverage and the long game." },
  { id: "pf3", name: "Sam Altman", domain: "AI / Startups", twitter: "https://x.com/sama", summary: "CEO of OpenAI. Pragmatic takes on building startups and the future of AI." },
  { id: "pf4", name: "Reshma Saujani", domain: "Women in Tech", linkedin: "https://www.linkedin.com/in/reshmasaujani/", summary: "Founder of Girls Who Code. Author and tireless advocate for girls in STEM." },
  { id: "pf5", name: "Cassidy Williams", domain: "Frontend / DevRel", twitter: "https://x.com/cassidoo", summary: "Engineer, educator and one of the warmest voices in frontend." },
  { id: "pf6", name: "Kelsey Hightower", domain: "DevOps / Cloud", twitter: "https://x.com/kelseyhightower", summary: "Kubernetes legend. Generous teacher of distributed systems." },
  { id: "pf7", name: "Lex Fridman", domain: "AI / Podcasts", twitter: "https://x.com/lexfridman", summary: "MIT researcher and podcaster exploring AI, science and life." },
  { id: "pf8", name: "Lenny Rachitsky", domain: "Product", linkedin: "https://www.linkedin.com/in/lennyrachitsky/", summary: "Ex-Airbnb PM running the most-read product newsletter on the internet." },
  { id: "pf9", name: "Fei-Fei Li", domain: "AI / ML", linkedin: "https://www.linkedin.com/in/fei-fei-li-4541247/", summary: "Stanford AI lab co-director. Pioneer of computer vision and ImageNet." },
  { id: "pf10", name: "Tracy Chou", domain: "Engineering / Founders", twitter: "https://x.com/triketora", summary: "Founder of Block Party. Vocal advocate for diversity in tech." },
  { id: "pf11", name: "Sahil Lavingia", domain: "Indie Founders", twitter: "https://x.com/shl", summary: "Founder of Gumroad. Honest writing on indie founding and creative work." },
  { id: "pf12", name: "Anthony Fu", domain: "Open Source", twitter: "https://x.com/antfu7", summary: "Vue/Vite/UnoCSS core team. Prolific open-source maintainer." },
];

export const placeholderResources: Record<string, Resource[]> = {
  articles: [],
  videos: [],
  courses: [],
  books: [],
  communities: [],
  roadmaps: [],
  "interview-prep": [],
  certifications: [],
};
