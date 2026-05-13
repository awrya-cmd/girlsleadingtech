import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { GlassCard } from "@/components/site/GlassCard";
import { ArrowRight, GraduationCap, Trophy, BookOpen, Newspaper, Video, Users, UserPlus, Map, BriefcaseBusiness, Library, Award, Wrench, Rocket, Star } from "lucide-react";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources — Girls Leading Tech" },
      { name: "description", content: "Curated scholarships, hackathons, courses, articles, books and more for women in tech." },
    ],
  }),
  component: ResourcesHub,
});

const categories = [
  { to: "/resources/scholarships", label: "Scholarships", desc: "Funding programs for women in tech.", Icon: GraduationCap, color: "from-pink-300/60 to-pink-200/30" },
  { to: "/resources/hackathons", label: "Hackathons", desc: "Build, compete and win.", Icon: Trophy, color: "from-purple-300/60 to-purple-200/30" },
  { to: "/resources/programs", label: "Programs", desc: "Fellowships & cohorts to apply to.", Icon: Rocket, color: "from-fuchsia-300/60 to-pink-200/30" },
  { to: "/resources/courses", label: "Courses", desc: "Curated learning paths.", Icon: BookOpen, color: "from-rose-300/60 to-rose-200/30" },
  { to: "/resources/tools", label: "Tools", desc: "The stack we swear by.", Icon: Wrench, color: "from-amber-300/60 to-rose-200/30" },
  { to: "/resources/articles", label: "Articles", desc: "Reading worth your time.", Icon: Newspaper, color: "from-violet-300/60 to-violet-200/30" },
  { to: "/resources/videos", label: "Videos", desc: "Watch and learn.", Icon: Video, color: "from-fuchsia-300/60 to-fuchsia-200/30" },
  { to: "/resources/books", label: "Books", desc: "Books we love.", Icon: Library, color: "from-orange-300/60 to-orange-200/30" },
  { to: "/resources/role-models", label: "Role Models", desc: "Indian women leading in tech.", Icon: Star, color: "from-rose-300/60 to-pink-200/30" },
  { to: "/resources/people", label: "People to Follow", desc: "Voices worth listening to.", Icon: UserPlus, color: "from-pink-300/60 to-rose-200/30" },
  { to: "/resources/communities", label: "Communities", desc: "Find your tribe.", Icon: Users, color: "from-purple-300/60 to-pink-200/30" },
  { to: "/resources/roadmaps", label: "Roadmaps", desc: "Career playbooks.", Icon: Map, color: "from-violet-300/60 to-rose-200/30" },
  { to: "/resources/interview-prep", label: "Interview Prep", desc: "Ace the interview.", Icon: BriefcaseBusiness, color: "from-rose-300/60 to-purple-200/30" },
  { to: "/resources/certifications", label: "Certifications", desc: "Validate your skills.", Icon: Award, color: "from-orange-300/60 to-pink-200/30" },
] as const;

function ResourcesHub() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="The curated stack."
        description="Hand-picked, no-fluff resources to level up your career — from scholarships to roadmaps."
      />
      <section className="container mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ to, label, desc, Icon, color }) => (
            <Link key={to} to={to} className="group block">
              <GlassCard glow className="relative h-full overflow-hidden p-7">
                <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${color} blur-2xl`} />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-glow">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-5 font-display text-xl">{label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
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
