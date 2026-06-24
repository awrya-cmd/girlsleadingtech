import { Linkedin, MapPin, Building2 } from "lucide-react";

// X (Twitter) icon — updated branding
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface MemberProfileCardProps {
  name: string;
  role?: string;
  location?: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  delay?: number;
  locationType?: "company" | "location";
  description?: string;
  isPast?: boolean;
}

export default function MemberProfileCard({
  name,
  role,
  location,
  image,
  linkedin,
  twitter,
  delay = 0,
  locationType = "location",
  description,
  isPast = false,
}: MemberProfileCardProps) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const LocationIcon = locationType === "company" ? Building2 : MapPin;
  const hasBothSocials = !!(linkedin && twitter);

  return (
    <div
      className="group flex flex-col items-center select-none animate-fade-up w-full max-w-[260px] mx-auto"
      style={{ animationDelay: `${(delay % 12) * 0.05}s` }}
    >
      {/* IMAGE BLOCK with pink offset shadow */}
      <div className="relative w-full aspect-square mb-4 transition-transform duration-300 ease-out md:group-hover:-translate-y-1">

        {/* Pink offset background panel */}
        <div
          className={`
            absolute inset-0
            transform translate-x-2 translate-y-2
            transition-transform duration-300 ease-out
            md:group-hover:translate-x-3 md:group-hover:translate-y-3
            ${isPast ? "bg-[#5b2b4a]/60" : "bg-[#d955a4]"}
          `}
        />

        {/* Foreground image panel */}
        <div
          className={`
            relative w-full h-full bg-white border overflow-hidden shadow-sm
            md:group-hover:shadow-md transition-shadow duration-300
            ${isPast ? "border-[#5b2b4a]/20 grayscale-[30%]" : "border-border/10"}
          `}
        >
          {/* Blurred background copy to fill edges */}
          {image && (
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm opacity-60 pointer-events-none select-none"
            />
          )}

          {/* Main photo or initials fallback */}
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-display text-4xl text-[#d955a4]/30 bg-gradient-to-br from-[#d955a4]/10 to-[#5b2b4a]/10">
              {initials}
            </div>
          )}

          {/* Alumni ribbon — top-left badge for past members */}
          {isPast && (
            <div className="absolute top-2 left-2 z-10 bg-[#5b2b4a]/80 backdrop-blur-sm px-2 py-0.5">
              <span className="text-[10px] font-bold text-white/90 tracking-wider uppercase">
                Alumni
              </span>
            </div>
          )}

          {/* Description overlay — covers full card, scrollable text, shows on hover */}
          {description && (
            <div
              className="
                absolute inset-0 z-[5]
                flex flex-col justify-end
                bg-gradient-to-t from-black/90 via-black/60 to-black/10
                opacity-0 translate-y-2
                md:group-hover:opacity-100 md:group-hover:translate-y-0
                transition-all duration-350 ease-out
              "
            >
              {/* Pink top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#d955a4] to-[#5b2b4a] opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100" />

              <div className="p-3 pb-4">
                {/* Small label */}
                <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-[#d955a4] mb-1.5 opacity-90">
                  Contribution
                </p>
                {/* Full description — no line-clamp so nothing gets cut */}
                <p className="text-white text-[11.5px] leading-[1.55] font-medium">
                  {description}
                </p>
              </div>
            </div>
          )}

          {/* Social icons — stacked vertically on right when both present, horizontal when only one */}
          {(linkedin || twitter) && (
            <div
              className={`
                absolute right-2 top-2 z-10
                ${hasBothSocials ? "flex flex-col gap-1.5" : "flex flex-row gap-1.5"}
              `}
            >
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex h-7 w-7 items-center justify-center bg-white/95 text-[#0A66C2] shadow-sm transition-all duration-200 hover:bg-[#0A66C2] hover:text-white hover:scale-110"
                  aria-label={`${name} on LinkedIn`}
                >
                  <Linkedin className="h-3 w-3" />
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex h-7 w-7 items-center justify-center bg-white/95 text-zinc-800 shadow-sm transition-all duration-200 hover:bg-zinc-900 hover:text-white hover:scale-110"
                  aria-label={`${name} on X`}
                >
                  <XIcon className="h-3 w-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Text section */}
      <div className="w-full text-center flex flex-col items-center mt-2 px-1">
        <h3 className="font-sans text-base font-bold text-foreground leading-tight line-clamp-1">
          {name}
        </h3>

        {role && (
          <p className="mt-1 text-xs font-semibold text-[#d955a4] line-clamp-1">
            {role}
          </p>
        )}

        {location && (
          <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1 leading-tight line-clamp-1 justify-center">
            <LocationIcon className="h-3 w-3 shrink-0 text-muted-foreground/50" />
            <span className="truncate">{location}</span>
          </p>
        )}

        {/* Mobile — show description as excerpt below name (no hover on touch) */}
        {description && (
          <p className="md:hidden mt-2 text-[11px] text-zinc-400 leading-snug line-clamp-3 px-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}