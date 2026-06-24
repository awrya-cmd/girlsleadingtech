// all initiatives page
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { initiatives } from "@/data/initiatives";
import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import star from "@/assets/stickers/star.png";
import washiTape from "@/assets/stickers/washi-tape.png";
import paperClip from "@/assets/stickers/paper-clip.png";
import smiley from "@/assets/stickers/smiley.png";
import book from "@/assets/stickers/book.png";
import crown from "@/assets/stickers/crown.png";
import heart from "@/assets/stickers/heart.png";
import trophy from "@/assets/stickers/trophy.png";
import briefcase from "@/assets/stickers/briefcase.png";
import paperPlaneSticker from "@/assets/stickers/paper-plane.png";

import presentingMascot from "@/assets/main-mascot/presenting.png";
import excitedMascot from "@/assets/main-mascot/excited.png";
import buildMascot from "@/assets/main-mascot/build.png";
import pointingMascot from "@/assets/main-mascot/pointing.png";
import thinkMascot from "@/assets/main-mascot/think.png";
import idleMascot from "@/assets/main-mascot/idle.png";
import wavingMascot from "@/assets/main-mascot/waving.png";
import welcomingMascot from "@/assets/main-mascot/welcoming.png";
import initiativeMascot from "@/assets/main-mascot/initiative-mascot.png";
import growthMascot from "@/assets/main-mascot/growth.png";
import explainingMascot from "@/assets/main-mascot/explaining.png";
import notingDownMascot from "@/assets/main-mascot/noting-down.png";
import showingImpactMascot from "@/assets/main-mascot/showing-impact.png";

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

const initiativeEnhancements: Record<string, { category: string; mascot?: string; sticker?: string }> = {
  "empowerher": { category: "Flagship Summit", mascot: presentingMascot, sticker: star },
  "empowerher-2-0": { category: "Flagship Summit", mascot: excitedMascot, sticker: crown },
  "i2p-fellowship": { category: "Fellowship", mascot: growthMascot, sticker: book },
  "hogwarts": { category: "Fellowship", mascot: buildMascot, sticker: book },
  "code-at-christmas": { category: "Seasonal Event", mascot: wavingMascot, sticker: smiley },
  "hack-aura": { category: "Hackathon", mascot: thinkMascot, sticker: paperClip },
  "valentines-week": { category: "Seasonal Event", mascot: idleMascot, sticker: heart },
  "glt-spotlight": { category: "Series", mascot: pointingMascot, sticker: star },
  "mentorship": { category: "Mentorship", mascot: explainingMascot, sticker: briefcase },
  "global-ai-buildathon": { category: "Hackathon", mascot: buildMascot, sticker: washiTape },
  "machine-learning-cohort": { category: "Cohort", mascot: notingDownMascot, sticker: book },
  "buildsprint": { category: "Hackathon", mascot: showingImpactMascot, sticker: trophy }
};

