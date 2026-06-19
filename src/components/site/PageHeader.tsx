import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { GradientMesh } from "./GradientMesh";

export function BackToResources() {
  return (
    <div className="w-full mb-6 flex justify-start">
      <Link 
        to="/resources" 
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-transform hover:-translate-x-1 uppercase tracking-widest"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <ArrowLeft className="h-4 w-4" /> All Resources
      </Link>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <GradientMesh />
      <div className="container mx-auto max-w-4xl px-6 text-center animate-fade-up">
        {eyebrow && eyebrow.startsWith("Resources") && (
          <BackToResources />
        )}
        {eyebrow && (
          <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-6 font-serif text-5xl font-normal leading-[1.05] tracking-tight md:text-7xl">
          <span className="text-gradient-sunset">{title}</span>
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
