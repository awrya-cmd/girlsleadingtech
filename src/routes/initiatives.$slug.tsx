import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GlassCard } from "@/components/site/GlassCard";
import { GradientMesh, Sparkles } from "@/components/site/GradientMesh";
import { initiatives, getInitiative } from "@/data/initiatives";
import { ArrowLeft, ArrowRight, ExternalLink, Sparkle } from "lucide-react";

export const Route = createFileRoute("/initiatives/$slug")({
  loader: ({ params }) => {
    const initiative = getInitiative(params.slug);
    if (!initiative) throw notFound();
    return { initiative };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.initiative.name ?? "Initiative"} — Girls Leading Tech` },
      { name: "description", content: loaderData?.initiative.tagline ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <section className="container mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl">Initiative not found</h1>
      <Link to="/initiatives" className="mt-6 inline-block text-primary underline">All initiatives</Link>
    </section>
  ),
  errorComponent: ({ error }) => (
    <section className="container mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </section>
  ),
  component: InitiativeDetail,
});

const colorMap: Record<string, string> = {
  pink: "from-pink-300/60 to-pink-200/30",
  lavender: "from-violet-300/60 to-violet-200/30",
  peach: "from-orange-300/60 to-orange-200/30",
  rose: "from-rose-300/60 to-rose-200/30",
  violet: "from-purple-400/60 to-violet-200/30",
};

function InitiativeDetail() {
  const { initiative } = Route.useLoaderData();
  const others = initiatives.filter((i) => i.slug !== initiative.slug).slice(0, 3);

  return (
    <>
      <section className="relative pt-32 pb-16">
        <GradientMesh />
        <Sparkles />
        <div className="container mx-auto max-w-4xl px-6">
          <Link to="/initiatives" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> All initiatives
          </Link>
          <GlassCard strong glow className="relative mt-6 overflow-hidden p-10 md:p-14">
            <div className={`pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br ${colorMap[initiative.color]} blur-3xl`} />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                <Sparkle className="h-3 w-3" /> Initiative
              </span>
              <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
                <span className="text-gradient">{initiative.name}</span>
              </h1>
              <p className="mt-4 text-lg font-medium text-secondary md:text-xl">{initiative.tagline}</p>
              <p className="mt-6 text-base text-foreground/80 md:text-lg">{initiative.description}</p>
              {initiative.url && (
                <a
                  href={initiative.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:scale-105"
                >
                  Visit program site <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Other initiatives */}
      <section className="container mx-auto max-w-6xl px-6 pb-24">
        <h2 className="font-display text-2xl md:text-3xl">More from GLT</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((i) => (
            <Link key={i.slug} to="/initiatives/$slug" params={{ slug: i.slug }} className="group block">
              <GlassCard glow className="relative h-full overflow-hidden p-6">
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${colorMap[i.color]} blur-2xl`} />
                <div className="relative">
                  <h3 className="font-display text-xl">{i.name}</h3>
                  <p className="mt-1 text-xs font-medium text-primary">{i.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
