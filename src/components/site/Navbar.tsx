import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const mainLinks = [
  { to: "/", label: "Home" },
  { to: "/impact", label: "Impact" },
  { to: "/events", label: "Events" },
  { to: "/initiatives", label: "Initiatives" },
  { to: "/humans", label: "Humans" },
  { to: "/partners", label: "Partners" },
] as const;

const resourceLinks = [
  { to: "/resources/scholarships", label: "Scholarships", desc: "Funding for women in tech" },
  { to: "/resources/hackathons", label: "Hackathons", desc: "Build, compete, win" },
  { to: "/resources/courses", label: "Courses", desc: "Curated learning paths" },
  { to: "/resources/articles", label: "Articles", desc: "Reading worth your time" },
  { to: "/resources/videos", label: "Videos", desc: "Watch & learn" },
  { to: "/resources/books", label: "Books", desc: "Books we love" },
  { to: "/resources/people", label: "People", desc: "Voices to follow" },
  { to: "/resources/communities", label: "Communities", desc: "Find your tribe" },
  { to: "/resources/roadmaps", label: "Roadmaps", desc: "Career playbooks" },
  { to: "/resources/interview-prep", label: "Interview Prep", desc: "Ace the interview" },
  { to: "/resources/certifications", label: "Certifications", desc: "Validate your skills" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileResources, setMobileResources] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-auto items-center gap-2 rounded-full px-3 py-2 transition-all duration-500",
          scrolled ? "glass-strong shadow-editorial" : "glass",
        )}
      >

        <nav className="hidden items-center gap-1 lg:flex">
          {mainLinks.slice(0, 3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-foreground bg-foreground/5" }}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-4 py-2 text-[13px] font-medium tracking-tight text-foreground/65 transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}

          <div className="group relative">
            <button className="flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-medium tracking-tight text-foreground/65 transition-colors hover:text-foreground">
              Resources <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full mt-3 w-[640px] -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
              <div className="paper grid grid-cols-2 gap-1 rounded-2xl p-3">
                {resourceLinks.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    className="rounded-xl px-4 py-3 transition hover:bg-foreground/5"
                  >
                    <div className="text-sm font-semibold text-foreground">{r.label}</div>
                    <div className="text-xs text-muted-foreground">{r.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {mainLinks.slice(3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-foreground bg-foreground/5" }}
              className="rounded-full px-4 py-2 text-[13px] font-medium tracking-tight text-foreground/65 transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <span className="mx-2 h-4 w-px bg-foreground/10" />
          <a
            href="mailto:girlsleadingtech@gmail.com"
            className="rounded-full px-4 py-2 text-[13px] font-medium tracking-tight text-foreground/65 transition-colors hover:text-foreground"
          >
            Contact
          </a>
          <Link
            to="/join"
            className="rounded-full bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background transition hover:bg-primary"
          >
            Join Us
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="rounded-full glass-strong p-2.5 lg:hidden" aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] sm:w-96 overflow-y-auto bg-mesh">
            <div className="flex flex-col gap-1 pt-8">
              {mainLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium hover:bg-white/60"
                >
                  {l.label}
                </Link>
              ))}
              <button
                onClick={() => setMobileResources((s) => !s)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium hover:bg-white/60"
              >
                Resources
                <ChevronDown className={cn("h-4 w-4 transition", mobileResources && "rotate-180")} />
              </button>
              {mobileResources && (
                <div className="ml-3 flex flex-col gap-0.5 border-l border-primary/20 pl-3">
                  {resourceLinks.map((r) => (
                    <Link
                      key={r.to}
                      to={r.to}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-2 text-sm hover:bg-white/60"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
              <a
                href="mailto:girlsleadingtech@gmail.com"
                className="rounded-2xl px-4 py-3 text-base font-medium hover:bg-white/60"
              >
                Contact
              </a>
              <Link
                to="/join"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full gradient-primary px-5 py-3 text-center text-sm font-semibold text-white shadow-glow"
              >
                Join Us
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
