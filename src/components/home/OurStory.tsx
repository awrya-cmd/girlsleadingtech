import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { Sparkles, Compass, Star } from "lucide-react";
import ourStoryImg from "@/assets/our-story.png";
import pixelStarImg from "@/assets/pixelstar.png";

// A hook to handle responsive path re-calculations on window resizing
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    function update() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", update);
    update();
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

export default function OurStory() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const connectorEndRef = useRef<HTMLDivElement>(null);
  
  const [segments, setSegments] = useState<{ d1: string; d2: string; d3: string }>({
    d1: "",
    d2: "",
    d3: ""
  });
  
  const size = useWindowSize();

  const [visibleSteps, setVisibleSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    end: false
  });

  useEffect(() => {
    if (
      !timelineRef.current ||
      !node1Ref.current ||
      !node2Ref.current ||
      !node3Ref.current ||
      !connectorEndRef.current
    ) {
      return;
    }

    const updatePaths = () => {
      if (
        !timelineRef.current ||
        !node1Ref.current ||
        !node2Ref.current ||
        !node3Ref.current ||
        !connectorEndRef.current
      ) {
        return;
      }

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const n1Rect = node1Ref.current.getBoundingClientRect();
      const n2Rect = node2Ref.current.getBoundingClientRect();
      const n3Rect = node3Ref.current.getBoundingClientRect();
      const endRect = connectorEndRef.current.getBoundingClientRect();

      // Center coordinates relative to the timeline container
      const x1 = n1Rect.left + n1Rect.width / 2 - timelineRect.left;
      const y1 = n1Rect.top + n1Rect.height / 2 - timelineRect.top;

      const x2 = n2Rect.left + n2Rect.width / 2 - timelineRect.left;
      const y2 = n2Rect.top + n2Rect.height / 2 - timelineRect.top;

      const x3 = n3Rect.left + n3Rect.width / 2 - timelineRect.left;
      const y3 = n3Rect.top + n3Rect.height / 2 - timelineRect.top;

      const xEnd = endRect.left + endRect.width / 2 - timelineRect.left;
      const yEnd = endRect.top + endRect.height / 2 - timelineRect.top;

      const dy1 = y2 - y1;
      const dy2 = y3 - y2;
      const dyEnd = yEnd - y3;

      const isMobile = window.innerWidth < 768; // Mobile phone view

      if (isMobile) {
        // straight vertical lines on phone (connecting center-to-center, staying on the left)
        setSegments({
          d1: `M ${x1} ${y1} L ${x1} ${y2}`,
          d2: `M ${x2} ${y2} L ${x2} ${y3}`,
          d3: `M ${x3} ${y3} L ${x3} ${yEnd - 20}`
        });
      } else {
        // curved lines on tablet & desktop (connecting center-to-center)
        setSegments({
          d1: `M ${x1} ${y1} C ${x1} ${y1 + dy1 * 0.45}, ${x2} ${y2 - dy1 * 0.45}, ${x2} ${y2}`,
          d2: `M ${x2} ${y2} C ${x2} ${y2 + dy2 * 0.45}, ${x3} ${y3 - dy2 * 0.45}, ${x3} ${y3}`,
          d3: `M ${x3} ${y3} C ${x3} ${y3 + dyEnd * 0.45}, ${xEnd} ${yEnd - 20}, ${xEnd} ${yEnd - 20}`
        });
      }
    };

    updatePaths();

    // Resize Observer to trigger path recalculations whenever layout shifts (e.g. image loading)
    const observer = new ResizeObserver(() => {
      updatePaths();
    });
    observer.observe(timelineRef.current);

    window.addEventListener("resize", updatePaths);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePaths);
    };
  }, [size]);

  return (
    <div className="relative w-full overflow-hidden mb-4">
      
      {/* 1. Section Header: OUR STORY */}
      <div className="relative w-full overflow-visible select-none py-0 md:py-1 flex justify-end mb-12 md:mb-16 lg:mb-20">
        <div className="relative inline-block overflow-visible mb-4 md:mb-6">
          {/* Animated Pink Bar (Right-to-Left reveal, slightly wider than text, local to text) */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "calc(100% + 1rem)"}}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            
            className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            h-[110%]
            bg-[#d955a4]/85
            z-0
          "
          />

          {/* Heading text (slides from right) */}
          <motion.h2
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 font-sans text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.15em] text-gray-900 dark:text-white leading-none text-right"
          >
            OUR STORY
          </motion.h2>
        </div>
      </div>

      {/* 2. Journey Timeline Container */}
      <div ref={timelineRef} className="relative w-full max-w-5xl mx-auto px-4 md:px-12 pb-8">
        
        {/* Dynamic Dotted SVG Journey Path Segments (breaking at the circular nodes) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          {segments.d1 && (
            <motion.path
              d={segments.d1}
              fill="none"
              stroke="#d955a4"
              strokeWidth="2.5"
              strokeDasharray="6,8"
              initial={{ pathLength: 0 }}
              animate={visibleSteps.step1 ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut", delay: 0.4 }}
            />
          )}
          {segments.d2 && (
            <motion.path
              d={segments.d2}
              fill="none"
              stroke="#d955a4"
              strokeWidth="2.5"
              strokeDasharray="6,8"
              initial={{ pathLength: 0 }}
              animate={visibleSteps.step2 ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut", delay: 0.4 }}
            />
          )}
          {segments.d3 && (
            <motion.path
              d={segments.d3}
              fill="none"
              stroke="#d955a4"
              strokeWidth="2.5"
              strokeDasharray="6,8"
              initial={{ pathLength: 0 }}
              animate={visibleSteps.step3 ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut", delay: 0.4 }}
            />
          )}
        </svg>

        {/* Pixel Flying Elements (Stars) along the curved path (visible on tablet & desktop only) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          <motion.img
            src={pixelStarImg}
            alt="pixel star"
            className="absolute w-8 h-8 opacity-50"
            style={{ left: "32%", top: "18%" }}
            animate={{ y: [0, -8, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={pixelStarImg}
            alt="pixel star"
            className="absolute w-6 h-6 opacity-40"
            style={{ left: "55%", top: "45%" }}
            animate={{ y: [0, 8, 0], rotate: [0, -15, 15, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={pixelStarImg}
            alt="pixel star"
            className="absolute w-8 h-8 opacity-50"
            style={{ left: "28%", top: "72%" }}
            animate={{ y: [0, -6, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={pixelStarImg}
            alt="pixel star"
            className="absolute w-6 h-6 opacity-40"
            style={{ left: "68%", top: "28%" }}
            animate={{ y: [0, -10, 0], rotate: [0, 20, -20, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.img
            src={pixelStarImg}
            alt="pixel star"
            className="absolute w-7 h-7 opacity-45"
            style={{ left: "42%", top: "60%" }}
            animate={{ y: [0, 7, 0], rotate: [0, -12, 12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          {/* Retro small pixel colored squares */}
          <motion.div
            className="absolute w-2 h-2 bg-[#d955a4] opacity-50"
            style={{ left: "20%", top: "35%" }}
            animate={{ y: [0, -12, 0], rotate: [0, 45, 90, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-2.5 h-2.5 bg-[#f0b158] opacity-60"
            style={{ left: "75%", top: "52%" }}
            animate={{ y: [0, 10, 0], rotate: [0, -45, -90, -180, -360] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-[#FF8FAB] opacity-50"
            style={{ left: "48%", top: "80%" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Milestone 1 (Node: Left, Content + Mascot: Right) */}
        <motion.div
          onViewportEnter={() => setVisibleSteps(prev => ({ ...prev, step1: true }))}
          viewport={{ once: true, amount: 0.25 }}
          className="relative flex flex-col md:flex-row items-stretch min-h-[220px] mb-24 md:mb-32 z-10"
        >
          {/* Circular Node with pulsing animation (aligned left on mobile, left-[15%] on desktop/tablet) */}
          <div ref={node1Ref} className="absolute left-[10px] md:left-[15%] top-4 z-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={visibleSteps.step1 ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative"
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-[#d955a4] -z-10"
              />
              <div className="w-10 h-10 rounded-full bg-[#d955a4] flex items-center justify-center border-4 border-white shadow-md text-white">
                <Sparkles className="w-4 h-4" />
              </div>
            </motion.div>
          </div>

          {/* Content block: shifted further right to prevent overlapping with curved path, filled out to avoid empty space */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visibleSteps.step1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full pl-14 md:pl-[42%] lg:pl-[46%] md:pr-[2%] flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-16 items-center md:items-start text-left"
          >
            <div className="flex-1 pt-1.5 min-w-[300px] max-w-[480px]">
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-sans tracking-tight">
                We Started With A Belief
              </h4>
              <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                Every girl deserves access to opportunities, mentorship and a supportive community in tech.
              </p>
            </div>
            {/* Mascot Container: Larger on desktop, reduced size on tablet to prevent overlaps, fully static */}
            <div className="w-52 md:w-[180px] lg:w-[240px] flex-shrink-0 relative mt-4 md:mt-0 select-none">
              <img
                src={ourStoryImg}
                alt="Mascot girl learning tech"
                className="w-full h-auto object-contain"
                style={{ borderRadius: 0 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Milestone 2 (Node: Left on Mobile, Right on Desktop/Tablet) */}
        <motion.div
          onViewportEnter={() => setVisibleSteps(prev => ({ ...prev, step2: true }))}
          viewport={{ once: true, amount: 0.25 }}
          className="relative flex flex-col md:flex-row items-stretch min-h-[160px] mb-24 md:mb-32 z-10"
        >
          {/* Circular Node with pulsing animation */}
          <div ref={node2Ref} className="absolute left-[10px] md:left-auto md:right-[15%] top-4 z-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={visibleSteps.step2 ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative"
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-[#d955a4] -z-10"
              />
              <div className="w-10 h-10 rounded-full bg-[#d955a4] flex items-center justify-center border-4 border-white shadow-md text-white">
                <Compass className="w-4 h-4" />
              </div>
            </motion.div>
          </div>

          {/* Content block: shifted further left/opposite to prevent overlapping with curved path, filled out to avoid empty space */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visibleSteps.step2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full pl-14 md:pl-[2%] md:pr-[46%] lg:pr-[52%] text-left md:text-right flex flex-col items-start md:items-end justify-start pt-1.5"
          >
            <div className="max-w-[200px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[340px]">
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-sans tracking-tight">
                We Built A Community
              </h4>
              <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                From conversations and meetups to shared learning experiences, women began growing together.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Milestone 3 (Node: Left) */}
        <motion.div
          onViewportEnter={() => setVisibleSteps(prev => ({ ...prev, step3: true }))}
          viewport={{ once: true, amount: 0.25 }}
          className="relative flex flex-col md:flex-row items-stretch min-h-[160px] mb-12 md:mb-16 z-10"
        >
          {/* Circular Node with pulsing animation */}
          <div ref={node3Ref} className="absolute left-[10px] md:left-[15%] top-4 z-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={visibleSteps.step3 ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative"
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-[#d955a4] -z-10"
              />
              <div className="w-10 h-10 rounded-full bg-[#d955a4] flex items-center justify-center border-4 border-white shadow-md text-white">
                <Star className="w-4 h-4" />
              </div>
            </motion.div>
          </div>

          {/* Content block: shifted further right to prevent overlapping with curved path, filled out to avoid empty space */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visibleSteps.step3 ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full pl-14 md:pl-[46%] lg:pl-[52%] md:pr-[2%] text-left pt-1.5"
          >
            <div className="max-w-[200px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[340px]">
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-sans tracking-tight">
                We’re Just Getting Started
              </h4>
              <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                Today we continue creating pathways for future leaders in technology.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. Visual Connector pointing down into Vision & Mission (Paper plane icon rotated diagonally up) */}
        <motion.div
          ref={connectorEndRef}
          onViewportEnter={() => setVisibleSteps(prev => ({ ...prev, end: true }))}
          viewport={{ once: true, amount: 0.25 }}
          className="w-full flex flex-col items-center justify-center pt-8 pb-4 gap-3 text-center select-none z-10 relative"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 15 }}
            animate={visibleSteps.end ? { scale: 1, opacity: 1, y: 0 } : { scale: 0, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.2 }}
            className="text-[#d955a4] mb-1.5 flex items-center justify-center"
          >
            {/* Custom Folded Paper Plane SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-14 h-14 md:w-20 md:h-20 text-[#d955a4]"
              style={{ transform: "rotate(-15deg)" }}
            >
              <path d="M22 2L2 12L11 13L22 2Z" fill="currentColor" fillOpacity="0.1" />
              <path d="M22 2L11 13L15 22L22 2Z" fill="currentColor" fillOpacity="0.15" />
              <path d="M11 13V19L14 16" />
            </svg>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={visibleSteps.end ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-full bg-[#d955a4]/8 px-9 py-4 md:px-12 md:py-5 border border-[#d955a4]/15 shadow-sm"
          >
            <p 
              className="text-base md:text-lg font-bold text-[#d955a4] uppercase tracking-widest leading-none"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Our Journey Continues With You
            </p>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={visibleSteps.end ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-sans max-w-sm mt-1 leading-relaxed"
          >
            Together, we're building a future where every girl in tech can thrive.
          </motion.p>
        </motion.div>

      </div>

    </div>
  );
}
