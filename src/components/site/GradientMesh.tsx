import { cn } from "@/lib/utils";

export function GradientMesh({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-grain opacity-30" />
      <div className="absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-[oklch(0.86_0.13_25/0.7)] blur-[110px] animate-blob" />
      <div className="absolute top-1/4 -right-40 h-[32rem] w-[32rem] rounded-full bg-[oklch(0.82_0.12_340/0.65)] blur-[110px] animate-blob" style={{ animationDelay: "3s" }} />
      <div className="absolute bottom-[-8rem] left-1/4 h-[30rem] w-[30rem] rounded-full bg-[oklch(0.88_0.13_70/0.7)] blur-[110px] animate-blob" style={{ animationDelay: "6s" }} />
      <div className="absolute bottom-1/3 right-1/4 h-[24rem] w-[24rem] rounded-full bg-[oklch(0.84_0.1_310/0.5)] blur-[120px] animate-blob" style={{ animationDelay: "9s" }} />
    </div>
  );
}

export function Sparkles() {
  const dots = Array.from({ length: 8 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {dots.map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground/30 animate-shimmer"
          style={{
            top: `${(i * 53) % 100}%`,
            left: `${(i * 37) % 100}%`,
            width: `${3 + (i % 2) * 2}px`,
            height: `${3 + (i % 2) * 2}px`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
