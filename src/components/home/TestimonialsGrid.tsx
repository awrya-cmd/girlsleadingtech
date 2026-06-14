import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { testimonials } from "@/data/community";
import mascotImpact from "@/assets/main-mascot/showing-impact.png";
import GridBackground from "@/components/shared/GridBackground";
import RetroCard from "../shared/RetroCard";
import srinayanaImg from "@/assets/video-testimonials/Srinayana-Mandalapu.png";
import varshaImg from "@/assets/video-testimonials/Varsha-Dewangan.png";
import nehaImg from "@/assets/video-testimonials/A.Neha-Sabari- Sree.png";


function TestimonialsMarquee() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // We repeat the testimonials array to support seamless infinite loop.
  // With 6 testimonials, duplicating 4 times (24 cards) ensures no gaps on extremely wide viewports.
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let speed = 1.0; // smooth scrolling speed
    let animationId: number;

    const tick = () => {
      if (!el) return;

      if (!isDown.current && !isInteracting) {
        el.scrollLeft += speed;

        // Reset seamlessly when scrolled halfway through
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationId);
  }, [isInteracting]);

  // Seamless looping check during manual interactions (drag/scroll)
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    if (el.scrollLeft >= halfWidth) {
      el.scrollLeft -= halfWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += halfWidth;
    }
  };

  // Mouse Drag Event Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    setIsInteracting(true);
    startX.current = e.pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeft.current = containerRef.current?.scrollLeft || 0;
  };

  const handleMouseLeaveOrUp = () => {
    isDown.current = false;
    setIsInteracting(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Touch Event Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    isDown.current = true;
    setIsInteracting(true);
    startX.current = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeft.current = containerRef.current?.scrollLeft || 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDown.current || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseLeave={handleMouseLeaveOrUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleMouseLeaveOrUp}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsInteracting(true)}
      className="flex gap-8 overflow-x-auto select-none py-10 px-8 cursor-grab active:cursor-grabbing w-full
        [&::-webkit-scrollbar]:hidden
        [scrollbar-width:none]"
      style={{
        maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
      }}
    >
      {marqueeItems.map((card, idx) => (
  <RetroCard key={`${card.id}-${idx}`}>
    <div className="flex-1 flex flex-col justify-start bg-[#ffc8e3] p-6 sm:p-7 gap-5">
      <p
        className="text-gray-900 font-bold"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontWeight: 700,
          fontSize: "clamp(0.65rem, 1.2vw, 0.70rem)",
          lineHeight: 1.8,
          margin: 0,
        }}
      >
        &ldquo;{card.quote}&rdquo;
      </p>

      <div className="flex flex-col gap-3">
        <div className="w-10 h-[2.5px] bg-[#d955a4] rounded" />

        <div>
          <p
            className="text-gray-900 font-bold"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.76rem, 1.4vw, 0.9rem)",
              margin: 0,
            }}
          >
            {card.name}
          </p>

          <p
            className="text-gray-900 font-normal mt-1"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)",
              margin: "4px 0 0",
            }}
          >
            {card.role}
          </p>
        </div>
      </div>
    </div>
  </RetroCard>
))}
    </div>
  );
}

