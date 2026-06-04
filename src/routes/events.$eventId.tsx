import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getEvent } from "@/data/community";
import { youtubeThumb, getSpeakerImageByName } from "@/lib/event-helpers";
import { Calendar, Clock, ArrowLeft, ExternalLink } from "lucide-react";
import starSticker from "@/assets/stickers/star.png";
import paperClip from "@/assets/stickers/paper-clip.png";
import smiley from "@/assets/stickers/smiley.png";

export const Route = createFileRoute("/events/$eventId")({
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
          to="/events/upcoming" 
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
            </div>
          </div>

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
