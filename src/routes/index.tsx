import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, MotionValue, useInView } from "motion/react";
import { useHydrated } from "@/hooks/use-hydrated";
import { Marquee } from "@/components/site/Marquee";
import FAQ from "@/components/site/FAQ";
import { stats } from "@/data/stats";
import { initiatives } from "@/data/initiatives";
import { speakers, testimonials } from "@/data/community";
import { communityPartners, industryPartners, ecosystemPartners } from "@/data/partners";
import { useState } from "react";
import { colleges } from "@/data/colleges";
import testimonialCard from "@/assets/testimonial-card.png"
import { WhyJoinUs } from "@/components/home/WhyJoinUs";
import LBorderCard from "@/components/shared/LBorderCard";
import { InitiativesScrapbook } from "./initiatives";
import pixelBtn from "@/assets/pixel-button.png"
import { TestimonialsGrid } from "@/components/home/TestimonialsGrid"
import { PartnersSection } from "@/components/home/PartnersSection"
import OurStory from "@/components/home/OurStory";
import OurJourney from "@/components/home/OurJourney";
import { Heart, Sparkle, Star } from "lucide-react";
import VerticalMarquee from "@/components/home/VerticalMarquee";
import joinUs from "@/assets/main-mascot/join-us.png"
import GridBackground from "@/components/shared/GridBackground";
import DotBackground from "@/components/shared/DotBackground"
import SpeakersShowcase from "@/components/home/SpeakersShowcase";

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
  const hydrated = useHydrated();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div id="home-top">
        <Hero />
      </div>

      {/* WHY WE EXIST / OUR STORY */}
      <section className="relative py-24 pb-12 overflow-hidden bg-[#FFFBF7]">
        <GridBackground />
        <OurStory />

              </section>

      {/* OUR JOURNEY TIMELINE */}
      <OurJourney />

     

      {/* PICTURES SECTION */}
      <section className="relative py-20 overflow-hidden">
        <DotBackground />
        
        <div className="relative z-10 container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-10 lg:gap-16 items-center">
            
            {/* TEXT COLUMN */}
            <div className="flex flex-col justify-center text-left">
              <p
                className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#d955a4] font-bold"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                COMMUNITY MOMENTS
              </p>

              <h2 className="font-sans text-4xl xl:text-5xl font-bold text-foreground leading-tight mt-4">
                Celebrating every{" "}
                <span
                  className="mx-2 italic font-medium text-[#5b2b4a]"
                  style={{
                    fontFamily: "'times new roman', serif",
                  }}
                >
                  step
                </span>{" "}
                forward.
              </h2>

              <p className="mt-4 text-base sm:text-lg md:text-l text-gray-700 leading-relax font-sans">
                A glimpse at the colleges where GLT members lead chapters and hackathons.
              </p>
            </div>

            {/* MARQUEES CONTAINER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[400px] md:h-[550px] overflow-hidden relative">
              
              {/* Marquee 1 (Upwards) */}
              <div className="h-full overflow-hidden">
                <VerticalMarquee images={galleryImages} direction="up" speed={1.2} />
              </div>
              
              {/* Marquee 2 (Downwards) - hidden on mobile, visible on tablet and desktop */}
              <div className="h-full overflow-hidden hidden md:block">
                <VerticalMarquee images={galleryImages} direction="down" speed={0.8} />
              </div>
            </div>
          </div>
        </div>
      </section>


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

      {/* INITIATIVES — scroll-linked scrapbook (client-only to avoid Motion hydration errors) */}
      {hydrated ? <HomeInitiativesScrollSection /> : <HomeInitiativesStaticSection />}

      {/* SPEAKERS — featured static grid */}
     <div className="my-10 md:my-16 lg:my-24">
          <SpeakersShowcase />
      </div>
        

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
      <div className="w-full overflow-hidden pt-12 -mt-12">
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
                    girlsleadingtech@gmail.com
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
      </div>

      {/* Mobile-only Feedback Link right before footer */}
      <div className="md:hidden w-full text-center py-6 bg-[#FFFBF7] border-t border-black/5">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeRE1g3tyUfgZ7UyqH3jGGIkQsJ2jfKlJaumpwGa_tPZeYcJQ/viewform"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-xs text-[#d955a4] hover:underline font-bold font-sans"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Write us a feedback</span>
        </a>
      </div>

      {/* Reposition/Resize Chatbot, prevent horizontal scroll, and Hide default suggestion pill */}
      <style>{`
        /* Prevent horizontal overflow causing cream bar on right end */
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
          width: 100%;
        }
        /* Hide old feedback pill */
        a:not(.glt-feedback-btn)[href*="docs.google.com"],
        a[aria-label="Suggest a feature or resource"],
        div[style*="position: fixed"] a[href*="docs.google.com"],
        #glt-chatbot-toggle + a {
          display: none !important;
        }
        /* Style ChatbotFAB */
        #glt-chatbot-toggle {
          width: 44px !important;
          height: 44px !important;
          font-size: 18px !important;
          box-shadow: 0 4px 15px rgba(124,58,237,0.3) !important;
        }
      `}</style>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => document.getElementById("home-top")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="fixed bottom-[80px] right-[24px] md:bottom-[24px] md:right-[80px] z-[9999] flex items-center justify-center w-11 h-11 bg-white border-2 border-black rounded-full shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:bg-[#ffeef2] active:translate-y-0 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer pointer-events-auto"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
</>
  );
}

function HomeInitiativesSectionShell() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.1 });
  const [animateBar, setAnimateBar] = useState(false);

  useEffect(() => {
    if (isInView) {
      setAnimateBar(true);
    }
  }, [isInView]);

  return (
    <section className="relative w-full py-16 md:py-24 overflow-visible">
      <style>{`@import url('https://fonts.cdnfonts.com/css/satoshi');`}</style>
      <div className="relative w-full container mx-auto max-w-7xl px-6 flex flex-col justify-start gap-2 md:gap-3">
        <div className="relative w-full overflow-visible select-none py-0 md:py-1">
          <div ref={headingRef} className="relative inline-block overflow-visible pl-2 md:pl-4 mb-4 md:mb-6">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={animateBar ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="absolute left-[-2rem] md:left-[-4rem] right-[-1rem] md:right-[-2rem] top-1/2 -translate-y-1/2 h-[110%] bg-[#d955a4]/85 z-0"
            />
            <motion.h2
              initial={{ x: -60, opacity: 0 }}
              animate={animateBar ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 font-sans text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.15em] text-gray-900 dark:text-white leading-none"
            >
              INITIATIVES
            </motion.h2>
          </div>
        </div>

        <InitiativesScrapbook />

        <div className="relative z-[100] mt-6 md:mt-2 flex justify-center items-center w-full px-4">
          <Link
            to="/initiatives"
            className="relative inline-block z-[100] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <img
              src={pixelBtn}
              alt="See All Initiatives"
              className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-auto object-contain"
            />
            <span
              className="absolute inset-0 flex items-center justify-center text-black text-center font-bold pointer-events-none"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(0.7rem, 1.0vw, 1.1rem)",
                letterSpacing: "0.08em",
                lineHeight: "1.0",
              }}
            >
              See All <br className="sm:hidden" />
              Initiatives →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomeInitiativesStaticSection() {
  return <HomeInitiativesSectionShell />;
}

function HomeInitiativesScrollSection() {
  return <HomeInitiativesSectionShell />;
}
