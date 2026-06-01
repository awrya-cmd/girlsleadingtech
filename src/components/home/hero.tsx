import { useRef } from "react";
import { useEffect } from "react";
import { motion } from "motion/react";
import type { Variants } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { stats } from "@/data/stats";
import mascot from "@/assets/characters/main-mascot/idle.png";
import pixelBtn from "@/assets/pixel-button.png";



// colors
const PINK = "#d955a4";
const PINK_SOLID_BTN = "#d4456b";

// dot grid
function DotTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: `
          radial-gradient(circle, oklch(0.60 0.12 10 / 0.12) 1.2px, transparent 1.2px)
        `,
        backgroundSize: "22px 22px",
      }}
    />
  );
}

// side glow of bg 
function SideGlow() {
  return (
    <>
      {/* LEFT */}
      <div
        className="
          pointer-events-none
          absolute left-[-12%] top-[-10%]
          h-[120%] w-[50vw] md:w-[35vw]
          blur-3xl
          opacity-90
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,120,180,0.28) 0%, rgba(255,170,210,0.12) 45%, transparent 75%)",
        }}
      />

      {/* RIGHT */}
      <div
        className="
          pointer-events-none
          absolute right-[-12%] top-[-10%]
          h-[120%] w-[35vw]
          blur-3xl
          opacity-90
        "
        style={{
          background:
            "radial-gradient(circle, rgba(240,120,255,0.24) 0%, rgba(255,180,230,0.10) 45%, transparent 75%)",
        }}
      />

      {/* CENTER CREAM GLOW */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-[18rem]
          w-[90vw]
          md:h-[28rem]
          md:w-[50rem]
          -translate-x-1/2 -translate-y-1/2
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,190,0.28), transparent 72%)",
        }}
      />
    </>
  );
}

// grils text + mascot 
function HeroText() {
  const letters = "GIRLS".split("");
  return (
    <>
      
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');`}</style>

      <div className="relative flex items-end justify-center w-full max-w-[1200px]">
        <motion.div
          className="flex"
          animate={{ y: [0, 0, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          {letters.map((l, i) => (
            <span
              key={i}
              className="text-[clamp(5rem,22vw,12rem)]
                          sm:text-[clamp(6rem,18vw,12rem)] font-black tracking-wider"
              style={{
                color: PINK,
                letterSpacing: "+0.12em",
                fontFamily: "'Anton', sans-serif",
                fontWeight: 350,
                opacity: 0.9,
              }}
            >
              {l}
            </span>
          ))}
        </motion.div>

        <motion.img
          src={mascot}
          alt="mascot"
          className="absolute
              w-[90px]
              sm:w-[100px]
              md:w-[180px]
              lg:w-[220px]
              right-[-10%]
              md:right-[-12%]
              lg:right-[-30%]
              top-[15%]
                  
            "
            style={{

            filter: 
            "drop-shadow(0 12px 18px rgba(151, 148, 152, 0.84)) drop-shadow(0 0 22px rgba(255,120,210,0.35))",
          }}
                          
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </>
  );
}


// leading tech text
function SubText() {
  return (
  <>
  
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');`}</style>

    <div className="-mt-4 md:-mt-8">
      <span
        className="text-[clamp(0.9rem,3vw,2.5rem)] font-bold tracking-[0.3em] md:tracking-[0.55em]"
        style={{
          color: "#20182f",
          letterSpacing: "+0.40em",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        LEADING TECH
      </span>
    </div>
  </>
  );
}

// textured interactive bg 
function InteractivePixelBackground() {
   const canvasRef = useRef<HTMLCanvasElement | null>(null);
   type Pixel = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
};

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const pixels: Pixel[] = [];
    const grid = 30;

    for (let x = 0; x < width; x += grid) {
      for (let y = 0; y < height; y += grid) {
        pixels.push({
          x,
          y,
          baseX: x,
          baseY: y,
        });
      }
    }

    let mouse = { x: width / 2, y: height / 2 };

    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouse);

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let p of pixels) {
        const dx = p.baseX - mouse.x;
        const dy = p.baseY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const force = Math.max(0, 120 - dist) / 12;

        const px = p.baseX + (dx / (dist || 1)) * force;
        const py = p.baseY + (dy / (dist || 1)) * force;

        ctx.fillStyle =
        dist < 45
        ? "rgba(180, 55, 120, 0.95)"
        : dist < 80
        ? "rgba(255,220,140,0.9)"
        : "rgba(255,255,255,0.65)";
        ctx.fillRect(px, py, 2, 2);
      }

      let animationFrame: number;
      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
export default function Hero() {
  return (
    <>
    <section className="relative isolate
    min-h-[65vh]
    md:min-h-[75vh]
    lg:min-h-screen
    flex flex-col items-center
    justify-start lg:justify-center
    pt-20 sm:pt-24 md:pt-28 lg:pt-0
    pb-10 md:pb-12
    overflow-hidden
    px-4 sm:px-6">


      <InteractivePixelBackground />

      {/* LEFT PINK EDGE */}
<div
  className="
    pointer-events-none
    absolute left-0 top-0
    h-full w-[22vw]
    z-0
  "
  style={{
    background:
      "linear-gradient(to right, rgba(255,120,180,0.22), rgba(255,180,220,0.10), transparent)",
  }}
/>

{/* RIGHT PINK EDGE */}
<div
  className="
    pointer-events-none
    absolute right-0 top-0
    h-full w-[22vw]
    z-0
  "
  style={{
    background:
      "linear-gradient(to left, rgba(245,130,255,0.20), rgba(255,190,230,0.08), transparent)",
  }}
/>

      <DotTexture />
      <SideGlow />
      

      {/* glow */}
      <div className="absolute left-1/2 top-[35%] -translate-x-1/2 h-[28rem] w-[50rem] blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,120,178,0.14), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-[1400]px">
        {/* HERO TEXT */}
        <HeroText />

        {/* SUBTEXT */}
        <SubText />

        {/* buttons */}
        <div className="mt-8 flex flex-col flex flex-row
            flex-wrap
            justify-center
            gap-4 md:gap-6">
          <Link
            to="/join"
            className="relative inline-block active:scale-95 transition-transform duration-100"
          >

            <img
              src={pixelBtn}
              alt="Join Community Button"
              className="w-[140px]
              sm:w-[180px]
              md:w-[210px]
              h-auto h-auto"
            />

          {/* overlay text */}
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


          <Link
            to="/resources"
            className="relative inline-block active:scale-95 transition-transform duration-100"
          >

            <img
              src={pixelBtn}
              alt="Join Community Button"
              className="w-[140px]
              sm:w-[180px]
              md:w-[210px]
              h-auto h-auto"
            />

          {/* overlay text */}
          <span 
          className="absolute inset-0 flex items-center justify-center text-black font-bold"
           style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "clamp(0.75rem, 1.2vw, 1.2rem)",
            letterSpacing: "0.08em",
           }}
           >
            Resources →
          </span>
          </Link>

        </div>

        {/* stats */}
        <div className="mt-8 md:mt-10 lg:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center w-full max-w-4xl">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl text-black font-black">
                {s.value}{s.suffix}
              </div>
              <div className="text-xs uppercase tracking-widest font-black text-muted-foreground" style={{ color: PINK }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    
    </>
  );
}