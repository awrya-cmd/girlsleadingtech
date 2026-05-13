import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  italicWord,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  /** Optional word in the title to render in italic ink-accent. Case-insensitive. */
  italicWord?: string;
}) {
  const renderTitle = () => {
    if (!italicWord) return title;
    const i = title.toLowerCase().indexOf(italicWord.toLowerCase());
    if (i === -1) return title;
    const before = title.slice(0, i);
    const match = title.slice(i, i + italicWord.length);
    const after = title.slice(i + italicWord.length);
    return (
      <>
        {before}
        <span className="ink-accent">{match}</span>
        {after}
      </>
    );
  };

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="h-px w-8 bg-foreground/20" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/60">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-foreground/20" />
        </div>
      )}
      <h2 className="mt-6 font-serif text-4xl font-normal leading-[1.05] tracking-tight text-foreground md:text-6xl">
        {renderTitle()}
      </h2>
      {description && (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
