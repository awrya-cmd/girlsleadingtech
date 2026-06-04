import { createFileRoute } from "@tanstack/react-router";
import { events } from "@/data/community";
import { youtubeThumb, getSpeakerImageByName } from "@/lib/event-helpers";
import { EventCard } from "@/components/site/EventCard";

export const Route = createFileRoute("/events/past")({
  component: PastEvents,
});

function PastEvents() {
  const list = events
    .filter((e) => e.status === "past")
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return (
    <section className="container mx-auto max-w-6xl px-6 py-14 pb-32">
      <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 pt-6">
        {list.map((e, idx) => {
          const thumb = youtubeThumb(e.youtubeLink) || e.posterImage;
          const speakerImg = getSpeakerImageByName(e.speakerName);
          return (
            <EventCard
              key={e.id}
              event={e}
              thumb={thumb}
              speakerImg={speakerImg}
              isUpcoming={false}
              index={idx}
            />
          );
        })}
      </div>
    </section>
  );
}
