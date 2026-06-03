import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/site/GlassCard";
import { stats } from "@/data/stats";
import { testimonials } from "@/data/community";
import { ArrowRight } from "lucide-react";
import { IndiaCommunityMap } from "@/components/site/IndiaCommunityMap";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact — Girls Leading Tech" },
      { name: "description", content: "4000+ women, 1100+ colleges, 23+ states. The numbers, stories and reach behind Girls Leading Tech." },
    ],
  }),
  component: ImpactPage,
});

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute left-1/2 top-1/2 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,240,190,0.15), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217, 85, 164, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217, 85, 164, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

function ImpactPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#fef9f4] overflow-hidden">
      <GridBackground />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');`}</style>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');`}</style>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          display: flex;
          width: 200%;
          animation: scroll 20s linear infinite;
        }
      `}</style>

      {/* HEADER SECTION */}
     <section className="relative z-10 pt-32 md:pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <p
           className="text-base md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold mb-6 opacity-80"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            OUR IMPACT
          </p>
          <h2 className="font-sans text-5xl md:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
            The numbers tell a{" "}
            <span
              className="italic font-medium text-[#5b2b4a]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              story.
            </span>
          </h2>
          <p className="mt-6 md:mt-8 text-lg md:text-xl font-sans text-gray-500 leading-relaxed max-w-2xl mx-auto font-light opacity-80">
            But the women behind them are the real headline. We're building a movement where data meets community.
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-10 mt-4 pb-12 md:pb-[80px] px-6">
        <div className="container mx-auto max-w-6xl">
          <GlassCard strong glow className="bg-white/60 border border-[#f0e4d8] rounded-3xl p-6 md:p-16 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[10px_10px_0px_#ffed95] hover:border-[#ffed95]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
              {stats.map((s) => (
                <div key={s.label} className="text-center flex flex-col items-center">
                  <div
                    className="text-4xl md:text-7xl font-black text-gray-900 tracking-tight"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {s.value}<span className="text-[#d955a4]">{s.suffix}</span>
                  </div>
                  <div className="mt-4 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="flex justify-center mt-16 mb-4">
            <div className="w-24 h-px bg-[#e879c0]/40" />
          </div>
        </div>
      </section>

      {/* SCROLLING TICKER */}
      <div className="relative z-10 w-full overflow-hidden bg-[#fef9f4] border-y border-[#f0e4d8] py-4 flex mt-8">
        <div className="marquee-container">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex whitespace-nowrap items-center px-4 w-1/2 justify-around">
              <span className="text-[#d955a4] font-bold text-xs md:text-sm tracking-[0.1em] md:tracking-[0.2em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>LEARN. BUILD. LEAD.</span>
              <span className="text-[#e879c0] text-lg mx-6">✦</span>
              <span className="text-[#d955a4] font-bold text-xs md:text-sm tracking-[0.1em] md:tracking-[0.2em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>4000+ WOMEN</span>
              <span className="text-[#e879c0] text-lg mx-6">✦</span>
              <span className="text[#d955a4] font-bold text-xs md:text-sm tracking-[0.1em] md:tracking-[0.2em] uppercase"style={{ fontFamily: "'Montserrat', sans-serif" }}>23+ STATES</span>
              <span className="text-[#e879c0] text-lg mx-6">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* MAP SECTION */}
      <section className="relative z-10 py-24 md:py-[80px] px-6 bg-[#fcf5ef]">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
            <p
              className="text-base md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold mb-4 opacity-80"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              WHERE WE ARE
            </p>
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Our Community Across India
            </h2>
            <p className="mt-4 text-base md:text-lg font-sans text-gray-500 font-light opacity-80">
              1000+ campuses, 23+ states. See where our community is building and leading.
            </p>
          </div>

          <div className="relative w-full rounded-[12px] overflow-hidden bg-white shadow-sm border border-gray-100">
            <IndiaCommunityMap />
          </div>
        </div>
      </section>

      {/* STORIES SECTION */}
      <section className="relative z-10 py-24 md:py-[80px] px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
            <p
              className="text-base md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold mb-4 opacity-80"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              STORIES
            </p>
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Real glow-ups, real careers.
            </h2>
            <p className="mt-4 text-base md:text-lg font-sans text-gray-500 font-light opacity-80">
              Words from members whose lives changed because of this community. No fluff, just impact.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            {testimonials.slice(0, 6).map((t, idx) => (
              <div
  key={t.id}
  className="group relative bg-white p-5 md:p-10 flex flex-col transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] border-2 border-gray-100 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_20px_40px_-5px_rgba(217,85,164,0.3),0_10px_20px_-5px_rgba(217,85,164,0.25)] hover:border-[#d955a4]/60 cursor-pointer"
  style={{
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)", // Base shadow
    animation: `fadeUp 0.6s ease-out forwards`,
    animationDelay: `${idx * 0.1}s`,
    opacity: 0,
    transform: 'translateY(20px)'
  }}
>

              
                <div
                  className="mb-4 text-6xl leading-none text-[#d955a4] transition-transform duration-500 ease-out group-hover:scale-125 group-hover:-rotate-6 origin-top-left"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  &ldquo;
                </div>
                <p className="flex-1 text-gray-800 text-[15px] leading-relaxed mb-8">
                  {t.quote}
                </p>
                <div>
                  <p className="font-bold text-gray-900 font-sans tracking-tight">{t.name}</p>
                  <p className="text-[13px] font-medium text-[#d955a4] mt-1 font-sans">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 py-24 md:py-[80px] px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div
            className="relative overflow-hidden rounded-[2rem] p-7 md:p-16 text-center border-2 border-[#e1b7d2] bg-gradient-to-br from-[#fffbf7] via-[#fff5f9] to-[#fffde6] transition-all duration-500 hover:scale-[1.01] hover:border-[#d955a4] hover:shadow-[0_30px_60px_-15px_rgba(217,85,164,0.15)]"
            style={{
              boxShadow: "0 10px 40px -10px rgba(217,85,164,0.08)"
            }}
          >
            {/* Soft decorative background glow inside the card */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ffed95]/30 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#e879c0]/15 rounded-full blur-2xl pointer-events-none" />

            <h2 className="relative z-10 font-sans text-2xl md:text-4xl text-gray-900 font-extrabold tracking-tight">
              Want to be on this list next?
            </h2>
            <p className="relative z-10 mx-auto mt-4 max-w-xl text-[16px] md:text-[17px] text-gray-600 font-medium leading-relaxed opacity-90">
              Join 4000+ women already learning, building, and leading in tech across India.
            </p>
            
            <Link
              to="/join"
              className="relative z-10 mt-8 inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-[15px] font-bold text-white shadow-md hover:bg-[#d955a4] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(217,85,164,0.3)] transition-all duration-300 group"
            >
              Join the community 
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      
      <style>{`
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}