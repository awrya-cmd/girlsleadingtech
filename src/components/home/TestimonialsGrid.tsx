import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { testimonials } from "@/data/community";

// Canvas Dotted Background
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

// 1. Desktop Card Styling: Yellow base (#ffed95) + Pink bar (#ffc8e3) + Montserrat/Press Start 2P
interface CardProps {
  quote: string;
  name: string;
  role: string;
  className?: string;
}

function DesktopTestimonialCard({ quote, name, role, className = "" }: CardProps) {
  return (
    <div
      className={`
        flex flex-col 
        rounded-[14px] 
        overflow-hidden 
        border-2 border-black 
        bg-[#ffed95] 
        shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] 
        transition-all duration-200 
        hover:-translate-y-1 hover:translate-x-[-1px] 
        hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]
        ${className}
      `}
    >
      {/* PINK HEADER BAR */}
      <div
        className="w-full flex items-center bg-[#ffc8e3] border-b-2 border-black select-none"
        style={{
          height: "30px",
          paddingLeft: "12px",
          gap: 6,
        }}
      >
        {/* three dots */}
        {["#FF8FAB", "#d955a4", "#f0b158"].map((c, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full inline-block"
            style={{
              background: c,
            }}
          />
        ))}
      </div>

      {/* YELLOW BODY BASE */}
      <div className="flex-1 flex flex-col justify-between p-4 md:p-5 gap-3">
        <p
          className="text-gray-900"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontWeight: 600,
            fontSize: "10px",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>

        <div className="flex flex-col gap-2">
          {/* divider */}
          <div className="w-8 h-[2px] bg-[#d955a4] rounded" />

          <div>
            <p
              className="text-gray-900 font-bold"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "12px",
                margin: 0,
              }}
            >
              {name}
            </p>
            <p
              className="text-gray-700 font-normal"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "10px",
                margin: "2px 0 0",
              }}
            >
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Mobile Card Styling: Same size, styling & spacing + warm off-white background (#fffdf9)
function MobileTestimonialCard({ quote, name, role }: CardProps) {
  return (
    <div
      className="
        flex flex-col 
        rounded-[14px] 
        overflow-hidden 
        border-2 border-black 
        bg-[#fffdf9] 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        w-[290px]
        h-[220px]
      "
    >
      {/* PINK HEADER BAR */}
      <div
        className="w-full flex items-center bg-[#ffc8e3] border-b-2 border-black select-none"
        style={{
          height: "34px",
          paddingLeft: "16px",
          gap: 6,
        }}
      >
        {/* three dots */}
        {["#FF8FAB", "#d955a4", "#f0b158"].map((c, i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{
              background: c,
            }}
          />
        ))}
      </div>

      {/* BODY */}
      <div className="flex-1 flex flex-col justify-between p-5 gap-3">
        <p
          className="text-gray-900"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontWeight: 600,
            fontSize: "10px",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>

        <div className="flex flex-col gap-2">
          {/* divider */}
          <div className="w-8 h-[2px] bg-[#d955a4] rounded" />

          <div>
            <p
              className="text-gray-900 font-bold"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "12px",
                margin: 0,
              }}
            >
              {name}
            </p>
            <p
              className="text-gray-600 font-normal"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "10px",
                margin: "2px 0 0",
              }}
            >
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to get randomized/floating parameters for desktop cards
const getDesktopCardStyle = (index: number) => {
  const rotations = [
    "rotate-[-2deg]",
    "rotate-[1.5deg]",
    "rotate-[-1deg]",
    "rotate-[2deg]",
    "rotate-[-1.5deg]",
    "rotate-[1deg]",
  ];
  const translates = [
    "translate-y-2",
    "-translate-y-4",
    "translate-y-6",
    "-translate-y-2",
    "translate-y-8",
    "-translate-y-8",
  ];
  const widths = [
    "w-[270px]",
    "w-[250px]",
    "w-[330px]",
    "w-[260px]",
    "w-[290px]",
    "w-[310px]",
  ];

  const rot = rotations[index % rotations.length];
  const trans = translates[index % translates.length];
  const w = widths[index % widths.length];

  return `${rot} ${trans} ${w} shrink-0`;
};

