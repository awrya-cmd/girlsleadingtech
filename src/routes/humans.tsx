import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { team, mentors, speakers, contributors } from "@/data/community";
import { cn } from "@/lib/utils";
import { Linkedin, MapPin } from "lucide-react";

export const Route = createFileRoute("/humans")({
  head: () => ({ meta: [{ title: "Humans — Girls Leading Tech" }, { name: "description", content: "The team, mentors, speakers and contributors behind Girls Leading Tech." }] }),
  component: HumansPage,
});

type Tab = "team" | "speakers" | "mentors" | "contributors";

function HumansPage() {
  const [tab, setTab] = useState<Tab>("team");
  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "team", label: "Team", count: team.length },
    { id: "speakers", label: "Speakers", count: speakers.length },
    { id: "mentors", label: "Mentors", count: mentors.length },
    { id: "contributors", label: "Contributors", count: contributors.length },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Humans"
        title="The faces behind the magic."
        description="Builders, mentors, speakers and contributors who make GLT what it is."
      />
      <section className="container mx-auto max-w-6xl px-6 pb-20">
        <div className="glass mx-auto flex w-fit flex-wrap justify-center gap-1 rounded-full p-1.5">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition",
                tab === t.id ? "gradient-primary text-white shadow-glow" : "text-foreground/70 hover:text-primary",
              )}
            >
              {t.label} <span className="opacity-60">· {t.count}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tab === "team" && team.map((m) => <PersonCard key={m.id} name={m.name} sub={m.role ?? ""} location={`${m.city}, ${m.state}`} />)}
          {tab === "speakers" && speakers.map((m) => <PersonCard key={m.id} name={m.name} sub={m.designation} location={m.company} />)}
          {tab === "mentors" && mentors.map((m) => <PersonCard key={m.id} name={m.name} sub={m.designation} location={m.company} />)}
          {tab === "contributors" && contributors.map((m) => <PersonCard key={m.id} name={m.name} sub="" location={`${m.city}, ${m.state}`} />)}
        </div>
      </section>
    </>
  );
}

function PersonCard({ name, sub, location }: { name: string; sub: string; location: string }) {
  return (
    <GlassCard glow className="p-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-2xl font-medium text-white shadow-glow">
        {name.charAt(0)}
      </div>
      <h3 className="mt-4 font-display text-lg">{name}</h3>
      {sub && <p className="text-xs font-semibold uppercase tracking-widest text-primary">{sub}</p>}
      <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3" /> {location}
      </p>
      <div className="mt-4 flex justify-center">
        <button className="flex h-8 w-8 items-center justify-center rounded-full glass hover:scale-110 transition">
          <Linkedin className="h-3.5 w-3.5" />
        </button>
      </div>
    </GlassCard>
  );
}
