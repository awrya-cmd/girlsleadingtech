import { createFileRoute, Link } from "@tanstack/react-router";
import { events } from "@/data/community";
import { youtubeThumb, getSpeakerImageByName } from "@/lib/event-helpers";
import { EventCard } from "@/components/site/EventCard";

export const Route = createFileRoute("/events/upcoming")({
  component: UpcomingEvents,
});

function UpcomingEvents() {
  const list = events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  if (list.length === 0) {
    return (
      <section className="container mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-gray-500 font-sans">
          No upcoming events scheduled — check back soon, or peek at{" "}
          <Link to="/events/past" className="text-[#d955a4] font-bold underline decoration-2 underline-offset-4 hover:text-[#d8358d]">past sessions</Link>.
        </p>
      </section>
    );
  }
  return (
    <section className="container mx-auto max-w-6xl px-6 py-14 pb-32">
      <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 pt-6">
        {list.map((e, idx) => {
          const thumb = youtubeThumb(e.youtubeLink) || e.posterImage;
          const speakerImg = getSpeakerImageByName(e.speakerName);
          // Highlight the first card (most immediate upcoming)
          const isHighlighted = idx === 0;
          return (
            <EventCard
              key={e.id}
              event={e}
              thumb={thumb}
              speakerImg={speakerImg}
              isUpcoming={true}
              isHighlighted={isHighlighted}
              index={idx}
            />
          );
        })}
      </div>
    </section>
  );
}
