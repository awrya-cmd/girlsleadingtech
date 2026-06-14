import { Link } from "@tanstack/react-router";
import { Linkedin, ArrowRight } from "lucide-react";
import { speakers } from "@/data/community";
import pixelBtn from "@/assets/pixel-button.png"

interface SpeakerShowcaseCardProps {
  speaker: typeof speakers[0];
  delay: number;
}

function SpeakerShowcaseCard({ speaker, delay }: SpeakerShowcaseCardProps) {
  const { name, designation, company, image, linkedin } = speaker;

  return (
    <div
      className="group relative w-full flex flex-col items-center gap-3 sm:gap-4 select-none animate-fade-up"
      style={{
        animationDelay: `${(delay % 5) * 0.08}s`,
      }}
    >
      {/* PERFECT CIRCULAR SPEAKER IMAGE */}
      <div className="w-full aspect-square rounded-full overflow-hidden shadow-md bg-white">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-display text-2xl text-white bg-gradient-to-br from-[#d955a4] to-[#c64393]">
            {name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
        )}
      </div>

      {/* PINK INFO CARD  */}
      <div
        className="relative w-[88%] z-20 flex flex-col justify-center bg-gradient-to-br from-[#d955a4] to-[#c64393] rounded-none p-2 px-4 sm:px-5 shadow-md h-[58px] sm:h-[70px] md:h-[80px]"
      >
        {/* LINKEDIN ICON - TOP RIGHT OF THE CONTENT CARD */}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 z-30 bg-[#0077b5] text-white hover:bg-white hover:text-[#0077b5] transition-all duration-200 p-0.5 sm:p-1 flex items-center justify-center rounded-none shadow-sm"
          >
            <Linkedin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
          </a>
        )}

        <div className="text-center">
          <h4
            className="text-white font-bold leading-tight"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(11px, 2.5vw, 15px)",
            }}
          >
            {name}
          </h4>
          
          <p
            className="text-white/95 mt-1 leading-tight font-normal"
            style={{
              fontFamily: "sans-serif",
              fontSize: "clamp(8.5px, 2.1vw, 12px)",
            }}
          >
            {designation}
            {company && designation ? ` @ ${company}` : company ? company : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SpeakersShowcase() {
  // Explicitly list the 5 speakers in their exact display order (replacing Ramesh, Shilpi, Disha)
  const featuredIds = ["s17", "s103", "s44", "s46"];
  const displaySpeakers = featuredIds
    .map((id) => speakers.find((s) => s.id === id))
    .filter((s): s is typeof speakers[0] => !!s);


  return (
    <div className="container mx-auto max-w-6xl px-6 flex flex-col items-center justify-center -mt-10 md:-mt-16 lg:-mt-24 py-4 md:py-8 select-none">

      {/* SECTION TITLE */}
      <div className="mb-10 md:mb-14 text-center">
        <p
          className="text-xs md:text-lg uppercase tracking-[0.3em] text-[#d955a4] font-bold"
          style={{
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          OUR SPEAKERS
        </p>

        <h2 className="font-sans text-4xl mt-4 md:text-5xl font-bold text-foreground leading-tight">
          Along our journey,{" "}
          <span
            className="mx-2 italic font-medium text-[#5b2b4a]"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            we met......
          </span>
        </h2>
      </div>

      {/* DESKTOP & TABLET LAYOUT: Single Row of 4 */}
        <div className="hidden md:flex justify-center items-stretch gap-6 lg:gap-8 max-w-5xl select-none">
          {displaySpeakers.map((s, idx) => (
            <div
              key={s.id}
              className="w-[20vw] max-w-[220px] min-w-[140px]"
            >
              <SpeakerShowcaseCard speaker={s} delay={idx} />
            </div>
          ))}
        </div>

     {/* MOBILE LAYOUT: 2 × 2 */}
        <div className="flex md:hidden w-full flex-col items-center gap-5 select-none">
          {/* Row 1 */}
          <div className="flex justify-center gap-4 w-full px-4">
            <div className="w-[38vw] max-w-[140px] min-w-[90px]">
              <SpeakerShowcaseCard speaker={displaySpeakers[0]} delay={0} />
            </div>

            <div className="w-[38vw] max-w-[140px] min-w-[90px]">
              <SpeakerShowcaseCard speaker={displaySpeakers[1]} delay={1} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex justify-center gap-4 w-full px-4">
            <div className="w-[38vw] max-w-[140px] min-w-[90px]">
              <SpeakerShowcaseCard speaker={displaySpeakers[2]} delay={2} />
            </div>

            <div className="w-[38vw] max-w-[140px] min-w-[90px]">
              <SpeakerShowcaseCard speaker={displaySpeakers[3]} delay={3} />
            </div>
          </div>
        </div>

            {/* SEE MORE SPEAKERS BUTTON */}
      <div className="relative z-[100] mt-8 md:mt-10 flex justify-center items-center w-full px-4">
        <Link
          to="/humans"
          className="relative inline-block z-[100] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
    <img
      src={pixelBtn}
      alt="See More Speakers"
      className="
        w-[140px]
        sm:w-[160px]
        md:w-[180px]
        lg:w-[200px]
        h-auto
        object-contain
      "
    />

    <span
        className="
          absolute inset-0
          flex items-center justify-center
          text-black text-center font-bold
          pointer-events-none
          whitespace-nowrap
        "
        style={{
         fontFamily: "'Press Start 2P', monospace",
          fontSize: "clamp(0.6rem, 1.1vw, 1.15rem)",
          letterSpacing: "0.06em",
          lineHeight: "1",
        }}
      >
        See More Speakers →
      </span>
    </Link>
  </div>
  </div>
  );
}
