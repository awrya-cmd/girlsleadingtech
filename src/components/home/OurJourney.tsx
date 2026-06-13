import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import pixelStarImg from "@/assets/pixelstar.png";

// Import actual timeline mascots t1 to t5
import t1 from "@/assets/timeline/t1.png";
import t2 from "@/assets/timeline/t2.png";
import t3 from "@/assets/timeline/t3.png";
import t4 from "@/assets/timeline/t4.png";
import t5 from "@/assets/timeline/t5.png";

interface MilestoneCard {
  date: string;
  title: string;
  description: string;
  mascot: string;
}

const milestones: MilestoneCard[] = [
  {
    date: "June 2024",
    title: "The Beginning",
    description: "It began with just 5 girls attending a WTM session, sparking a vision for a community for girls in STEM.",
    mascot: t1,
  },
  {
    date: "Diwali 2024",
    title: "The Community Launch",
    description: "Girls in Tech officially opened its doors to girls across India, and within weeks, over 500 girls had joined the movement.",
    mascot: t2,
  },
  {
    date: "December 2024",
    title: "Momentum Takes Off",
    description: "In just a few months, the community doubled from 500 to 1000 members, proving how many girls were looking for a space to build, lead and learn.",
    mascot: t3,
  },
  {
    date: "April 2025",
    title: "Girls Leading Tech",
    description: "As the vision expanded beyond opportunity sharing, Girls in Tech became Girls Leading Tech. We also began launching our own initiatives, events, and programs for the community.",
    mascot: t4,
  },
  {
    date: "Aug  2025",
    title: "3,000+ Girls & Growing",
    description: "From mentorship cohorts and fellowships to hackathons, learning programs, and community-led initiatives, Girls Leading Tech continues empowering thousands of girls to rise together.",
    mascot: t5,
  },
];

const pinkFilter = "brightness(0) saturate(100%) invert(47%) sepia(51%) saturate(1450%) hue-rotate(285deg) brightness(93%) contrast(93%)";

