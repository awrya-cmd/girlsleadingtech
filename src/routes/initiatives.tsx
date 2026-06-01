// all initiatives page
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { initiatives } from "@/data/initiatives";
import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "motion/react";
import star from "@/assets/stickers/star.png"
import washiTape from "@/assets/stickers/washi-tape.png"
import paperClip from "@/assets/stickers/paper-clip.png"
import smiley from "@/assets/stickers/smiley.png"

export const Route = createFileRoute("/initiatives")({
  head: () => ({ meta: [{ title: "Initiatives — Girls Leading Tech" }, { name: "description", content: "Programs and initiatives by Girls Leading Tech." }] }),
  component: InitiativesPage,
});

const colorMap: Record<string, string> = {
  pink: "from-pink-300/60 to-pink-200/30",
  lavender: "from-violet-300/60 to-violet-200/30",
  peach: "from-orange-300/60 to-orange-200/30",
  rose: "from-rose-300/60 to-rose-200/30",
  violet: "from-purple-400/60 to-violet-200/30",
};

function InitiativesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Initiatives"
        title="Programs powering the movement."
        description="Flagship summits, hackathons, fellowships and seasonal celebrations — all under one roof."
      />
      <section className="container mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((i) => (
            <Link key={i.slug} to="/initiatives/$slug" params={{ slug: i.slug }} className="group block">
              <GlassCard glow className="relative h-full overflow-hidden p-7">
                <div className={`absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gradient-to-br ${colorMap[i.color]} blur-2xl`} />
                <div className="relative">
                  <h3 className="font-display text-2xl">{i.name}</h3>
                  <p className="mt-2 text-sm font-medium text-primary">{i.tagline}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{i.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}


// for index.tsx -> initiatives scrapbook 

"use client";

const SCRAPBOOK_SLUGS = [
  "empower-her",
  "i2p-fellowship",
  "hack-aura",
  "code-at-christmas",
];

const cardStyles: Record<
  string,
  {
    bar: string;
    tagline: string;
    cta: string;
    tab: string;
    rotate: string;
    stickers?: React.ReactNode[];
    mobileStickers?: React.ReactNode[];

  }
> = {
  "empowerher": {
    bar: "bg-[#7EB5A6]",
    tagline: "text-[#2F5D50]",
    cta: "bg-[#7EB5A6] hover:bg-[#6BA393]",
    tab: "text-[#2F5D50] border-[#A8D2C7]",
    rotate: "-rotate-3",
    stickers: [
    <img
    key="star"
    src={star}
    className="absolute -top-7 left-3 w-16 rotate-[-12deg] pointer-events-none"
    />],

    mobileStickers: [
      <img
        key="star-mobile"
        src={star}
        className="absolute -top-4 left-2 w-12 rotate-[-10deg]"
      />
    ]
  },

  "i2p-fellowship": {
    bar: "bg-[#A9B7FF]",
    tagline: "text-[#4B57A8]",
    cta: "bg-[#A9B7FF] hover:bg-[#95A5F5]",
    tab: "text-[#4B57A8] border-[#C8D0FF]",
    rotate: "-rotate-1",
    stickers: [
    <img
    key="tape"
    src={washiTape}
    className="absolute -top-20 left-12 w-40 rotate-[-18deg] pointer-events-none"
    />],

     mobileStickers: [
      <img
        key="tape-mobile"
        src={washiTape}
        className="absolute -top-12 right-15 w-25 rotate-[-18deg]"
      />
    ]

  },

  "hack-aura": {
    bar: "bg-[#FF8A5B]",
    tagline: "text-[#A64B28]",
    cta: "bg-[#FF8A5B] hover:bg-[#F67848]",
    tab: "text-[#A64B28] border-[#FFC2A8]", 
    rotate: "rotate-2",
    stickers: [
    <img
    key="paperClip"
    src={paperClip}
    className="absolute -top-28 left-24 w-65 rotate-[18deg] pointer-events-none"
    />],

    mobileStickers: [
      <img
        key="paperClip-mobile"
        src={paperClip}
        className="absolute -top-18 left-20 w-45 rotate-[-10deg]"
      />
    ]

  },

  "code-at-christmas": {
    bar: "bg-[#D8B4E8]",
    tagline: "text-[#7B4F92]",
    cta: "bg-[#D8B4E8] hover:bg-[#C89DDB]",
    tab: "text-[#7B4F92] border-[#E8D4F2]",
    rotate: "-rotate-2",
     stickers: [
    <img
    key="smiley"
    src={smiley}
    className="absolute -top-8 right-20 w-18 rotate-[-12deg] pointer-events-none"
    />],

    mobileStickers: [
      <img
        key="smiley-mobile"
        src={smiley}
        className="absolute -top-2 left-2 w-10 rotate-[-10deg]"
      />
    ]

  },
};

// Responsive left positions to spread wide on desktop
const desktopPositions = [
  "left-[0%]",
  "left-[22%] md:left-[17%] lg:left-[20%]",
  "left-[44%] md:left-[34%] lg:left-[40%]",
  "left-[66%] md:left-[51%] lg:left-[60%]",
];

