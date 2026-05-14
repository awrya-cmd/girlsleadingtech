import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { team, mentors, speakers, contributors } from "@/data/community";
import { cn } from "@/lib/utils";
import { Linkedin, MapPin, Building2 } from "lucide-react";
import { SpeakerCard } from "@/components/site/SpeakerCard";

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
      <section className="container mx-auto max-w-6xl px-6 pb-24">
        <div className="glass-strong mx-auto flex w-fit flex-wrap justify-center gap-1 rounded-full p-1.5 shadow-soft">
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
          {tab === "team" &&
            team.map((m, i) => (
              <PersonCard key={m.id} name={m.name} sub={m.role} location={`${m.city}, ${m.state}`} kind="location" delay={i} />
            ))}
          {tab === "speakers" &&
            speakers.map((m, i) => (
              <SpeakerCard
                key={m.id}
                name={m.name}
                designation={m.designation}
                company={m.company}
                image={m.image}
                linkedin={m.linkedin}
                delay={i}
              />
            ))}
          {tab === "mentors" &&
            mentors.map((m, i) => (
              <PersonCard key={m.id} name={m.name} sub={m.designation} location={m.company} kind="company" delay={i} linkedin={(m as { linkedin?: string }).linkedin} />
            ))}
          {tab === "contributors" &&
            contributors.map((m, i) => (
              <PersonCard key={m.id} name={m.name} location={`${m.city}, ${m.state}`} kind="location" delay={i} />
            ))}
        </div>
      </section>
    </>
  );
}

function PersonCard({
  name,
  sub,
  location,
  kind,
  delay = 0,
  linkedin,
  image,
}: {
  name: string;
  sub?: string;
  location?: string;
  kind: "location" | "company";
  delay?: number;
  linkedin?: string;
  image?: string;
}) {
  const Icon = kind === "company" ? Building2 : MapPin;
  return (
    <GlassCard glow className="group p-6 text-center animate-fade-up" style={{ animationDelay: `${(delay % 12) * 0.05}s` }}>
      <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full gradient-primary text-2xl font-medium text-white shadow-glow transition group-hover:scale-110">
        {image ? (
          <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          name.charAt(0)
        )}
      </div>
      <h3 className="mt-4 font-display text-lg">{name}</h3>
      {sub && <p className="text-xs font-semibold uppercase tracking-widest text-primary">{sub}</p>}
      {location && (
        <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Icon className="h-3 w-3" /> {location}
        </p>
      )}
      {linkedin && (
        <div className="mt-4 flex justify-center">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A66C2] text-white transition hover:scale-110 shadow-soft"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      )}
    </GlassCard>
  );
}
