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
  const featuredIds = ["s17", "s103", "s44", "s46", "s20"];
  const displaySpeakers = featuredIds
    .map((id) => speakers.find((s) => s.id === id))
    .filter((s): s is typeof speakers[0] => !!s);

  const row1 = displaySpeakers.slice(0, 3);
  const row2 = displaySpeakers.slice(3, 5);

  return (
    <div className="container mx-auto max-w-6xl px-6 flex flex-col items-center mt-0
      md:-mt-8
      lg:-mt-16
      xl:-mt-24">

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

      {/* DESKTOP & TABLET LAYOUT: Row 1 = 3, Row 2 = 2 */}
      <div className="hidden md:flex w-full flex-col items-center gap-6 sm:gap-8 md:gap-12 select-none">
        {/* Row 1: 3 Speakers */}
        <div className="flex flex-row justify-center items-stretch gap-[2.5vw] md:gap-8 w-full max-w-5xl">
          {row1.map((s, idx) => (
            <div key={s.id} className="w-[26vw] max-w-[260px] min-w-[90px]">
              <SpeakerShowcaseCard speaker={s} delay={idx} />
            </div>
          ))}
        </div>

        {/* Row 2: 2 Speakers */}
        <div className="flex flex-row justify-center items-stretch gap-[2.5vw] md:gap-8 w-full max-w-5xl">
          {row2.map((s, idx) => (
            <div key={s.id} className="w-[26vw] max-w-[260px] min-w-[90px]">
              <SpeakerShowcaseCard speaker={s} delay={idx + 3} />
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE LAYOUT: Row 1 = 2, Row 2 = 2, Row 3 = 1 centered underneath */}
      <div className="flex md:hidden w-full flex-col items-center gap-6 select-none">
        {/* Row 1: 2 Speakers */}
        <div className="flex flex-row justify-center items-stretch gap-4 w-full px-4">
          <div className="w-[42vw] max-w-[160px] min-w-[100px]">
            <SpeakerShowcaseCard speaker={displaySpeakers[0]} delay={0} />
          </div>
          <div className="w-[42vw] max-w-[160px] min-w-[100px]">
            <SpeakerShowcaseCard speaker={displaySpeakers[1]} delay={1} />
          </div>
        </div>

        {/* Row 2: 2 Speakers */}
        <div className="flex flex-row justify-center items-stretch gap-4 w-full px-4">
          <div className="w-[42vw] max-w-[160px] min-w-[100px]">
            <SpeakerShowcaseCard speaker={displaySpeakers[2]} delay={2} />
          </div>
          <div className="w-[42vw] max-w-[160px] min-w-[100px]">
            <SpeakerShowcaseCard speaker={displaySpeakers[3]} delay={3} />
          </div>
        </div>

        {/* Row 3: 1 Speaker centered */}
        <div className="flex flex-row justify-center items-stretch gap-4 w-full px-4">
          <div className="w-[42vw] max-w-[160px] min-w-[100px]">
            <SpeakerShowcaseCard speaker={displaySpeakers[4]} delay={4} />
          </div>
        </div>
      </div>

      {/* SEE MORE SPEAKERS BUTTON */}
<div className="relative z-[100] mt-10 md:mt-14 flex justify-center items-center w-full px-4">
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
      "
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "clamp(0.65rem, 0.95vw, 1rem)",
        letterSpacing: "0.08em",
        lineHeight: "1.0",
      }}
    >
      See More <br className="sm:hidden" />
      Speakers →
    </span>
    </Link>
  </div>
  </div>
  );
}
