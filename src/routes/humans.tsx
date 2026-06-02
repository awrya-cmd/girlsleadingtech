import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { team, mentors, speakers, contributors, volunteers } from "@/data/community";
import { cn } from "@/lib/utils";
import { Linkedin, MapPin, Building2, Search, X } from "lucide-react";
import { SpeakerCard } from "@/components/site/SpeakerCard";

export const Route = createFileRoute("/humans")({
  head: () => ({ meta: [{ title: "Humans — Girls Leading Tech" }, { name: "description", content: "The team, mentors, speakers and contributors behind Girls Leading Tech." }] }),
  component: HumansPage,
});

type Tab = "team" | "speakers" | "mentors" | "contributors" | "volunteers";

function matches(q: string, ...fields: (string | undefined)[]) {
  if (!q) return true;
  const needle = q.toLowerCase();
  return fields.some((f) => f && f.toLowerCase().includes(needle));
}

function HumansPage() {
  const [tab, setTab] = useState<Tab>("team");
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState<string>("all");

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "team", label: "Team", count: team.length },
    { id: "speakers", label: "Speakers", count: speakers.length },
    { id: "mentors", label: "Mentors", count: mentors.length },
    { id: "contributors", label: "Contributors", count: contributors.length },
    { id: "volunteers", label: "Volunteers", count: volunteers.length },
  ];

  // Build company list for current tab (speakers + mentors)
  const companies = useMemo(() => {
    let pool: string[] = [];
    if (tab === "speakers") pool = speakers.map((s) => s.company).filter(Boolean) as string[];
    if (tab === "mentors") pool = mentors.map((m) => m.company).filter(Boolean) as string[];
    return Array.from(new Set(pool)).sort();
  }, [tab]);

  const filteredSpeakers = useMemo(
    () => speakers.filter((s) =>
      matches(query, s.name, s.company, s.designation) &&
      (company === "all" || s.company === company),
    ),
    [query, company],
  );
  const filteredMentors = useMemo(
    () => mentors.filter((m) =>
      matches(query, m.name, m.company, m.designation) &&
      (company === "all" || m.company === company),
    ),
    [query, company],
  );
  const filteredTeam = useMemo(
    () => team.filter((t) => matches(query, t.name, t.role, t.city, t.state)),
    [query],
  );
  const filteredContribs = useMemo(
    () => contributors.filter((c) => matches(query, c.name, c.city, c.state)),
    [query],
  );
  const filteredVolunteers = useMemo(
    () => volunteers.filter((v) => matches(query, v.name, v.city, v.state)),
    [query],
  );

  const showCompanyFilter = tab === "speakers" || tab === "mentors";

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
              onClick={() => { setTab(t.id); setCompany("all"); }}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition",
                tab === t.id ? "gradient-primary text-white shadow-soft" : "text-foreground/70 hover:text-primary",
              )}
            >
              {t.label} <span className="opacity-60">· {t.count}</span>
            </button>
          ))}
        </div>

        {/* Search + filter bar */}
        <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-3 sm:flex-row">
          <div className="relative flex-1 w-full">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search by name${tab === "speakers" || tab === "mentors" ? ", company or designation" : ""}…`}
              className="w-full rounded-full border border-border bg-card/80 backdrop-blur pl-11 pr-10 py-3 text-sm shadow-soft outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {showCompanyFilter && (
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-full border border-border bg-card/80 backdrop-blur px-5 py-3 text-sm shadow-soft outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15 sm:w-auto"
            >
              <option value="all">All companies</option>
              {companies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tab === "team" &&
            filteredTeam.map((m, i) => (
              <PersonCard
                key={m.id}
                name={m.name}
                sub={m.role}
                location={m.city && m.state ? `${m.city}, ${m.state}` : m.city || m.state}
                kind="location"
                delay={i}
                linkedin={m.linkedin}
                image={m.image}
              />
            ))}
          {tab === "speakers" &&
            filteredSpeakers.map((m, i) => (
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
            filteredMentors.map((m, i) => (
              <PersonCard key={m.id} name={m.name} sub={m.designation} location={m.company} kind="company" delay={i} linkedin={(m as { linkedin?: string }).linkedin} />
            ))}
          {tab === "contributors" &&
            filteredContribs.map((m, i) => (
              <PersonCard
                key={m.id}
                name={m.name}
                location={m.city && m.state ? `${m.city}, ${m.state}` : m.city || m.state}
                kind="location"
                delay={i}
                linkedin={m.linkedin}
                image={m.image}
              />
            ))}
          {tab === "volunteers" &&
            filteredVolunteers.map((m, i) => (
              <PersonCard
                key={m.id}
                name={m.name}
                location={m.city && m.state ? `${m.city}, ${m.state}` : m.city || m.state}
                kind="location"
                delay={i}
                linkedin={m.linkedin}
                image={m.image}
              />
            ))}
        </div>

        {/* Empty state */}
        {((tab === "team" && filteredTeam.length === 0) ||
          (tab === "speakers" && filteredSpeakers.length === 0) ||
          (tab === "mentors" && filteredMentors.length === 0) ||
          (tab === "contributors" && filteredContribs.length === 0) ||
          (tab === "volunteers" && filteredVolunteers.length === 0)) && (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            No matches. Try a different search.
          </p>
        )}
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
    <GlassCard className="group p-6 text-center animate-fade-up" style={{ animationDelay: `${(delay % 12) * 0.05}s` }}>
      <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full gradient-primary text-2xl font-medium text-white shadow-soft transition group-hover:scale-110">
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
