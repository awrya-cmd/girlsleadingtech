# Girls Leading Tech — Official Website Plan

A vibrant, modern, glassmorphic site built to scale. We start fully frontend with typed data files, structured so swapping each data source for a Lovable Cloud query later is a one-file change.

## 1. Visual Identity

**Aesthetic:** Pastel pink + lavender glassmorphism — soft, dreamy, modern.

**Color tokens (oklch in `styles.css`):**
- Background: warm cream-pink (`#fff7fb` feel)
- Primary: pastel pink
- Secondary: lavender
- Accent: peach / soft coral
- Glass surfaces: white at 55–70% opacity with subtle border + backdrop blur
- Gradient meshes (pink → lavender → peach) used in heroes and section backgrounds

**Type:** Display serif for headlines (e.g. *Fraunces* or *DM Serif Display*), clean sans for body (*Inter* / *Plus Jakarta Sans*).

**Motion:** Soft fade-ups on scroll, gentle hover lifts, sparkle/blob SVGs floating in backgrounds.

## 2. Route Architecture

Each major section is its own TanStack route file (real SSR + SEO, not hash anchors).

```
src/routes/
  __root.tsx              → shell, navbar, footer, fonts, meta
  index.tsx               → Landing
  impact.tsx              → Impact / numbers / stories
  about.tsx               → Vision, Mission, story
  contact.tsx             → mailto + form CTA

  resources.tsx           → Resources hub (category tiles)
  resources.scholarships.tsx
  resources.hackathons.tsx
  resources.articles.tsx
  resources.videos.tsx
  resources.courses.tsx
  resources.people.tsx
  resources.communities.tsx
  resources.interview-prep.tsx
  resources.roadmaps.tsx
  resources.books.tsx
  resources.certifications.tsx

  events.tsx              → layout w/ tabs
  events.upcoming.tsx
  events.past.tsx
  events.$eventId.tsx     → individual event detail

  initiatives.tsx         → grid of programs
  initiatives.$slug.tsx   → EmpowerHer, I2P, Code at Christmas, Hack Aura, Valentine's Week, GLT Spotlight

  humans.tsx              → tabs: Team / Speakers / Mentors / Contributors
  partners.tsx            → community partners

  join.tsx                → redirects to Google Form
```

Navbar has a **Resources mega-menu** revealing all categories on hover/tap, plus top-level links (Home, Impact, Events, Initiatives, Humans, Partners, Contact). Sticky, glass-blurred.

## 3. Landing Page Sections

1. **Hero** — animated gradient mesh, big serif headline ("Girls Leading Tech"), tagline, dual CTAs (Join Us / Explore Resources), floating sparkle blobs.
2. **Pictures wall slideshow** — auto-scrolling marquee of community photos.
3. **About / Vision / Mission** — two glass cards side by side.
4. **Numbers strip** — animated counters: 4000+ Members, 1000+ Colleges, 23+ States.
5. **Initiatives preview** — 6 program cards linking to detail pages.
6. **Previous Speakers** — horizontal carousel of speaker glass cards.
7. **Success Stories** — testimonial cards.
8. **Colleges Reached** — logo grid with "See more" expanding to full 1000-college view.
9. **Partners** — logo strip.
10. **Newsletter / Join CTA** — gradient banner.

## 4. Footer

Four columns on desktop, stacked on mobile:
- **Brand** + tagline + socials (LinkedIn, Instagram, Twitter, WhatsApp, YouTube, GitHub, Newsletter)
- **Programs** (external subdomain links: empowerher, codeatchristmas, hackaura, etc.)
- **Explore** (Resources, Events, Initiatives, Humans)
- **Contact** (email + Join form link)

## 5. Reusable Component System

In `src/components/`:
- `GlassCard`, `GradientButton`, `SectionHeading`, `StatCounter`, `Marquee`, `SparkleBackground`, `GradientMesh`
- `SpeakerCard`, `EventCard`, `ResourceCard`, `ScholarshipCard`, `HackathonCard`, `InitiativeCard`, `TeamMemberCard`, `PartnerLogo`
- `Navbar` (with `MegaMenu`), `Footer`, `PageHeader` (reused across all inner pages for consistent title + breadcrumb)

Built on shadcn primitives, themed to match.

## 6. Data Layer (frontend-only, backend-ready)

All content lives in `src/data/` as typed TS modules — pages import from these. When backend lands, each file becomes a server-fn / DB query with the same return type.

```
src/data/
  types.ts            → Speaker, Event, Resource, Scholarship,
                        Hackathon, Initiative, TeamMember, Partner, etc.
  speakers.ts
  events.ts
  scholarships.ts     → seeded with the 17 from your sheet
  hackathons.ts       → seeded with the 12 from your sheet
  articles.ts, videos.ts, courses.ts, books.ts,
  people.ts, communities.ts, roadmaps.ts,
  interview-prep.ts, certifications.ts
  initiatives.ts      → 6 programs w/ descriptions + external links
  team.ts, mentors.ts, contributors.ts
  partners.ts
  stats.ts            → 4000+, 1000+, 23+
  testimonials.ts, successStories.ts
  socials.ts, programLinks.ts
```

Each entity exposes a typed array + a `getById(slug)` helper so detail pages (e.g. `events.$eventId`) work today and stay identical after backend wiring.

## 7. What's Polished vs Stubbed in This Pass

**Fully designed with real content:**
- Landing, Impact, About, Contact, Join
- Resources hub + Scholarships + Hackathons (real data from your sheets)
- Events index pages (using the schema you provided)
- Initiatives grid + individual program pages
- Humans (Team/Speakers/Mentors/Contributors tabs)
- Partners

**Stubbed but routed** (clean placeholder + heading + "coming soon" glass card, ready to fill):
- Resource sub-pages where your sheet is empty (Articles, Videos, Courses, People, Communities, Books, Roadmaps, Interview Prep, Certifications)

## 8. Future Backend Hook-In (not built now)

When you're ready, we enable Lovable Cloud and:
- Replace each `src/data/*.ts` with a server function returning the same type
- Add admin-only pages to manage Speakers / Events / Resources
- Add user roles (`admin`, `member`) via separate `user_roles` table
- Add newsletter signup, contact form, event registration

No page code changes — only the data module swaps.

## Technical Notes

- TanStack Start file-based routing; `__root.tsx` hosts shared Navbar + Footer + global head meta; each route sets its own `head()` for SEO.
- Tailwind v4 via `styles.css` with custom oklch tokens for `--primary`, `--secondary`, `--accent`, `--glass`, `--glass-border`, plus gradient utility classes.
- Google Fonts loaded in `__root.tsx` head.
- All external program links open in a new tab.
- Images: copy your provided assets into `src/assets/` and import as ES modules; placeholder Unsplash imagery for any sections without final assets.
- Mobile-first responsive; mega-menu collapses into a slide-over sheet on mobile.
