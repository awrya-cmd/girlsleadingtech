import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Youtube, Github, Mail, Sparkles, Newspaper, Heart } from "lucide-react";
import { socials, programLinks } from "@/data/socials";
import gltLogo from "@/assets/GLT-logo.png";

// Scrapbook assets
import smiley from "@/assets/stickers/smiley.png";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-visible border-t-4 border-black bg-[#fdf9f5] pb-14 pt-0">
      {/* Playful top banner / header bar mimicking retro game / pixel design */}
      <div className="w-full flex items-center bg-[#ffc8e3] border-b-4 border-black py-3 px-6 select-none justify-between overflow-hidden relative z-10">
        <div className="flex gap-2">
          {["#FF8FAB", "#d955a4", "#f0b158"].map((c, i) => (
            <span
              key={i}
              className="w-3.5 h-3.5 rounded-full inline-block border-2 border-black"
              style={{ background: c }}
            />
          ))}
        </div>
        <span className="font-['Press_Start_2P',monospace] text-sm text-black animate-pulse uppercase tracking-wider hidden sm:inline-block">
          ★ SHIP MORE PRODUCTS ★ EMPOWER THE FUTURE ★ NO GATEKEEPING. JUST GLOW-UPS ★
        </span>
        <div className="flex gap-2">
          {["#f0b158", "#d955a4", "#FF8FAB"].map((c, i) => (
            <span
              key={i}
              className="w-3.5 h-3.5 rounded-full inline-block border-2 border-black"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>

      {/* Dotted canvas pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(180, 55, 120, 0.18) 1.5px, transparent 1.5px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container mx-auto max-w-7xl px-6 pt-8 relative z-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* CARD 1: Brand Logo & About */}
          <div className="relative group/card h-full">
            <div className="h-full rounded-[14px] border-2 border-black bg-[#fffdf9] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              {/* Smiley sticker overlapping */}
              <img
                src={smiley}
                alt="Smiley sticker"
                className="absolute -top-7 -left-5 w-12 rotate-[-12deg] pointer-events-none z-10 select-none transition-transform group-hover/card:scale-110"
              />
              <div className="flex flex-col h-full justify-between gap-4">
                <div>
                  <Link to="/" className="flex items-center gap-2">
                    <img 
                      src={gltLogo} 
                      alt="GLT Logo" 
                      className="h-12 w-auto object-contain select-none pointer-events-none" 
                    />
                    <span className="font-display text-lg font-black text-black">
                      Girls Leading <span className="text-[#d955a4]">Tech</span>
                    </span>
                  </Link>
                  <p className="mt-3 text-base font-sans font-medium text-black leading-relaxed">
                    A community empowering 4000+ women across 23+ states to lead in tech. Built with
                    love, code, and dreams.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <SocialIcon href={socials.linkedin}>
                    <Linkedin className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href={socials.instagram}>
                    <Instagram className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href={socials.twitter}>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </SocialIcon>
                  <SocialIcon href={socials.youtube}>
                    <Youtube className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href={socials.whatsapp}>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </SocialIcon>
                  <SocialIcon href={socials.github}>
                    <Github className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href={socials.newsletter}>
                    <Newspaper className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href="mailto:girlsleadingtech@gmail.com">
                    <Mail className="h-4 w-4" />
                  </SocialIcon>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Explore & Get Involved Stacked */}
          <div className="flex flex-col gap-4">
            {/* CARD 2: Explore links */}
            <div className="relative group/card">
              <div className="rounded-[14px] border-2 border-black bg-[#ffed95] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-['Press_Start_2P',monospace] text-xs uppercase tracking-wider text-black border-b-2 border-black pb-1.5 mb-2">
                  Explore
                </h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-sans font-semibold text-sm text-black">
                  <li>
                    <Link to="/impact" className="hover:text-[#d955a4] transition-all flex items-center gap-1.5 hover:translate-x-1 duration-150 transform">
                      <span className="text-[#d955a4]">↳</span> Impact
                    </Link>
                  </li>
                  <li>
                    <Link to="/resources" className="hover:text-[#d955a4] transition-all flex items-center gap-1.5 hover:translate-x-1 duration-150 transform">
                      <span className="text-[#d955a4]">↳</span> Resources
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="hover:text-[#d955a4] transition-all flex items-center gap-1.5 hover:translate-x-1 duration-150 transform">
                      <span className="text-[#d955a4]">↳</span> Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/initiatives" className="hover:text-[#d955a4] transition-all flex items-center gap-1.5 hover:translate-x-1 duration-150 transform">
                      <span className="text-[#d955a4]">↳</span> Initiatives
                    </Link>
                  </li>
                  <li>
                    <Link to="/humans" className="hover:text-[#d955a4] transition-all flex items-center gap-1.5 hover:translate-x-1 duration-150 transform">
                      <span className="text-[#d955a4]">↳</span> Humans
                    </Link>
                  </li>
                  <li>
                    <Link to="/partners" className="hover:text-[#d955a4] transition-all flex items-center gap-1.5 hover:translate-x-1 duration-150 transform">
                      <span className="text-[#d955a4]">↳</span> Partners
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* CARD 4: Get Involved */}
            <div className="relative group/card">
              <div className="rounded-[14px] border-2 border-black bg-[#ffc8e3] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative z-10">
                <h4 className="font-['Press_Start_2P',monospace] text-xs uppercase tracking-wider text-black border-b-2 border-black pb-1.5 mb-2">
                  Get Involved
                </h4>
                <ul className="space-y-1.5 font-sans font-semibold text-sm text-black max-h-[85px] overflow-y-auto pr-1 no-scrollbar">
                  <li>
                    <Link to="/join" className="hover:text-[#d955a4] transition-all flex items-center gap-1.5 hover:translate-x-1 duration-150 transform">
                      <span className="text-[#d955a4]">↳</span> Join the tribe
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:girlsleadingtech@gmail.com" className="hover:text-[#d955a4] transition-all flex items-center gap-1.5 hover:translate-x-1 duration-150 transform break-all">
                      <span className="text-[#d955a4]">↳</span> Email Us
                    </a>
                  </li>
                  <li>
                    {/* CHANGED: "Sub newsletter" → full label */}
                    <a href={socials.newsletter} target="_blank" rel="noopener noreferrer" className="hover:text-[#d955a4] transition-all flex items-center gap-1.5 hover:translate-x-1 duration-150 transform">
                      <span className="text-[#d955a4]">↳</span> Subscribe to Newsletter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 3: Programs links */}
          <div className="relative group/card h-full">
            <div className="h-full rounded-[14px] border-2 border-black bg-[#D8B4E8] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="font-['Press_Start_2P',monospace] text-xs uppercase tracking-wider text-black border-b-2 border-black pb-1.5 mb-2">
                Programs
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-sans font-semibold text-sm text-black">
                {programLinks.map((p) => {
                  // CHANGED: shorten long program names for display only
                  const displayName =
                    p.name === "GLT Mentorship Program" ? "Mentorship" :
                    p.name === "Machine Learning Cohort" ? "ML Cohort" :
                    p.name;

                  return (
                    <li key={p.name}>
                      {p.url ? (
                        <a
                          href={p.url}
                          className="hover:text-[#d955a4] transition-all flex items-center gap-1 hover:translate-x-0.5 duration-150 transform"
                          title={p.name}
                        >
                          <span className="text-[#d955a4] text-xs">↳</span> {displayName}
                        </a>
                      ) : (
                        <span className="text-gray-600/70 flex items-center gap-1" title={p.name}>
                          <span className="text-gray-400">↳</span> {displayName}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t-2 border-black pt-4 text-center text-base font-semibold text-black md:flex-row relative z-10 -translate-y-3">
          <p className="font-['Montserrat',sans-serif]">
            © {new Date().getFullYear()} Girls Leading Tech. Made with{" "}
            <Link
              to="/secret-admin"
              aria-label="Admin"
              className="inline-block align-middle mx-1 cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-[#d955a4] stroke-[#d955a4] inline-block align-middle transition-transform hover:scale-125" />
            </Link>{" "}
            for the next generation.
          </p>
          <p className="font-['Press_Start_2P',monospace] text-xs uppercase tracking-wider text-black/80">
            Empowering women in tech
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffc8e3] active:translate-y-0 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
    >
      {children}
    </a>
  );
}
