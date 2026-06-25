import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { team, mentors, speakers, contributors, volunteers } from "@/data/community";
import { cn } from "@/lib/utils";
import { Linkedin, MapPin, Building2, Search, X, Users, Mic, GraduationCap, Star, Heart } from "lucide-react";
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.cdnfonts.com/css/satoshi');
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
        <div className="relative z-10 container mx-auto max-w-6xl px-6 mt-14  md:mt-16">
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

          {/* Search + filter bar */}
          <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-4 sm:flex-row w-full">
            <div className="relative flex-1 w-full">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search by name${tab === "speakers" || tab === "mentors" ? ", company or designation" : ""}…`}
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
        </div>
      </section>

      {/* MEMBER GRID LISTS */}
      <section className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 pt-8 pb-10 md:pb-12 md:pt-24 md:pb-12 bg-card/40 border-y border-[#d955a4]/10 overflow-hidden animate-fade-up">
      

        <div className="relative z-10 container mx-auto max-w-6xl px-6">
          {tab === "team" ? (
            <TeamShowcase filteredTeam={filteredTeam} />
          ) : tab === "speakers" ? (
            <>
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
            </>
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
