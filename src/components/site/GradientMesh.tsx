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
      <div className="absolute inset-0 bg-grain opacity-40" />
      <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.9_0.07_30/0.45)] blur-[120px]" />
      <div
        className="absolute top-1/3 -right-40 h-[26rem] w-[26rem] rounded-full bg-[oklch(0.88_0.06_340/0.4)] blur-[120px]"
      />
      <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-[oklch(0.93_0.07_70/0.4)] blur-[120px]" />
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
