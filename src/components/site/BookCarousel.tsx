import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { GlassCard } from "./GlassCard";
import { ExternalLink } from "lucide-react";
import type { Resource } from "@/data/types";

export function BookCarousel({ items }: { items: Resource[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const booksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    // Elegant 3D tilt effect on hover using GSAP
    booksRef.current.forEach((book, i) => {
      if (!book) return;

      const enterAnimation = (e: MouseEvent) => {
        const bounds = book.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const xPercent = (mouseX / bounds.width - 0.5) * 2;
        const yPercent = (mouseY / bounds.height - 0.5) * 2;

        gsap.to(book, {
          rotateY: xPercent * 15,
          rotateX: -yPercent * 15,
          scale: 1.05,
          z: 50,
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 1000,
          transformOrigin: "center center",
        });
      };

      const leaveAnimation = () => {
        gsap.to(book, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          z: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      book.addEventListener("mousemove", enterAnimation);
      book.addEventListener("mouseleave", leaveAnimation);

      return () => {
        book.removeEventListener("mousemove", enterAnimation);
        book.removeEventListener("mouseleave", leaveAnimation);
      };
    });
    
    // Staggered entrance
    gsap.fromTo(
      booksRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, [items]);

  return (
    <div ref={containerRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 perspective-1000">
      {items.map((book, idx) => (
        <div 
          key={book.id} 
          ref={(el) => {
            booksRef.current[idx] = el as HTMLDivElement;
          }}
          className="relative group h-full flex flex-col will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Simulated Book Cover */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl shadow-xl z-10 transition-shadow group-hover:shadow-lavender">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center p-6 text-center">
               <h3 className="font-serif text-2xl text-white font-bold leading-tight drop-shadow-md">
                 {book.title}
               </h3>
            </div>
            {/* Book spine effect */}
            <div className="absolute left-0 inset-y-0 w-4 bg-gradient-to-r from-black/40 to-transparent mix-blend-multiply" />
            <div className="absolute left-4 inset-y-0 w-px bg-white/20" />
            
            {book.link && (
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-4 top-4 bg-white/90 p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-colors shadow-soft"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
          
          {/* Book Info below cover */}
          <GlassCard className="relative -mt-4 pt-8 px-6 pb-6 flex-1 rounded-b-2xl rounded-t-none z-0 bg-card/50">
             <div className="flex flex-col h-full">
               <h4 className="font-display text-lg">{book.title}</h4>
               {book.author && (
                 <p className="mt-1 text-xs uppercase tracking-widest text-primary font-semibold">{book.author}</p>
               )}
               <p className="mt-3 text-sm text-muted-foreground line-clamp-3 flex-1">{book.description}</p>
             </div>
          </GlassCard>
        </div>
      ))}
    </div>
  );
}