export function TestimonialsGrid() {
  const videoTestimonials = [
    {
      id: 1,
      name: "Srinayana Mandalapu",
      role: "Open Source Contributor & Dev",
      videoUrl: "https://drive.google.com/file/d/16REYn5cVvj4I6YOcBIczlNEMbLKmfh9J/view?usp=sharing",
      image: srinayanaImg,
      objectPosition: "center",
    },
    {
      id: 2,
      name: "Varsha Dewangan",
      role: "GLT Fellowship Alumna",
      videoUrl: "https://drive.google.com/drive/folders/11lHNQviYvT7fDhDMYZRWbVVgDgvt6Sbv",
      image: varshaImg,
      objectPosition: "center 30%",
    },
    {
      id: 3,
      name: "A. Neha Sabari Sree",
      role: "Hackathon Organizer",
      videoUrl: "https://drive.google.com/file/d/1T9WVbX0wYEEAYUtsQKpAxVdhcDo42VLQ/view?usp=sharing",
      image: nehaImg,
      objectPosition: "center",
    },
  ];

  return (
    <section className="relative pt-16 md:pt-20 pb-16 md:pb-24 overflow-hidden w-full bg-[#fdf9f5] flex flex-col justify-center">
      {/* Canvas dotted background replaced with GridBackground */}
      <GridBackground />

      <style>{`
        @keyframes mascot-breathe {
          0%, 100% { transform: translateY(0px) rotate(-0.8deg); }
          40%      { transform: translateY(-9px) rotate(0.8deg); }
          70%      { transform: translateY(-4px) rotate(-0.3deg); }
        }
        .mascot-breathe {
          animation: mascot-breathe 3.6s ease-in-out infinite;
          transform-origin: bottom center;
          will-change: transform;
        }
      `}</style>

      {/* HEADER AREA */}
      <div className="relative z-10 flex justify-center px-6 mb-4">
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
          <img
            src={mascotImpact}
            alt="GLT Mascot"
            className="
              w-20
              sm:w-24
              md:w-36
              lg:w-44
              h-auto
              object-contain
              mascot-breathe
              shrink-0
            "
          />
        
          <div className="flex flex-col items-center text-center">
            <p
              className="text-[10px] sm:text-xs md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold"
              style={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              OUR STORIES
            </p>

            <h2
              className="
                font-sans
                text-[1.9rem]
                sm:text-[2.5rem]
                md:text-5xl
                font-bold
                text-foreground
                leading-tight
                whitespace-nowrap
              "
            >
              What{" "}
              <span
                className="mx-1 md:mx-2 italic font-medium text-[#5b2b4a]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                People
              </span>{" "}
              Say.
            </h2>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="relative z-10 w-full overflow-visible">
        <TestimonialsMarquee />
      </div>

      {/* VIDEO TESTIMONIALS SECTION */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-16 md:mt-20">
        <div className="text-center mb-10 md:mb-12">
          <h3
            className="font-sans text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-wide text-foreground"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Experiences that inspire
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {videoTestimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-[16px] overflow-hidden border-2 border-black bg-transparent p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              {/* Window control bar */}
              <div className="w-full flex items-center justify-between shrink-0 pb-3 border-b border-black/15 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF8FAB] border border-black/10" />
                  <span className="w-2 h-2 rounded-full bg-[#d955a4] border border-black/10" />
                  <span className="w-2 h-2 rounded-full bg-[#f0b158] border border-black/10" />
                </div>
                <span className="text-[9px] font-mono text-black/50 font-bold uppercase tracking-wider">
                  glt_story_0{item.id}.mp4
                </span>
              </div>

              {/* Clickable video placeholder showing screenshot */}
              <div
                onClick={() => window.open(item.videoUrl, "_blank")}
                className="w-full aspect-video bg-transparent border-2 border-black rounded-lg flex items-center justify-center relative overflow-hidden group/video cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: item.objectPosition }}
                />
                
                <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04]" />

                <div className="absolute inset-x-0 bottom-0 bg-black/40 py-2 text-center translate-y-full group-hover/video:translate-y-0 transition-transform duration-200 z-10">
                  <span className="text-[10px] font-mono text-white font-bold tracking-wider uppercase">
                    Play Video
                  </span>
                </div>
              </div>

              {/* Name and Play Button */}
              <div className="mt-4 flex items-center justify-between w-full gap-4">
                <h4
                  className="font-sans font-bold text-gray-900 text-lg leading-tight"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.name}
                </h4>

                {/* Retro Play Button positioned on the right of name */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.videoUrl, "_blank");
                  }}
                  className="w-14 h-14 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all duration-200 shrink-0 z-10"
                >
                  <svg className="w-5 h-5 text-black fill-black ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
