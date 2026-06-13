import { createFileRoute, Link } from "@tanstack/react-router";
import GridBackground from "@/components/shared/GridBackground";
import { communityPartners, industryPartners, ecosystemPartners, type PartnerEntry } from "@/data/partners";
import pixelBtn from "@/assets/pixel-button.png";
import washiTapeSticker from "@/assets/stickers/washi-tape.png";
import smileySticker from "@/assets/stickers/smiley.png";
import starSticker from "@/assets/stickers/star.png";

export const Route = createFileRoute("/partners")({
  head: () => ({ meta: [{ title: "Partners — Girls Leading Tech" }, { name: "description", content: "The communities, industry leaders and ecosystem partners powering Girls Leading Tech." }] }),
  component: PartnersPage,
});

function PartnerGroup({ title, items }: { title: string; items: PartnerEntry[] }) {
  return (
    <section className="container mx-auto max-w-6xl px-6 pb-20 pt-10">
      <h2 
        className="font-sans text-2xl md:text-3xl font-bold text-gray-900 leading-tight"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {title}
      </h2>
      <p 
        className="mt-3 text-[10px] sm:text-xs tracking-wider text-[#d955a4] uppercase"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        {items.length} partners
      </p>
      
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((p) => {
          const card = (
            <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-2xl glass p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-soft">
              {p.logo ? (
                <img src={p.logo} alt={p.name} loading="lazy" className="max-h-16 max-w-[80%] object-contain" />
              ) : (
                <div className="font-display text-base text-foreground/70">{p.name}</div>
              )}
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground line-clamp-1">{p.name}</div>
            </div>
          );
          return p.website ? (
            <a key={p.id} href={p.website} target="_blank" rel="noopener noreferrer" title={p.name}>
              {card}
            </a>
          ) : (
            <div key={p.id} title={p.name}>{card}</div>
          );
        })}
      </div>
    </section>
  );
}

function PartnersPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#FFFBF7]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');`}</style>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}</style>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 px-6">
        <GridBackground />


        <div className="relative z-10 container mx-auto max-w-5xl text-center">
          <p
            className="text-base md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold mb-6 opacity-80"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            OUR PARTNERS
          </p>
          <p 
            className="mt-4 font-sans text-3xl md:text-5xl font-bold text-[#5b2b4a] tracking-tight"
          >
            Better, together.
          </p>
          <p 
            className="mt-6 md:mt-8 font-sans text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto font-light opacity-80"
          >
            The communities, industry leaders and ecosystem partners who believe in what we're building.
          </p>
        </div>
      </section>

      {/* PARTNER GROUPS */}
      <div className="bg-[#FFFBF7]">
        <PartnerGroup title="Ecosystem Partners" items={ecosystemPartners} />
        <PartnerGroup title="Industry Partners" items={industryPartners} />
        <PartnerGroup title="Community Partners" items={communityPartners} />
      </div>

      {/* CTA CARD */}
      <section className="container mx-auto max-w-4xl px-6 pb-24 mt-10">
        <div className="relative bg-[#FFF8EF] border border-[#d955a4]/20 rounded-[28px] p-8 md:p-14 shadow-lg text-center overflow-hidden">
          {/* Soft decorative background glow inside the card */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ffed95]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#d955a4]/10 rounded-full blur-2xl pointer-events-none" />

          <p
            className="text-xs uppercase tracking-[0.25em] text-[#d955a4] font-bold mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            COLLABORATE
          </p>
          <h2 
            className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Wanna join us as a partner?
          </h2>
          <p 
            className="mt-4 max-w-xl mx-auto text-black text-base md:text-lg leading-relaxed fontlight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Let's build the future of tech, together. Reach out to collaborate on events, sponsor initiatives, or support our community programs across India.
          </p>

          <Link
            to="/contact"
            className="relative inline-block active:scale-95 transition-transform duration-100 mt-8"
          >
            <img
              src={pixelBtn}
              alt="Contact Us Button"
              className="w-[200px] h-auto"
            />
            <span
              className="absolute inset-0 flex items-center justify-center text-black font-bold"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "10px",
                letterSpacing: "0.02em",
              }}
            >
              Contact Us →
            </span>
          </Link>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-gray-600 text-sm font-medium">
            <span style={{ fontFamily: "'Montserrat', sans-serif" }}>or email us directly:</span>
            <a
              href="mailto:partners@girlsleadingtech.org"
              className="text-[#d955a4] hover:text-[#c44091] font-bold transition-colors duration-150 underline decoration-dotted underline-offset-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              girlsleadingtech@gmail.com
            </a>
          </div>
        </div>
      </section>

      <div className="h-10" />
    </div>
  );
}
