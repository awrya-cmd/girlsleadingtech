import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import pixelBtn from "@/assets/pixel-button.png";
import { Marquee } from "@/components/site/Marquee";

export function PartnersSection({
  ecosystemPartners,
  industryPartners,
  communityPartners,
}: any) {
  const allPartners = [
    ...(ecosystemPartners || []),
    ...(industryPartners || []),
    ...(communityPartners || []),
  ];

  const popularSlugs = [
    "notion",
    "shebuilds",
    "lovable",
    "she-can-code",
    "code-without-barriers",
    "women-ai-collective",
    "girls-who-ml",
    "postman-pune",
  ];

  const filteredList = allPartners.filter((p: any) => popularSlugs.includes(p.slug));
  return (
    <section className="relative py-20 bg-[#FFF2B2]">
      
      {/* HEADER (NEW TYPOGRAPHY STYLE) */}
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <p
            className="text-xs md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            PARTNERS
          </p>

          <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground leading-tight mt-4">
            The companies{" "}
            <span
              className="mx-2 italic font-medium text-[#5b2b4a]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              cheering us on.
            </span>
          </h2>

          <p className="mt-4 text-sm text-muted-foreground">
            Ecosystem, industry and community partners amplifying the movement.
          </p>
        </div>
      </div>

      {/* MARQUEE (ONE LINE ONLY) */}
      <div className="mt-14">
        <Marquee reverse={false}>
          {filteredList.map((p: any) => {
            const inner = (
              <div className="flex h-24 w-44 shrink-0 items-center justify-center glass p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-soft">
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-14 max-w-[80%] object-contain"
                  />
                ) : (
                  <span className="text-xs font-display text-foreground/70">
                    {p.name}
                  </span>
                )}
              </div>
            );

            return p.website ? (
              <a
                key={p.id}
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                title={p.name}
              >
                {inner}
              </a>
            ) : (
              <div key={p.id} title={p.name}>
                {inner}
              </div>
            );
          })}
        </Marquee>
      </div>

      {/* PIXEL BUTTON (ONLY CHANGE) */}
      <div className="relative mt-12 flex justify-center w-full px-4">
        <Link
          to="/partners"
          className="relative inline-block transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <img
            src={pixelBtn}
            alt="See All Partners"
            className="w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] h-auto object-contain"
          />

          <span
            className="
              absolute inset-0
              flex items-center justify-center
              text-black font-bold text-center
              pointer-events-none
            "
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(0.75rem, 1.2vw, 1.2rem)",
              letterSpacing: "0.08em",
              lineHeight: "1",
            }}
          >
            See All <br className="sm:hidden" />
            Partners →
          </span>
        </Link>
      </div>
    </section>
  );
}