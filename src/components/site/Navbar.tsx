import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
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



export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-end px-4 lg:justify-center lg:px-0 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "flex w-auto items-center gap-2 rounded-full px-3 py-2 transition-all duration-300 glass-strong",
          scrolled && "shadow-soft",
        )}
      >

        <nav className="hidden items-center gap-1 lg:flex">
          {mainLinks.slice(0, 3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition hover:bg-white/60 hover:text-primary"
            >
              {l.label}
            </Link>
          ))}

          <Link
          to="/resources"
           activeProps={{ className: "text-primary" }}
             className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition hover:bg-white/60 hover:text-primary"
            >
             Resources
          </Link>

          {mainLinks.slice(3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-primary" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition hover:bg-white/60 hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
         <Link
            to="/contact"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary"
          >
            Contact
          </Link>

          <Link
            to="/join"
            className="rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:scale-105"
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
              <Link
              to="/resources"
               onClick={() => setOpen(false)}
               className="rounded-2xl px-4 py-3 text-base font-medium hover:bg-white/60"
              >
               Resources
               </Link>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium hover:bg-white/60"
              >
                Contact
              </Link>
              
              <Link
                to="/join"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full gradient-primary px-5 py-3 text-center text-sm font-semibold text-white shadow-soft"
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
