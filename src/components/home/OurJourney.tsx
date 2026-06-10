import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import pixelStarImg from "@/assets/pixelstar.png";

// Import gallery photos from assets
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.webp";
import gallery4 from "@/assets/gallery-4.webp";
import gallery5 from "@/assets/gallery-5.webp";

// Import actual timeline mascots t1 to t5
import t1 from "@/assets/timeline/t1.png";
import t2 from "@/assets/timeline/t2.png";
import t3 from "@/assets/timeline/t3.png";
import t4 from "@/assets/timeline/t4.png";
import t5 from "@/assets/timeline/t5.png";

interface MilestoneCard {
  date: string;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  mascot: string;
}

const milestones: MilestoneCard[] = [
  {
    date: "June 2024",
    subtitle: "THE BEGINNING",
    title: "Girls in Tech Begins",
    description: "Started with a small WhatsApp group created after a session attended by just a handful of girls.",
    image: gallery1,
    mascot: t1,
  },
  {
    date: "Diwali 2024",
    subtitle: "COMMUNITY LAUNCH",
    title: "Opening the Doors",
    description: "The community expanded beyond personal networks and welcomed girls from across India.",
    image: gallery2,
    mascot: t2,
  },
  {
    date: "December 2024",
    subtitle: "1,000+ MEMBERS",
    title: "A Growing Movement",
    description: "What started as a small initiative became a support network of 1,000+ ambitious builders and dreamers.",
    image: gallery3,
    mascot: t3,
  },
  {
    date: "April 2025",
    subtitle: "A NEW IDENTITY",
    title: "Girls Leading Tech",
    description: "The community evolved from Girls in Tech to Girls Leading Tech, reflecting a bigger vision and stronger mission.",
    image: gallery4,
    mascot: t4,
  },
  {
    date: "2025",
    subtitle: "JUST GETTING STARTED",
    title: "3,000+ Girls & Growing",
    description: "3,000+ girls, dozens of volunteers, multiple initiatives, and a future still being written.",
    image: gallery5,
    mascot: t5,
  },
];

const pinkFilter = "brightness(0) saturate(100%) invert(47%) sepia(51%) saturate(1450%) hue-rotate(285deg) brightness(93%) contrast(93%)";

