import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import { team, mentors, speakers, contributors, volunteers, testimonials } from "@/data/community";
import { cn } from "@/lib/utils";
import { Linkedin, MapPin, Building2, Search, X, Users, Mic, GraduationCap, Star, Heart, Briefcase, Layers, Network, Sparkles } from "lucide-react";
import TeamShowcase from "@/components/site/TeamShowcase";
import MemberProfileCard from "@/components/site/MemberProfileCard";
import DotBackground from "@/components/shared/DotBackground";
import humansSectionMascot from "@/assets/characters/humans-section.png";
import heartSticker from "@/assets/stickers/heart.png";
import starSticker from "@/assets/stickers/star.png";
import washiTapeSticker from "@/assets/stickers/washi-tape.png";
import smileySticker from "@/assets/stickers/smiley.png";
import paperPlaneSticker from "@/assets/stickers/paper-plane.png";


function SideGlow() {
  return (
    <>
      {/* LEFT */}
      <div
        className="
          pointer-events-none
          absolute left-[-12%] top-[-10%]
          h-[120%] w-[50vw] md:w-[35vw]
          blur-3xl
          opacity-90
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,120,180,0.28) 0%, rgba(255,170,210,0.12) 45%, transparent 75%)",
        }}
      />

      {/* RIGHT */}
      <div
        className="
          pointer-events-none
          absolute right-[-12%] top-[-10%]
          h-[120%] w-[35vw]
          blur-3xl
          opacity-90
        "
        style={{
          background:
            "radial-gradient(circle, rgba(240,120,255,0.24) 0%, rgba(255,180,230,0.10) 45%, transparent 75%)",
        }}
      />

      {/* CENTER CREAM GLOW */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-[18rem]
          w-[90vw]
          md:h-[28rem]
          md:w-[50rem]
          -translate-x-1/2 -translate-y-1/2
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,190,0.28), transparent 72%)",
        }}
      />
    </>
  );
}

export const Route = createFileRoute("/humans")({
  head: () => ({ meta: [{ title: "Humans — Girls Leading Tech" }, { name: "description", content: "The team, mentors, speakers and contributors behind Girls Leading Tech." }] }),
  component: HumansPage,
});

type Tab = "team" | "speakers" | "mentors" | "contributors" | "volunteers";

function matches(q: string, ...fields: (string | undefined)[]) {
  if (!q) return true;
  const needle = q.toLowerCase();
  return fields.some((f) => f && f.toLowerCase().includes(needle));
}

const companyDomains: Record<string, string> = {
  "google": "google.com",
  "microsoft": "microsoft.com",
  "amazon": "amazon.com",
  "uber": "uber.com",
  "adobe": "adobe.com",
  "salesforce": "salesforce.com",
  "paypal": "paypal.com",
  "morgan stanley": "morganstanley.com",
  "flipkart": "flipkart.com",
  "jio": "jio.com",
};

const sortedCompanies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Uber",
  "Adobe",
  "Salesforce",
  "PayPal",
  "Morgan Stanley",
  "Flipkart",
  "Jio",
  "Startups",
];

function getCompanyLogoUrl(companyName: string): string | null {
  if (!companyName) return null;
  const clean = companyName.trim().toLowerCase();
  let domain = companyDomains[clean];
  if (!domain) {
    const slug = clean.replace(/[^a-z0-9]/g, "");
    domain = `${slug}.com`;
  }
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}


