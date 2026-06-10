import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { GlassCard } from "@/components/site/GlassCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Marquee } from "@/components/site/Marquee";
import { SpeakerCard } from "@/components/site/SpeakerCard";
import { ArrowRight, Heart, Users, Sparkle, Star, Flower2, Linkedin } from "lucide-react";
import FAQ from "@/components/site/FAQ";
import { stats } from "@/data/stats";
import { initiatives } from "@/data/initiatives";
import { speakers, testimonials } from "@/data/community";
import { communityPartners, industryPartners, ecosystemPartners } from "@/data/partners";
import { useState } from "react";
import { colleges } from "@/data/colleges";
import testimonialCard from "@/assets/testimonial-card.png"
import LborderCard from "@/components/ui/LborderCard";
import { WhyJoinUs } from "@/components/home/WhyJoinUs";
import pixelBtn from "@/assets/pixel-button.png"
import presenting from "@/assets/characters/main-mascot/presenting.png"
import { TestimonialsGrid } from "@/components/home/TestimonialsGrid"
import { PartnersSection } from "@/components/home/PartnersSection"
import OurStory from "@/components/home/OurStory";
import OurJourney from "@/components/home/OurJourney";
import joinUs from "@/assets/characters/main-mascot/join-us.png"


import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.webp";
import gallery4 from "@/assets/gallery-4.webp";
import gallery5 from "@/assets/gallery-5.webp";
import gallery6 from "@/assets/gallery-6.webp";
import gallery7 from "@/assets/gallery-7.webp";
import gallery8 from "@/assets/gallery-8.webp";
import gallery9 from "@/assets/gallery-9.webp";
import Hero from "@/components/home/hero";

import CollegesReachedSection from "@/components/home/CollegesReachedSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Girls Leading Tech — Empowering Women in Tech" },
      { name: "description", content: "Join 4000+ women across 1000+ colleges in India building, learning and leading in tech together." },
    ],
  }),
  component: HomePage,
});

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9];

const initiativeStyles: Record<string, { grad: string; ring: string; chip: string; emoji: string }> = {
  pink:     { grad: "from-rose-400 via-pink-500 to-fuchsia-500",   ring: "ring-rose-300/50",     chip: "bg-rose-100 text-rose-700",         emoji: "🌸" },
  lavender: { grad: "from-violet-400 via-fuchsia-500 to-pink-500", ring: "ring-violet-300/50",   chip: "bg-violet-100 text-violet-700",     emoji: "✨" },
  peach:    { grad: "from-amber-300 via-orange-400 to-rose-500",   ring: "ring-orange-300/50",   chip: "bg-orange-100 text-orange-700",     emoji: "🧡" },
  rose:     { grad: "from-pink-400 via-rose-500 to-red-500",       ring: "ring-pink-300/50",     chip: "bg-pink-100 text-pink-700",         emoji: "💖" },
  violet:   { grad: "from-purple-500 via-fuchsia-500 to-pink-500", ring: "ring-purple-300/50",   chip: "bg-purple-100 text-purple-700",     emoji: "🔮" },
};

<style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');`}</style>

function HeroDecor() {
  return (
    <>
      <div className="pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.78_0.2_25_/_0.55)] blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -right-32 top-20 h-[30rem] w-[30rem] rounded-full bg-[oklch(0.7_0.22_350_/_0.5)] blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
      <div className="pointer-events-none absolute left-1/3 -bottom-20 h-[24rem] w-[24rem] rounded-full bg-[oklch(0.78_0.18_60_/_0.5)] blur-3xl animate-blob" style={{ animationDelay: "6s" }} />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" />
    </>
  );
}

