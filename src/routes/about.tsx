import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Heart, Compass, Sparkles, Users, Rocket, HandHeart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Girls Leading Tech" },
      { name: "description", content: "Our vision, mission, values and the story behind Girls Leading Tech — a community of 4000+ women across India." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Heart, title: "Radical Kindness", color: "text-primary", desc: "We greet every member like family. No question is too small, no goal too big." },
  { icon: Rocket, title: "Ship-It Energy", color: "text-secondary", desc: "Done is better than perfect. We celebrate launches, prototypes and PRs." },
  { icon: HandHeart, title: "No Gatekeeping", color: "text-accent-foreground", desc: "Every resource, opportunity and connection is shared openly." },
  { icon: Users, title: "Lift As We Climb", color: "text-primary", desc: "Mentor someone who's two steps behind. That's the entire game." },
];

const timeline = [
  { year: "2022", title: "A WhatsApp group of 50", body: "What began as a small circle of friends helping each other through interviews quickly grew into something bigger." },
  { year: "2023", title: "First EmpowerHer summit", body: "Our flagship event brought 500+ women together for talks, workshops and unforgettable connections." },
  { year: "2024", title: "Crossed 2000 members", body: "We expanded into Code at Christmas, Hack Aura and the I2P fellowship — building year-round programming." },
  { year: "2025", title: "4000+ across 1000+ colleges", body: "Today we span 23+ states with a national speaker line-up and partner companies hiring directly from our community." },
  { year: "2026", title: "EmpowerHer 2.0", body: "The next chapter — bigger summits, dedicated scholarships and a runway to 100,000 women in tech." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Our story, in pink and lavender."
        description="From a tiny WhatsApp group to a movement of 4000+ women — here's how we got here, and where we're going."
      />

      {/* Vision / Mission */}
      <section className="container mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard glow className="p-8 md:p-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-glow">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display text-3xl">Our Vision</h3>
            <p className="mt-3 text-foreground/80">
              A world where every girl who dreams in code, design or data has a community,
              a mentor and a runway to lead. No gatekeeping. Just glow-ups.
            </p>
          </GlassCard>
          <GlassCard glow className="p-8 md:p-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary shadow-lavender">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display text-3xl">Our Mission</h3>
            <p className="mt-3 text-foreground/80">
              To equip 100,000 women in tech across India with the resources, mentorship
              and confidence to ship the products and lead the teams of tomorrow.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto max-w-6xl px-6 pb-20">
        <SectionHeading eyebrow="Values" title="What we believe in." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <GlassCard key={v.title} glow className="p-7 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <v.icon className={`h-8 w-8 ${v.color}`} />
              <h4 className="mt-4 font-display text-xl">{v.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container mx-auto max-w-4xl px-6 pb-20">
        <SectionHeading eyebrow="Journey" title="The road so far." />
        <div className="relative mt-14">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/40 via-secondary/40 to-transparent md:left-1/2" />
          {timeline.map((t, i) => (
            <div key={t.year} className={`relative mb-10 md:flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              <div className="absolute left-4 -translate-x-1/2 md:left-1/2">
                <div className="h-4 w-4 rounded-full gradient-primary shadow-glow ring-4 ring-background" />
              </div>
              <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                <GlassCard glow className="p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{t.year}</span>
                  <h4 className="mt-2 font-display text-xl">{t.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
                </GlassCard>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-5xl px-6 pb-24">
        <GlassCard strong glow className="p-10 text-center md:p-14">
          <h2 className="font-display text-3xl md:text-5xl">
            <span className="text-gradient">Be part of the next chapter.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Whether you code, design, lead or are still figuring it out — there's a seat for you here.
          </p>
          <Link
            to="/join"
            className="mt-8 inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:scale-105"
          >
            Join the community <ArrowRight className="h-4 w-4" />
          </Link>
        </GlassCard>
      </section>
    </>
  );
}
