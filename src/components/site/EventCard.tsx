import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Play, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const rotations = [-2, 1.5, -1, 2, -1.5, 2.5];

export function EventCard({
  event,
  thumb,
  speakerImg,
  isUpcoming,
  isHighlighted = false,
  index,
}: {
  event: any;
  thumb: string | null;
  speakerImg: string | null;
  isUpcoming: boolean;
  isHighlighted?: boolean;
  index: number;
}) {
  const rot = rotations[index % rotations.length] ?? 0;
  
  const dateObj = new Date(event.date);
  const monthStr = dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const dateNum = dateObj.getDate();

  return (
    <div
      className="relative group h-full transition-all duration-400 ease-out z-10 hover:z-50 hover:scale-[1.03] hover:!rotate-0 pt-4"
      style={{
        transform: `rotate(${rot}deg)`,
      }}
    >
      <Link to="/events/$eventId" params={{ eventId: event.id }} className="block h-full">
        <article
          className={cn(
            "relative flex h-full flex-col overflow-visible rounded-[24px] bg-white transition-all duration-400 border-[2px] border-[#d955a4]",
            "shadow-[4px_8px_24px_rgba(0,0,0,0.06)] group-hover:shadow-[8px_16px_40px_rgba(217,85,164,0.15)]",
            isHighlighted ? "shadow-[8px_16px_40px_rgba(217,85,164,0.15)]" : ""
          )}
        >
          {/* Thumbnail area */}
          <div className="relative aspect-video w-full overflow-hidden rounded-t-[24px] bg-gray-50 z-10">
            {thumb ? (
              <img
                src={thumb}
                alt={event.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-sans text-3xl font-black text-gray-200">
                {event.title.charAt(0)}
              </div>
            )}
            
            {/* Calendar Tear-off */}
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md overflow-hidden w-12 text-center flex flex-col border border-gray-100 z-20">
              <div className="bg-[#d955a4] text-white text-[9px] font-bold uppercase tracking-widest py-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {monthStr}
              </div>
              <div className="text-gray-900 font-black text-lg py-1 leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {dateNum}
              </div>
            </div>

            {/* Badges */}
            {!isUpcoming && (
              <span className="absolute top-4 right-4 inline-block rounded-full bg-gray-900/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur shadow-sm">
                Past
              </span>
            )}
            
            {!isUpcoming && event.youtubeLink && (
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-gray-900 backdrop-blur shadow-sm">
                <Play className="h-3 w-3 text-[#d955a4]" /> Recording
              </span>
            )}
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-6 z-20 bg-white rounded-b-[24px]">
            <h3 className="font-sans font-bold text-lg text-gray-900 leading-snug line-clamp-2">
              {event.title}
            </h3>
            
            <div className="mt-5 flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 border-2 border-white shadow-sm">
                {speakerImg ? (
                  <img src={speakerImg} alt={event.speakerName} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs font-bold text-gray-400">
                    {event.speakerName?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-bold text-gray-900 font-sans">{event.speakerName}</div>
                <div className="truncate text-xs text-gray-500 font-medium">{event.speakerCompany}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-gray-500 mt-auto pt-4 border-t border-gray-50">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-gray-400" /> {new Date(event.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
              </span>
              {isUpcoming && event.duration && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gray-400" /> {event.duration}
                </span>
              )}
            </div>
            
            {isUpcoming && (
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#d955a4] uppercase tracking-wide">
                Details <ArrowRight className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        </article>
      </Link>
    </div>
  );
}
