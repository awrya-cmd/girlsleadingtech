import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { GlassCard } from "@/components/site/GlassCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Marquee } from "@/components/site/Marquee";
import { SpeakerCard } from "@/components/site/SpeakerCard";
import { ArrowRight, Heart, Users, Sparkle, Star, Flower2, Linkedin } from "lucide-react";
import { stats } from "@/data/stats";
import { initiatives } from "@/data/initiatives";
import { speakers, testimonials } from "@/data/community";
import { communityPartners, industryPartners, ecosystemPartners } from "@/data/partners";
import { useState } from "react";
import { colleges } from "@/data/colleges";
import testimonialCard from "@/assets/testimonial-card.png"
import LborderCard from "@/components/ui/LborderCard";
import { InitiativesScrapbook } from "./initiatives";
import pixelBtn from "@/assets/pixel-button.png"
import presenting from "@/assets/characters/main-mascot/presenting.png"
import { TestimonialsGrid } from "@/components/home/TestimonialsGrid"


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
import SpeakersShowcase from "@/components/home/SpeakersShowcase";

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
    offset: ["start start", "end end"],
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

      {/* PICTURES SECTION */}
      <section className="relative py-18 pb-0 overflow-hidden">
        <GridBackground />
        
        
        {/* HEADING */}
        <div className="relative z-10 mb-12 flex flex-col items-center text-center pt-0">

          <p className="text-xs md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold"
          style={{ fontFamily: "'Montserrat', 'sans serif'"}}
          >
            COMMUNITY MOMENTS
          </p>

        </div>

        {/* MARQUEE */}
        <div className="relative z-10">
          <AutoCarousel images={galleryImages} />
        </div>

      </section>

      {/* ABOUT / VISION / MISSION */}
<section className="relative py-24 overflow-hidden">
  <GridBackground />

  <div className="relative container mx-auto max-w-6xl px-6">

    {/* Heading */}
    <div className="mb-12 text-center">

      <p
        className="text-xs md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold"
        style={{
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        ABOUT US
      </p>

      <h2 className="font-sans text-4xl mt-4 md:text-5xl font-bold text-foreground leading-tight">
        Built for{" "}
        <span
          className="mx-2 italic font-medium text-[#5b2b4a]"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          women
        </span>{" "}
        in tech.
      </h2>
    </div>

    {/* Cards */}
    <div className="grid gap-6 md:grid-cols-2">

      {/* VISION */}
      <motion.div
        initial={{
          opacity: 0,
          x: -70,
          y: -80,
          rotate: -3,
          scale: 0.92,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
        }}
    
        viewport={{
          once: true,
          amount: 0.6,
        }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 18,
          delay: 0.1,
        }}
      >
        <LborderCard>

          <h3
            className="text-2xl font-bold text-[#d955a4]"
            style={{
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            Our Vision
          </h3>

          <p className="mt-4 font-sans text-black leading-relaxed">
            A world where every girl who dreams in code, design or data
            has a community, a mentor and a runway to lead.
            No gatekeeping. Just glow-ups.
          </p>

        </LborderCard>
      </motion.div>

      {/* MISSION */}
      <motion.div
        initial={{
          opacity: 0,
          x: 70,
          y: 80,
          rotate: 3,
          scale: 0.92,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
        }}
 
      
        viewport={{
          once: true,
          amount: 0.6,
        }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 18,
          delay: 0.2,
        }}
      >
        <LborderCard>

          <h3
            className="text-2xl font-bold text-[#d955a4]"
            style={{
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            Our Mission
          </h3>

          <p className="mt-4 font-sans text-black leading-relaxed">
            To equip 100,000 women in tech across India with the
            resources, mentorship and confidence to ship the products
            and lead the teams of tomorrow.
          </p>

              </LborderCard>
            </motion.div>

          </div>
        </div>
      </section>


      {/* INITIATIVES — scrapbook stacked cards */}
      <section ref={initiativesSectionRef} className="relative w-full md:min-h-[280vh] py-16 md:py-24 overflow-visible">
        <style>{`@import url('https://fonts.cdnfonts.com/css/satoshi');`}</style>
        <div className="relative md:sticky md:top-[10vh] md:h-fit w-full container mx-auto max-w-7xl px-6 flex flex-col justify-start gap-2 md:gap-3">
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
                INITIATIVES
              </motion.h2>

            </div>
          </div>

      
          <InitiativesScrapbook scrollProgress={initiativesScrollYProgress} />
  

          {/* SEE ALL INITIATIVES BUTTON */}
          <div className="relative z-[100] mt-6 md:mt-2 flex justify-center items-center w-full px-4">
            <Link
              to="/initiatives"
              className="relative inline-block z-[100] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <img
                src={pixelBtn}
                alt="See All Initiatives"
                className="
                  w-[140px]
                  sm:w-[160px]
                  md:w-[180px]
                  lg:w-[200px]
                  h-auto
                  object-contain
                "
              />

              <span
                className="
                  absolute inset-0
                  flex items-center justify-center
                  text-black text-center font-bold
                  pointer-events-none
                "
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

      {/* SPEAKERS — featured static grid */}
     <div className="mt-6 md:mt-10">
          <SpeakersShowcase />
        </div>
            
      {/* TESTIMONIALS */}
      <TestimonialsGrid />

      {/* COLLEGES REACHED */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Reach"
            title="1000+ campuses, one community."
            description="A glimpse at the colleges where GLT members lead clubs, hackathons and chapters across India."
          />
          <div className="mt-14 flex flex-wrap justify-center gap-2">
            {colleges.slice(0, 36).map((c, i) => (
              <span
                key={c}
                className="rounded-full glass px-4 py-2 text-xs font-medium text-foreground/80 shadow-soft animate-fade-up"
                style={{ animationDelay: `${(i % 18) * 0.04}s` }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/impact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              See all colleges <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNERS — smooth marquee */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Partners"
            title="The companies cheering us on."
            description="Ecosystem, industry and community partners amplifying the movement."
          />
        </div>
        <div className="mt-14 space-y-6">
          {[
            { label: "Ecosystem", list: ecosystemPartners },
            { label: "Industry", list: industryPartners },
            { label: "Community", list: communityPartners },
          ].map((group, gi) => (
            <Marquee key={group.label} reverse={gi % 2 === 1}>
              {group.list.map((p) => {
                const inner = (
                  <div className="flex h-24 w-44 shrink-0 items-center justify-center    glass p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-soft">
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} loading="lazy" className="max-h-14 max-w-[80%] object-contain" />
                    ) : (
                      <span className="text-center text-xs font-display text-foreground/70">{p.name}</span>
                    )}
                  </div>
                );
                return p.website ? (
                  <a key={p.id} href={p.website} target="_blank" rel="noopener noreferrer" title={p.name}>
                    {inner}
                  </a>
                ) : (
                  <div key={p.id} title={p.name}>{inner}</div>
                );
              })}
            </Marquee>
          ))}
        </div>
        <div className="container mx-auto mt-10 max-w-6xl px-6 text-center">
          <Link to="/partners" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See all partners <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] gradient-sunset p-12 text-center shadow-soft md:p-16">
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-2xl animate-blob" />
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/20 blur-2xl animate-blob" style={{ animationDelay: "3s" }} />
            <h2 className="relative font-serif text-4xl text-white md:text-6xl">
              Your seat at the table is waiting.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/90">
              Become part of a community that builds, learns and lifts each other up.
            </p>
            <Link
              to="/join"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-primary shadow-soft transition hover:scale-105"
            >
              Join Girls Leading Tech <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
