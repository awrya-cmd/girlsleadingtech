import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { GlassCard } from "@/components/site/GlassCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Marquee } from "@/components/site/Marquee";
import { ArrowRight, Heart, Users, Sparkle, Star, Flower2, Linkedin } from "lucide-react";
import { stats } from "@/data/stats";
import { initiatives } from "@/data/initiatives";
import { speakers, testimonials } from "@/data/community";
import { communityPartners, industryPartners, ecosystemPartners } from "@/data/partners";
import { colleges } from "@/data/colleges";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.webp";
import gallery4 from "@/assets/gallery-4.webp";
import gallery5 from "@/assets/gallery-5.webp";
import gallery6 from "@/assets/gallery-6.webp";
import gallery7 from "@/assets/gallery-7.webp";
import gallery8 from "@/assets/gallery-8.webp";
import gallery9 from "@/assets/gallery-9.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Girls Leading Tech — Empowering Women in Tech" },
      { name: "description", content: "Join 4000+ women across 1000+ colleges in India building, learning and leading in tech together." },
    ],
  }),
  component: HomePage,
});

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9];

const initiativeStyles: Record<string, { grad: string; ring: string; chip: string; emoji: string }> = {
  pink:     { grad: "from-rose-400 via-pink-500 to-fuchsia-500",   ring: "ring-rose-300/50",     chip: "bg-rose-100 text-rose-700",         emoji: "🌸" },
  lavender: { grad: "from-violet-400 via-fuchsia-500 to-pink-500", ring: "ring-violet-300/50",   chip: "bg-violet-100 text-violet-700",     emoji: "✨" },
  peach:    { grad: "from-amber-300 via-orange-400 to-rose-500",   ring: "ring-orange-300/50",   chip: "bg-orange-100 text-orange-700",     emoji: "🧡" },
  rose:     { grad: "from-pink-400 via-rose-500 to-red-500",       ring: "ring-pink-300/50",     chip: "bg-pink-100 text-pink-700",         emoji: "💖" },
  violet:   { grad: "from-purple-500 via-fuchsia-500 to-pink-500", ring: "ring-purple-300/50",   chip: "bg-purple-100 text-purple-700",     emoji: "🔮" },
};

function HeroDecor() {
  return (
    <>
      <div className="pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.78_0.2_25_/_0.55)] blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -right-32 top-20 h-[30rem] w-[30rem] rounded-full bg-[oklch(0.7_0.22_350_/_0.5)] blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
      <div className="pointer-events-none absolute left-1/3 -bottom-20 h-[24rem] w-[24rem] rounded-full bg-[oklch(0.78_0.18_60_/_0.5)] blur-3xl animate-blob" style={{ animationDelay: "6s" }} />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" />
    </>
  );
}

