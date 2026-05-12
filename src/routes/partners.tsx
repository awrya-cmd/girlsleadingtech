import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { communityPartners, industryPartners, ecosystemPartners, type PartnerEntry } from "@/data/partners";

export const Route = createFileRoute("/partners")({
  head: () => ({ meta: [{ title: "Partners — Girls Leading Tech" }, { name: "description", content: "The communities, industry leaders and ecosystem partners powering Girls Leading Tech." }] }),
  component: PartnersPage,
});

function PartnerGroup({ title, items }: { title: string; items: PartnerEntry[] }) {
  return (
    <section className="container mx-auto max-w-6xl px-6 pb-16">
      <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">{items.length} partners</p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((p) => {
          const card = (
            <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-2xl glass p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
              {p.logo ? (
                <img src={p.logo} alt={p.name} loading="lazy" className="max-h-16 max-w-[80%] object-contain" />
              ) : (
                <div className="font-display text-base text-foreground/70">{p.name}</div>
              )}
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground line-clamp-1">{p.name}</div>
            </div>
          );
          return p.website ? (
            <a key={p.id} href={p.website} target="_blank" rel="noopener noreferrer" title={p.name}>
              {card}
            </a>
          ) : (
            <div key={p.id} title={p.name}>{card}</div>
          );
        })}
      </div>
    </section>
  );
}

function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Better, together."
        description="The communities, industry leaders and ecosystem partners who believe in what we're building."
      />
      <PartnerGroup title="Community Partners" items={communityPartners} />
      <PartnerGroup title="Industry Partners" items={industryPartners} />
      <PartnerGroup title="Ecosystem Partners" items={ecosystemPartners} />
      <div className="h-10" />
    </>
  );
}
