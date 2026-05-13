import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  strong?: boolean;
  glow?: boolean;
  /** Editorial paper variant — hairline border, clean white, refined shadow */
  paper?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, strong, glow, paper, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl p-6 transition-all duration-500 ease-out",
        paper ? "paper" : strong ? "glass-strong" : "glass",
        glow ? "shadow-glow hover:shadow-coral" : "shadow-soft",
        "hover:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  ),
);
GlassCard.displayName = "GlassCard";