export default function TestimonialsGrid() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-play interval for mobile slider
  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isDragging]);

  const cardWidth = 290;
  const gap = 16;
  const totalWidth = cardWidth + gap;

  return (
    <section className="relative py-12 md:py-16 overflow-hidden w-full bg-[#fdf9f5] min-h-[90vh] md:h-[95vh] md:max-h-[850px] flex flex-col justify-between">
      {/* Canvas dotted background */}
      <TestimonialPixelBackground />

      {/* ---------------- MOBILE LAYOUT ---------------- */}
      <div className="flex flex-col md:hidden w-full flex-1 justify-center gap-10">
        {/* Slider viewport container */}
        <div className="w-full overflow-hidden py-4 relative">
          <div className="w-full overflow-visible flex justify-start">
            <motion.div
              drag="x"
              dragConstraints={{
                left: -((testimonials.length - 1) * totalWidth),
                right: 0,
              }}
              dragElastic={0.25}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, info) => {
                setIsDragging(false);
                const dragOffset = info.offset.x;
                const dragVelocity = info.velocity.x;

                let nextIndex = mobileIndex;
                if (dragOffset < -40 || dragVelocity < -150) {
                  nextIndex = Math.min(mobileIndex + 1, testimonials.length - 1);
                } else if (dragOffset > 40 || dragVelocity > 150) {
                  nextIndex = Math.max(mobileIndex - 1, 0);
                }
                setMobileIndex(nextIndex);
              }}
              animate={{ x: -mobileIndex * totalWidth }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="flex gap-4 cursor-grab active:cursor-grabbing px-[calc(50vw-145px)]"
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-[290px] h-[220px] shrink-0">
                  <MobileTestimonialCard quote={t.quote} name={t.name} role={t.role} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Centered Heading BELOW carousel on Mobile */}
        <div className="flex flex-col items-center text-center px-6">
          <p
            className="text-xs uppercase tracking-[0.35em] text-[#d955a4] font-black"
            style={{
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            OUR STORIES
          </p>
          <h2 className="font-sans text-3xl font-bold text-gray-900 mt-3 leading-none">
            What{" "}
            <span
              className="italic font-medium text-[#5b2b4a] pr-1"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              People
            </span>
            Say
          </h2>
        </div>
      </div>

      {/* ---------------- DESKTOP LAYOUT ---------------- */}
      <div className="hidden md:flex flex-col justify-between w-full h-full container mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Floating Playful Neo-Brutalist SVGs (Doodles from Reference Image) */}
        <div className="absolute top-[8%] left-[6%] text-[#ffc8e3] pointer-events-none select-none z-0 rotate-[12deg] opacity-70">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 20L20 12L4 4V20Z" fill="#ffc8e3" stroke="black" strokeWidth="2.2" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="absolute top-[5%] right-[12%] text-gray-900 pointer-events-none select-none z-0 opacity-60">
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none" className="animate-spin-slow">
            <path d="M20 0V40M0 20H40M6 6L34 34M6 34L34 6" stroke="black" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="absolute top-[48%] left-[4%] text-[#ffed95] pointer-events-none select-none z-0 opacity-80 rotate-[-15deg]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 0L14.5 8.5L23 11L14.5 13.5L12 22L9.5 13.5L1 11L9.5 8.5L12 0Z" fill="#ffed95" stroke="black" strokeWidth="1.8" />
          </svg>
        </div>
        <div className="absolute top-[45%] right-[7%] text-gray-400 pointer-events-none select-none z-0 opacity-30">
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="black" strokeWidth="1.5">
            <circle cx="24" cy="24" r="20" />
            <path d="M4 24H44" />
            <path d="M24 4C29 10 29 38 24 44C19 38 19 10 24 4Z" />
            <path d="M5.5 14H42.5" />
            <path d="M5.5 34H42.5" />
          </svg>
        </div>
        <div className="absolute bottom-[28%] left-[45%] text-gray-400 pointer-events-none select-none z-0 opacity-30 rotate-[25deg]">
          <svg width="32" height="20" viewBox="0 0 36 24" fill="none" stroke="black" strokeWidth="1.5">
            <ellipse cx="18" cy="12" rx="16" ry="8" />
            <ellipse cx="18" cy="14" rx="12" ry="5" />
          </svg>
        </div>

        {/* Scattered / Floating Grid with custom alignment & translates */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 max-w-6xl mx-auto w-full pt-6 select-none">
          {testimonials.map((t, index) => (
            <DesktopTestimonialCard
              key={t.id}
              quote={t.quote}
              name={t.name}
              role={t.role}
              className={getDesktopCardStyle(index)}
            />
          ))}
        </div>

        {/* Bottom-left Heading with breathing room */}
        <div className="mt-8 self-start max-w-2xl pb-4">
          <p
            className="text-sm md:text-base uppercase tracking-[0.35em] text-[#d955a4] font-black"
            style={{
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            OUR STORIES
          </p>
          <h2 className="font-sans text-4xl md:text-6xl font-bold text-gray-900 mt-4 leading-none">
            What{" "}
            <span
              className="italic font-medium text-[#5b2b4a] pr-1"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              People
            </span>
            Say
          </h2>
        </div>

      </div>
    </section>
  );
}