export function InitiativesScrapbook({ scrollProgress }: { scrollProgress?: MotionValue<number> }) {
  const localRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: localScrollYProgress } = useScroll({
    target: localRef,
    offset: ["start start", "end end"],
  });

  const activeScrollY = scrollProgress || localScrollYProgress;

  const [visibleCount, setVisibleCount] = useState(0);
  const [activeIdx, setActiveIdx] = useState(3);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  const cards = SCRAPBOOK_SLUGS
    .map((slug) => initiatives.find((i) => i.slug === slug || i.slug === slug.replace("-", "")))
    .filter(Boolean) as typeof initiatives;

  useMotionValueEvent(activeScrollY, "change", (latest) => {
    // 1. Detect scroll direction
    const isScrollingDown = latest > lastScrollY.current;
    lastScrollY.current = latest;

    // 2. Temporarily disable hover states to prevent visual lag/jumps
    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);

    // 3. Determine visible cards count based on scroll direction
    let nextVisible = 0;
    if (isScrollingDown) {
      // Down scroll: Space thresholds out to prevent cards triggering together
      if (latest >= 0.82) {
        nextVisible = 4;
      } else if (latest >= 0.62) {
        nextVisible = 3;
      } else if (latest >= 0.40) {
        nextVisible = 2;
      } else if (latest >= 0.18) {
        nextVisible = 1;
      } else {
        nextVisible = 0;
      }
    } else {
      // Up scroll: Exact reverse sequence thresholds
      if (latest >= 0.80) {
        nextVisible = 4;
      } else if (latest >= 0.60) {
        nextVisible = 3;
      } else if (latest >= 0.40) {
        nextVisible = 2;
      } else if (latest >= 0.20) {
        nextVisible = 1;
      } else {
        nextVisible = 0;
      }
    }

    setVisibleCount(nextVisible);
    setActiveIdx(Math.max(0, nextVisible - 1));
  });

  // Fallback for initial render / non-scroll states
  useEffect(() => {
    const val = activeScrollY.get();
    let nextVisible = 0;
    if (val >= 0.80) {
      nextVisible = 4;
    } else if (val >= 0.60) {
      nextVisible = 3;
    } else if (val >= 0.40) {
      nextVisible = 2;
    } else if (val >= 0.20) {
      nextVisible = 1;
    } else {
      nextVisible = 0;
    }
    setVisibleCount(nextVisible);
    setActiveIdx(Math.max(0, nextVisible - 1));
  }, [cards.length, activeScrollY]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* DESKTOP */}
      <div className="relative hidden md:block w-full h-[270px] md:h-[295px] lg:h-[335px] md:left-[5%] lg:left-[3%] xl:left-[2%]">
        {cards.map((initiative, idx) => {
          const s = cardStyles[initiative.slug];
          const isVisible = idx < visibleCount;

          // Staggered forward when entering, staggered reverse when exiting
          const delay = isVisible ? idx * 150 : (3 - idx) * 150;

          const isHovered = !isScrolling && idx === hoveredIdx;

          return (
            <div
              key={initiative.slug}
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`
                absolute top-0
                w-[240px] md:w-[270px] lg:w-[360px]
                h-[240px] md:h-[260px] lg:h-[290px]
                cursor-pointer
                will-change-[transform,opacity]
                transition duration-800 ease-out
                ${desktopPositions[idx]}
                ${s.rotate}
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-28"
                }
                ${
                  isHovered
                    ? "scale-[1.03] shadow-2xl"
                    : "scale-100 shadow-xl"
                }
              `}
              style={{
                zIndex: isHovered ? 50 : (idx + 1) * 10,
                transitionDelay: `${delay}ms`,
              }}
            >
              <div className="w-full h-full rounded-none overflow-vsisble bg-white ring-1 ring-black/5 flex flex-col">
                {s.stickers}

                <div className={`h-5 w-full ${s.bar}`} />

                <div className="p-6 flex flex-col h-[calc(100%-8px)] relative justify-between">
        

                  <div>
                    {/* title */}
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black uppercase leading-tight tracking-tight text-gray-900 pr-12 font-['Satoshi']">
                      {initiative.name}
                    </h3>

                    {/* tagline */}
                    
                    <p className={`font-['Montserrat'] mt-1 text-[10px] font-extrabold tracking-[0.01em] ${s.tagline}`}>
                      {initiative.tagline}
                    </p>

                    {/* desc */}
                    <p className="mt-4 md:text-[9px] text-black leading-[1.9] line-clamp-3 max-w-[92%]"
                    style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "clamp(0.7rem, 1.0vw, 1.1rem)",
                    }}
                    >
                      {initiative.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    to="/initiatives/$slug"
                    params={{ slug: initiative.slug }}
                    onClick={(e) => e.stopPropagation()}
                    className={`
                      mt-auto inline-flex items-center gap-1.5
                      self-start rounded-full
                      ${s.cta}
                      px-4 py-2
                      text-xs font-bold text-white
                      transition hover:scale-105
                    `}
                  >
                    Explore
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden flex-col gap-6 px-4">
        {cards.map((initiative) => {
          const s = cardStyles[initiative.slug];

          return (
            <div
              key={initiative.slug}
              className="relative rounded-none overflow-visible bg-white shadow-lg ring-1 ring-black/5 flex flex-col"
            >
              {s.mobileStickers}
              <div className={`h-5 w-full ${s.bar}`} />

              <div className="p-6 flex flex-col relative">
          

                <h3 className="text-xl font-black uppercase leading-tight text-gray-900 pr-12">
                  {initiative.name}
                </h3>

                <p className={`mt-1 text-[10px] font-black uppercase tracking-[0.2em] ${s.tagline}`}>
                  {initiative.tagline}
                </p>

                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  {initiative.description}
                </p>

                <Link
                  to="/initiatives/$slug"
                  params={{ slug: initiative.slug }}
                  className={`
                    mt-4 inline-flex items-center gap-1.5
                    rounded-full ${s.cta}
                    px-4 py-2 text-xs font-bold text-white
                    self-start transition hover:scale-105
                  `}
                >
                  Explore
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* dots */}
      <div className="mt-4 hidden md:flex justify-start gap-2 pl-2">
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${
                idx === activeIdx
                  ? "w-7 bg-primary"
                  : "w-2 bg-primary/25"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}