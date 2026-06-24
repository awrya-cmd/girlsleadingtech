import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Search, X } from "lucide-react";
import { allResources, UnifiedResource } from "@/data/searchIndex";
import { GlassCard } from "@/components/site/GlassCard";
import star from "@/assets/stickers/star.png";
import washiTape from "@/assets/stickers/washi-tape.png";
import paperClip from "@/assets/stickers/paper-clip.png";
import smiley from "@/assets/stickers/smiley.png";
import book from "@/assets/stickers/book.png";
import briefcase from "@/assets/stickers/briefcase.png";
import certificate from "@/assets/stickers/certificate.png";
import chatBubble from "@/assets/stickers/chat-bubble.png";
import checklist from "@/assets/stickers/checklist.png";
import communityStar from "@/assets/stickers/community-sticker.png";
import compass from "@/assets/stickers/compass.png";
import crown from "@/assets/stickers/crown.png";
import graduationCap from "@/assets/stickers/graduation-cap.png";
import newspaper from "@/assets/stickers/newspaper.png";
import trophy from "@/assets/stickers/trophy.png";
import videoPlayBtn from "@/assets/stickers/video-play-button.png";
import designerIdle from "@/assets/characters/designer/idle.png";
import communityIdle from "@/assets/characters/community-girl/idle.png";
import pixelBtn from "@/assets/pixel-button.png";
import GridBackground from "@/components/shared/GridBackground";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources — Girls Leading Tech" },
      { name: "description", content: "Curated scholarships, hackathons, courses, articles, books and more for women in tech." },
    ],
  }),
  component: ResourcesHub,
});