function HomePage() {
  return (
    <>
      {/* HERO — editorial, asymmetric, bold */}
      <section className="relative isolate overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
        <HeroDecor />

        {/* floating sparkles */}
        <Star className="absolute left-[12%] top-32 h-5 w-5 -rotate-12 fill-current text-[oklch(0.7_0.2_25)] animate-shimmer" />
        <Star className="absolute right-[14%] top-48 h-4 w-4 fill-current text-[oklch(0.6_0.22_340)] animate-shimmer" style={{ animationDelay: "1s" }} />
        <Flower2 className="absolute left-[8%] bottom-32 h-7 w-7 text-[oklch(0.65_0.22_15)] animate-float" />
        <Sparkle className="absolute right-[10%] bottom-40 h-6 w-6 text-[oklch(0.6_0.22_330)] animate-float" style={{ animationDelay: "2s" }} />

        <div className="container relative mx-auto max-w-7xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif whitespace-nowrap text-[clamp(2.5rem,11vw,9rem)] font-normal leading-[1.15] tracking-tight pb-2"
          >
            <span className="text-foreground/90">Girls </span>
            <span className="italic text-gradient-sunset">Leading </span>
            <span className="text-foreground/90">Tech</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-2xl text-base text-muted-foreground md:text-lg"
          >
            Mentorship, scholarships, hackathons and a sisterhood of builders —
            everything a woman in tech needs to learn, ship and shine, all in
            one beautiful place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
          </motion.div>

          {/* mini stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl glass px-4 py-4 text-center shadow-soft">
                <div className="font-serif text-2xl text-gradient">
                  {s.value.toLocaleString()}{s.suffix}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PICTURES MARQUEE */}
      <section className="relative pb-20">
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
            title="Built for women in tech."
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
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-sunset shadow-coral">
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

      {/* INITIATIVES — bolder, animated, creative cards */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Initiatives"
            title="Programs powering the movement."
            description="From flagship summits to year-round fellowships, every initiative is designed to push you forward."
          />
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {initiatives.slice(0, 6).map((i, idx) => {
              const s = initiativeStyles[i.color] ?? initiativeStyles.pink;
              return (
                <Link
                  key={i.slug}
                  to="/initiatives/$slug"
                  params={{ slug: i.slug }}
                  className="group relative block animate-fade-up"
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  {/* gradient halo */}
                  <div className={`pointer-events-none absolute -inset-[2px] rounded-[2rem] bg-gradient-to-br ${s.grad} opacity-60 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg`} />

                  <div className={`relative h-full overflow-hidden rounded-[1.85rem] bg-white/85 p-7 backdrop-blur-xl ring-1 ${s.ring} shadow-soft transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-glow`}>
                    {/* decorative blob */}
                    <div className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${s.grad} opacity-30 blur-2xl transition-transform duration-700 group-hover:scale-125`} />
                    {/* big rotating emoji */}
                    <div className="pointer-events-none absolute -right-2 -top-2 select-none text-7xl opacity-20 transition-all duration-700 group-hover:rotate-12 group-hover:opacity-40">
                      {s.emoji}
                    </div>

                    <div className="relative">
                      <span className={`inline-block rounded-full ${s.chip} px-3 py-1 text-[10px] font-bold uppercase tracking-widest`}>
                        Program {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-5 font-serif text-3xl leading-tight">{i.name}</h3>
                      <p className={`mt-2 text-sm font-semibold bg-gradient-to-r ${s.grad} bg-clip-text text-transparent`}>
                        {i.tagline}
                      </p>
                      <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                        {i.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                          Explore
                          <span className={`inline-block rounded-full bg-gradient-to-br ${s.grad} p-1.5 text-white shadow-glow transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-[-12deg]`}>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">GLT</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link to="/initiatives" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              See all initiatives <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SPEAKERS — featured static grid */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Speakers"
            title="Voices who've graced our stages."
            description="A glimpse of the engineers, founders and leaders who've shared their stories with us."
          />
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {speakers
              .filter((s) => ["s99","s100","s102","s19","s20","s18","s17","s45","s50","s46","s96","s97"].includes(s.id))
              .map((s, idx) => (
                <SpeakerCard
                  key={s.id}
                  name={s.name}
                  designation={s.designation}
                  company={s.company}
                  image={s.image}
                  linkedin={s.linkedin}
                  delay={idx}
                />
              ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/humans"
              className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-105"
            >
              See more speakers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
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

      {/* PARTNERS — smooth marquee */}
      <section className="relative py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Partners"
            title="The companies cheering us on."
            description="Ecosystem, industry and community partners amplifying the movement."
          />
        </div>
        <div className="mt-14 space-y-6">
          {[
            { label: "Ecosystem", list: ecosystemPartners },
            { label: "Industry", list: industryPartners },
            { label: "Community", list: communityPartners },
          ].map((group, gi) => (
            <Marquee key={group.label} reverse={gi % 2 === 1}>
              {group.list.map((p) => {
                const inner = (
                  <div className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl glass p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} loading="lazy" className="max-h-14 max-w-[80%] object-contain" />
                    ) : (
                      <span className="text-center text-xs font-display text-foreground/70">{p.name}</span>
                    )}
                  </div>
                );
                return p.website ? (
                  <a key={p.id} href={p.website} target="_blank" rel="noopener noreferrer" title={p.name}>
                    {inner}
                  </a>
                ) : (
                  <div key={p.id} title={p.name}>{inner}</div>
                );
              })}
            </Marquee>
          ))}
        </div>
        <div className="container mx-auto mt-10 max-w-6xl px-6 text-center">
          <Link to="/partners" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See all partners <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] gradient-sunset p-12 text-center shadow-glow md:p-16">
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-2xl animate-blob" />
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/20 blur-2xl animate-blob" style={{ animationDelay: "3s" }} />
            <h2 className="relative font-serif text-4xl text-white md:text-6xl">
              Your seat at the table is waiting.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/90">
              Become part of a community that builds, learns and lifts each other up.
            </p>
            <Link
              to="/join"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-primary shadow-soft transition hover:scale-105"
            >
              Join Girls Leading Tech <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
