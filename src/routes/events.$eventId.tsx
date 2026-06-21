import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getEvent } from "@/data/community";
import { youtubeThumb, getSpeakerImageByName } from "@/lib/event-helpers";
import { Calendar, Clock, ArrowLeft, ExternalLink, Linkedin } from "lucide-react";
import starSticker from "@/assets/stickers/star.png";
import paperClip from "@/assets/stickers/paper-clip.png";
import smiley from "@/assets/stickers/smiley.png";

export const Route = createFileRoute("/events/$eventId")({
  validateSearch: (search: Record<string, unknown>): { from?: string } => {
    return {
      from: search.from ? (search.from as string) : undefined,
    };
  },
  loader: ({ params }) => {
    const event = getEvent(params.eventId);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.event.title ?? "Event"} — Girls Leading Tech` },
      { name: "description", content: loaderData?.event.summary ?? "Event details" },
    ],
  }),
  notFoundComponent: () => (
    <section className="container mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-sans text-4xl font-black text-gray-900">Event not found</h1>
      <Link to="/events/upcoming" className="mt-6 inline-block font-bold text-[#d955a4] underline">Back to events</Link>
    </section>
  ),
  errorComponent: ({ error }) => (
    <section className="container mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-sans text-3xl font-black text-gray-900">Something went wrong</h1>
      <p className="mt-2 text-sm text-gray-500 font-medium">{error.message}</p>
    </section>
  ),
  component: EventDetail,
});

function EventDetail() {
  const { event } = Route.useLoaderData();
  const { from } = Route.useSearch();
  const activeTab = from || event.status;
  const backPath =
    activeTab === "past"
      ? "/events/past"
      : activeTab === "ongoing"
      ? "/events/ongoing"
      : "/events/upcoming";
  const thumb = youtubeThumb(event.youtubeLink) || event.posterImage;
  const speakerImg = getSpeakerImageByName(event.speakerName);
  const isUpcoming = event.status === "upcoming";

  return (
    <section className="container mx-auto max-w-4xl px-6 pb-24 pt-32 flex flex-col items-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
      `}</style>
      
      <div className="w-full mb-6 flex justify-start">
        <Link 
          to={backPath} 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-transform hover:-translate-x-1 uppercase tracking-widest"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <ArrowLeft className="h-4 w-4" /> All events
        </Link>
      </div>
      
      <div className="relative w-full max-w-3xl mx-auto bg-[#FFFBEA] rounded-[32px] shadow-[0_16px_60px_rgba(217,85,164,0.15)] border-[2px] border-[#d955a4] z-10">
        
        {/* Scrapbook Stickers */}
        <img src={paperClip} alt="" className="absolute top-12 -left-5 w-14 h-auto z-20 pointer-events-none -rotate-12 drop-shadow-md" />
        <img src={smiley} alt="" className="absolute -bottom-8 -right-8 w-24 h-auto z-20 pointer-events-none -rotate-12 opacity-95 drop-shadow-lg" />
        <img src={starSticker} alt="" className="absolute bottom-20 -left-6 w-12 h-auto z-20 pointer-events-none animate-[pulse_3s_ease-in-out_infinite] drop-shadow-md" />

        {/* Hero Image */}
        {thumb && (
          <div className="aspect-video w-full overflow-hidden bg-[#FFFBEA] rounded-t-[32px] relative z-10">
            <img src={thumb} alt={event.title} className="h-full w-full object-cover" />
          </div>
        )}
        
        {/* Event Details */}
        <div className="p-8 md:p-12 lg:p-16 relative z-10">
          <div>
            <span 
              className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] shadow-sm ${
                isUpcoming ? "bg-[#d955a4] text-white" : "bg-gray-900 text-white"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {event.status}
            </span>
          </div>
          
          <h1 
            className="mt-6 font-semibold text-[#701a4b] leading-[1.1] tracking-tight text-3xl md:text-4xl lg:text-5xl capitalize"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {event.title.toLowerCase()}
          </h1>
          
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-gray-600">
            <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100/50">
              <Calendar className="h-4 w-4 text-[#d955a4]" />
              {new Date(event.date).toLocaleDateString("en-US", { dateStyle: "full" })}
            </span>
            {event.duration && (
              <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100/50">
                <Clock className="h-4 w-4 text-[#d955a4]" /> {event.duration}
              </span>
            )}
          </div>

          {event.summary && (
            <p className="mt-8 font-sans text-base lg:text-lg text-gray-600 leading-relaxed font-medium">
              {event.summary}
            </p>
          )}

          {event.timestamps && event.timestamps.length > 0 && (
            <div className="mt-8">
              <h2 className="font-semibold text-[#701a4b] text-xl md:text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Session Timeline
              </h2>
              <div className="mt-4 flex flex-col gap-2 max-w-xl">
                {event.timestamps.map((ts: { time: string; title: string }, idx: number) => {
                  const secs = timestampToSeconds(ts.time);
                  const videoLink = getYoutubeLinkWithTimestamp(event.youtubeLink || "", secs);
                  return (
                    <a
                      key={idx}
                      href={videoLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/50 border border-[#d955a4]/10 hover:border-[#d955a4]/30 hover:bg-[#ffed95]/20 transition-all duration-200 group animate-[fadeIn_0.3s_ease-out]"
                    >
                      <span className="font-mono text-sm font-bold text-[#d8358d] bg-white border border-[#d955a4]/20 rounded-lg px-2.5 py-1 shadow-sm group-hover:scale-105 transition-transform">
                        {ts.time}
                      </span>
                      <span className="font-sans text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                        {ts.title}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {event.speakers && event.speakers.length > 0 ? (
            <div className="mt-8 flex flex-col gap-4 max-w-md relative">
              {event.speakers.map((speaker: { id: string; name: string; image?: string; designation?: string; company?: string; linkedin?: string }) => {
                const img = speaker.image || getSpeakerImageByName(speaker.name);
                return (
                  <div key={speaker.id} className="relative flex items-center gap-4 rounded-2xl bg-[#FFD966] shadow-md border border-[#d955a4]/20 border-l-[5px] border-l-[#d955a4] p-5 z-10">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100 border-2 border-white shadow-sm">
                      {img ? (
                        <img src={img} alt={speaker.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center font-sans text-2xl font-black text-gray-300">
                          {speaker.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d8358d]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Speaker
                      </div>
                      <div className="mt-1 font-sans text-xl font-black text-gray-900">{speaker.name}</div>
                      <div className="text-xs font-semibold text-gray-700">{speaker.designation} · {speaker.company}</div>
                    </div>
                    {speaker.linkedin && (
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 text-gray-700 hover:bg-[#0077B5] hover:text-white transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md z-20"
                        title={`${speaker.name}'s LinkedIn Profile`}
                        aria-label={`${speaker.name} on LinkedIn`}
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 relative max-w-md">
              <div className="relative flex items-center gap-4 rounded-2xl bg-[#FFD966] shadow-md border border-[#d955a4]/20 border-l-[5px] border-l-[#d955a4] p-5 z-10">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100 border-2 border-white shadow-sm">
                  {speakerImg ? (
                    <img src={speakerImg} alt={event.speakerName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center font-sans text-2xl font-black text-gray-300">
                      {event.speakerName?.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d8358d]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Speaker
                  </div>
                  <div className="mt-1 font-sans text-xl font-black text-gray-900">{event.speakerName}</div>
                  <div className="text-xs font-semibold text-gray-700">{event.speakerDesignation} · {event.speakerCompany}</div>
                </div>
                {event.speakerLinkedin && (
                  <a
                    href={event.speakerLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 text-gray-700 hover:bg-[#0077B5] hover:text-white transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md z-20"
                    title={`${event.speakerName}'s LinkedIn Profile`}
                    aria-label={`${event.speakerName} on LinkedIn`}
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}

          {(event.registrationLink || event.youtubeLink) && (
            <div className="mt-8 pt-6 border-t border-[#ffed95]/50">
              <a
                href={event.registrationLink || event.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d955a4] to-[#ff7eb3] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_rgba(217,85,164,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_30px_rgba(217,85,164,0.4)]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {isUpcoming ? "Register Now" : "Watch Recording"} <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function timestampToSeconds(timeStr: string): number {
  const parts = timeStr.split(":").map((p) => parseInt(p, 10) || 0);
  let seconds = 0;
  if (parts.length === 3) {
    seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    seconds = parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    seconds = parts[0];
  }
  return seconds;
}

function getYoutubeLinkWithTimestamp(baseLink: string, seconds: number): string {
  if (!baseLink) return "";
  const separator = baseLink.includes("?") ? "&" : "?";
  return `${baseLink}${separator}t=${seconds}`;
}
