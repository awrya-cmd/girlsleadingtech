import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { GlassCard } from "@/components/site/GlassCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Marquee } from "@/components/site/Marquee";
import { ArrowRight, ArrowUpRight, Heart, Users, Linkedin } from "lucide-react";
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
      { name: "description", content: "A premium community of 4000+ women across 1000+ colleges in India, building, learning and leading in tech together." },
    ],
  }),
  component: HomePage,
});

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9];

const ease = [0.22, 1, 0.36, 1] as const;

function HeroDecor() {
  return (
    <>
      <div className="pointer-events-none absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full bg-[oklch(0.9_0.07_30/0.45)] blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-32 h-[34rem] w-[34rem] rounded-full bg-[oklch(0.88_0.06_340/0.4)] blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.93_0.07_70/0.35)] blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" />
    </>
  );
}

function HomePage() {
  return (
    <>
      {/* HERO — editorial, restrained, breathing */}
      <section className="relative isolate overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <HeroDecor />

        <div className="container relative mx-auto max-w-6xl px-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-foreground/25" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-foreground/65">
              A Sisterhood in Technology · Est. India
            </span>
            <span className="h-px w-10 bg-foreground/25" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.1, ease }}
            className="mx-auto mt-8 max-w-[14ch] text-center font-serif font-normal tracking-tight text-foreground"
            style={{ fontSize: "clamp(3.25rem, 11vw, 9.5rem)", lineHeight: 0.92, letterSpacing: "-0.02em" }}
          >
            Girls <span className="ink-accent">Leading</span> Tech
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="mx-auto mt-10 max-w-xl text-center text-lg font-light leading-relaxed text-foreground/70"
          >
            Mentorship, scholarships, hackathons and a rare kind of community —
            everything a woman in tech needs to learn, ship and lead, gathered
            in one quietly extraordinary place.
          </motion.p>

          {/* CTA pair — editorial */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
          >
            <Link
              to="/join"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:bg-primary hover:shadow-coral"
            >
              Join the community
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/initiatives"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-foreground"
            >
              <span className="relative">
                View our initiatives
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-foreground/30 transition-transform duration-500 group-hover:scale-x-0" />
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-primary transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </span>
              <span className="inline-block h-px w-8 bg-foreground transition-all duration-300 group-hover:w-12 group-hover:bg-primary" />
            </Link>
          </motion.div>

          {/* Editorial stats strip — minimal, with hairlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease }}
            className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-y-8 border-y border-foreground/10 py-8 sm:grid-cols-4"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-6 text-center ${i > 0 ? "sm:border-l sm:border-foreground/10" : ""}`}
              >
                <div className="font-serif text-4xl text-foreground md:text-5xl">
                  {s.value.toLocaleString()}
                  <span className="ink-accent">{s.suffix}</span>
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GALLERY MARQUEE — slower, refined frames */}
      <section className="relative pb-32">
        <Marquee className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="h-60 w-80 shrink-0 overflow-hidden rounded-sm border border-foreground/10 shadow-soft md:h-80 md:w-[26rem]"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover grayscale-[0.15] transition-all duration-1000 hover:grayscale-0 hover:scale-105"
              />
            </div>
          ))}
        </Marquee>
      </section>

      {/* ETHOS — split editorial layout */}
      <section className="relative py-32">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/25" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/65">
                  Our Ethos
                </span>
              </div>
              <h2 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-foreground md:text-6xl">
                Built <span className="ink-accent">for</span> women in tech.
              </h2>
              <p className="mt-7 text-lg font-light leading-relaxed text-foreground/70">
                A movement for every girl who has ever wondered if she belongs
                in this room — spoiler, she leads it. We build the resources,
                rooms and runways the next generation deserves.
              </p>
              <Link
                to="/about"
                className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-foreground"
              >
                <span>Read our story</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
              {[
                { Icon: Heart, label: "Vision", title: "A world that listens.", body: "Where every girl who dreams in code, design or data has a community, a mentor and a runway to lead." },
                { Icon: Users, label: "Mission", title: "100,000 women, lifted.", body: "To equip 100,000 women in tech across India with the resources, mentorship and confidence to lead." },
              ].map(({ Icon, label, title, body }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease }}
                  className="paper rounded-2xl p-8 transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5 text-primary ring-1 ring-foreground/10">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/55">
                    {label}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl leading-tight text-foreground">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INITIATIVES — editorial cards */}
      <section className="relative py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Initiatives"
            title="Programs powering the movement."
            italicWord="powering"
            description="From flagship summits to year-round fellowships — every initiative is designed to push you forward."
          />
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {initiatives.slice(0, 6).map((i, idx) => (
              <motion.div
                key={i.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: (idx % 3) * 0.08, ease }}
              >
                <Link
                  to="/initiatives/$slug"
                  params={{ slug: i.slug }}
                  className="group relative block h-full"
                >
                  <div className="paper relative h-full overflow-hidden rounded-2xl p-8 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-coral">
                    {/* Number marker */}
                    <div className="flex items-start justify-between">
                      <span className="font-serif text-sm italic text-primary">
                        {String(idx + 1).padStart(2, "0")} <span className="text-foreground/30 not-italic">/ Program</span>
                      </span>
                      <span className="text-foreground/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    <h3 className="mt-10 font-serif text-3xl leading-tight text-foreground">{i.name}</h3>
                    <p className="mt-3 text-sm font-medium italic text-primary">{i.tagline}</p>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {i.description}
                    </p>

                    <div className="mt-10 border-t border-foreground/10 pt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/50">
                      Girls Leading Tech
                    </div>

                    {/* Subtle accent on hover */}
                    <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-700 group-hover:w-full" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/initiatives" className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              See all initiatives
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* SPEAKERS — editorial portrait cards */}
      <section className="relative py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Speakers"
            title="Voices who've graced our stages."
            italicWord="graced"
            description="A glimpse of the engineers, founders and leaders who've shared their stories with us."
          />
          <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {speakers
              .filter((s) => ["s99","s100","s102","s19","s20","s18","s17","s45","s50","s46","s96","s97"].includes(s.id))
              .map((s, idx) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: (idx % 4) * 0.06, ease }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-[oklch(0.94_0.04_340)] to-[oklch(0.94_0.05_70)] aspect-[3/4] flex items-end justify-center border border-foreground/10">
                    {/* Initials monogram, large editorial */}
                    <span className="absolute inset-0 flex items-center justify-center font-serif text-7xl text-foreground/15 transition-transform duration-700 group-hover:scale-110">
                      {s.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </span>
                    {s.linkedin && (
                      <a
                        href={s.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${s.name} on LinkedIn`}
                        className="relative z-10 m-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground/90 text-background shadow-soft backdrop-blur transition hover:scale-110 hover:bg-primary"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="mt-4">
                    <h4 className="font-serif text-lg leading-tight text-foreground">{s.name}</h4>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      {s.designation}
                    </p>
                    {s.company && <p className="mt-0.5 text-xs text-muted-foreground">{s.company}</p>}
                  </div>
                </motion.div>
              ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              to="/humans"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:bg-primary"
            >
              See more speakers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — editorial pull-quotes */}
      <section className="relative py-32">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Stories"
            title="Glow-ups, in their own words."
            italicWord="own"
          />
          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: (idx % 4) * 0.08, ease }}
              >
                <GlassCard paper className="h-full p-7">
                  <div className="font-serif text-5xl leading-none text-primary/40">"</div>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">{t.quote}</p>
                  <div className="mt-6 border-t border-foreground/10 pt-4">
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLEGES — editorial chip cluster */}
      <section className="relative py-32">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Reach"
            title="1000+ campuses, one community."
            italicWord="one"
            description="A glimpse at the colleges where GLT members lead clubs, hackathons and chapters across India."
          />
          <div className="mt-16 flex flex-wrap justify-center gap-2">
            {colleges.slice(0, 36).map((c, i) => (
              <span
                key={c}
                className="rounded-full border border-foreground/10 bg-white/70 px-4 py-2 text-xs font-medium text-foreground/80 backdrop-blur transition hover:border-primary/30 hover:text-foreground animate-fade-up"
                style={{ animationDelay: `${(i % 18) * 0.04}s` }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/impact" className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              See all colleges
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNERS — slow editorial marquees */}
      <section className="relative py-32">
        <div className="container mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Partners"
            title="The companies cheering us on."
            italicWord="cheering"
            description="Ecosystem, industry and community partners amplifying the movement."
          />
        </div>
        <div className="mt-16 space-y-6">
          {[
            { label: "Ecosystem", list: ecosystemPartners },
            { label: "Industry", list: industryPartners },
            { label: "Community", list: communityPartners },
          ].map((group, gi) => (
            <Marquee
              key={group.label}
              reverse={gi % 2 === 1}
              className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
            >
              {group.list.map((p) => {
                const inner = (
                  <div className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-foreground/10 bg-white/80 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft">
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} loading="lazy" className="max-h-14 max-w-[80%] object-contain" />
                    ) : (
                      <span className="text-center text-xs font-serif text-foreground/70">{p.name}</span>
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
        <div className="container mx-auto mt-12 max-w-6xl px-6 text-center">
          <Link to="/partners" className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            See all partners
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* CTA — editorial ink card */}
      <section className="relative py-32">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-3xl gradient-ink p-12 text-center md:p-20">
            <div className="pointer-events-none absolute inset-0 bg-grain opacity-30" />
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-secondary/40 blur-[100px]" />

            <div className="relative">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-white/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/70">Open to all</span>
                <span className="h-px w-10 bg-white/30" />
              </div>
              <h2 className="mt-6 font-serif text-5xl text-white md:text-7xl">
                Your seat at the <span className="italic text-[oklch(0.85_0.12_60)]">table</span> is waiting.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-white/75">
                Become part of a community that builds, learns and lifts each other up.
              </p>
              <Link
                to="/join"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-foreground shadow-glow transition hover:scale-105"
              >
                Join Girls Leading Tech <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
