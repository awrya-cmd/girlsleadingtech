import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/site/GlassCard";
import { events } from "@/data/community";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/events/upcoming")({
  component: UpcomingEvents,
});

function UpcomingEvents() {
  const list = events.filter((e) => e.status === "upcoming").sort((a,b) => +new Date(a.date) - +new Date(b.date));
  if (list.length === 0) {
    return (
      <section className="container mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-muted-foreground">No upcoming events scheduled — check back soon, or peek at <Link to="/events/past" className="text-primary underline">past sessions</Link>.</p>
      </section>
    );
  }
  return (
    <section className="container mx-auto max-w-6xl px-6 py-14 pb-20">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => (
          <Link key={e.id} to="/events/$eventId" params={{ eventId: e.id }}>
            <GlassCard glow className="h-full p-7">
              <span className="inline-block rounded-full gradient-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                Upcoming
              </span>
              <h3 className="mt-4 font-display text-xl">{e.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">with {e.speakerName} · {e.speakerCompany}</p>
              <div className="mt-5 flex flex-wrap gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1">
                  <Calendar className="h-3 w-3" /> {new Date(e.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
                </span>
                {e.duration && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1">
                    <Clock className="h-3 w-3" /> {e.duration}
                  </span>
                )}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Details <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
