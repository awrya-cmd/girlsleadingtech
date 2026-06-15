// all initiatives page
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { initiatives } from "@/data/initiatives";
import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import star from "@/assets/stickers/star.png"
import washiTape from "@/assets/stickers/washi-tape.png"
import paperClip from "@/assets/stickers/paper-clip.png"
import smiley from "@/assets/stickers/smiley.png"

import { motion, useScroll, useTransform, MotionValue } from "motion/react";

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
  "empowerher",
  "global-ai-buildathon",
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

  "global-ai-buildathon": {
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



// Floating sparkle doodles for background
function Sparkle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={style}
      className="absolute pointer-events-none select-none text-[#d955a4]/70 z-0"
    >
      ✦
    </div>
  );
}

const SPARKLE_POSITIONS: React.CSSProperties[] = [
  // Left side / middle
  { top: "10%",  left: "22%",  fontSize: "2.8rem" },
  { top: "52%",  left: "20%",  fontSize: "2.6rem" },
  { top: "18%",  left: "6%",   fontSize: "2.4rem" },
  { top: "82%",  left: "8%",   fontSize: "2.2rem" },
  
  // Right side / middle
  { top: "26%",  right: "23%", fontSize: "2.8rem" },
  { top: "68%",  right: "21%", fontSize: "2.6rem" },
  { top: "42%",  right: "6%",  fontSize: "3.0rem" },
  { top: "86%",  right: "7%",  fontSize: "2.4rem" },
];

// ── Single card (Desktop) ───────────────────────────────────────────────────
function ScrapbookCard({
  initiative,
  isWide = false,
}: {
  initiative: (typeof initiatives)[number];
  isWide?: boolean;
}) {
  const s = cardStyles[initiative.slug];

  return (
    <div
      className="w-full h-[210px] lg:h-[220px]"
    >
      <Link
        to="/initiatives/$slug"
        params={{ slug: initiative.slug }}
        className="block group h-full"
      >
        <div className="w-full h-full rounded-none overflow-visible bg-white shadow-xl ring-1 ring-black/5 flex flex-col relative font-sans">
          {/* Desktop Stickers */}
          <div className="hidden md:block">
            {s.stickers}
          </div>
          <div className={`h-4 w-full ${s.bar}`} />

          <div className="p-4 pb-3.5 flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-1.5 text-left">
              <h3 className="text-xl lg:text-2xl font-black uppercase leading-tight tracking-tight text-gray-900 pr-12 font-['Satoshi']">
                {initiative.name}
              </h3>

              <p className={`font-['Montserrat'] text-[10px] font-extrabold tracking-[0.02em] uppercase ${s.tagline}`}>
                {initiative.tagline}
              </p>

              <p
                className={`mt-1.5 text-black leading-relaxed max-w-[92%] font-bold ${isWide ? "line-clamp-3" : "line-clamp-2"}`}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "clamp(0.78rem, 0.88vw, 0.95rem)",
                  fontWeight: "bold",
                }}
              >
                {initiative.description}
              </p>
            </div>

            {initiative.url ? (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(initiative.url, "_blank", "noopener,noreferrer");
                }}
                className={`mt-3 inline-flex items-center gap-1.5 self-start rounded-full ${s.cta} px-3.5 py-1.5 text-xs font-bold text-white transition hover:scale-105 cursor-pointer`}
              >
                Explore
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            ) : (
              <div
                className={`mt-3 inline-flex items-center gap-1.5 self-start rounded-full ${s.cta} px-3.5 py-1.5 text-xs font-bold text-white transition group-hover:scale-105`}
              >
                Explore
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

// ── Single card (Mobile) ────────────────────────────────────────────────────
function ScrapbookCardMobile({
  initiative,
}: {
  initiative: (typeof initiatives)[number];
}) {
  const s = cardStyles[initiative.slug];

  return (
    <Link
      to="/initiatives/$slug"
      params={{ slug: initiative.slug }}
      className="block w-full max-w-[340px] h-[310px]"
    >
      <div className="w-full h-full rounded-none overflow-visible bg-white shadow-xl ring-1 ring-black/5 flex flex-col relative font-sans">
        {/* Mobile Stickers */}
        <div>
          {s.mobileStickers}
        </div>
        <div className={`h-5 w-full ${s.bar}`} />

        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-2 text-left">
            <h3 className="text-2xl font-black uppercase leading-tight tracking-tight text-gray-900 pr-12 font-['Satoshi']">
              {initiative.name}
            </h3>

            <p className={`font-['Montserrat'] text-[11px] font-extrabold tracking-[0.01em] ${s.tagline}`}>
              {initiative.tagline}
            </p>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-4">
              {initiative.description}
            </p>
          </div>

          {initiative.url ? (
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(initiative.url, "_blank", "noopener,noreferrer");
              }}
              className={`mt-4 inline-flex items-center gap-1.5 self-start rounded-full ${s.cta} px-4 py-2 text-xs font-bold text-white transition hover:scale-105 cursor-pointer`}
            >
              Explore
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          ) : (
            <div
              className={`mt-4 inline-flex items-center gap-1.5 self-start rounded-full ${s.cta} px-4 py-2 text-xs font-bold text-white`}
            >
              Explore
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function InitiativesScrapbook() {
  const cards = SCRAPBOOK_SLUGS
    .map((slug) => initiatives.find((i) => i.slug === slug))
    .filter(Boolean) as (typeof initiatives);

  return (
    <>
      {/* Desktop Layout: Grid layout with varied card sizes sliding in on scroll */}
      <div className="hidden md:block relative w-full max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8 w-full">
          
          {/* Card 1: Wide (col-span-7) */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="col-span-7"
          >
            <ScrapbookCard initiative={cards[0]} isWide={true} />
          </motion.div>

          {/* Card 2: Narrow (col-span-5) */}
          {cards[1] && (
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              className="col-span-5"
            >
              <ScrapbookCard initiative={cards[1]} isWide={false} />
            </motion.div>
          )}

          {/* Card 3: Narrow (col-span-5) */}
          {cards[2] && (
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              className="col-span-5"
            >
              <ScrapbookCard initiative={cards[2]} isWide={false} />
            </motion.div>
          )}

          {/* Card 4: Wide (col-span-7) */}
          {cards[3] && (
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              className="col-span-7"
            >
              <ScrapbookCard initiative={cards[3]} isWide={true} />
            </motion.div>
          )}

        </div>
      </div>

      {/* Mobile Layout: Clean vertical card list */}
      <div className="md:hidden flex flex-col items-center gap-8 w-full py-8">
        {cards.map((initiative) => (
          <ScrapbookCardMobile
            key={initiative.slug}
            initiative={initiative}
          />
        ))}
      </div>
    </>
  );
}