const categories = [
  {
    to: "/resources/scholarships",
    label: "SCHOLARSHIPS",
    tagline: "Fund your future.",
    desc: "Curated grants and fellowships for women breaking into tech.",
    bar: "bg-[#7EB5A6]", taglineColor: "text-[#2F5D50]", cta: "bg-[#7EB5A6] hover:bg-[#6BA393]", rotate: "-rotate-2",
    stickers: [
      <img key="s1" src={graduationCap} className="absolute -top-8 right-4 w-16 rotate-[12deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/hackathons",
    label: "HACKATHONS",
    tagline: "Build. Compete. Win.",
    desc: "The best hackathons to test your skills and come home with prizes.",
    bar: "bg-[#FF8A5B]", taglineColor: "text-[#A64B28]", cta: "bg-[#FF8A5B] hover:bg-[#F67848]", rotate: "rotate-2",
    stickers: [
      <img key="s1" src={trophy} className="absolute -top-8 right-4 w-16 rotate-[-10deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/programs",
    label: "PROGRAMS",
    tagline: "Cohorts that change careers.",
    desc: "Fellowships and bootcamps to level up fast with other women in tech.",
    bar: "bg-[#D8B4E8]", taglineColor: "text-[#7B4F92]", cta: "bg-[#D8B4E8] hover:bg-[#C89DDB]", rotate: "-rotate-1",
    stickers: [
      <img key="s1" src={checklist} className="absolute -top-8 right-4 w-16 rotate-[8deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/courses",
    label: "COURSES",
    tagline: "Learn at your own pace.",
    desc: "Hand-picked learning paths from beginner to advanced, free and paid.",
    bar: "bg-[#A9B7FF]", taglineColor: "text-[#4B57A8]", cta: "bg-[#A9B7FF] hover:bg-[#95A5F5]", rotate: "rotate-1",
    stickers: [
      <img key="s1" src={book} className="absolute -top-8 right-4 w-16 rotate-[-12deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/tools",
    label: "TOOLS",
    tagline: "The stack we swear by.",
    desc: "Every tool and app that women in our community actually use daily.",
    bar: "bg-[#FFD166]", taglineColor: "text-[#996600]", cta: "bg-[#FFD166] hover:bg-[#F0C040]", rotate: "-rotate-2",
    stickers: [
      <img key="s1" src={briefcase} className="absolute -top-8 right-4 w-16 rotate-[10deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/articles",
    label: "ARTICLES",
    tagline: "Reading worth your time.",
    desc: "Essays and deep-dives on tech, careers and women in the industry.",
    bar: "bg-[#7EB5A6]", taglineColor: "text-[#2F5D50]", cta: "bg-[#7EB5A6] hover:bg-[#6BA393]", rotate: "rotate-2",
    stickers: [
      <img key="s1" src={newspaper} className="absolute -top-8 right-4 w-16 rotate-[-8deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/videos",
    label: "VIDEOS",
    tagline: "Watch and learn.",
    desc: "Talks and tutorials that inspire and educate — picked by the community.",
    bar: "bg-[#FF8A5B]", taglineColor: "text-[#A64B28]", cta: "bg-[#FF8A5B] hover:bg-[#F67848]", rotate: "-rotate-1",
    stickers: [
      <img key="s1" src={videoPlayBtn} className="absolute -top-8 right-4 w-16 rotate-[12deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/books",
    label: "BOOKS",
    tagline: "Pages that changed us.",
    desc: "Books our community keeps recommending — from memoirs to technical deep-dives.",
    bar: "bg-[#A9B7FF]", taglineColor: "text-[#4B57A8]", cta: "bg-[#A9B7FF] hover:bg-[#95A5F5]", rotate: "rotate-2",
    stickers: [
      <img key="s1" src={book} className="absolute -top-8 right-4 w-16 rotate-[-10deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/role-models",
    label: "ROLE MODELS",
    tagline: "Women leading the way.",
    desc: "Indian women building and leading across every corner of tech.",
    bar: "bg-[#D8B4E8]", taglineColor: "text-[#7B4F92]", cta: "bg-[#D8B4E8] hover:bg-[#C89DDB]", rotate: "-rotate-2",
    stickers: [
      <img key="s1" src={crown} className="absolute -top-8 right-4 w-16 rotate-[8deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/people",
    label: "PEOPLE TO FOLLOW",
    tagline: "Voices worth your feed.",
    desc: "Creators and founders worth following for daily doses of insight.",
    bar: "bg-[#FFD166]", taglineColor: "text-[#996600]", cta: "bg-[#FFD166] hover:bg-[#F0C040]", rotate: "rotate-1",
    stickers: [
      <img key="s1" src={chatBubble} className="absolute -top-8 right-4 w-16 rotate-[-12deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/communities",
    label: "COMMUNITIES",
    tagline: "Find your tribe.",
    desc: "Discords, groups and spaces where women in tech gather and grow.",
    bar: "bg-[#7EB5A6]", taglineColor: "text-[#2F5D50]", cta: "bg-[#7EB5A6] hover:bg-[#6BA393]", rotate: "-rotate-1",
    stickers: [
      <img key="s1" src={communityStar} className="absolute -top-8 right-4 w-16 rotate-[10deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/roadmaps",
    label: "ROADMAPS",
    tagline: "Your career, mapped out.",
    desc: "Step-by-step playbooks for every tech role — built for women starting or pivoting.",
    bar: "bg-[#FF8A5B]", taglineColor: "text-[#A64B28]", cta: "bg-[#FF8A5B] hover:bg-[#F67848]", rotate: "rotate-2",
    stickers: [
      <img key="s1" src={compass} className="absolute -top-8 right-4 w-16 rotate-[-8deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/interview-prep",
    label: "INTERVIEW PREP",
    tagline: "Ace it. Every time.",
    desc: "DSA, system design and negotiation — everything you need to land the offer.",
    bar: "bg-[#A9B7FF]", taglineColor: "text-[#4B57A8]", cta: "bg-[#A9B7FF] hover:bg-[#95A5F5]", rotate: "-rotate-2",
    stickers: [
      <img key="s1" src={checklist} className="absolute -top-8 right-4 w-16 rotate-[12deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/certifications",
    label: "CERTIFICATIONS",
    tagline: "Validate your skills.",
    desc: "The certifications that actually matter — cloud, data, security and more.",
    bar: "bg-[#D8B4E8]", taglineColor: "text-[#7B4F92]", cta: "bg-[#D8B4E8] hover:bg-[#C89DDB]", rotate: "rotate-1",
    stickers: [
      <img key="s1" src={certificate} className="absolute -top-8 right-4 w-16 rotate-[-10deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
];

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[-&\/,\.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getSearchResults(query: string) {
  const normQuery = normalize(query);
  if (!normQuery) return [];

  const queryWords = normQuery.split(" ").filter(Boolean);

  return allResources
    .map((res) => {
      const normTitle = normalize(res.title);
      const normDescription = normalize(res.description);
      const normAuthor = normalize(res.author || "");
      const normCategoryName = normalize(res.categoryName);
      const normCategorySlug = normalize(res.categorySlug);
      const normKeywords = res.keywords.map(normalize);

      let score = 0;
      let matchesAllWords = true;

      for (const word of queryWords) {
        let wordMatched = false;

        if (normTitle.includes(word)) {
          score += 100;
          wordMatched = true;
        }
        if (normKeywords.some((kw) => kw.includes(word))) {
          score += 80;
          wordMatched = true;
        }
        if (normCategoryName.includes(word) || normCategorySlug.includes(word)) {
          score += 60;
          wordMatched = true;
        }
        if (normDescription.includes(word)) {
          score += 40;
          wordMatched = true;
        }
        if (normAuthor.includes(word)) {
          score += 20;
          wordMatched = true;
        }

        if (!wordMatched) {
          matchesAllWords = false;
          break;
        }
      }

      return { res, score, matches: matchesAllWords };
    })
    .filter((item) => item.matches && item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.res);
}

function ResourcesHub() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 180);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredResources = getSearchResults(debouncedSearch);

  return (
    <div className="relative w-full min-h-screen bg-[#fef9f4] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/satoshi');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&display=swap');
      `}</style>

    
      {/* ── HERO ── */}
      <section className="relative z-10 pt-24 md:pt-32 px-6 overflow-hidden">
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none">
          <GridBackground />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
            <div className="flex-1">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#d955a4] font-black mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ✦ CURATED FOR YOU ✦
              </motion.p>

              {["Every", "resource", "you need."].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.1 }}
                    className={`font-black leading-[0.92] ${
                      i === 1 ? "italic font-semibold text-[#d955a4]" : "uppercase text-gray-900"
                    }`}
                    style={{
                      fontFamily: i === 1 ? "'Playfair Display', serif" : "'Satoshi','Montserrat',sans-serif",
                      fontSize: "clamp(3rem, 9vw, 7.5rem)",
                      letterSpacing: i === 1 ? "-0.01em" : "-0.025em",
                    }}
                  >
                    {word}
                  </motion.h1>
                </div>
              ))}

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-5 text-sm md:text-[15px] text-gray-500 max-w-sm leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Hand-picked. No fluff. Scholarships to roadmaps - all here for you.
              </motion.p>
            </div>

            <motion.img
              src={designerIdle} alt=""
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden md:block w-[180px] lg:w-[280px] object-contain pointer-events-none shrink-0 self-end"
            />
          </div>
        </div>
      </section>

      {/* ── CARDS ── */}
      <section className="relative z-10 py-4 md:py-6 px-6 bg-[#fef9f4]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-gray-400 font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              📌 pinned for you
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Search Bar */}
          <div className="mx-auto mb-20 flex justify-center w-full z-20 relative animate-fade-up"> 
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-12 py-3.5 rounded-full bg-white border border-pink-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[#d955a4]/50 focus:border-[#d955a4] transition-all text-sm text-gray-800 placeholder:text-gray-500"
                placeholder="Search anything (AWS, React, GSoC, ML, placements...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-black"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!debouncedSearch.trim() ? (
              <motion.div
                key="categories-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >

                {/* DESKTOP */}
                <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
                  {categories.map(({ to, label, tagline, desc, bar, taglineColor, cta, rotate, stickers }, idx) => (
                    <motion.div
                      key={to}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.12 }}
                      transition={{ duration: 0.5, delay: (idx % 4) * 0.08, type: "spring", stiffness: 70, damping: 14 }}
                      className={`relative overflow-visible ${rotate} hover:rotate-0 hover:scale-[1.03] transition-all duration-300`}
                      style={{ zIndex: 10 }}
                    >
                      <div className="relative bg-white ring-1 ring-black/5 shadow-xl flex flex-col overflow-visible">
                        {stickers}
                        <div className={`h-5 w-full ${bar}`} />
                        <div className="p-5 flex flex-col gap-2 flex-1">
                          <h3 className="text-lg lg:text-xl font-black uppercase leading-tight tracking-tight text-gray-900"
                            style={{ fontFamily: "'Satoshi','Montserrat',sans-serif" }}>
                            {label}
                          </h3>
                          <p className={`text-[10px] font-extrabold tracking-[0.01em] ${taglineColor}`}
                            style={{ fontFamily: "'Montserrat',sans-serif" }}>
                            {tagline}
                          </p>
                          <p className="mt-2 text-black leading-[1.9] line-clamp-3"
                            style={{ fontFamily: "'Press Start 2P',monospace", fontSize: "clamp(0.52rem,0.75vw,0.72rem)" }}>
                            {desc}
                          </p>
                          <Link to={to}
                            className={`mt-auto pt-3 inline-flex items-center gap-1.5 self-start rounded-full ${cta} px-4 py-2 text-xs font-bold text-white transition hover:scale-105`}>
                            Explore <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* MOBILE */}
                <div className="flex sm:hidden flex-col gap-10">
                  {categories.map(({ to, label, tagline, desc, bar, taglineColor, cta, stickers }) => (
                    <div key={to} className="relative overflow-visible bg-white shadow-lg ring-1 ring-black/5 flex flex-col">
                      {stickers}
                      <div className={`h-5 w-full ${bar}`} />
                      <div className="p-5 flex flex-col">
                        <h3 className="text-lg font-black uppercase leading-tight text-gray-900 pr-10"
                          style={{ fontFamily: "'Satoshi','Montserrat',sans-serif" }}>
                          {label}
                        </h3>
                        <p className={`mt-1 text-[10px] font-black uppercase tracking-[0.2em] ${taglineColor}`}
                          style={{ fontFamily: "'Montserrat',sans-serif" }}>
                          {tagline}
                        </p>
                        <p className="mt-3 text-sm text-gray-500 leading-relaxed"
                          style={{ fontFamily: "'Montserrat',sans-serif" }}>
                          {desc}
                        </p>
                        <Link to={to}
                          className={`mt-4 inline-flex items-center gap-1.5 rounded-full ${cta} px-4 py-2 text-xs font-bold text-white self-start transition hover:scale-105`}>
                          Explore <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="search-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {filteredResources.length === 0 ? (
                  <div className="text-center py-16 bg-white border-2 border-black rounded-[24px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 max-w-xl mx-auto animate-fade-up">
                    <p className="font-bold text-lg text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>No resources found.</p>
                    <p className="text-sm text-gray-500 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>We couldn't find anything matching your search. Try one of these popular topics:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["frontend", "machine learning", "internships", "gsoc", "interview", "scholarships"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearch(term)}
                          className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-black bg-white text-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredResources.map((res, i) => (
                      <div
                        key={`${res.categorySlug}-${res.id}`}
                        onClick={() => {
                          if (res.link) {
                            window.open(res.link, "_blank", "noopener,noreferrer");
                          }
                        }}
                        className="block animate-fade-up group cursor-pointer"
                        style={{ animationDelay: `${(i % 9) * 0.05}s` }}
                      >
                        <GlassCard
                          strong
                          className="h-full bg-[#fffdf9]/95 border-2 border-black rounded-[20px] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:-translate-x-0.5 hover:shadow-[8px_8px_0px_0px_#d955a4] hover:bg-[#fffdf9] flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-3">
                              {/* Category badge */}
                              <Link
                                to={`/resources/${res.categorySlug}` as any}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="rounded-full bg-[#ffc8e3] text-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider hover:bg-[#ffb4d7] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                              >
                                {res.categoryName}
                              </Link>
                              {res.link && <ArrowRight className="h-4 w-4 shrink-0 text-[#d955a4] opacity-0 group-hover:opacity-100 transition-opacity" />}
                            </div>

                            <h3 className="mt-3 font-display text-lg font-bold leading-tight text-gray-900 group-hover:text-[#d955a4] transition-colors line-clamp-2"
                              style={{ fontFamily: "'Satoshi','Montserrat',sans-serif" }}>
                              {res.title}
                            </h3>

                            {res.author && (
                              <p className="mt-1 text-xs font-semibold text-secondary" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                by {res.author}
                              </p>
                            )}

                            {res.description && (
                              <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                {res.description}
                              </p>
                            )}
                          </div>

                          {res.link && (
                            <div className="mt-6 pt-3 border-t border-gray-100/50 flex items-center justify-between">
                              <span className="text-[11px] font-bold uppercase tracking-widest text-[#d955a4] flex items-center gap-1 group-hover:text-[#d955a4] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                Explore Resource
                                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                            </div>
                          )}
                        </GlassCard>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-12 md:py-16 px-6 pb-24 overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div
            className="relative bg-[#FFF8EF] border-[6px] md:border-[10px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-visible"
            style={{
              borderRadius: "36px 48px 32px 54px",
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.015) 100%)",
            }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-stretch">
              {/* Left Side: Content */}
              <div className="flex-1 px-6 py-12 md:px-12 md:py-14 text-left">
                {/* Label */}
                <p
                  className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#d955a4] mb-5 font-bold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Missing something?
                </p>

                {/* Heading */}
                <h2
                  className="text-3xl md:text-5xl font-black text-gray-900 leading-tight"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Know a resource we should add?
                </h2>

                {/* Subheading */}
                <p
                  className="mt-4 max-w-xl text-gray-600 text-base md:text-lg leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Help us build the most complete stack for women in tech across India.
                </p>

                {/* Button container */}
                <div className="mt-10 flex gap-8">
                  <a
                    href="mailto:girlsleadingtech@gmail.com"
                    className="relative inline-block active:scale-95 transition-transform duration-100"
                  >
                    <img
                      src={pixelBtn}
                      alt="Suggest a Resource"
                      className="w-[190px] h-auto"
                    />

                    {/* Button overlay text */}
                    <span
                      className="absolute inset-0 flex items-center justify-center text-black font-bold"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "clamp(0.75rem, 1.2vw, 1.2rem)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Suggest one →
                    </span>
                  </a>
                </div>
              </div>

              {/* Spacer for Mascot overlap on larger viewports */}
              <div className="hidden md:block w-[220px] lg:w-[280px]" />
            </div>

            {/* Live Overlapping Mascot container */}
            {/* Desktop Mascot */}
            <div className="hidden md:block absolute right-[-40px] bottom-[-20px] w-[280px] lg:w-[360px] z-20 pointer-events-none select-none">
              <img
                src={communityIdle}
                alt="Mascot Desktop"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Mobile Mascot */}
            <div className="md:hidden flex justify-center px-6 pb-8 pointer-events-none select-none">
              <img
                src={communityIdle}
                alt="Mascot Mobile"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
