import { Linkedin, MapPin, Building2 } from "lucide-react";

interface MemberProfileCardProps {
  name: string;
  role?: string;
  location?: string;
  image?: string;
  linkedin?: string;
  delay?: number;
  locationType?: "company" | "location";
}

export default function MemberProfileCard({
  name,
  role,
  location,
  image,
  linkedin,
  delay = 0,
  locationType = "location",
}: MemberProfileCardProps) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const LocationIcon = locationType === "company" ? Building2 : MapPin;

  return (
    <div
      className="group flex flex-col items-center select-none animate-fade-up w-full max-w-[260px] mx-auto"
      style={{ animationDelay: `${(delay % 12) * 0.05}s` }}
    >
      {/* IMAGE BLOCK CONTAINER WITH PINK OFFSET BACKGROUND */}
      <div className="relative w-full aspect-square mb-4 transition-transform duration-300 ease-out md:group-hover:-translate-y-1">
        
        {/* Pink Offset Background Panel (Solid pink layer behind image, sharp corners) */}
        <div
          className="
            absolute inset-0
            bg-[#d955a4]
            transform translate-x-2 translate-y-2
            transition-transform duration-300 ease-out
            md:group-hover:translate-x-3 md:group-hover:translate-y-3
          "
        />

        {/* Foreground Image Panel (Square, sharp corners, no border radius, hidden overflow) */}
        <div className="relative w-full h-full bg-white dark:bg-zinc-950 border border-border/10 overflow-hidden shadow-sm md:group-hover:shadow-md transition-shadow duration-300">
          {/* Background image copy — prevents blank edges when foreground zooms */}
          {image && (
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm opacity-60 pointer-events-none select-none"
            />
          )}
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

          {/* Social Icon - Top Right Corner of Image (Clean, sharp corners) */}
          {linkedin && (
            <div className="absolute right-2 top-2 z-10">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // Prevent card selection click bubble
                className="inline-flex h-7 w-7 items-center justify-center bg-white/95 text-[#0A66C2] shadow-sm transition-colors hover:bg-[#0A66C2] hover:text-white"
                aria-label={`${name} on LinkedIn`}
              >
                <Linkedin className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>

      </div>

      {/* TEXT INFORMATION SECTION (Centered below the image, no card envelope) */}
      <div className="w-full text-center flex flex-col items-center mt-2 px-1">
        {/* Name */}
        <h3 className="font-sans text-base font-bold text-foreground leading-tight line-clamp-1">
          {name}
        </h3>

        {/* Role (Conditional rendering) */}
        {role && (
          <p className="mt-1 text-xs font-semibold text-[#d955a4] line-clamp-1">
            {role}
          </p>
        )}

        {/* Location (Icon + Text, centered) */}
        {location && (
          <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1 leading-tight line-clamp-1 justify-center">
            <LocationIcon className="h-3 w-3 shrink-0 text-muted-foreground/50" />
            <span className="truncate">{location}</span>
          </p>
        )}
      </div>

    </div>
  );
}
