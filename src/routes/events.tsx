import { createFileRoute, Link, Outlet, useLocation, redirect } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { EventsHero } from "@/components/site/EventsHero";
import { motion } from "motion/react";
import React, { useRef, useState } from "react";
import { Search, PlayCircle, Calendar, History } from "lucide-react";
import GridBackground from "@/components/shared/GridBackground";

export const EventsSearchContext = React.createContext({ 
  search: '', 
  setSearch: (s: string) => {},
  category: 'All',
  setCategory: (c: string) => {}
});

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Events — Girls Leading Tech" }, { name: "description", content: "Upcoming and past events, talks and workshops." }] }),
  beforeLoad: ({ location }) => {
    if (location.pathname === "/events" || location.pathname === "/events/") {
      throw redirect({ to: "/events/upcoming" });
    }
  },
  component: EventsLayout,
});



function EventsLayout() {
  const { pathname } = useLocation();
  const isOngoing = pathname.includes("/ongoing");
  const isPast = pathname.includes("/past");
  const isUpcoming = pathname.includes("/upcoming");
  const isDetail = /\/events\/[^/]+$/.test(pathname) && !isPast && !isUpcoming && !isOngoing;
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All", 
    "AI & Machine Learning", 
    "Web3 & Blockchain", 
    "Open Source Programs", 
    "Core Engineering", 
    "Placements & Internships", 
    "Networking & Personal Branding", 
    "AR/VR & Emerging Tech", 
    "Leadership & Soft Skills", 
    "Wellness & Mental Health", 
    "Hackathons", 
    "Scholarships"
  ];
  
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
  
      
      {!isDetail && (
        <header className="relative z-10 w-full">
          <EventsHero />
        
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center px-6"
            ref={toggleRef}
          >
          

            <GridBackground className="opacity-30" />
            <div className="relative flex flex-col items-center w-full my-10 md:my-12 gap-6"> 
              {/* Search Bar */}
              <div className="relative w-full max-w-md z-10">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="w-full pl-12 pr-6 py-3.5 rounded-full bg-white border border-pink-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[#d955a4]/50 focus:border-[#d955a4] transition-all text-sm text-gray-800 placeholder:text-gray-500"
                  placeholder="Search events by name or speaker..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border",
                      category === cat
                        ? "bg-[#ffed95] text-black border-transparent shadow-sm"
                        : "bg-white text-gray-700 border-pink-200 hover:bg-pink-50/50"
                    )}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 3-Way Toggle */}
            <div className="mx-auto w-full max-w-md border border-[#d955a4]/15 bg-white/50 backdrop-blur-md rounded-none p-1 flex flex-row overflow-x-auto items-center justify-between [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
              <div className="flex flex-row items-center gap-1 flex-grow justify-center">
                <Link
                  to="/events/ongoing"
                  resetScroll={false}
                  onClick={handleScrollToGrid}
                  className={cn(
                    "flex flex-row items-center gap-2 px-5 py-2.5 rounded-none text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 w-full justify-center md:w-auto",
                    isOngoing
                      ? "bg-gradient-to-r from-[#d955a4] to-[#922b6c] text-white shadow-soft"
                      : "text-slate-500 hover:text-[#d955a4] hover:bg-[#d955a4]/5"
                  )}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <PlayCircle className={cn("h-4.5 w-4.5 transition-colors duration-300", isOngoing ? "text-white" : "text-[#d955a4]")} />
                  <span>Ongoing</span>
                </Link>
              </div>

              <div className="h-6 w-[1px] bg-pink-100/40 shrink-0" />

              <div className="flex flex-row items-center gap-1 flex-grow justify-center">
                <Link
                  to="/events/upcoming"
                  resetScroll={false}
                  onClick={handleScrollToGrid}
                  className={cn(
                    "flex flex-row items-center gap-2 px-5 py-2.5 rounded-none text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 w-full justify-center md:w-auto",
                    isUpcoming
                      ? "bg-gradient-to-r from-[#d955a4] to-[#922b6c] text-white shadow-soft"
                      : "text-slate-500 hover:text-[#d955a4] hover:bg-[#d955a4]/5"
                  )}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <Calendar className={cn("h-4.5 w-4.5 transition-colors duration-300", isUpcoming ? "text-white" : "text-[#d955a4]")} />
                  <span>Upcoming</span>
                </Link>
              </div>

              <div className="h-6 w-[1px] bg-pink-100/40 shrink-0" />

              <div className="flex flex-row items-center gap-1 flex-grow justify-center">
                <Link
                  to="/events/past"
                  resetScroll={false}
                  onClick={handleScrollToGrid}
                  className={cn(
                    "flex flex-row items-center gap-2 px-5 py-2.5 rounded-none text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 w-full justify-center md:w-auto",
                    isPast
                      ? "bg-gradient-to-r from-[#d955a4] to-[#922b6c] text-white shadow-soft"
                      : "text-slate-500 hover:text-[#d955a4] hover:bg-[#d955a4]/5"
                  )}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <History className={cn("h-4.5 w-4.5 transition-colors duration-300", isPast ? "text-white" : "text-[#d955a4]")} />
                  <span>Past</span>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Scrolling Marquee */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="relative w-full overflow-hidden bg-[#ffc2da] border-y-[1.5px] border-black py-2 mt-10"
          >
            <div className="ticker-run">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex whitespace-nowrap items-center px-4 shrink-0 justify-around">
                  {[
                    "MONTHLY TECH TALKS", "INDUSTRY WORKSHOPS", "HACKATHON MENTORSHIP",
                    "COMMUNITY DEMO DAYS", "GET PLACED",
                  ].map((t) => (
                    <div key={t} className="flex items-center">
                      <span
                        className="text-black font-bold text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase"
                        style={{ fontFamily: "'Montserrat', sans-serif", textShadow: "0 0 12px rgba(255,255,255,0.9), 0 0 4px rgba(255,255,255,0.5)" }}
                      >
                        {t}
                      </span>
                      <span className="text-black text-lg mx-6 md:mx-10" style={{ textShadow: "0 0 12px rgba(255,255,255,0.9), 0 0 4px rgba(255,255,255,0.5)" }}>✦</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </header>
      )}

      <div className="relative z-10 flex-1 min-h-[50vh]" style={{ overflowAnchor: "none" }}>
        <EventsSearchContext.Provider value={{ search, setSearch, category, setCategory }}>
          <Outlet />
        </EventsSearchContext.Provider>
      </div>
    </div>
  );
}