// auto photo carousel + user constrolled
function AutoCarousel({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const el = ref.current;
  if (!el) return;

  let speed = 1.4; // faster scroll
  let animationId: number;
  let paused = false;

  const loop = () => {
    if (!el) return;

    if (!paused) {
      el.scrollLeft += speed;

      // infinite loop
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
    }

    animationId = requestAnimationFrame(loop);
  };

  animationId = requestAnimationFrame(loop);

  // pause/resume helpers
  const pause = () => (paused = true);
  const resume = () => (paused = false);

  // hover + touch pause
  el.addEventListener("mouseenter", pause);
  el.addEventListener("mouseleave", resume);
  el.addEventListener("touchstart", pause);
  el.addEventListener("touchend", resume);

  // resume when user scrolls back into view
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        paused = false; // restart when visible again
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(el);

  return () => {
    cancelAnimationFrame(animationId);
    observer.disconnect();

    el.removeEventListener("mouseenter", pause);
    el.removeEventListener("mouseleave", resume);
    el.removeEventListener("touchstart", pause);
    el.removeEventListener("touchend", resume);
  };
}, []);

  // drag support
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  return (
    <div
      ref={ref}
      className="flex gap-6 px-8 overflow-x-auto scroll-smooth
    cursor-grab active:cursor-grabbing
    select-none
    [&::-webkit-scrollbar]:hidden
    [scrollbar-width:none]"
      onMouseDown={(e) => {
        isDown.current = true;
        startX.current = e.pageX;
        scrollLeft.current = ref.current!.scrollLeft;
      }}
      onMouseLeave={() => (isDown.current = false)}
      onMouseUp={() => (isDown.current = false)}
      onMouseMove={(e) => {
        if (!isDown.current) return;
        e.preventDefault();

        const walk = (e.pageX - startX.current) * 1.2;
        ref.current!.scrollLeft = scrollLeft.current - walk;
      }}
      onTouchStart={(e) => {
        startX.current = e.touches[0].pageX;
        scrollLeft.current = ref.current!.scrollLeft;
      }}
      onTouchMove={(e) => {
        const walk = (e.touches[0].pageX - startX.current) * 1.2;
        ref.current!.scrollLeft = scrollLeft.current - walk;
      }}
    >
      {[...images, ...images].map((src, i) => (
        <div
          key={i}
          className="h-56 w-80 shrink-0 overflow-hidden rounded-3xl md:h-72 md:w-96"
        >
          <img
            src={src}
            className="h-full w-full object-cover pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
}

function TestimonialPixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const grid = 28;
      for (let x = 0; x < width; x += grid) {
        for (let y = 0; y < height; y += grid) {
          ctx.fillStyle = "rgba(180, 55, 120, 0.18)";
          ctx.fillRect(x, y, 2.5, 2.5);
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />;
}


{/* grid bg */}
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      
      {/* LEFT GLOW (unchanged) */}
      <div
        className="absolute left-[-12%] top-[-10%] h-[120%] w-[35vw] blur-3xl opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(255,120,180,0.28), transparent 75%)",
        }}
      />

      {/* RIGHT GLOW (unchanged) */}
      <div
        className="absolute right-[-12%] top-[-10%] h-[120%] w-[35vw] blur-3xl opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(240,120,255,0.24), transparent 75%)",
        }}
      />

      {/* CENTER CREAM GLOW (unchanged) */}
      <div
        className="absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,190,0.28), transparent 72%)",
        }}
      />

      {/* GRID LAYER (added on top but subtle so it doesn't kill glow) */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(72, 38, 96, 0.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(160, 100, 200, 0.13) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
        }}
      />
    </div>
  );
}


