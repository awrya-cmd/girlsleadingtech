import { motion } from "motion/react";
import pointingMascot from "@/assets/main-mascot/pointing.png";
import organizerIdle from "@/assets/main-mascot/idle.png";
import starSticker from "@/assets/stickers/star.png";
import washiTape from "@/assets/stickers/washi-tape.png";

export function EventsHero() {
  return (
    <div className="relative z-10 pt-32 md:pt-40 w-full">
      {/* Ambient Glows */}
      <div className="absolute top-1/2 -left-[5%] w-[300px] h-[400px] md:w-[40vw] md:h-[50vh] bg-[rgba(216,53,141,0.15)] rounded-full blur-[120px] pointer-events-none -translate-y-1/2 z-[-1]" />
      <div className="absolute top-1/2 -right-[5%] w-[300px] h-[400px] md:w-[40vw] md:h-[50vh] bg-[rgba(216,53,141,0.15)] rounded-full blur-[120px] pointer-events-none -translate-y-1/2 z-[-1]" />

      <div className="container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#d955a4] font-bold mb-8"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Events
        </motion.p>
        
        {/* Illustrative Hero Composition */}
        <div className="relative mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-4 lg:gap-12">
          {/* Left mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="hidden md:block w-36 lg:w-48 shrink-0 z-20"
          >
            <img src={pointingMascot} alt="Mascot pointing" className="w-full h-auto object-contain drop-shadow-xl" />
          </motion.div>
          
          {/* Center text composition */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative text-center z-10"
          >
            <img src={starSticker} alt="" className="absolute -top-8 -left-10 w-16 h-16 animate-[spin_10s_linear_infinite]" />
            <img src={starSticker} alt="" className="absolute -bottom-6 -right-8 w-12 h-12 animate-[spin_8s_linear_infinite_reverse]" />
            <img src={washiTape} alt="" className="absolute -top-12 right-0 w-24 h-auto opacity-70 transform rotate-12" />
            
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-[0.85] tracking-tight uppercase transform -rotate-2 drop-shadow-sm">
                Talks,
              </h1>
              <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-[0.85] tracking-tight uppercase transform rotate-1 mt-3 md:mt-4 ml-6 drop-shadow-sm">
                workshops,
              </h1>
              <div className="relative mt-4 md:mt-6 self-center md:self-end md:mr-10">
                <span className="absolute inset-0 bg-[#ffed95] rounded-xl transform -rotate-3 scale-110 shadow-sm" />
                <h1 className="relative italic font-semibold text-[#d8358d] text-6xl sm:text-7xl md:text-8xl lowercase px-6 py-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  magic.
                </h1>
              </div>
            </div>
          </motion.div>

          {/* Right organizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.4 }}
            className="hidden md:block w-36 lg:w-48 shrink-0 z-20 self-end mb-4"
          >
            <img src={organizerIdle} alt="Organizer" className="w-full h-auto object-contain drop-shadow-xl" />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-sm md:text-base font-sans text-gray-500 max-w-2xl mx-auto opacity-80 font-medium"
        >
          Live sessions with engineers, founders and creators from the companies you love.
        </motion.p>
      </div>
    </div>
  );
}