function InitiativesHero() {
  return (
    <div className="relative w-full pt-32 pb-24 overflow-x-clip flex items-center justify-center bg-[#fef9f4]">
      {/* Subtle Graph Paper Grid overlay */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217, 85, 164, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217, 85, 164, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-pink-300/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-violet-300/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="relative z-10 container mx-auto px-6 flex items-center justify-center gap-10 md:gap-4 lg:gap-12">
        
        {/* Left Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="hidden md:block w-36 lg:w-48 shrink-0 z-20"
        >
          <img src={initiativeMascot} alt="Initiatives mascot" className="w-full h-auto object-contain drop-shadow-xl" />
        </motion.div>

        {/* Center Text Block */}
        <div className="relative flex flex-col items-center text-center max-w-4xl z-10">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#d955a4] mb-6 mt-8 md:mt-0"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ✦ Our Initiatives ✦
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative inline-block text-center"
          >
            {/* Star Sticker (Left) - Raised to match heart position */}
            <motion.img 
              src={star} 
              alt="Floating star" 
              className="absolute -top-16 -left-6 md:-left-12 w-12 md:w-16 opacity-80"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            {/* Heart Sticker (Right) - Raised high into upper right corner */}
            <motion.img 
              src={heart} 
              alt="Floating heart" 
              className="absolute w-7 sm:w-9 md:w-12 opacity-70"
              style={{ top: "-15%", right: "1vw" }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 leading-[1.1] tracking-tight relative z-10">
              Programs powering the <br className="hidden md:block" /> 
              <span className="font-serif italic lowercase text-[#d955a4] font-normal tracking-normal text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] relative">
                movement
                <span className="absolute left-full top-[50%] -translate-y-1/2 hidden md:flex items-center pointer-events-none">
                  <img src={paperPlaneSticker} alt="Paper Plane" className="w-14 md:w-16 h-auto ml-4 rotate-[10deg]" />
                </span>
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-base md:text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Flagship summits, hackathons, fellowships and seasonal celebrations — all under one roof.
          </motion.p>

        </div>
        
        {/* Right Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.4 }}
          className="hidden md:block w-36 lg:w-48 shrink-0 z-20 self-end mb-4"
        >
          <img src={welcomingMascot} alt="Mascot welcoming" className="w-full h-auto object-contain drop-shadow-xl" />
        </motion.div>

      </div>
    </div>
  );
}

function InitiativesMarquee() {
  const items = [
    "EMPOWERHER",
    "EMPOWERHER 2.0",
    "IDEA TO PRODUCT (I2P) FELLOWSHIP",
    "CODE AT CHRISTMAS",
    "HACK AURA",
    "VALENTINE'S WEEK",
    "GLT SPOTLIGHT",
    "HOGWARTS OF TECH",
    "GLT MENTORSHIP PROGRAM",
    "GLOBAL AI BUILDATHON",
    "MACHINE LEARNING COHORT",
    "BUILD SPRINT"
  ];
  
  // Repeat content to ensure it covers wide screens smoothly
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-[#ffc2da] border-y-[1.5px] border-black py-2 md:py-2.5 flex whitespace-nowrap z-20 -mt-8 md:-mt-6 mb-8 md:mb-6">
      <div className="animate-marquee flex w-max">
        <div className="flex items-center">
          {marqueeItems.map((item, idx) => (
            <span 
              key={`group1-${idx}`}
              className="flex items-center text-black uppercase font-bold font-sans text-sm md:text-base tracking-[0.15em]"
              style={{ textShadow: "0 0 12px rgba(255,255,255,0.9), 0 0 4px rgba(255,255,255,0.5)" }}
            >
              {item}
              <span className="mx-6 md:mx-10 text-lg md:text-xl">✦</span>
            </span>
          ))}
        </div>
        <div className="flex items-center">
          {marqueeItems.map((item, idx) => (
            <span 
              key={`group2-${idx}`}
              className="flex items-center text-black uppercase font-bold font-sans text-sm md:text-base tracking-[0.15em]"
              style={{ textShadow: "0 0 12px rgba(255,255,255,0.9), 0 0 4px rgba(255,255,255,0.5)" }}
            >
              {item}
              <span className="mx-6 md:mx-10 text-lg md:text-xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const solidColorMap: Record<string, string> = {
  pink: "bg-[#d955a4]",
  lavender: "bg-[#a27bdf]",
  peach: "bg-[#ff8a5b]",
  rose: "bg-[#e86b86]",
  violet: "bg-[#8a5bd6]",
};

const textColorMap: Record<string, string> = {
  pink: "text-[#d955a4]",
  lavender: "text-[#a27bdf]",
  peach: "text-[#ff8a5b]",
  rose: "text-[#e86b86]",
  violet: "text-[#8a5bd6]",
};

const buttonColorMap: Record<string, string> = {
  pink: "bg-[#d955a4] hover:bg-[#c44992]",
  lavender: "bg-[#a27bdf] hover:bg-[#8f68c9]",
  peach: "bg-[#ff8a5b] hover:bg-[#e87a4f]",
  rose: "bg-[#e86b86] hover:bg-[#d65f78]",
  violet: "bg-[#8a5bd6] hover:bg-[#784cc2]",
};

function InitiativesPage() {
  return (
    <div className="bg-[#fef9f4] min-h-screen">
      <InitiativesHero />
      <InitiativesMarquee />
      <section className="container mx-auto max-w-6xl px-6 pb-24 relative z-20 mt-8 md:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {initiatives.map((i, index) => {
            const headerColor = solidColorMap[i.color] || solidColorMap.pink;
            const textColor = textColorMap[i.color] || textColorMap.pink;
            const btnColor = buttonColorMap[i.color] || buttonColorMap.pink;
            
            const alternativeStickers = [smiley, heart, star];
            const currentSticker = alternativeStickers[index % 3];

            return (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                key={i.slug} 
                className="relative flex flex-col bg-white shadow-lg hover:shadow-[0_12px_20px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 ease-out group max-w-[340px] mx-auto w-full rounded-none"
              >
                {/* Thick Solid Color Block Header */}
                <div className={`h-4 w-full ${headerColor}`} />
                
                {/* Floating Sticker Graphic */}
                <div className={`absolute z-10 drop-shadow-md transition-transform duration-300 pointer-events-none group-hover:scale-110 ${
                  currentSticker === smiley ? "-top-4 right-4 w-12" :
                  currentSticker === star ? "-top-5 right-4 w-10" :
                  "-top-4 right-4 w-8"
                }`}>
                  <img 
                    src={currentSticker} 
                    alt="sticker" 
                    className="w-full h-auto object-contain"
                    style={{ transform: index % 3 === 0 ? "rotate(-8deg)" : index % 3 === 1 ? "rotate(12deg)" : "rotate(-15deg)" }}
                  />
                </div>

                <div className="flex-1 flex flex-col p-8">
                  <div className="flex flex-col gap-1 mb-4">
                    {/* Title */}
                    <h3 className="font-sans font-bold text-xl uppercase text-slate-900 tracking-tight">
                      {i.name}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className={`font-sans text-sm font-bold uppercase tracking-wider ${textColor}`}>
                      {i.tagline}
                    </p>
                  </div>
                  
                  {/* Body Text */}
                  <p className="text-gray-700 font-mono text-sm leading-relaxed mb-6 flex-1">
                    {i.description}
                  </p>
                  
                  {/* CTA Button */}
                  {i.url ? (
                    <a
                      href={i.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-1.5 ${btnColor} text-white font-bold py-2 px-4 rounded-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md w-fit text-sm`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link 
                      to="/initiatives/$slug" 
                      params={{ slug: i.slug }}
                      className={`inline-flex items-center justify-center gap-1.5 ${btnColor} text-white font-bold py-2 px-4 rounded-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md w-fit text-sm`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
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
