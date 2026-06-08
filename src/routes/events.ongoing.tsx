import { createFileRoute, Link } from "@tanstack/react-router";
import confusedMascot from "@/assets/main-mascot/confused.png";
import { events } from "@/data/community";
import { youtubeThumb, getSpeakerImageByName } from "@/lib/event-helpers";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useContext } from "react";
import { EventsSearchContext } from "./events";

export const Route = createFileRoute("/events/ongoing")({
  component: OngoingEvents,
});

function OngoingEvents() {
  const { search, category } = useContext(EventsSearchContext);

  const list = events
    .filter((e) => e.status === "ongoing")
    .filter((e) => {
      if (category !== "All" && e.category !== category) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        (e.speakerName && e.speakerName.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));

  if (list.length === 0) {
    return (
      <section className="container mx-auto max-w-3xl px-6 py-20 text-center flex flex-col items-center justify-center p-12">
        <img src={confusedMascot} alt="Confused mascot" className="w-32 h-32 object-contain mb-6 animate-bounce" style={{ animationDuration: '3s' }} />
        <h2 className="text-2xl font-semibold text-gray-800 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          No events found for this category... yet!
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          We're currently brewing up some new sessions. Check back soon, or explore our Past events to get inspired.
        </p>
        <Link 
          to="/events/past"
          className="px-6 py-2.5 rounded-full border-2 border-pink-400 text-pink-500 font-semibold hover:bg-pink-50 transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Explore Past Events
        </Link>
      </section>
    );
  }
  return (
    <section className="container mx-auto max-w-6xl px-6 py-14 pb-20">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => {
          const thumb = youtubeThumb(e.youtubeLink) || e.posterImage;
          const speakerImg = getSpeakerImageByName(e.speakerName);
          return (
            <Link key={e.id} to="/events/$eventId" params={{ eventId: e.id }} className="group">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-border/60 shadow-soft transition-all duration-500 hover:-translate-y-1.5">
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-pink-soft/50 via-lavender/40 to-peach/50">
                  {thumb ? (
                    <img src={thumb} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display text-3xl text-primary/40">
                      {e.title.charAt(0)}
                    </div>
                  )}
                  <span className="absolute left-3 top-3 inline-block rounded-full gradient-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                    Ongoing Live
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg leading-tight">{e.title}</h3>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border">
                      {speakerImg ? (
                        <img src={speakerImg} alt={e.speakerName} className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs font-semibold text-primary/50">
                          {e.speakerName?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-xs font-semibold text-foreground">{e.speakerName}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{e.speakerCompany}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {new Date(e.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
                    </span>
                    {e.duration && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {e.duration}
                      </span>
                    )}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Join Now <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
