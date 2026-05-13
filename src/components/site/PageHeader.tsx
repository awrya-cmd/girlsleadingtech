import { GradientMesh } from "./GradientMesh";

export function PageHeader({
  eyebrow,
  title,
  description,
  italicWord,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  italicWord?: string;
}) {
  const renderTitle = () => {
    if (!italicWord) return title;
    const i = title.toLowerCase().indexOf(italicWord.toLowerCase());
    if (i === -1) return title;
    return (
      <>
        {title.slice(0, i)}
        <span className="ink-accent">{title.slice(i, i + italicWord.length)}</span>
        {title.slice(i + italicWord.length)}
      </>
    );
  };

  return (
    <header className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <GradientMesh />
      <div className="container mx-auto max-w-4xl px-6 text-center animate-reveal">
        {eyebrow && (
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/60">
              {eyebrow}
            </span>
            <span className="h-px w-10 bg-foreground/20" />
          </div>
        )}
        <h1 className="mt-6 font-serif text-5xl font-normal leading-[1.02] tracking-tight text-foreground md:text-7xl">
          {renderTitle()}
        </h1>
        {description && (
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