// -------- HOME PAGE --------
function HomePage() {
  const initiativesSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: initiativesScrollYProgress } = useScroll({
    target: initiativesSectionRef,
    offset: ["start end", "end start"],
  });
  
  const [animateBar, setAnimateBar] = useState(false);

  useMotionValueEvent(initiativesScrollYProgress, "change", (latest) => {
    if (latest > 0.01 && !animateBar) {
      setAnimateBar(true);
    }
  });

  useEffect(() => {
    if (initiativesScrollYProgress.get() > 0.01) {
      setAnimateBar(true);
    }
  }, [initiativesScrollYProgress]);

  return (
    <>
      <Hero />

      {/* WHY WE EXIST / OUR STORY */}
      <section className="relative py-24 pb-12 overflow-hidden bg-[#FFFBF7]">
        <GridBackground />
        <OurStory />
      </section>

      {/* OUR JOURNEY TIMELINE */}
      <OurJourney />

      {/* WHY JOIN US — scrapbook cards */}
      <section ref={initiativesSectionRef} className="relative w-full py-16 md:py-24 overflow-visible bg-[#fdf9f5]">
        <style>{`@import url('https://fonts.cdnfonts.com/css/satoshi');`}</style>
        <div className="relative w-full container mx-auto max-w-7xl px-6 flex flex-col justify-start gap-2 md:gap-3">
          <div className="relative w-full overflow-visible select-none py-0 md:py-1">
            <div className="relative inline-block overflow-visible pl-2 md:pl-4 mb-4 md:mb-6">
              {/* Animated Pink Bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={animateBar ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="
                  absolute
                  left-[-2rem] md:left-[-4rem]
                  right-[-1rem] md:right-[-2rem]
                  top-1/2 -translate-y-1/2
                  h-[110%]
                  bg-[#d955a4]/85
                  z-0
                "
              />

              {/* Heading */}
              <motion.h2
                initial={{ x: -60, opacity: 0 }}
                animate={animateBar ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 font-sans text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.15em] text-gray-900 dark:text-white leading-none"
              >
                WHY JOIN US?
              </motion.h2>

            </div>
          </div>

      
          <WhyJoinUs />
        </div>
      </section>


        

      {/* COLLEGES REACHED */}
      <CollegesReachedSection />

         {/* TESTIMONIALS */}
      <TestimonialsGrid />

      {/* PARTNERS — smooth marquee */}
        <PartnersSection
        ecosystemPartners={ecosystemPartners}
        industryPartners={industryPartners}
        communityPartners={communityPartners}
      />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="relative py-16 md:py-24 bg-[#d955a4] overflow-visible mt-12">
        {/* Scalloped top border matching scrapbook reference image */}
        <div className="absolute top-0 left-0 w-full overflow-visible z-20 pointer-events-none -translate-y-[99%]">
          <svg 
            viewBox="0 0 1200 40" 
            preserveAspectRatio="none" 
            className="w-full h-[32px] md:h-[42px] text-[#d955a4] fill-current"
          >
            <path d="M 0 40 Q 60 0, 120 40 Q 180 0, 240 40 Q 300 0, 360 40 Q 420 0, 480 40 Q 540 0, 600 40 Q 660 0, 720 40 Q 780 0, 840 40 Q 900 0, 960 40 Q 1020 0, 1080 40 Q 1140 0, 1200 40 L 1200 41 L 0 41 Z" />
          </svg>
        </div>

        {/* Background Scrapbook Glows and Doodles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Soft floating blobs behind card */}
          <div className="absolute -top-12 left-1/3 w-64 h-64 rounded-full bg-[#faf7a7]/10 blur-2xl" />
          <div className="absolute -bottom-16 right-1/4 w-80 h-80 rounded-full bg-[#f7f3ea]/10 blur-3xl" />
          
          {/* Sparkles / Stars / Hearts scattered */}
          <motion.div 
            className="absolute top-12 left-[8%] text-[#faf7a7]/30"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 0.9, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Star className="w-8 h-8 fill-[#faf7a7]/10" />
          </motion.div>
          <motion.div 
            className="absolute bottom-16 left-[12%] text-[#faf7a7]/20"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-10 h-10 fill-[#faf7a7]/5 rotate-[-12deg]" />
          </motion.div>
          <motion.div 
            className="absolute top-20 right-[10%] text-[#faf7a7]/30"
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkle className="w-8 h-8" />
          </motion.div>
          <motion.div 
            className="absolute bottom-12 right-[8%] text-[#faf7a7]/20"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Star className="w-6 h-6 fill-[#faf7a7]/10" />
          </motion.div>
        </div>

        <div className="container mx-auto max-w-5xl px-6 relative z-10">
          
          {/* Large Organic Paper Cutout Card with subtle float animation */}
          <motion.div 
            className="relative bg-[#FFF8EF] border-[6px] md:border-[10px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-visible"
            style={{
              borderRadius: "36px 48px 32px 54px",
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.015) 100%)",
              transform: "rotate(-1deg)"
            }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Tape corners / Scrapbook accents */}
            <div className="absolute -top-3.5 -left-4 w-16 h-6 bg-[#faf7a7]/65 border border-black/5 shadow-sm rotate-[-30deg] pointer-events-none select-none" />
            
            {/* Sparkle pop sticker */}
            <div className="absolute -top-6 right-10 text-[#faf7a7] pointer-events-none select-none filter drop-shadow-[1px_2px_1px_rgba(0,0,0,0.1)]">
              <Sparkle className="w-10 h-10 fill-[#faf7a7]" />
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-stretch">
              
              {/* Left Side: Content */}
              <div className="flex-1 px-6 py-12 md:px-12 md:py-14 text-left">
                
                {/* Label */}
                <p
                  className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#d955a4] mb-5 font-bold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  JOIN THE MOVEMENT
                </p>

                {/* Heading */}
                <h2
                  className="text-3xl md:text-5xl font-black text-gray-900 leading-tight"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Be the change.
                </h2>

                {/* Subheading */}
                <p
                  className="mt-4 max-w-xl text-gray-600 text-base md:text-lg leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Your story could inspire thousands of girls to take their first
                  step into technology.
                </p>

                {/* Button container */}
                <div className="mt-10 flex gap-8">
                  <Link
                    to="/join"
                    className="relative inline-block active:scale-95 transition-transform duration-100"
                  >
                    <img
                      src={pixelBtn}
                      alt="Join Community Button"
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
                      Join Community →
                    </span>
                  </Link>
                </div>

                {/* Friendly Mail alternative */}
                <p className="mt-8 text-s text-[#24101F]/80 font-medium font-sans">
                  Prefer to mail us?{" "}
                  <a 
                    href="mailto:hello@girlsleadingtech.org" 
                    className="text-[#d955a4] hover:underline font-bold transition-all duration-200"
                  >
                    hello@girlsleadingtech.org
                  </a>
                </p>
              </div>

              {/* Spacer for Mascot overlap on larger viewports */}
              <div className="hidden md:block w-[220px] lg:w-[280px]" />
            </div>

            {/* Live Overlapping Mascot container */}
            {/* Desktop Mascot */}
            <div className="hidden md:block absolute right-[-40px] bottom-[-20px] w-[280px] lg:w-[360px] z-20 pointer-events-none select-none">
              
                <img
                  src={joinUs}
                  alt="Mascot Desktop"
                  className="w-full h-auto object-contain"
                />
            
            </div>

            {/* Mobile Mascot */}
            <div className="md:hidden flex justify-center px-6 pb-8 pointer-events-none select-none">
              
            
                <img
                  src={joinUs}
                  alt="Mascot Mobile"
                  className="w-full h-auto object-contain"
                />
                
             
            </div>

          </motion.div>
        </div>
      </section>
</>
  );
}
