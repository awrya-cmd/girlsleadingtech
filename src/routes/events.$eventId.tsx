import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GlassCard } from "@/components/site/GlassCard";
import { getEvent } from "@/data/community";
import { youtubeThumb, getSpeakerImageByName } from "@/lib/event-helpers";
import { Calendar, Clock, ArrowLeft, ExternalLink } from "lucide-react";

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
      <h1 className="font-display text-4xl">Event not found</h1>
      <Link to="/events/upcoming" className="mt-6 inline-block text-primary underline">Back to events</Link>
    </section>
  ),
  errorComponent: ({ error }) => (
    <section className="container mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </section>
  ),
  component: EventDetail,
});

function EventDetail() {
  const { event } = Route.useLoaderData();
  const thumb = youtubeThumb(event.youtubeLink) || event.posterImage;
  const speakerImg = getSpeakerImageByName(event.speakerName);

  return (
    <section className="container mx-auto max-w-3xl px-6 pb-24 pt-32">
      <Link to="/events/upcoming" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> All events
      </Link>
      <GlassCard strong className="mt-6 overflow-hidden p-0">
        {thumb && (
          <div className="aspect-video w-full overflow-hidden">
            <img src={thumb} alt={event.title} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="p-8 md:p-12">
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
          event.status === "upcoming" ? "gradient-primary text-white" : "bg-secondary/20 text-secondary"
        }`}>
          {event.status}
        </span>
        <h1 className="mt-4 font-display text-3xl md:text-5xl">
          <span className="text-gradient">{event.title}</span>
        </h1>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(event.date).toLocaleDateString("en-US", { dateStyle: "full" })}
          </span>
          {event.duration && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5">
              <Clock className="h-4 w-4" /> {event.duration}
            </span>
          )}
        </div>

        {event.summary && <p className="mt-8 text-base text-foreground/80">{event.summary}</p>}

        <div className="mt-8 flex items-center gap-4 rounded-2xl border border-primary/15 bg-white/40 p-5">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-white">
            {speakerImg ? (
              <img src={speakerImg} alt={event.speakerName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center font-display text-2xl text-primary/50">
                {event.speakerName?.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">Speaker</div>
            <div className="mt-1 font-display text-xl">{event.speakerName}</div>
            <div className="text-sm text-muted-foreground">{event.speakerDesignation} · {event.speakerCompany}</div>
          </div>
        </div>

        {(event.registrationLink || event.youtubeLink) && (
          <a
            href={event.registrationLink || event.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3 text-sm font-semibold text-white shadow-soft"
          >
            {event.status === "upcoming" ? "Register" : "Watch recording"} <ExternalLink className="h-4 w-4" />
          </a>
        )}
        </div>
      </GlassCard>
    </section>
  );
}
