import { createFileRoute, Link } from "@tanstack/react-router";
import { GradientMesh, Sparkles } from "@/components/site/GradientMesh";
import { GlassCard } from "@/components/site/GlassCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatCounter } from "@/components/site/StatCounter";
import { Marquee } from "@/components/site/Marquee";
import { ArrowRight, Heart, Users, Sparkle } from "lucide-react";
import { stats } from "@/data/stats";
import { initiatives } from "@/data/initiatives";
import { speakers, testimonials, partners } from "@/data/community";
import { colleges } from "@/data/colleges";
import heroBg from "@/assets/hero-bg.jpg";
import community1 from "@/assets/community-1.jpg";
import community2 from "@/assets/community-2.jpg";
import community3 from "@/assets/community-3.jpg";
import community4 from "@/assets/community-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Girls Leading Tech — Empowering Women in Tech" },
      { name: "description", content: "Join 4000+ women across 1000+ colleges in India building, learning and leading in tech together." },
    ],
  }),
  component: HomePage,
});

const galleryImages = [community1, community2, community3, community4, community1, community2];
const initiativeColors: Record<string, string> = {
  pink: "from-pink-300/60 to-pink-200/30",
  lavender: "from-violet-300/60 to-violet-200/30",
  peach: "from-orange-300/60 to-orange-200/30",
  rose: "from-rose-300/60 to-rose-200/30",
  violet: "from-purple-400/60 to-violet-200/30",
};

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url(${heroBg})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/50 to-background"
          aria-hidden
        />
        <GradientMesh />
        <Sparkles />
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary shadow-soft animate-fade-up">
            <Sparkle className="h-3.5 w-3.5" /> A community of 4000+ women in tech
          </span>
          <h1
            className="mt-7 font-display text-5xl font-medium leading-[1.05] md:text-7xl lg:text-8xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Where girls{" "}
            <span className="text-gradient italic">lead</span>
            <br />
            the future of tech.
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Mentorship, scholarships, hackathons, communities — everything a
            woman in tech needs to learn, ship and shine, all in one beautiful place.
          </p>
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/join"
              className="group flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:scale-105"
            >
              Join the community
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/resources"
              className="rounded-full glass-strong px-7 py-3.5 text-sm font-semibold text-foreground shadow-soft transition hover:bg-white"
            >
              Explore resources
            </Link>
          </div>
        </div>
      </section>

      {/* PICTURES MARQUEE */}
      <section className="relative pb-16">
        <Marquee>
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="h-56 w-80 shrink-0 overflow-hidden rounded-3xl shadow-soft md:h-72 md:w-96"
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* ABOUT / VISION / MISSION */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="About us"
            title="Built by women, for women in tech."
            description="Girls Leading Tech is a movement for every girl who's ever wondered if she belongs in this room. Spoiler: she leads it."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <GlassCard glow className="p-8 md:p-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-glow">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-2xl">Our Vision</h3>
              <p className="mt-3 text-muted-foreground">
                A world where every girl who dreams in code, design or data has a
                community, a mentor and a runway to lead. No gatekeeping. Just
                glow-ups.
              </p>
            </GlassCard>
            <GlassCard glow className="p-8 md:p-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary shadow-lavender">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-2xl">Our Mission</h3>
              <p className="mt-3 text-muted-foreground">
                To equip 100,000 women in tech across India with the resources,
                mentorship and confidence to ship the products and lead the teams
                of tomorrow.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <GlassCard strong className="p-10 md:p-14">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((s) => (
                <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* INITIATIVES */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Initiatives"
            title="Programs powering the movement."
            description="From flagship summits to year-round fellowships, every initiative is designed to push you forward."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {initiatives.slice(0, 6).map((i) => (
              <Link
                key={i.slug}
                to="/initiatives/$slug"
                params={{ slug: i.slug }}
                className="group block"
              >
                <GlassCard glow className="relative h-full overflow-hidden p-7">
                  <div
                    className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${initiativeColors[i.color]} blur-2xl`}
                  />
                  <div className="relative">
                    <h3 className="font-display text-2xl">{i.name}</h3>
                    <p className="mt-2 text-sm font-medium text-primary">{i.tagline}</p>
                    <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                      {i.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Speakers"
            title="Voices who've graced our stages."
            description="Engineers, founders and leaders from the companies you dream of joining."
          />
        </div>
        <div className="mt-12">
          <Marquee>
            {speakers.map((s) => (
              <div
                key={s.id}
                className="w-72 shrink-0 rounded-3xl glass p-6 shadow-soft"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary text-xl font-medium text-white shadow-glow">
                  {s.name.charAt(0)}
                </div>
                <h4 className="mt-4 font-display text-lg">{s.name}</h4>
                <p className="text-xs font-medium uppercase tracking-widest text-primary">
                  {s.designation}
                </p>
                <p className="text-sm text-muted-foreground">{s.company}</p>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Stories"
            title="Glow-ups, in their own words."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, idx) => (
              <GlassCard
                key={t.id}
                glow
                className="p-6 animate-fade-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-3xl text-primary/40 font-display leading-none">"</div>
                <p className="text-sm text-foreground/85">{t.quote}</p>
                <div className="mt-5 border-t border-primary/10 pt-4">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* COLLEGES REACHED */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Reach"
            title="1000+ campuses, one community."
            description="A glimpse at the colleges where GLT members lead clubs, hackathons and chapters across India."
          />
          <div className="mt-14 flex flex-wrap justify-center gap-2">
            {colleges.slice(0, 36).map((c, i) => (
              <span
                key={c}
                className="rounded-full glass px-4 py-2 text-xs font-medium text-foreground/80 shadow-soft animate-fade-up"
                style={{ animationDelay: `${(i % 18) * 0.04}s` }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/impact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              See all colleges <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Partners"
            title="The companies cheering us on."
          />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {partners.map((p) => (
              <GlassCard key={p.id} className="flex items-center justify-center p-6">
                <span className="font-display text-lg text-foreground/70">{p.name}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] gradient-primary p-12 text-center shadow-glow md:p-16">
            <Sparkles />
            <h2 className="font-display text-4xl text-white md:text-6xl">
              Your seat at the table is waiting.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90">
              Become part of a community that builds, learns and lifts each other up.
            </p>
            <Link
              to="/join"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-primary shadow-soft transition hover:scale-105"
            >
              Join Girls Leading Tech <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
