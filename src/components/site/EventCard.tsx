import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Play, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSpeakerImageByName } from "@/lib/event-helpers";

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
  const hasSpeakers = event.speakers && event.speakers.length > 0;
  const firstSpeaker = hasSpeakers ? event.speakers[0] : null;

  const resolvedSpeakerImg = hasSpeakers
    ? (firstSpeaker.image || getSpeakerImageByName(firstSpeaker.name) || null)
    : speakerImg;

  const displayName = hasSpeakers
    ? `${firstSpeaker.name}${event.speakers.length > 1 ? ` +${event.speakers.length - 1} more` : ""}`
    : event.speakerName;

  const displayCompany = hasSpeakers
    ? "Panel Discussion"
    : event.speakerCompany;

  const displayInitial = hasSpeakers
    ? firstSpeaker.name?.charAt(0)
    : event.speakerName?.charAt(0);

  return (
    <div
      className="relative group h-full transition-all duration-400 ease-out z-10 hover:z-50 hover:scale-[1.03] pt-4"
    >
      <Link
        to="/events/$eventId"
        params={{ eventId: event.id }}
        search={{ from: event.status }}
        className="block h-full"
      >
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
                {resolvedSpeakerImg ? (
                  <img src={resolvedSpeakerImg} alt={hasSpeakers ? firstSpeaker.name : event.speakerName} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs font-bold text-gray-400">
                    {displayInitial}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-bold text-gray-900 font-sans">{displayName}</div>
                <div className="truncate text-xs text-gray-500 font-medium">{displayCompany}</div>
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