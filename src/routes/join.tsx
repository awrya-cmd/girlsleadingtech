import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { GradientMesh } from "@/components/site/GradientMesh";
import { socials } from "@/data/socials";
import { ArrowRight, Sparkle, Heart, Star } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join — Girls Leading Tech" },
      { name: "description", content: "Apply to join the Girls Leading Tech community." },
    ],
  }),
  component: JoinPage,
});

function JoinPage() {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = socials.joinForm;
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-[#fef9f4] px-6 overflow-hidden">
      {/* Background decoration */}
      <GradientMesh />
      
      {/* Dotted pattern overlay */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(217, 85, 164, 0.16) 1.5px, transparent 1.5px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating stars/hearts behind the card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          className="absolute top-1/4 left-[15%] text-[#d955a4]/20 hidden md:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-12 h-12 fill-current" />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-[15%] text-[#8a5bd6]/20 hidden md:block"
          animate={{ scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-16 h-16 fill-current" />
        </motion.div>
      </div>

      {/* Retro-Scrapbook Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="relative z-10 w-full max-w-md bg-[#FFFBF7] border-4 border-black p-10 text-center shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl overflow-visible"
        style={{ transform: "rotate(-0.5deg)" }}
      >
        {/* Washi tape sticker */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#faf7a7]/80 border-l border-r border-dashed border-black/20 shadow-sm rotate-[-4deg] pointer-events-none select-none z-20" />

        {/* Custom Bouncy Loader Indicator */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto flex h-16 w-16 items-center justify-center bg-[#ffed95] border-2 border-black rounded-full shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] z-10"
        >
          <Sparkle className="h-8 w-8 text-black fill-[#faf7a7]" />
        </motion.div>

        <h1 
          className="mt-6 font-sans text-3xl font-black uppercase text-gray-900 tracking-tight"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          Welcome Aboard <span className="text-[#d955a4]">✦</span>
        </h1>
        
        <p 
          className="mt-4 text-gray-600 text-sm leading-relaxed font-semibold"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Redirecting you to our application form...
        </p>

        <a
          href={socials.joinForm}
          className="mt-8 inline-flex items-center justify-center gap-1.5 bg-[#d955a4] hover:bg-[#c44992] text-white font-bold py-2.5 px-5 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all text-xs uppercase tracking-wider"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Open Form Now <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </section>
  );
}