export default function OurJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  // Custom client-side scroll progress tracking to avoid SSR and Framer Motion target tracking bugs
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerTop = rect.top + scrollTop;
      const totalScrollable = rect.height - window.innerHeight;

      const progress = totalScrollable <= 0
        ? 0
        : Math.min(1, Math.max(0, (scrollTop - containerTop) / totalScrollable));
      scrollYProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scrollYProgress]);

  // 6 slides total (5 milestones + 1 concluding slide)
  // Track is w-[600vw]; translate from 0vw to -500vw to show all 6 slides
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0vw", "-500vw"]);

  // Set the active card index for indicators/controls based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.05) {
      setActiveCard(0);
    } else if (latest > 0.95) {
      setActiveCard(5);
    } else {
      const relativeProgress = (latest - 0.05) / (0.95 - 0.05);
      const index = Math.min(5, Math.max(0, Math.round(relativeProgress * 5)));
      setActiveCard(index);
    }
  });

  // Smooth scroll to slide — maps index [0..5] to scroll range [0.05, 0.95]
  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const containerTop = rect.top + scrollTop;
    const totalScrollable = rect.height - window.innerHeight;

    const progress = 0.05 + (index / 5) * (0.95 - 0.05);
    const targetScroll = containerTop + progress * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const highlightNumbers = (text: string) => {
    const parts = text.split(/(\b\d{1,3}(?:,\d{3})*\+?)/g);
    return parts.map((part, i) => {
      if (/^\d{1,3}(?:,\d{3})*\+?$/.test(part)) {
        return (
          <span key={i} className="text-[#d955a4] font-black underline decoration-[#d955a4] decoration-2 underline-offset-4">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#ffed95] z-10 w-full overflow-visible -mt-8 md:-mt-12 lg:-mt-16">

      {/* Local CSS: override overflow-x to clip so position:sticky works in all browsers */}
      <style dangerouslySetInnerHTML={{__html: `
        html, body { overflow-x: clip !important; }
      `}} />

      {/* Load Caveat font for wave divider */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');`}</style>

      {/* Sticky viewport — fullscreen height for correct sticky pinning */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col z-10 bg-[#ffed95]">

        {/* Decorative pixel stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.4] z-0">
          <motion.img
            src={pixelStarImg} alt="pixel star 1" className="absolute w-8 h-8"
            style={{ left: "12%", top: "18%", filter: pinkFilter }}
            animate={{ rotate: [0, 360], y: [0, -6, 0] }}
            transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.img
            src={pixelStarImg} alt="pixel star 2" className="absolute w-6 h-6"
            style={{ left: "38%", top: "72%", filter: pinkFilter }}
            animate={{ rotate: [0, -360], y: [0, 8, 0] }}
            transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.img
            src={pixelStarImg} alt="pixel star 3" className="absolute w-10 h-10"
            style={{ left: "62%", top: "25%", filter: pinkFilter }}
            animate={{ rotate: [0, 360], y: [0, -8, 0] }}
            transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.img
            src={pixelStarImg} alt="pixel star 4" className="absolute w-8 h-8"
            style={{ left: "84%", top: "68%", filter: pinkFilter }}
            animate={{ rotate: [0, -360], y: [0, 6, 0] }}
            transition={{ rotate: { duration: 14, repeat: Infinity, ease: "linear" }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
          />
        </div>

        {/* Centered content area — compact vertical group in the middle of the screen */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 overflow-hidden">

          {/* Horizontal sliding track */}
          <div className="w-full overflow-hidden">
            <motion.div style={{ x }} className="flex w-[600vw] select-none">

              {/* Slides 1–5: Milestone cards */}
              {milestones.map((card, idx) => (
                <div
                  key={idx}
                  className="w-screen flex-shrink-0 flex flex-col items-center justify-center px-6 sm:px-12 md:px-24 text-center"
                >
                  <div className="flex flex-col items-center gap-0 max-w-2xl w-full">

                    {/* Mascot — larger on all breakpoints */}
                    <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 flex-shrink-0 flex items-center justify-center">
                      <img
                        src={card.mascot}
                        alt="Timeline mascot"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Date */}
                    <div className="mt-4 md:mt-5">
                      <h2 className="text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none font-sans">
                        {card.date}
                      </h2>
                    </div>

                    {/* Title */}
                    <div className="mt-2 md:mt-3">
                      <h3 className="text-[#d955a4] text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold tracking-tight font-sans text-center">
                        {highlightNumbers(card.title)}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="mt-3 md:mt-4">
                      <p className="text-gray-900 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-md sm:max-w-xl md:max-w-2xl font-sans font-bold text-center">
                        {highlightNumbers(card.description)}
                      </p>
                    </div>

                  </div>
                </div>
              ))}

              {/* Slide 6: Concluding slide */}
              <div className="w-screen flex-shrink-0 flex flex-col items-center justify-center px-6 sm:px-12 md:px-24 text-center">
                <div className="flex flex-col items-center gap-0 max-w-2xl w-full">

                  {/* Paper plane doodle */}
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-[#d955a4]"
                    style={{ transform: "rotate(-15deg)" }}
                  >
                    <path d="M58 6L6 28l20 4 4 20 10-14L58 6z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M26 32l14-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>

                  {/* Capsule box */}
                  <div className="mt-6 md:mt-8 border-2 border-[#d955a4]/40 bg-[#d955a4]/8 rounded-2xl px-8 py-5 md:px-12 md:py-6 shadow-md">
                    <h3 className="whitespace-nowrap text-[#d955a4] text-lg sm:text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-[0.15em] leading-none font-sans text-base sm:text-s md:text-l lg:text-xl">
                      Our Journey Continues With You
                    </h3>
                  </div>

                  {/* Subtext */}
                  <div className="mt-4 md:mt-5">
                    <p className="text-gray-900 text-sm sm:text-base md:text-lg leading-relaxed max-w-md font-sans font-bold text-center">
                      Together, we're building a future where every girl in STEM can thrive.
                    </p>
                  </div>

                </div>
              </div>

            </motion.div>
          </div>

          {/* Navigation controls — sits below the track, within the centered content area */}
          <div className="flex flex-col items-center gap-3 mt-6 md:mt-8 z-20 select-none">

            {/* Arrows */}
            <div className="flex items-center gap-4 md:gap-6">
              <button
                onClick={() => activeCard > 0 && scrollToSlide(activeCard - 1)}
                disabled={activeCard === 0}
                className={`w-11 h-8 md:w-14 md:h-10 border-2 border-black bg-white flex items-center justify-center transition-all cursor-pointer rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                  activeCard === 0 ? "opacity-30 cursor-not-allowed shadow-none" : "hover:bg-[#ffeaf5] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                }`}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-black stroke-[2.5]" />
              </button>
              <button
                onClick={() => activeCard < 5 && scrollToSlide(activeCard + 1)}
                disabled={activeCard === 5}
                className={`w-11 h-8 md:w-14 md:h-10 border-2 border-black bg-white flex items-center justify-center transition-all cursor-pointer rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                  activeCard === 5 ? "opacity-30 cursor-not-allowed shadow-none" : "hover:bg-[#ffeaf5] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                }`}
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black stroke-[2.5]" />
              </button>
            </div>

            {/* Progress dots — 6 total */}
            <div className="flex items-center gap-2 md:gap-2.5">
              {Array.from({ length: 6 }).map((_, idx) => {
                const dotColors = ["#FF8FAB", "#d955a4", "#f0b158", "#FF8FAB", "#d955a4", "#f0b158"];
                const isActive = activeCard === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSlide(idx)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full border border-black/30 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "scale-125 opacity-100 shadow-[1px_1px_0px_rgba(0,0,0,1)] border-black"
                        : "opacity-40 hover:opacity-60 scale-100"
                    }`}
                    style={{ backgroundColor: dotColors[idx] }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>

          </div>

        </div>

      </div>

     
    </div>
  );
}
