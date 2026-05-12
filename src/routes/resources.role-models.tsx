import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { roleModels } from "@/data/role-models";

export const Route = createFileRoute("/resources/role-models")({
  head: () => ({
    meta: [
      { title: "Female Role Models — Girls Leading Tech" },
      { name: "description", content: "Indian female role models in technology — founders, engineers, scientists and leaders." },
    ],
  }),
  component: RoleModelsPage,
});

function RoleModelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources / Role Models"
        title="Women you'll want to know."
        description="Indian female founders, engineers, scientists and leaders rewriting what's possible in tech."
      />
      <section className="container mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roleModels.map((p, idx) => (
            <GlassCard
              key={p.id}
              glow
              className="h-full p-6 animate-fade-up"
              style={{ animationDelay: `${(idx % 12) * 0.04}s` }}
            >
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                {p.domain}
              </span>
              <h3 className="mt-4 font-display text-xl leading-tight">{p.name}</h3>
              {(p.role || p.company) && (
                <p className="mt-1 text-xs font-semibold text-secondary">
                  {[p.role, p.company].filter(Boolean).join(" · ")}
                </p>
              )}
              {p.summary && (
                <p className="mt-3 text-sm text-muted-foreground line-clamp-5">{p.summary}</p>
              )}
              {p.location && (
                <p className="mt-4 text-[11px] uppercase tracking-widest text-muted-foreground">{p.location}</p>
              )}
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}
