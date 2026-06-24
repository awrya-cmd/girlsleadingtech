import { createFileRoute } from "@tanstack/react-router";
import { useState as _useStateSearch } from "react";
import { ResourceSearchBar, filterBySearch } from "@/components/site/ResourceSearchBar";
import { GlassCard } from "@/components/site/GlassCard";
import { peopleToFollow } from "@/data/community";
import { Linkedin, Twitter, Globe } from "lucide-react";
import { BackToResources } from "@/components/site/PageHeader";
import peopleMascot from "@/assets/characters/people.png";
import washiTape from "@/assets/stickers/washi-tape.png";
import star from "@/assets/stickers/star.png";

export const Route = createFileRoute("/resources/people")({
  head: () => ({
    meta: [
      { title: "People to Follow — Girls Leading Tech" },
      { name: "description", content: "Influential voices in tech worth following." },
    ],
  }),
  component: PeoplePage,
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

function PeoplePage() {
  const [_q, _setQ] = _useStateSearch("");
  const _filtered = filterBySearch(peopleToFollow, _q, ["title","name","description","summary","author","provider","organisedBy","company","role","domain","category","categories","benefit","eligibility","keywords"]);
  return (
    <div className="relative w-full min-h-screen bg-[#fef9f4] overflow-hidden">
      <GridBackground />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');`}</style>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');`}</style>

      {/* HERO BANNER SECTION */}
      <section className="relative pt-32 pb-12 px-6 z-10">
        <div className="container mx-auto max-w-6xl relative">
          <BackToResources />
          
          {/* Main Hero Card Container */}
          <div className="relative bg-[#FFF8EF] border-2 border-black rounded-[24px] pt-16 pb-8 px-6 md:pt-20 md:pb-12 md:px-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-visible">
            
            {/* Top Bar Window control */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-[#ffc8e3] border-b-2 border-black flex items-center justify-between px-4 rounded-t-[22px] select-none z-10">
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
                  RESOURCES / PEOPLE TO FOLLOW
                </p>
                <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  Voices <span className="italic font-medium text-[#5b2b4a] font-serif">worth following.</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
                  Curated thought leaders shaping the future of tech, AI, and business.
                </p>
              </div>
              
              {/* Layout Spacer on Desktop */}
              <div className="hidden md:block w-[180px] lg:w-[240px] shrink-0" />
            </div>

            {/* Mascot Overlap for Desktop */}
            <div className="hidden md:block absolute right-6 lg:right-12 bottom-[-24px] w-[210px] lg:w-[270px] z-20 animate-float">
              <img
                src={peopleMascot}
                alt="People Mascot"
                className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(217,85,164,0.25)]"
              />
            </div>

            {/* Mascot Centered for Mobile */}
            <div className="md:hidden flex justify-center mt-6 w-44 mx-auto z-20 animate-float">
              <img
                src={peopleMascot}
                alt="People Mascot"
                className="w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(217,85,164,0.2)]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* CARDS SECTION */}
      <section className="relative z-10 container mx-auto max-w-6xl px-6 pb-24 pt-4">
        <ResourceSearchBar value={_q} onChange={_setQ} placeholder="Search people..." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {_filtered.map((p, i) => (
            <GlassCard
              strong
              key={p.id}
              className="group h-full bg-[#fffdf9]/95 border-2 border-black rounded-[20px] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:-translate-x-0.5 hover:shadow-[8px_8px_0px_0px_#d955a4] hover:bg-[#fffdf9] flex flex-col justify-between"
              style={{ animationDelay: `${(i % 9) * 0.05}s` }}
            >
              <div>
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-[#ffed95] text-2xl font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    {p.image ? (
                      <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      p.name.charAt(0)
                    )}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-display text-lg font-bold leading-tight text-gray-900 group-hover:text-[#d955a4] transition-colors">
                      {p.name}
                    </h3>
                    <span className="mt-2 inline-block rounded-full bg-pink-100 text-pink-700 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                      {p.domain}
                    </span>
                  </div>
                </div>
                {p.summary && (
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {p.summary}
                  </p>
                )}
              </div>

              <div className="mt-5 flex gap-2 pt-3 border-t border-gray-100/50">
                {p.linkedin && (
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffc8e3] active:translate-y-0 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {p.twitter && (
                  <a
                    href={p.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffc8e3] active:translate-y-0 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {p.portfolio && (
                  <a
                    href={p.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffc8e3] active:translate-y-0 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
        <p className="mt-12 text-center text-sm font-semibold text-muted-foreground">
          More voices being curated by our team — check back soon.
        </p>
      </section>
    </div>
  );
}
