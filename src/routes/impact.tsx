import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { StatCounter } from "@/components/site/StatCounter";
import { SectionHeading } from "@/components/site/SectionHeading";
import { stats } from "@/data/stats";
import { testimonials } from "@/data/community";
import { colleges } from "@/data/colleges";
import { ArrowRight } from "lucide-react";

function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our impact"
        title="The numbers tell a story."
        description="But the women behind them are the real headline."
      />

      {/* Stats */}
      <section className="container mx-auto max-w-6xl px-6 pb-16">
        <GlassCard strong glow className="p-10 md:p-14">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </GlassCard>
      </section>

      {/* Stories */}
      <section className="container mx-auto max-w-6xl px-6 pb-20">
        <SectionHeading eyebrow="Stories" title="Real glow-ups, real careers." description="Words from members whose lives changed because of this community." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <GlassCard key={t.id} glow className="p-8 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="text-5xl text-primary/40 font-display leading-none">"</div>
              <p className="text-base text-foreground/85">{t.quote}</p>
              <div className="mt-6 border-t border-primary/10 pt-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Colleges reached */}
      <section className="container mx-auto max-w-6xl px-6 pb-20">
        <SectionHeading eyebrow="Reach" title="Colleges in our community." description="A small sample of the 1000+ campuses where GLT members are leading clubs, hackathons and meetups." />
        <div className="mt-14 flex flex-wrap justify-center gap-2">
          {colleges.map((c, i) => (
            <span
              key={c}
              className="rounded-full glass px-4 py-2 text-xs font-medium text-foreground/80 shadow-soft animate-fade-up"
              style={{ animationDelay: `${(i % 30) * 0.02}s` }}
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-5xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] gradient-primary p-12 text-center shadow-glow md:p-16">
          <h2 className="font-display text-4xl text-white md:text-5xl">Want to be on this list next?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">Join 4000+ women already leading tech across India.</p>
          <Link to="/join" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-soft hover:scale-105 transition">
            Join us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
