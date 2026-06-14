import { createFileRoute, Link } from "@tanstack/react-router";
import confusedMascot from "@/assets/main-mascot/confused.png";
import { events } from "@/data/community";
import { youtubeThumb, getSpeakerImageByName } from "@/lib/event-helpers";
import { EventCard } from "@/components/site/EventCard";
import { useContext } from "react";
import { EventsSearchContext } from "./events";

export const Route = createFileRoute("/events/past")({
  component: PastEvents,
});

function PastEvents() {
  const { search, category } = useContext(EventsSearchContext);

  const list = events
    .filter((e) => e.status === "past")
    .filter((e) => {
      if (category !== "All" && e.category !== category) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        (e.speakerName && e.speakerName.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

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
    <section className="container mx-auto max-w-6xl px-6 py-14 pb-32">
      <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 pt-6">
        {list.map((e, idx) => {
          const thumb = e.posterImage || youtubeThumb(e.youtubeLink) || undefined;
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
