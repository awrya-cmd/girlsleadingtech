import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import MemberProfileCard from "@/components/site/MemberProfileCard";
import type { TeamMember } from "@/data/types";

interface TeamShowcaseProps {
  filteredTeam: TeamMember[];
}

// Fixed viewport height for the scrollable grid — sized to comfortably show 2+ full rows
const SCROLL_AREA_HEIGHT = "min(72vh, 760px)";

// Sliding-pill tab switcher — matches the gradient pill pattern on the site
function StatusTabs({
  active,
  onChange,
  currentCount,
  pastCount,
}: {
  active: "current" | "past";
  onChange: (value: "current" | "past") => void;
  currentCount: number;
  pastCount: number;
}) {
  const items: { key: "current" | "past"; label: string; count: number }[] = [
    { key: "current", label: "Current", count: currentCount },
    { key: "past", label: "Alumni", count: pastCount },
  ];

  return (
    <div className="inline-flex items-center gap-1 bg-white border border-black/10 rounded-full p-1.5 shadow-sm">
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className="relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-2"
          >
            {isActive && (
              <motion.div
                layoutId="teamStatusPill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d955a4] to-[#5b2b4a]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? "text-white" : "text-zinc-500 hover:text-zinc-700"}`}>
              {item.label}
            </span>
            {item.count > 0 && (
              <span
                className={`
                  relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center
                  ${isActive
                    ? "bg-white/20 text-white"
                    : "bg-zinc-100 text-zinc-400"
                  }
                `}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// Warm banner shown above Alumni grid — appreciates their contribution
function AlumniBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start gap-3 bg-gradient-to-r from-[#d955a4]/8 to-[#5b2b4a]/8 border border-[#d955a4]/20 rounded-xl px-4 py-3"
    >
      <Heart className="h-4 w-4 text-[#d955a4] shrink-0 mt-0.5" fill="currentColor" />
      <p className="text-sm text-zinc-500 leading-relaxed">
        <span className="font-semibold text-zinc-700">Grateful for every chapter.</span>{" "}
        These incredible humans helped shape Girls Leading Tech into what it is today.
        Their energy, effort, and ideas live on in everything we do. 🌸
      </p>
    </motion.div>
  );
}

export default function TeamShowcase({ filteredTeam }: TeamShowcaseProps) {
  const [statusTab, setStatusTab] = useState<"current" | "past">("current");

  const currentMembers = useMemo(
    () => filteredTeam.filter((m) => (m.status ?? "current") === "current"),
    [filteredTeam]
  );

  const pastMembers = useMemo(
    () => filteredTeam.filter((m) => m.status === "past"),
    [filteredTeam]
  );

  const statusFilteredTeam = statusTab === "current" ? currentMembers : pastMembers;

  return (
    <div className="w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        @import url('https://fonts.cdnfonts.com/css/satoshi');
      `}</style>

      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">

        {/* LEFT COLUMN — Sticky header */}
        <div className="w-full lg:w-[35%] lg:sticky lg:top-32 flex flex-col justify-center pt-4">

          {/* MEET THE TEAM header */}
          <div className="relative min-h-[140px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[260px] flex items-center justify-center md:justify-start w-full mb-6">
            <div className="relative inline-block mx-auto md:mx-0">
              <h2 className="font-['Anton'] uppercase text-black leading-none tracking-[-0.02em] select-none pointer-events-none text-[6.5rem] sm:text-[7rem] md:text-[6rem] lg:text-[10rem] xl:text-[12rem] relative z-0">
                MEET
              </h2>
              <div className="absolute z-10 bottom-[5%] right-[-5%] sm:right-[-6%] md:right-[-10%] lg:right-[-12%] rotate-[-8deg] bg-[#d955a4] px-3 sm:px-4 md:px-5 py-1 shadow-lg whitespace-nowrap">
                <span className="font-['Anton'] uppercase text-black leading-none text-base sm:text-lg md:text-xl lg:text-2xl">
                  THE TEAM
                </span>
              </div>
            </div>
          </div>

          <p className="font-sans text-base md:text-lg text-zinc-400 mt-2 md:mt-3 max-w-xs md:max-w-sm text-center md:text-left mx-auto md:mx-0 leading-relaxed">
            Meet the core crew building Girls Leading Tech — mentors, organizers, contributors and volunteers united by purpose.
          </p>

          {/* Hover hint for desktop */}
          <p className="hidden md:block mt-4 text-xs text-zinc-300 text-center md:text-left">
            ✦ Hover a card to see their story · scroll for more
          </p>
        </div>

        {/* RIGHT COLUMN — Tabs + Grid + Pagination */}
        <div className="w-full lg:w-[65%] flex flex-col gap-6">

          {/* Tab switcher with counts */}
          <div className="self-center md:self-start">
            <StatusTabs
              active={statusTab}
              onChange={setStatusTab}
              currentCount={currentMembers.length}
              pastCount={pastMembers.length}
            />
          </div>

          {/* Alumni appreciation banner */}
          {statusTab === "past" && pastMembers.length > 0 && (
            <AlumniBanner />
          )}

          <div className="relative">

            {/* Cards grid — vertically scrollable, no boxed panel, just a soft fade at the edge */}
            {statusFilteredTeam.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  {statusTab === "past"
                    ? "No alumni to show yet."
                    : "No matches. Try a different search."}
                </p>
              </div>
            ) : (
              <>
                <style>{`
                  .team-scroll-area::-webkit-scrollbar {
                    width: 5px;
                  }
                  .team-scroll-area::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .team-scroll-area::-webkit-scrollbar-thumb {
                    background-color: transparent;
                    border-radius: 999px;
                    transition: background-color 0.2s ease;
                  }
                  .team-scroll-area:hover::-webkit-scrollbar-thumb {
                    background-color: #e8c2d8;
                  }
                  .team-scroll-area::-webkit-scrollbar-thumb:hover {
                    background-color: #d955a4;
                  }
                  .team-scroll-area {
                    scrollbar-width: thin;
                    scrollbar-color: transparent transparent;
                  }
                  .team-scroll-area:hover {
                    scrollbar-color: #e8c2d8 transparent;
                  }
                `}</style>

                <motion.div
                  key={statusTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="team-scroll-area overflow-y-auto pr-5 -mr-5"
                  style={{ maxHeight: SCROLL_AREA_HEIGHT }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-7 pb-3 pt-1">
                    {statusFilteredTeam.map((member, index) => (
                      <MemberProfileCard
                        key={member.id}
                        name={member.name}
                        role={member.role}
                        location={
                          member.city && member.state
                            ? `${member.city}, ${member.state}`
                            : member.city || member.state
                        }
                        locationType="location"
                        delay={index % 6}
                        linkedin={member.linkedin}
                        twitter={member.twitter}
                        image={member.image}
                        description={member.description}
                        isPast={member.status === "past"}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Fade hint — blends into the page's own white background, not a boxed panel */}
                {statusFilteredTeam.length > 6 && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/70 to-transparent" />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
