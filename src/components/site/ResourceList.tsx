import { PageHeader } from "./PageHeader";
import { GlassCard } from "./GlassCard";
import { ExternalLink } from "lucide-react";
import type { Resource } from "@/data/types";

export function ResourceList({
  category,
  title,
  description,
  items,
}: {
  category: string;
  title: string;
  description: string;
  items: Resource[];
}) {
  return (
    <>
      <PageHeader eyebrow={`Resources / ${category}`} title={title} description={description} />
      <section className="container mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r, idx) => {
            const CardInner = (
              <GlassCard
                glow
                className="group h-full p-6 animate-fade-up"
                style={{ animationDelay: `${(idx % 9) * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                    {r.category}
                  </span>
                  {r.link && (
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition group-hover:text-primary group-hover:translate-x-0.5" />
                  )}
                </div>
                <h3 className="mt-4 font-display text-xl leading-tight">{r.title}</h3>
                {r.author && (
                  <p className="mt-1 text-xs font-medium text-secondary">by {r.author}</p>
                )}
                {r.description && (
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{r.description}</p>
                )}
              </GlassCard>
            );
            return r.link ? (
              <a key={r.id} href={r.link} target="_blank" rel="noopener noreferrer" className="block">
                {CardInner}
              </a>
            ) : (
              <div key={r.id}>{CardInner}</div>
            );
          })}
        </div>
      </section>
    </>
  );
}
