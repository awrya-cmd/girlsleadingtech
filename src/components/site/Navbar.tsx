import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import gltLogo from "@/assets/GLT-logo.png";

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
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between transition-all duration-300 px-6 md:px-12 pointer-events-none bg-transparent",
        scrolled ? "py-2" : "py-3.5",
      )}
    >
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between pointer-events-auto relative h-12 md:h-14">
        
        {/* Left Column: Logo */}
        <div className="flex-1 flex justify-start items-center">
          <Link to="/" className="flex items-center group transition-transform hover:scale-[1.02]">
            <img 
              src={gltLogo} 
              alt="GLT Logo" 
              className="h-14 md:h-28 w-auto object-contain select-none pointer-events-none" 
            />
          </Link>
        </div>

        {/* Center Column: Navigation links container (absolutely centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block z-10">
          <div
            className={cn(
              "flex items-center gap-2 rounded-md px-3.5 py-2.5 transition-all duration-300 bg-[#FFFBF7]/90 border border-black/20 shadow-sm",
              scrolled && "bg-white/85 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]",
            )}
          >
            <nav className="flex items-center gap-1">
              {mainLinks.slice(0, 3).map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeProps={{
                    className: "bg-[#ffed95] border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black font-bold",
                  }}
                  inactiveProps={{
                    className: "text-gray-800 hover:text-[#d955a4] border border-transparent font-medium",
                  }}
                  activeOptions={{ exact: l.to === "/" }}
                  className="px-4 py-2 text-sm transition-all duration-200 rounded-md"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  {l.label}
                </Link>
              ))}

              <Link
                to="/resources"
                activeProps={{
                  className: "bg-[#ffed95] border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black font-bold",
                }}
                inactiveProps={{
                  className: "text-gray-800 hover:text-[#d955a4] border border-transparent font-medium",
                }}
                className="px-4 py-2 text-sm transition-all duration-200 rounded-md"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                Resources
              </Link>

              {mainLinks.slice(3).map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeProps={{
                    className: "bg-[#ffed95] border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black font-bold",
                  }}
                  inactiveProps={{
                    className: "text-gray-800 hover:text-[#d955a4] border border-transparent font-medium",
                  }}
                  className="px-4 py-2 text-sm transition-all duration-200 rounded-md"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  {l.label}
                </Link>
              ))}

              <Link
                to="/contact"
                activeProps={{
                  className: "bg-[#ffed95] border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black font-bold",
                }}
                inactiveProps={{
                  className: "text-gray-800 hover:text-[#d955a4] border border-transparent font-medium",
                }}
                className="px-4 py-2 text-sm transition-all duration-200 rounded-md"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Right Column: Join Us Button */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="hidden lg:block">
            <Link
              to="/join"
              className="rounded-md border border-black bg-[#d955a4] px-5 py-2.5 text-sm font-bold text-white shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[1px_1px_0px_rgba(0,0,0,1)]"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Join Us
            </Link>
          </div>

          {/* Mobile hamburger Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button 
                className="rounded-md border border-black/20 bg-white/80 p-2.5 lg:hidden shadow-sm hover:border-black transition-all cursor-pointer" 
                aria-label="Menu"
              >
                <Menu className="h-5 w-5 text-black" />
              </button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[85vw] sm:w-96 overflow-y-auto bg-[#FFFBF7] border-l border-black/10 p-6 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6 pt-4">
                {/* Sheet Logo */}
                <div className="flex items-center gap-2 pb-4 border-b border-black/5">
                  <img 
                    src={gltLogo} 
                    alt="GLT Logo" 
                    className="h-14 w-auto object-contain" 
                  />
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                  {mainLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      activeProps={{
                        className: "bg-[#ffed95] border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black font-bold",
                      }}
                      inactiveProps={{
                        className: "text-gray-800 hover:text-black border border-transparent hover:bg-[#d955a4]/20 font-medium",
                      }}
                      activeOptions={{ exact: l.to === "/" }}
                      className="px-4 py-3 text-sm rounded-md transition-all duration-150"
                      style={{ fontFamily: "'Satoshi', sans-serif" }}
                    >
                      {l.label}
                    </Link>
                  ))}
                  
                  <Link
                    to="/resources"
                    onClick={() => setOpen(false)}
                    activeProps={{
                      className: "bg-[#ffed95] border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black font-bold",
                    }}
                    inactiveProps={{
                      className: "text-gray-800 hover:text-black border border-transparent hover:bg-[#d955a4]/20 font-medium",
                    }}
                    className="px-4 py-3 text-sm rounded-md transition-all duration-150"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    Resources
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    activeProps={{
                      className: "bg-[#ffed95] border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black font-bold",
                    }}
                    inactiveProps={{
                      className: "text-gray-800 hover:text-black border border-transparent hover:bg-[#d955a4]/20 font-medium",
                    }}
                    className="px-4 py-3 text-sm rounded-md transition-all duration-150"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Join Us at the bottom of sheet */}
              <div className="pt-6 border-t border-black/5">
                <Link
                  to="/join"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-md border-2 border-black bg-[#d955a4] py-3.5 text-center text-sm font-bold text-white shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Join Our Movement
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
