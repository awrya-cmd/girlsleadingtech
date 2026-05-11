import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/site/GlassCard";
import { events } from "@/data/community";
import { Calendar, Play } from "lucide-react";

export const Route = createFileRoute("/events/past")({
  component: PastEvents,
});

function PastEvents() {
  const list = events.filter((e) => e.status === "past").sort((a,b) => +new Date(b.date) - +new Date(a.date));
  return (
    <section className="container mx-auto max-w-6xl px-6 py-14 pb-20">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => (
          <Link key={e.id} to="/events/$eventId" params={{ eventId: e.id }}>
            <GlassCard glow className="h-full p-7">
              <span className="inline-block rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary">
                Past
              </span>
              <h3 className="mt-4 font-display text-xl">{e.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">with {e.speakerName} · {e.speakerCompany}</p>
              <div className="mt-5 flex flex-wrap gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1">
                  <Calendar className="h-3 w-3" /> {new Date(e.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
                </span>
                {e.youtubeLink && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1">
                    <Play className="h-3 w-3" /> Recording
                  </span>
                )}
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
