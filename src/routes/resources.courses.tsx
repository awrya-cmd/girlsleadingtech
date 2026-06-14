import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlassCard } from "@/components/site/GlassCard";
import { courses } from "@/data/resources";
import { ExternalLink } from "lucide-react";
import coursesMascot from "@/assets/characters/courses.png";
import paperClip from "@/assets/stickers/paper-clip.png";
import star from "@/assets/stickers/star.png";

export const Route = createFileRoute("/resources/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Girls Leading Tech" },
      { name: "description", content: "The best free and paid courses to level up your tech skills." },
    ],
  }),
  component: CoursesPage,
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

function CoursesPage() {
  const domains = Array.from(new Set(courses.map((i) => i.category)));
  const [activeDomain, setActiveDomain] = useState<string>(domains[0] || "");
  const activeItems = courses.filter((i) => i.category === activeDomain);

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
            <div className="absolute top-0 left-0 right-0 h-10 bg-[#ffed95] border-b-2 border-black flex items-center justify-between px-4 rounded-t-[22px] select-none z-10">
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
              src={paperClip}
              alt="Paper Clip Sticker"
              className="absolute -top-9 left-[12%] w-14 rotate-[15deg] pointer-events-none z-20 select-none transition-transform hover:scale-105"
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
                  RESOURCES / COURSES
                </p>
                <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  Curated <span className="italic font-medium text-[#5b2b4a] font-serif">learning paths.</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
                  Free and paid courses we've vetted to help you go from beginner to job-ready.
                </p>
              </div>
              
              {/* Layout Spacer on Desktop */}
              <div className="hidden md:block w-[180px] lg:w-[240px] shrink-0" />
            </div>

            {/* Mascot Overlap for Desktop */}
            <div className="hidden md:block absolute right-6 lg:right-12 bottom-[-24px] w-[210px] lg:w-[270px] z-20 animate-float">
              <img
                src={coursesMascot}
                alt="Courses Mascot"
                className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(217,85,164,0.25)]"
              />
            </div>

            {/* Mascot Centered for Mobile */}
            <div className="md:hidden flex justify-center mt-6 w-44 mx-auto z-20 animate-float">
              <img
                src={coursesMascot}
                alt="Courses Mascot"
                className="w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(217,85,164,0.2)]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* DOMAIN FILTERS */}
      <section className="relative z-10 px-6 pb-10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setActiveDomain(domain)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer
                  ${
                    activeDomain === domain
                      ? "bg-[#4B57A8] text-white"
                      : "bg-white text-gray-700 hover:bg-[#ffc8e3]/40"
                  }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP TIMELINE SECTION */}
      <section className="relative z-10 container mx-auto max-w-5xl px-6 pb-24 pt-4">
        <div className="relative pl-8 md:pl-16 space-y-8">
          
          {/* Vertical Timeline Path */}
          <div className="absolute left-[20px] md:left-[36px] top-6 bottom-6 w-0 border-l-2 border-dashed border-black z-0 opacity-40" />
          
          <AnimatePresence mode="popLayout">
            {activeItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="relative z-10"
              >
                {/* Custom Retro Step Marker */}
                <div className="absolute -left-[41px] md:-left-[61px] top-5 h-6 w-6 rounded-full bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center z-20">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#d955a4]" />
                </div>

                <GlassCard
                  strong
                  className="group relative overflow-hidden bg-[#fffdf9]/95 border-2 border-black rounded-[20px] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:-translate-x-0.5 hover:shadow-[8px_8px_0px_0px_#d955a4] hover:bg-[#fffdf9] flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex-1">
                    <span className="inline-block rounded-full bg-pink-100 text-pink-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                      Step {idx + 1}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold leading-tight text-gray-900 group-hover:text-[#d955a4] transition-colors">
                      {item.title}
                    </h3>
                    {item.author && (
                      <p className="mt-1 text-xs font-semibold text-secondary">
                        by {item.author}
                      </p>
                    )}
                    {item.description && (
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {item.link && (
                    <div className="shrink-0">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#4B57A8] border-2 border-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                      >
                        Start Course
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>

        </div>
      </section>
    </div>
  );
}
