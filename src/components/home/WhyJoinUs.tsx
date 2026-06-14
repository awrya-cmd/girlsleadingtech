import { useRef } from "react";
import { ArrowUpRight, Sparkles, Laptop, BookOpen, Heart, Trophy, MapPin, Mail, Compass } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

export function WhyJoinUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // scroll progress linked to the parent container (h-[200vh])
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Intro Card animations (subtly scale down and fade slightly)
  const cardScale = useTransform(scrollYProgress, [0, 0.60, 1.00], [1, 0.92, 0.92]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.60, 1.00], [1, 0.3, 0.3]);

  // Rising Panel animations (slides up from bottom to cover the intro card)
  const panelY = useTransform(scrollYProgress, [0, 0.60, 1.00], ["100vh", "0vh", "0vh"]);

  // Content animations inside the rising panel
  const headingOpacity = useTransform(scrollYProgress, [0, 0.60, 0.80, 1.00], [0, 0, 1, 1]);
  const cardsOpacity = useTransform(scrollYProgress, [0, 0.60, 0.90, 1.00], [0, 0, 1, 1]);
  const cardsY = useTransform(scrollYProgress, [0, 0.60, 0.90, 1.00], ["40px", "40px", "0px", "0px"]);

  // Transition the background color of the viewport track to match the benefits panel color perfectly
  const containerBg = useTransform(scrollYProgress, [0, 0.60, 1.00], ["#fdf9f5", "#F4ECE8", "#F4ECE8"]);

  return (
    <motion.div 
      id="glt-why-join-us" 
      style={{ backgroundColor: containerBg }}
      className="w-full pb-[100vh] sm:pb-[35vh] lg:pb-0"
    >
      <style>{`
        /* Force parent section to match the dynamic background and remove padding/border */
        section:has(#glt-why-join-us) {
          background-color: transparent !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          border-top: none !important;
          border-bottom: none !important;
        }

        /* Hide the old index-level header for "WHY JOIN US?" */
        .container:has(#glt-why-join-us) > .select-none {
          display: none !important;
        }

        /* Break out of parent container to span full width of the screen (no cutting) */
        #glt-why-join-us {
          width: 100vw !important;
          position: relative !important;
          left: 50% !important;
          right: 50% !important;
          margin-left: -50vw !important;
          margin-right: -50vw !important;
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-6deg); }
          75% { transform: rotate(6deg); }
        }
        .group:hover .animate-wiggle-hover {
          animation: wiggle 0.4s ease-in-out infinite;
        }

        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .group:hover .animate-pulse-heart {
          animation: pulse-heart 0.5s ease-in-out infinite;
        }

        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .group:hover .animate-float-y {
          animation: float-y 1.5s ease-in-out infinite;
        }

        @keyframes badge-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .group:hover .animate-badge-bounce {
          animation: badge-bounce 0.6s ease-in-out;
        }
      `}</style>

      {/* The Parent Container wrapping both sticky zoom and content */}
      <div ref={sectionRef} className="relative w-full h-[160vh] lg:h-[200vh]">
        
        {/* Sticky Background & Content Viewport (overflow-visible to prevent clipping) */}
        <div className="sticky top-0 w-full h-[100vh] overflow-visible flex items-center justify-center">
          
          {/* Intro Card ("What's in it for you?") */}
          <motion.div
            style={{
              scale: cardScale,
              opacity: cardOpacity,
            }}
            className="absolute z-10 w-[280px] sm:w-[420px] md:w-[500px] h-[140px] md:h-[180px] bg-[#F4ECE8] border-2 border-black rounded-[24px] shadow-[4px_4px_0px_#000000] flex items-center justify-center text-center px-6"
          >
            <h1
              style={{ fontFamily: "'Satoshi', sans-serif" }}
              className="font-sans text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 leading-tight text-center w-full"
            >
              What's in it for you?
            </h1>
          </motion.div>

          {/* Rising Panel (slides up to cover the intro card) */}
          <motion.div
            style={{
              y: panelY,
            }}
            className="absolute inset-x-0 top-0 w-full min-h-screen bg-[#F4ECE8] z-20 flex flex-col justify-start pt-[12vh] pb-16 overflow-visible pointer-events-auto"
          >
            <div className="relative w-full container mx-auto max-w-7xl px-4 sm:px-6">
              
              {/* Honestly, what's not? heading */}
              <motion.div 
                style={{ opacity: headingOpacity }}
                className="mb-8 md:mb-12"
              >
                <h2
                  className="font-sans text-4xl sm:text-5xl md:text-6xl font-black text-left text-[#5b2b4a]"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Honestly, what's not?
                </h2>
              </motion.div>

              {/* Cards Grid */}
              <motion.div 
                style={{
                  y: cardsY,
                  opacity: cardsOpacity,
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-5 xl:gap-6 items-stretch"
              >
                
                {/* CARD 1 — DISCOVER */}
                <div className="h-full">
                  <div 
                    className="group relative flex flex-col justify-between p-6 sm:p-7 h-full min-h-[290px] md:min-h-[320px] bg-[#d2f4d2] border-2 border-black rounded-[24px] shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                  >
                    <div>
                      {/* Top Row: Lil Logos & Arrow Button */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-float-y">
                            <Compass className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                          </div>
                          <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-wiggle-hover">
                            <Mail className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                          </div>
                        </div>
                        <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white text-black transition-colors group-hover:bg-black group-hover:text-white shrink-0 cursor-pointer">
                          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-3">
                        Discover Opportunities
                      </h3>

                      {/* Subheading */}
                      <p className="font-sans text-xs sm:text-sm text-gray-800 font-medium leading-relaxed mb-6">
                        Scholarships, internships, hackathons, fellowships and programs curated for girls in tech.
                      </p>
                    </div>

                    {/* Badges Footer */}
                    <div className="flex flex-wrap gap-2">
                      {["Internships", "Scholarships", "Hackathons", "Fellowships"].map((badge, idx) => (
                        <span 
                          key={badge}
                          style={{ animationDelay: `${idx * 100}ms` }}
                          className="animate-badge-bounce px-2.5 py-1 text-[11px] font-bold bg-white text-gray-900 border border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CARD 2 — LEARN */}
                <div className="h-full">
                  <div 
                    className="group relative flex flex-col justify-between p-6 sm:p-7 h-full min-h-[290px] md:min-h-[320px] bg-[#ffe4cc] border-2 border-black rounded-[24px] shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                  >
                    <div>
                      {/* Top Row: Lil Logos & Arrow Button */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-wiggle-hover">
                            <BookOpen className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                          </div>
                          <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-float-y">
                            <Laptop className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                          </div>
                        </div>
                        <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white text-black transition-colors group-hover:bg-black group-hover:text-white shrink-0 cursor-pointer">
                          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-3">
                        Learn Together
                      </h3>

                      {/* Subheading */}
                      <p className="font-sans text-xs sm:text-sm text-gray-800 font-medium leading-relaxed mb-6">
                        Hands-on cohorts, mentorship circles and guided learning paths designed to help you grow.
                      </p>
                    </div>

                    {/* Badges Footer */}
                    <div className="flex flex-wrap gap-2">
                      {["ML Cohort", "Mentorship", "Workshops"].map((badge, idx) => (
                        <span 
                          key={badge}
                          style={{ animationDelay: `${idx * 100}ms` }}
                          className="animate-badge-bounce px-2.5 py-1 text-[11px] font-bold bg-white text-gray-900 border border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CARD 3 — CONNECT */}
                <div className="h-full">
                  <div 
                    className="group relative flex flex-col justify-between p-6 sm:p-7 h-full min-h-[290px] md:min-h-[320px] bg-[#e3e0ff] border-2 border-black rounded-[24px] shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                  >
                    <div>
                      {/* Top Row: Lil Logos & Arrow Button */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-pulse-heart">
                            <Heart className="w-5 h-5 text-[#d955a4] fill-[#d955a4] stroke-[2]" />
                          </div>
                          <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-float-y">
                            <MapPin className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                          </div>
                        </div>
                        <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white text-black transition-colors group-hover:bg-black group-hover:text-white shrink-0 cursor-pointer">
                          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-3">
                        Find Your People
                      </h3>

                      {/* Subheading */}
                      <p className="font-sans text-xs sm:text-sm text-gray-800 font-medium leading-relaxed mb-6">
                        Meet girls from across India and beyond who are building, learning and growing together.
                      </p>
                    </div>

                    {/* Badges Footer */}
                    <div className="flex flex-wrap gap-2">
                      {["Community", "Support", "Networking", "Friendships"].map((badge, idx) => (
                        <span 
                          key={badge}
                          style={{ animationDelay: `${idx * 100}ms` }}
                          className="animate-badge-bounce px-2.5 py-1 text-[11px] font-bold bg-white text-gray-900 border border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CARD 4 — BUILD */}
                <div className="h-full">
                  <div 
                    className="group relative flex flex-col justify-between p-6 sm:p-7 h-full min-h-[290px] md:min-h-[320px] bg-[#e0e7ff] border-2 border-black rounded-[24px] shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                  >
                    <div>
                      {/* Top Row: Lil Logos & Arrow Button */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-wiggle-hover">
                            <Trophy className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                          </div>
                          <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-pulse-heart">
                            <Sparkles className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                          </div>
                        </div>
                        <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white text-black transition-colors group-hover:bg-black group-hover:text-white shrink-0 cursor-pointer">
                          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-3">
                        Build With Confidence
                      </h3>

                      {/* Subheading */}
                      <p className="font-sans text-xs sm:text-sm text-gray-800 font-medium leading-relaxed mb-6">
                        From your first hackathon to leading initiatives, we're here for every step of the journey.
                      </p>
                    </div>

                    {/* Badges Footer */}
                    <div className="flex flex-wrap gap-2">
                      {["Projects", "Leadership", "Hackathons", "Impact"].map((badge, idx) => (
                        <span 
                          key={badge}
                          style={{ animationDelay: `${idx * 100}ms` }}
                          className="animate-badge-bounce px-2.5 py-1 text-[11px] font-bold bg-white text-gray-900 border border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
