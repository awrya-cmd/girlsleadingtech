import { createFileRoute } from "@tanstack/react-router";
import { useState as _useStateSearch } from "react";
import { ResourceSearchBar, filterBySearch } from "@/components/site/ResourceSearchBar";
import { GlassCard } from "@/components/site/GlassCard";
import { scholarships } from "@/data/scholarships";
import { ExternalLink, Calendar, Award, Users } from "lucide-react";
import scholarshipsMascot from "@/assets/characters/scholarships.png";
import washiTape from "@/assets/stickers/washi-tape.png";
import star from "@/assets/stickers/star.png";

export const Route = createFileRoute("/resources/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships — Girls Leading Tech" },
      { name: "description", content: "Hand-picked scholarships and funding opportunities for women in tech." },
    ],
  }),
  component: ScholarshipsPage,
});

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* LEFT GLOW */}
      <div
        className="absolute left-[-12%] top-[-10%] h-[120%] w-[35vw] blur-3xl opacity-80"
        style={{
          background: "radial-gradient(circle, rgba(255,120,180,0.28), transparent 75%)",
        }}
      />

      {/* RIGHT GLOW */}
      <div
        className="absolute right-[-12%] top-[-10%] h-[120%] w-[35vw] blur-3xl opacity-80"
        style={{
          background: "radial-gradient(circle, rgba(240,120,255,0.24), transparent 75%)",
        }}
      />

      {/* CENTER CREAM GLOW */}
      <div
        className="absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,240,190,0.28), transparent 72%)",
        }}
      />

      {/* GRID LAYER */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217, 85, 164, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217, 85, 164, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

function ScholarshipsPage() {
  const [_q, _setQ] = _useStateSearch("");
  const _filtered = filterBySearch(scholarships, _q, ["title","name","description","summary","author","provider","organisedBy","company","role","domain","category","categories","benefit","eligibility","keywords"]);
  return (
    <div className="relative w-full min-h-screen bg-[#fef9f4] overflow-hidden">
      <GridBackground />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');`}</style>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');`}</style>

      {/* HERO BANNER SECTION */}
      <section className="relative pt-32 pb-12 px-6 z-10">
        <div className="container mx-auto max-w-6xl relative">
          
          {/* Main Hero Card Container */}
          <div className="relative bg-[#FFF8EF] border-2 border-black rounded-[24px] pt-16 pb-8 px-6 md:pt-20 md:pb-12 md:px-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-visible">
            
            {/* Top Bar Window control */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-[#7EB5A6] border-b-2 border-black flex items-center justify-between px-4 rounded-t-[22px] select-none z-10">
              <div className="flex gap-1.5">
                {["#FF8FAB", "#d955a4", "#f0b158"].map((c, i) => (
                  <span key={i} className="w-2.5 h-2.5 rounded-full border border-black" style={{ background: c }} />
                ))}
              </div>
              <span className="font-['Press_Start_2P',monospace] text-[9px] text-black tracking-wider uppercase opacity-80">
                ★ RESOURCE CENTER ★
              </span>
              <div className="w-12" />
            </div>

            {/* Overlapping Stickers */}
            <img
              src={washiTape}
              alt="Washi Tape Sticker"
              className="absolute -top-7 left-[30%] w-28 rotate-[-3deg] pointer-events-none z-20 select-none transition-transform hover:scale-105"
            />
            <img
              src={star}
              alt="Star Sticker"
              className="absolute -top-7 -right-4 w-12 rotate-[15deg] pointer-events-none z-20 select-none transition-transform hover:scale-110"
            />

            {/* Soft decorative inner glow */}
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#ffed95]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col-reverse md:flex-row items-center md:items-stretch justify-between gap-8 md:gap-12 relative z-10">
              
              {/* Heading Content */}
              <div className="flex-1 text-center md:text-left flex flex-col justify-center animate-fade-up">
                <p
                  className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#d955a4] font-bold mb-4 opacity-80"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  RESOURCES / SCHOLARSHIPS
                </p>
                <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  Scholarships <span className="italic font-medium text-[#5b2b4a] font-serif">worth your shot.</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
                  {scholarships.length} curated programs across India and globally — opening doors with funding, mentorship and networks.
                </p>
              </div>
              
              {/* Layout Spacer on Desktop */}
              <div className="hidden md:block w-[180px] lg:w-[240px] shrink-0" />
            </div>

            {/* Mascot Overlap for Desktop */}
            <div className="hidden md:block absolute right-6 lg:right-12 bottom-[-24px] w-[210px] lg:w-[270px] z-20 animate-float">
              <img
                src={scholarshipsMascot}
                alt="Scholarships Mascot"
                className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(217,85,164,0.25)]"
              />
            </div>

            {/* Mascot Centered for Mobile */}
            <div className="md:hidden flex justify-center mt-6 w-44 mx-auto z-20 animate-float">
              <img
                src={scholarshipsMascot}
                alt="Scholarships Mascot"
                className="w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(217,85,164,0.2)]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* CARDS SECTION */}
      <section className="relative z-10 container mx-auto max-w-6xl px-6 pb-24 pt-4">
        <ResourceSearchBar value={_q} onChange={_setQ} placeholder="Search scholarships..." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {_filtered.map((s, i) => (
            <a
              key={s.id}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block animate-fade-up group"
              style={{ animationDelay: `${(i % 6) * 0.05}s` }}
            >
              <GlassCard
                strong
                className="h-full bg-[#fffdf9]/95 border-2 border-black rounded-[20px] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:-translate-x-0.5 hover:shadow-[8px_8px_0px_0px_#d955a4] hover:bg-[#fffdf9] cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-bold leading-tight text-gray-900 group-hover:text-[#d955a4] transition-colors">
                      {s.title}
                    </h3>
                  </div>
                  
                  <span className="mt-2.5 inline-block rounded-full bg-pink-100 text-pink-700 px-2.5 py-0.5 text-[11px] font-semibold">
                    {s.provider}
                  </span>

                  <div className="mt-4 space-y-3 text-[13px]">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 text-[#d955a4]">
                        <Award className="h-4 w-4 shrink-0" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>Benefit</p>
                        <p className="mt-0.5 text-foreground/80 font-medium leading-tight">{s.benefit}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 text-secondary">
                        <Users className="h-4 w-4 shrink-0" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>Eligibility</p>
                        <p className="mt-0.5 text-muted-foreground font-medium leading-tight">{s.eligibility}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-white/95 border border-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700 shadow-xs">
                      <Calendar className="h-3 w-3 text-[#d955a4]" /> Open Date: {s.openDate}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100/50">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#d955a4] flex items-center gap-1.5 group-hover:text-[#d955a4] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Apply Now
                      <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </GlassCard>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
