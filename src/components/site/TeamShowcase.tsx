import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import MemberProfileCard from "@/components/site/MemberProfileCard";
import type { TeamMember } from "@/data/types";

interface TeamShowcaseProps {
  filteredTeam: TeamMember[];
}

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
    <div id="teamshowcase-root" className="w-full flex flex-col items-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        @import url('https://fonts.cdnfonts.com/css/satoshi');

        canvas {
          display: none !important;
        }

        section:has(#teamshowcase-root) {
          margin-top: 0 !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          border-top: none !important;
          border-bottom: none !important;
          background: transparent !important;
        }

        footer {
          margin-top: 0 !important;
        }
      `}</style>

      {/* MEET THE TEAM header (Centered) */}
      <div className="relative min-h-[140px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[260px] flex items-center justify-center w-full mb-4">
        <div className="relative inline-block mx-auto">
          <h2 className="font-['Anton'] uppercase text-black leading-none tracking-[-0.02em] select-none pointer-events-none text-[6.5rem] sm:text-[7rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] relative z-0">
            MEET
          </h2>
          <div className="absolute z-10 bottom-[5%] right-[-5%] sm:right-[-6%] md:right-[-10%] lg:right-[-12%] rotate-[-8deg] bg-[#d955a4] px-3 sm:px-4 md:px-5 py-1 shadow-lg whitespace-nowrap">
            <span className="font-['Anton'] uppercase text-black leading-none text-base sm:text-lg md:text-xl lg:text-2xl">
              THE TEAM
            </span>
          </div>
        </div>
      </div>

      {/* Paragraph below header */}
      <p className="font-sans text-base md:text-lg text-zinc-400 mt-2 md:mt-3 max-w-xl text-center mx-auto leading-relaxed mb-8">
        Meet the core crew building Girls Leading Tech - mentors, organizers, contributors and volunteers united by purpose.
      </p>

      {/* Toggle below paragraph */}
      <div className="mb-8">
        <StatusTabs
          active={statusTab}
          onChange={setStatusTab}
          currentCount={currentMembers.length}
          pastCount={pastMembers.length}
        />
      </div>

      {/* Alumni appreciation banner */}
      {statusTab === "past" && pastMembers.length > 0 && (
        <div className="w-full max-w-2xl mb-8">
          <AlumniBanner />
        </div>
      )}

      {/* Cards grid — no scroll container, responsive 4 columns */}
      <div className="w-full">
        {statusFilteredTeam.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center gap-3">
            <p className="text-sm text-zinc-500">
              {statusTab === "past"
                ? "No alumni to show yet."
                : "No matches. Try a different search."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7 pb-12 pt-1 w-full">
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
                delay={index % 8}
                linkedin={member.linkedin}
                twitter={member.twitter}
                image={member.image}
                description={member.description}
                isPast={member.status === "past"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
