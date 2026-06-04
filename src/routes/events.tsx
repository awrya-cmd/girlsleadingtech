import { createFileRoute, Link, Outlet, useLocation, redirect } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { EventsHero } from "@/components/site/EventsHero";
import { motion } from "motion/react";
import { useRef, useEffect } from "react";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Events — Girls Leading Tech" }, { name: "description", content: "Upcoming and past events, talks and workshops." }] }),
  beforeLoad: ({ location }) => {
    if (location.pathname === "/events" || location.pathname === "/events/") {
      throw redirect({ to: "/events/upcoming" });
    }
  },
  component: EventsLayout,
});

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute left-1/2 top-1/2 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,240,190,0.15), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217, 85, 164, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217, 85, 164, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

function EventsLayout() {
  const { pathname } = useLocation();
  const isPast = pathname.includes("/past");
  const isDetail = /\/events\/[^/]+$/.test(pathname) && !pathname.endsWith("/past") && !pathname.endsWith("/upcoming");
  
  const toggleRef = useRef<HTMLDivElement>(null);

  const handleScrollToGrid = () => {
    setTimeout(() => {
      if (toggleRef.current) {
        window.scrollTo({
          top: toggleRef.current.offsetTop - 120, // offset for the header
          behavior: "instant",
        });
      }
    }, 10);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#fef9f4] overflow-x-hidden flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&display=swap');
        
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-run {
          display: flex;
          width: 200%;
          animation: ticker 28s linear infinite;
        }
      `}</style>
      <GridBackground />
      
      {!isDetail && (
        <header className="relative z-10 w-full">
          <EventsHero />
          
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex justify-center px-6"
            ref={toggleRef}
          >
            <div className="bg-white/80 backdrop-blur-md border border-gray-100 flex p-1.5 rounded-full shadow-sm">
              <Link
                to="/events/upcoming"
                resetScroll={false}
                onClick={handleScrollToGrid}
                className={cn(
                  "rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300",
                  !isPast
                    ? "bg-gradient-to-r from-[#d955a4] to-[#ff7eb3] text-white shadow-[0_4px_14px_rgba(217,85,164,0.35)]"
                    : "text-gray-500 hover:text-gray-900"
                )}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Upcoming
              </Link>
              <Link
                to="/events/past"
                resetScroll={false}
                onClick={handleScrollToGrid}
                className={cn(
                  "rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300",
                  isPast
                    ? "bg-gradient-to-r from-[#d955a4] to-[#ff7eb3] text-white shadow-[0_4px_14px_rgba(217,85,164,0.35)]"
                    : "text-gray-500 hover:text-gray-900"
                )}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Past
              </Link>
            </div>
          </motion.div>
          
          {/* Scrolling Marquee */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="relative w-full overflow-hidden border-y-[2px] border-[#d955a4] py-3 mt-10 bg-white/40"
          >
            <div className="ticker-run">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex whitespace-nowrap items-center px-4 w-1/2 justify-around">
                  {[
                    "MONTHLY TECH TALKS", "INDUSTRY WORKSHOPS", "HACKATHON MENTORSHIP",
                    "COMMUNITY DEMO DAYS", "GET PLACED",
                  ].map((t) => (
                    <div key={t} className="flex items-center">
                      <span
                        className="text-[#d955a4] font-black text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase mx-3 md:mx-6"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {t}
                      </span>
                      <span className="text-[#ffed95] text-lg mx-2 md:mx-4">✦</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </header>
      )}

      <div className="relative z-10 flex-1 min-h-[50vh]" style={{ overflowAnchor: "none" }}>
        <Outlet />
      </div>
    </div>
  );
}