export default function OurJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Calculate horizontal translation for 6 slides:
  // 6 slides total = 600vw.
  // We translate from 0% to -83.333% (which translates 5 slides out of the viewport)
  // Animation happens when scroll progress is between 0.08 and 0.92
  const x = useTransform(scrollYProgress, [0.08, 0.92], ["0%", "-83.333%"]);

  // Hook to monitor scroll progress and set active card indicator
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.08) {
      setActiveCard(0);
    } else if (latest > 0.92) {
      setActiveCard(5); // Concluding slide is index 5
    } else {
      const relativeProgress = (latest - 0.08) / (0.92 - 0.08);
      const index = Math.min(5, Math.max(0, Math.round(relativeProgress * 5)));
      setActiveCard(index);
    }
  });

  // Scroll to a specific slide by translating to the corresponding vertical page offset
  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const containerTop = rect.top + scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    
    // Map index [0..5] to the scroll range [0.08, 0.92]
    const progress = 0.08 + (index / 5) * (0.92 - 0.08);
    const targetScroll = containerTop + progress * totalScrollable;
    
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  // Helper to dynamically highlight numbers like 1,000+ or 3,000+
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
    <div ref={containerRef} className="relative h-[600vh] bg-[#FFF2B2] z-10 w-full overflow-visible">
      
      {/* Sticky viewport content */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between z-10 py-3 pb-3 md:py-6 md:pb-4 bg-[#FFF2B2]">
        
        {/* Sticky decorative pixel stars in background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.6] z-0">
          <motion.img
            src={pixelStarImg}
            alt="pixel star 1"
            className="absolute w-8 h-8"
            style={{ left: "12%", top: "18%", filter: pinkFilter }}
            animate={{ rotate: [0, 360], y: [0, -6, 0] }}
            transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.img
            src={pixelStarImg}
            alt="pixel star 2"
            className="absolute w-6 h-6"
            style={{ left: "38%", top: "72%", filter: pinkFilter }}
            animate={{ rotate: [0, -360], y: [0, 8, 0] }}
            transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.img
            src={pixelStarImg}
            alt="pixel star 3"
            className="absolute w-10 h-10"
            style={{ left: "62%", top: "25%", filter: pinkFilter }}
            animate={{ rotate: [0, 360], y: [0, -8, 0] }}
            transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.img
            src={pixelStarImg}
            alt="pixel star 4"
            className="absolute w-8 h-8"
            style={{ left: "84%", top: "68%", filter: pinkFilter }}
            animate={{ rotate: [0, -360], y: [0, 6, 0] }}
            transition={{ rotate: { duration: 14, repeat: Infinity, ease: "linear" }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
          />
        </div>

        {/* Scrollable horizontal track */}
        <div className="flex-grow flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex h-full w-[600vw] select-none">
            
            {/* Slides 1-5: The Milestones */}
            {milestones.map((card, idx) => {
              const isLastMascot = idx === 4;
              const mascotMobileClass = isLastMascot 
                ? "w-44 h-44 sm:w-52 sm:h-52 object-contain" 
                : "w-32 h-32 sm:w-36 sm:h-36 object-contain";
              const mascotDesktopClass = isLastMascot
                ? "md:w-52 md:h-52 lg:w-72 lg:h-72 xl:w-[320px] xl:h-[320px] object-contain transition-transform duration-300 hover:scale-105"
                : "md:w-36 md:h-36 lg:w-56 lg:h-56 xl:w-64 xl:h-64 object-contain transition-transform duration-300 hover:scale-105";

              return (
                <div
                  key={idx}
                  className="w-screen h-full flex-shrink-0 flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 relative"
                >
                  {/* Content Container */}
                  <div className="max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12 lg:gap-16 z-10 relative">
                    
                    {/* Mascot for mobile screens only (centered at the top) */}
                    <div className="w-full flex justify-center md:hidden mb-2">
                      <img
                        src={card.mascot}
                        alt="Mascot Mobile"
                        className={mascotMobileClass}
                      />
                    </div>

                    {/* Two-Column Grid on Mobile, normal flex elements on tablet/desktop */}
                    <div className="w-full grid grid-cols-2 gap-4 items-center md:contents">
                      
                      {/* Left Side: Mascot, Date, Heading & Story */}
                      <div className="w-full flex flex-col justify-center text-left pt-0 md:w-[50%] lg:w-[52%] xl:w-[55%]">
                        {/* Mascot for tablet & desktop screens only */}
                        <div className="hidden md:flex justify-start mb-2 md:mb-3 md:-ml-4 lg:-ml-8 xl:-ml-12">
                          <img
                            src={card.mascot}
                            alt="Mascot Desktop"
                            className={mascotDesktopClass}
                          />
                        </div>

                      <div className="space-y-1 sm:space-y-1.5 md:space-y-2.5">
                        {/* Date Heading */}
                        <h2 
                          className="text-[#24101F] text-lg sm:text-xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight leading-none"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {card.date}
                        </h2>
                        {/* Subheading (Title) */}
                        <h3 
                          className="text-[#d955a4] text-[10px] sm:text-xs md:text-base lg:text-lg xl:text-xl font-extrabold tracking-tight"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {highlightNumbers(card.title)}
                        </h3>
                        {/* Description */}
                        <p 
                          className="text-[#24101F]/85 text-[10px] sm:text-xs md:text-base lg:text-lg xl:text-xl leading-relaxed max-w-xl lg:max-w-2xl"
                          style={{ fontFamily: "'Satoshi', sans-serif" }}
                        >
                          {highlightNumbers(card.description)}
                        </p>
                      </div>
                    </div>

                    {/* Right Side: Normal Image */}
                    <div className="w-full flex justify-center items-center md:w-[45%] md:relative md:-translate-y-8 mt-0 md:mt-0 lg:w-[42%] xl:w-[40%]">
                      <div className="w-[100px] sm:w-[130px] md:w-[200px] lg:w-[280px] xl:w-[320px] aspect-square rounded-[16px] md:rounded-[24px] border-[2px] md:border-[5px] border-white shadow-2xl overflow-hidden bg-[#FFF2B2] flex-shrink-0">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover filter saturate-[0.9] select-none pointer-events-none"
                          draggable={false}
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}

            {/* Slide 6: Concluding Tag (Our Journey Continues With You) */}
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 relative">
              <div className="max-w-4xl w-full flex flex-col items-center text-center justify-center gap-4 md:gap-8 z-10 relative">
                
                {/* Paper plane icon */}
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: 15 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[#d955a4] mb-1 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32 text-[#d955a4] filter drop-shadow-[0_4px_12px_rgba(217,85,164,0.25)]"
                    style={{ transform: "rotate(-15deg)" }}
                  >
                    <path d="M22 2L2 12L11 13L22 2Z" fill="currentColor" fillOpacity="0.1" />
                    <path d="M22 2L11 13L15 22L22 2Z" fill="currentColor" fillOpacity="0.15" />
                    <path d="M11 13V19L14 16" />
                  </svg>
                </motion.div>

                {/* Capsule tag */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="rounded-full bg-[#d955a4]/10 px-6 py-2.5 md:px-12 md:py-5 border border-[#d955a4]/30 shadow-lg"
                >
                  <h3 
                    className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-[#d955a4] uppercase tracking-widest leading-none font-sans"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Our Journey Continues With You
                  </h3>
                </motion.div>

                {/* Concluding subtext */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-xs sm:text-base md:text-lg lg:text-xl text-[#24101F]/80 font-medium max-w-xl mt-1 md:mt-2 leading-relaxed font-sans"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Together, we're building a future where every girl in tech can thrive.
                </motion.p>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Centered Controls Overlay at the bottom */}
        <div className="w-full flex flex-col items-center justify-center gap-2 md:gap-3 pb-2 md:pb-4 z-20 select-none">
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => activeCard > 0 && scrollToSlide(activeCard - 1)}
              disabled={activeCard === 0}
              className={`w-11 h-8 md:w-14 md:h-10 border-2 border-[#d955a4] bg-white flex items-center justify-center transition-all cursor-pointer rounded-none shadow-[2px_2px_0px_rgba(217,85,164,1)] ${
                activeCard === 0 ? "opacity-40 cursor-not-allowed shadow-none" : "hover:bg-[#ffeaf5] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(217,85,164,1)]"
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#d955a4] stroke-[2.5]" />
            </button>
            <button
              onClick={() => activeCard < 5 && scrollToSlide(activeCard + 1)}
              disabled={activeCard === 5}
              className={`w-11 h-8 md:w-14 md:h-10 border-2 border-[#d955a4] bg-white flex items-center justify-center transition-all cursor-pointer rounded-none shadow-[2px_2px_0px_rgba(217,85,164,1)] ${
                activeCard === 5 ? "opacity-40 cursor-not-allowed shadow-none" : "hover:bg-[#ffeaf5] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(217,85,164,1)]"
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#d955a4] stroke-[2.5]" />
            </button>
          </div>

          {/* Progress dots indicators */}
          <div className="flex items-center gap-2 md:gap-2.5">
            {Array.from({ length: 6 }).map((_, idx) => {
              const dotColors = ["#FF8FAB", "#d955a4", "#f0b158", "#FF8FAB", "#d955a4", "#f0b158"];
              const color = dotColors[idx];
              const isActive = activeCard === idx;
              return (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full border border-black/30 transition-all duration-350 cursor-pointer ${
                    isActive
                      ? "scale-125 opacity-100 shadow-[1px_1px_0px_rgba(0,0,0,1)] border-black"
                      : "opacity-40 hover:opacity-60 scale-100"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