function HumansPage() {
  const [tab, setTab] = useState<Tab>("team");
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState<string>("all");

  const tabs: { id: Tab; label: string; icon: React.ComponentType<any> }[] = [
    { id: "team", label: "Team", icon: Users },
    { id: "speakers", label: "Speakers", icon: Mic },
    { id: "mentors", label: "Mentors", icon: GraduationCap },
    { id: "contributors", label: "Contributors", icon: Star },
    { id: "volunteers", label: "Volunteers", icon: Heart },
  ];

  // Build company list for current tab (speakers + mentors)
  const companies = useMemo(() => {
    let pool: string[] = [];
    if (tab === "speakers") pool = speakers.map((s) => s.company).filter(Boolean) as string[];
    if (tab === "mentors") pool = mentors.map((m) => m.company).filter(Boolean) as string[];
    return Array.from(new Set(pool)).sort();
  }, [tab]);

  const filteredSpeakers = useMemo(
    () => speakers.filter((s) =>
      matches(query, s.name, s.company, s.designation) &&
      (company === "all" || s.company === company),
    ),
    [query, company],
  );
  const filteredMentors = useMemo(
    () => mentors.filter((m) =>
      matches(query, m.name, m.company, m.designation) &&
      (company === "all" || m.company === company),
    ),
    [query, company],
  );
  const filteredTeam = useMemo(
    () => team.filter((t) => matches(query, t.name, t.role, t.city, t.state)),
    [query],
  );
  const filteredContribs = useMemo(
    () => contributors.filter((c) => matches(query, c.name, c.city, c.state)),
    [query],
  );
  const filteredVolunteers = useMemo(
    () => volunteers.filter((v) => matches(query, v.name, v.city, v.state)),
    [query],
  );

  const showCompanyFilter = tab === "speakers" || tab === "mentors";

  const searchBarRef = useRef<HTMLDivElement>(null);
  const scrollToSearch = () => {
    searchBarRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Speakers Showcase helper computations
  const totalSpeakers = speakers.length;
  const totalCompaniesCount = "30+";

  const domainBreakdown = useMemo(() => {
    const domainsConfig = [
      {
        name: "Software Engineering",
        icon: Briefcase,
        keywords: ["swe", "sde", "software", "developer", "engineering", "frontend", "backend", "full stack", "fullstack", "web", "graphics"],
        desc: "Full-stack development, mobile apps, core systems, and frontend frameworks."
      },
      {
        name: "AI & Machine Learning",
        icon: Layers,
        keywords: ["ml", "machine learning", "ai", "deepmind", "nlp", "computer vision", "data scientist", "data science", "data analyst", "research scientist"],
        desc: "Neural networks, data analytics, predictive modeling, and large language models."
      },
      {
        name: "Product & Design",
        icon: Users,
        keywords: ["product", "ux", "design", "pm", "researcher", "content", "writer"],
        desc: "User experience, user research, product management, and creative writing."
      },
      {
        name: "Startups & Leadership",
        icon: Network,
        keywords: ["founder", "co-founder", "co-founder", "co founder", "cto", "ceo", "director", "manager", "lead", "principle", "president"],
        desc: "Venture building, technical strategy, engineering leadership, and growth."
      },
      {
        name: "Open Source & Hackathons",
        icon: GraduationCap,
        keywords: ["gsoc", "outreachy", "lfx", "ambassador", "community", "volunteers", "mentee", "scholar", "fellow", "winner", "hackathon"],
        desc: "Global open-source programs, student tech cohorts, and developer relations."
      }
    ];

    return domainsConfig.map((d) => {
      const count = speakers.filter((s) => {
        const text = `${s.designation || ""} ${s.company || ""}`.toLowerCase();
        return d.keywords.some((kw) => text.includes(kw));
      }).length;
      return { ...d, count };
    });
  }, []);

  const engineersCount = useMemo(() => {
    return speakers.filter((s) => {
      const text = `${s.designation || ""} ${s.company || ""}`.toLowerCase();
      return ["engineer", "swe", "sde", "developer"].some((k) => text.includes(k));
    }).length;
  }, []);
  const engineersPct = Math.round((engineersCount / speakers.length) * 100);

  const foundersCount = useMemo(() => {
    return speakers.filter((s) => {
      const text = `${s.designation || ""} ${s.company || ""}`.toLowerCase();
      return ["founder", "co-founder", "co founder", "cto", "ceo", "director", "lead"].some((k) => text.includes(k));
    }).length;
  }, []);
  const foundersPct = Math.round((foundersCount / speakers.length) * 100);

  const googleCount = useMemo(() => {
    return speakers.filter((s) => {
      const text = `${s.company || ""}`.toLowerCase();
      return text.includes("google");
    }).length;
  }, []);
  const googlePct = Math.round((googleCount / speakers.length) * 100);

  const winnersCount = useMemo(() => {
    return speakers.filter((s) => {
      const text = `${s.designation || ""} ${s.company || ""}`.toLowerCase();
      return ["winner", "scholar", "hackathon", "ambassador", "gsoc"].some((k) => text.includes(k));
    }).length;
  }, []);
  const winnersPct = Math.round((winnersCount / speakers.length) * 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.cdnfonts.com/css/satoshi');
        footer {
          margin-top: 0 !important;
        }
      `}</style>
      {/* HERO, CATEGORY TABS AND SEARCH SECTION */}
      <section className="relative overflow-hidden bg-[#FFFBF7] pt-16 md:pt-24 pb-16">
        {/* Background glow layers */}
        <SideGlow />

        <div className="relative z-10 container mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            
            {/* Mascot on Left */}
            <div className="order-2 md:order-none md:col-span-5 flex justify-center items-center relative">
              {/* Star Sticker */}
              <img
                src={starSticker}
                alt="Star Sticker"
                className="absolute -top-4 -left-4 w-10 h-10 object-contain rotate-[-15deg] pointer-events-none select-none z-20"
              />
              {/* Smiley Sticker */}
              <img
                src={smileySticker}
                alt="Smiley Sticker"
                className="absolute -bottom-6 -right-6 w-12 h-12 object-contain rotate-[10deg] pointer-events-none select-none z-20"
              />
              <img
                src={humansSectionMascot}
                alt="Girls Leading Tech Mascot"
                className="w-56 sm:w-64 md:w-full h-auto object-contain select-none pointer-events-none"
                style={{
                  filter: "drop-shadow(0 12px 24px rgba(217, 85, 164, 0.15))",
                }}
              />
            </div>

            {/* Dialog/Speech Box Container on Right */}
            <div className="order-1 md:order-none md:col-span-7 relative w-full">
              {/* Heart Badge overlapping top-right */}
              <div className="absolute -top-6 -right-3 h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center border border-pink-100 z-20 select-none pointer-events-none">
                <img src={heartSticker} alt="Heart Sticker" className="h-8 w-8 object-contain" />
              </div>


              {/* Main Dialog Box */}
              <div className="relative bg-white/80 backdrop-blur-md border border-[#d955a4]/20 rounded-3xl p-8 md:p-12 shadow-[0_15px_50px_rgba(217,85,164,0.12)]">
                {/* Curved Speech Bubble Tail pointing down-left */}
                <div className="absolute top-full left-[25%] md:left-[20%] w-6 h-5 -mt-[1px] pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 20 0 Q 18 14 0 20 Q 10 12 8 0 Z" fill="#FFF8EF" />
                    <path d="M 20 0 Q 18 14 0 20 Q 10 12 8 0" stroke="rgba(217, 85, 164, 0.2)" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>

                {/* Content */}
                <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#d955a4] font-extrabold mb-3 font-sans" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  HUMANS
                </p>

                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight text-gray-900 font-sans mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  The Faces Behind the{" "}
                  <span className="italic font-medium text-[#5b2b4a] block sm:inline-block font-sans" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Magic.
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-sans" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  Every profile here represents a <span className="text-[#0047FF] font-black">story</span>, a <span className="text-[#ff7828] font-black">spark</span>, and a <span className="text-[#d955a4] font-black">ripple</span> of change.
                </p>

                {/* Sparkle icon at bottom-right of dialog box */}
                <div className="absolute bottom-4 right-4 text-[#d955a4]">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C12 7.97 16.03 12 21 12C16.03 12 12 16.03 12 21C12 16.03 7.97 12 3 12C7.97 12 12 7.97 12 3Z" />
                  </svg>
                </div>
              </div>

              {/* paper plane */}
              <div className="absolute left-[1%] md:left-[1%] lg:left-[2%] bottom-[-165px] w-[420px] h-[180px] pointer-events-none hidden md:block z-0">
                
                <img
                  src={paperPlaneSticker}
                  alt="Paper Plane"
                  className=" absolute
                              right-0
                              bottom-0
                              w-52
                              lg: w-80
                              h-auto
                              object-contain
                              rotate-[8deg]
                              select-none
                              pointer-events-none"
                />
              </div>  
            </div>

          </div>
        </div>

        {/* Category Cards & Search bar inside the same wrapper */}
        <div className="relative z-10 container mx-auto max-w-6xl px-6 mt-14 md:mt-16">
          {/* Category Tabs Section */}
          <div className="mx-auto w-full max-w-2xl border border-[#d955a4]/15 bg-white/50 backdrop-blur-md rounded-none p-1 flex flex-row overflow-x-auto items-center justify-between [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {tabs.map((t, index) => {
              const isActive = tab === t.id;
              const Icon = t.icon;
              return (
                <div key={t.id} className="flex flex-row items-center gap-1 flex-grow justify-center">
                  {index > 0 && <div className="h-6 w-[1px] bg-pink-100/40 shrink-0" />}
                  <button
                    onClick={() => { setTab(t.id); setCompany("all"); }}
                    className={cn(
                      "flex flex-row items-center gap-2 px-5 py-2.5 rounded-none text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 w-full justify-center md:w-auto",
                      isActive
                        ? "bg-gradient-to-r from-[#d955a4] to-[#922b6c] text-white shadow-soft"
                        : "text-gray-600 hover:text-[#d955a4] hover:bg-pink-50/30"
                    )}
                  >
                    <Icon className={cn("h-4.5 w-4.5 transition-colors duration-300", isActive ? "text-white" : "text-[#d955a4]")} />
                    <span>{t.label}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Search Shortcut Button (ONLY FOR SPEAKERS TAB) */}
          {tab === "speakers" && (
            <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center w-full animate-fade-up">
              <div 
                onClick={scrollToSearch}
                className="relative flex-1 w-full cursor-pointer"
              >
                <input
                  readOnly
                  placeholder="Search by name, company or designation…"
                  className="w-full cursor-pointer rounded-2xl border border-[#d955a4]/15 bg-[#FFFBF7]/80 backdrop-blur pl-5 pr-12 py-3.5 text-sm shadow-sm outline-none transition focus:border-[#d955a4]/40"
                />
                <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c83d90]" />
              </div>
            </div>
          )}

          {/* Search + filter bar */}
          {tab !== "speakers" && (
            <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-4 sm:flex-row w-full">
              <div className="relative flex-1 w-full">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search by name${tab === "mentors" ? ", company or designation" : ""}…`}
                  className="w-full rounded-2xl border border-[#d955a4]/15 bg-[#FFFBF7]/80 backdrop-blur pl-5 pr-12 py-3.5 text-sm shadow-sm outline-none transition focus:border-[#d955a4]/40 focus:ring-2 focus:ring-[#d955a4]/10"
                />
                {query ? (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#d955a4] hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c83d90]" />
                )}
              </div>
              {showCompanyFilter && (
                <select
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-2xl border border-[#d955a4]/15 bg-[#FFFBF7]/80 backdrop-blur px-5 py-3.5 text-sm shadow-sm outline-none transition focus:border-[#d955a4]/40 focus:ring-2 focus:ring-[#d955a4]/10 sm:w-auto cursor-pointer"
                >
                  <option value="all">All companies</option>
                  {companies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
      </section>

      {/* MEMBER GRID LISTS */}
      {tab === "speakers" ? (
        <>
          {/* SPEAKER SHOWCASE OVERVIEW WITH DOT BACKGROUND */}
          <section className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 py-16 md:py-24 overflow-hidden mt-0 bg-[#FFFBF7] animate-fade-up border-y-0">
            <DotBackground />

            <div className="relative z-10 container mx-auto max-w-6xl px-6">
              {/* SECTION 1 — SPEAKER NETWORK OVERVIEW */}
              <div className="text-center max-w-3xl mx-auto mb-12 mt-2 animate-fade-up">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#d955a4] font-black mb-3.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  ✦ Community Voices ✦
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-5" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  A Network of Industry Experts
                </h2>
                <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Girls Leading Tech has welcomed professionals across engineering, product, design, research, leadership, startups, and emerging technologies. <strong>{totalSpeakers} professionals</strong> have shared their experiences and career journeys with our community.
                </p>
              </div>

              {/* SECTION 2 — IMPACT METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16 px-2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                {[
                  { value: totalSpeakers, label: "Total Speakers", sub: "industry leaders", bg: "bg-[#ffeef2]" },
                  { value: totalCompaniesCount, label: "Companies Represented", sub: "global organizations", bg: "bg-[#e3f2fd]" },
                  { value: 5, label: "Tech Domains", sub: "expert areas", bg: "bg-[#fff9db]" },
                  { value: "120+", label: "Sessions Hosted", sub: "community workshops", bg: "bg-[#f3e8ff]" }
                ].map((stat, i) => (
                  <div key={i} className={cn("border-2 border-black rounded-[20px] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col justify-center transition-all hover:-translate-y-1", stat.bg)}>
                    <span className="text-3xl md:text-4xl font-black text-black" style={{ fontFamily: "'Satoshi', sans-serif" }}>{stat.value}</span>
                    <span className="text-xs font-extrabold text-black mt-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{stat.label}</span>
                    <span className="text-[10px] text-black/60 mt-0.5 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>{stat.sub}</span>
                  </div>
                ))}
              </div>

              {/* SECTION 3 — COMPANIES REPRESENTED */}
              <div className="text-center mb-6 max-w-2xl mx-auto mt-20 animate-fade-up" style={{ animationDelay: "0.15s" }}>
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  Professionals From Leading Organizations
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Our network includes speakers and mentors building at top tech firms, open source projects, and innovators worldwide.
                </p>
              </div>
              <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden py-6 mb-20 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FFFBF7] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FFFBF7] to-transparent z-10 pointer-events-none" />
                
                <div className="flex gap-4 animate-marquee whitespace-nowrap" style={{ animationDuration: "20s" }}>
                  {[...sortedCompanies, ...sortedCompanies, ...sortedCompanies, ...sortedCompanies].map((co, i) => {
                    if (co === "Startups") {
                      return (
                        <div
                          key={i}
                          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border-2 border-black bg-white text-gray-800 font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] select-none"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 p-1 border border-gray-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-5 h-5 text-gray-800"
                            >
                              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                              <polyline points="17 6 23 6 23 12" />
                            </svg>
                          </div>
                          <span>{co}</span>
                        </div>
                      );
                    }

                    const clean = co.trim().toLowerCase();
                    let domain = companyDomains[clean];
                    if (!domain) {
                      const slug = clean.replace(/[^a-z0-9]/g, "");
                      domain = `${slug}.com`;
                    }
                    const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
                    
                    return (
                      <div
                        key={i}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border-2 border-black bg-white text-gray-800 font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] select-none"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <img
                          src={logoUrl}
                          alt={`${co} logo`}
                          width={36}
                          height={36}
                          className="w-9 h-9 rounded-lg bg-white object-contain flex-shrink-0 p-1 border border-gray-100"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <span>{co}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 4 — EXPERTISE LANDSCAPE */}
              <div className="text-center mb-12 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.25s" }}>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  Insights Across Diverse Domains
                </h3>
                <p className="text-sm text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Find resources, career blueprints, and sessions filtered by our speaker domain landscape.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto mb-20 px-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                {domainBreakdown.map((domain, i) => {
                  const Icon = domain.icon;
                  const colors = [
                    { bg: "bg-[#ffeef2]" }, // pink
                    { bg: "bg-[#e3f2fd]" }, // blue
                    { bg: "bg-[#fff9db]" }, // yellow
                    { bg: "bg-[#f3e8ff]" }, // purple
                    { bg: "bg-[#e8f5e9]" }, // green
                  ];
                  const color = colors[i % colors.length];
                  
                  return (
                    <div key={i} className="flex flex-col items-center text-center p-2 group hover:-translate-y-1 transition-transform duration-300">
                      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:scale-110", color.bg)}>
                        <Icon className="w-7 h-7 text-black" />
                      </div>
                      <h4 
                        className="font-extrabold text-gray-900 text-base mb-2 font-sans h-12 flex items-center justify-center" 
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {domain.name}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed max-w-[200px]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                        {domain.desc}
                      </p>
                      <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-[#d955a4] bg-[#ffeef2] px-2.5 py-0.5 rounded-full border border-[#d955a4]/10">
                        {domain.count} Speakers
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* SECTION 5 — FEATURED SUMMARY */}
              <div className="max-w-5xl mx-auto bg-white border-2 border-black rounded-[24px] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-20 px-6 md:px-16 animate-fade-up" style={{ animationDelay: "0.35s" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <div className="lg:col-span-5 text-left">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffeef2] text-[#d955a4] font-bold text-xs uppercase tracking-wider mb-5">
                      <Sparkles className="w-3.5 h-3.5" /> Network Composition
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-5 leading-tight" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      Our Speaker Community
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Our guest speaker roster represents a curated mixture of experienced software engineers, startup operators, Google TalentSprint scholars, and winners of major hackathons. This balanced landscape delivers both deep technical mentorship and actionable career journeys.
                    </p>
                  </div>

                  <div className="lg:col-span-7 space-y-7 text-left">
                    {[
                      { label: "Software Engineers & Tech Architects", count: engineersCount, pct: engineersPct },
                      { label: "Startup Founders & Tech Executives", count: foundersCount, pct: foundersPct },
                      { label: "Googlers & Google Scholars", count: googleCount, pct: googlePct },
                      { label: "Hackathon Winners & Open Source Contributors", count: winnersCount, pct: winnersPct }
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm font-bold text-gray-800 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          <span>{item.label}</span>
                          <span className="text-[#d955a4]">{item.count} ({item.pct}%)</span>
                        </div>
                        <div className="w-full h-4 bg-gray-100 border-2 border-black rounded-full overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <div className="h-full bg-gradient-to-r from-[#ff8fab] via-[#d955a4] to-[#8a5bd6] rounded-full" style={{ width: `${item.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SPEAKER GALLERY GRID SECTION WITHOUT DOT BACKGROUND */}
          <section className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 pt-16 pb-12 overflow-hidden bg-[#FFFBF7] animate-fade-up border-y-0 mt-0">
            <div className="relative z-10 container mx-auto max-w-6xl px-6">
              {/* SECTION 6 — TRANSITION TO GALLERY */}
              <div ref={searchBarRef} className="pt-2 pb-6 max-w-3xl mx-auto text-center animate-fade-up">
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  Explore Our Speaker Network
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Browse all {totalSpeakers} speakers and discover professionals from different industries, domains, and career journeys. Use the search bar below to filter by name, company, or designation.
                </p>
              </div>

              {/* Relocated Search Bar */}
              <div className="mx-auto mb-16 flex max-w-2xl flex-col items-center gap-4 sm:flex-row w-full z-20 relative px-2 animate-fade-up">
                <div className="relative flex-1 w-full">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, company or designation…"
                    className="w-full rounded-2xl border border-[#d955a4]/15 bg-[#FFFBF7]/80 backdrop-blur pl-5 pr-12 py-3.5 text-sm shadow-sm outline-none transition focus:border-[#d955a4]/40 focus:ring-2 focus:ring-[#d955a4]/10 text-gray-800 placeholder:text-gray-400"
                  />
                  {query ? (
                    <button
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#d955a4] hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : (
                    <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c83d90]" />
                  )}
                </div>
                <select
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-2xl border border-[#d955a4]/15 bg-[#FFFBF7]/80 backdrop-blur px-5 py-3.5 text-sm shadow-sm outline-none transition focus:border-[#d955a4]/40 focus:ring-2 focus:ring-[#d955a4]/10 sm:w-auto cursor-pointer text-gray-800"
                >
                  <option value="all">All companies</option>
                  {companies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* GRID */}
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredSpeakers.map((s, i) => (
                  <MemberProfileCard
                    key={s.id}
                    name={s.name}
                    role={s.designation}
                    location={s.company}
                    locationType="company"
                    delay={i}
                    linkedin={s.linkedin}
                    image={s.image}
                  />
                ))}
              </div>

              {/* Empty state */}
              {filteredSpeakers.length === 0 && (
                <p className="mt-12 text-center text-sm text-muted-foreground">
                  No matches. Try a different search.
                </p>
              )}
            </div>
          </section>
        </>
      ) : (
        <section className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 py-16 md:py-24 bg-card/40 border-y border-[#d955a4]/10 overflow-hidden mt-8 animate-fade-up">
          <DotBackground />

          <div className="relative z-10 container mx-auto max-w-6xl px-6">
            {tab === "team" ? (
              <TeamShowcase filteredTeam={filteredTeam} />
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {tab === "mentors" &&
                    filteredMentors.map((m, i) => (
                      <MemberProfileCard
                        key={m.id}
                        name={m.name}
                        role={m.designation}
                        location={m.company}
                        locationType="company"
                        delay={i}
                        linkedin={m.linkedin}
                        image={m.image}
                      />
                    ))}
                  {tab === "contributors" &&
                    filteredContribs.map((m, i) => (
                      <MemberProfileCard
                        key={m.id}
                        name={m.name}
                        location={m.city && m.state ? `${m.city}, ${m.state}` : m.city || m.state}
                        locationType="location"
                        delay={i}
                        linkedin={m.linkedin}
                        image={m.image}
                      />
                    ))}
                  {tab === "volunteers" &&
                    filteredVolunteers.map((m, i) => (
                      <MemberProfileCard
                        key={m.id}
                        name={m.name}
                        location={m.city && m.state ? `${m.city}, ${m.state}` : m.city || m.state}
                        locationType="location"
                        delay={i}
                        linkedin={m.linkedin}
                        image={m.image}
                      />
                    ))}
                </div>

                {/* Empty state */}
                {((tab === "mentors" && filteredMentors.length === 0) ||
                  (tab === "contributors" && filteredContribs.length === 0) ||
                  (tab === "volunteers" && filteredVolunteers.length === 0)) && (
                  <p className="mt-12 text-center text-sm text-muted-foreground">
                    No matches. Try a different search.
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}

function PersonCard({
  name,
  sub,
  location,
  kind,
  delay = 0,
  linkedin,
  image,
}: {
  name: string;
  sub?: string;
  location?: string;
  kind: "location" | "company";
  delay?: number;
  linkedin?: string;
  image?: string;
}) {
  const Icon = kind === "company" ? Building2 : MapPin;
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <article
      className="group relative animate-fade-up overflow-hidden rounded-3xl bg-card ring-1 ring-border/60 shadow-soft transition-all duration-700 hover:-translate-y-2 hover:shadow-lavender"
      style={{ animationDelay: `${(delay % 12) * 0.05}s` }}
    >
      {/* Portrait */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-muted via-pink-soft/10 to-lavender/10">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:rotate-1"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-6xl text-primary/40">
            {initials}
          </div>
        )}

        {/* Gradient veil at bottom for legibility on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Social pills — top right */}
        {linkedin && (
          <div className="absolute right-3 top-3">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#0A66C2] backdrop-blur-md ring-1 ring-white/70 transition hover:bg-[#0A66C2] hover:text-white"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="relative px-5 pb-5 pt-4 bg-card/80 backdrop-blur-md">
        <h3 className="font-display text-lg leading-tight tracking-tight">{name}</h3>
        {sub && (
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
            {sub}
          </p>
        )}
        {location && (
          <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground line-clamp-1">
            <Icon className="h-3.5 w-3.5 shrink-0" /> {location}
          </p>
        )}
      </div>
    </article>
  );
}
