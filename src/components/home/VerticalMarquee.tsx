import { useEffect, useRef, useState } from "react";

interface VerticalMarqueeProps {
  images: string[];
  direction: "up" | "down";
  speed?: number; // base pixels to scroll per animation frame
}

export default function VerticalMarquee({ images, direction, speed = 1.0 }: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const isDown = useRef(false);
  const startY = useRef(0);
  const scrollTopVal = useRef(0);

  // Duplicate images list to ensure seamless wrapping without empty gaps.
  // Triplicating the list ensures that the middle section is fully covered at all screen sizes.
  const marqueeItems = [...images, ...images, ...images];

  useEffect(() => {
    const el = containerRef.current;
    if (!el || images.length === 0) return;

    // Force layout calculation, then set scroll to the middle third of container height.
    const thirdHeight = el.scrollHeight / 3;
    el.scrollTop = thirdHeight;
  }, [images]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || images.length === 0) return;

    let animationId: number;

    const tick = () => {
      if (!el) return;

      if (!isDown.current && !isInteracting) {
        if (direction === "up") {
          el.scrollTop += speed;
        } else {
          el.scrollTop -= speed;
        }

        // Reset seamlessly when scrolling outside the middle third of the container
        const thirdHeight = el.scrollHeight / 3;
        if (el.scrollTop >= thirdHeight * 2) {
          el.scrollTop -= thirdHeight;
        } else if (el.scrollTop <= thirdHeight) {
          el.scrollTop += thirdHeight;
        }
      }
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationId);
  }, [isInteracting, direction, speed, images]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    setIsInteracting(true);
    startY.current = e.pageY - (containerRef.current?.offsetTop || 0);
    scrollTopVal.current = containerRef.current?.scrollTop || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !containerRef.current) return;
    e.preventDefault();
    const y = e.pageY - containerRef.current.offsetTop;
    const walk = (y - startY.current) * 1.5;
    containerRef.current.scrollTop = scrollTopVal.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDown.current = false;
    // Delay setting isInteracting to false so it doesn't immediately snap back
    setTimeout(() => {
      setIsInteracting(false);
    }, 100);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDown.current = true;
    setIsInteracting(true);
    startY.current = e.touches[0].pageY - (containerRef.current?.offsetTop || 0);
    scrollTopVal.current = containerRef.current?.scrollTop || 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDown.current || !containerRef.current) return;
    const y = e.touches[0].pageY - containerRef.current.offsetTop;
    const walk = (y - startY.current) * 1.5;
    containerRef.current.scrollTop = scrollTopVal.current - walk;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUpOrLeave}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => {
        handleMouseUpOrLeave();
        setIsInteracting(false);
      }}
      className="h-full overflow-y-auto cursor-grab active:cursor-grabbing select-none flex flex-col gap-8 py-8 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      style={{ scrollBehavior: "auto" }}
    >
      {marqueeItems.map((imgSrc, idx) => {
        // Vary heights slightly for an editorial look.
        // User requested smaller image sizes, so we adjust height classes downwards.
        // e.g. using h-48, h-60, h-52 instead of h-64, h-80, h-72
        const heightModifier = idx % 3 === 0 ? "h-48 md:h-56" : idx % 3 === 1 ? "h-60 md:h-68" : "h-52 md:h-60";
        
        return (
          <div
            key={idx}
            className={`w-full ${heightModifier} flex-shrink-0 rounded-[24px] overflow-hidden shadow-soft transition-all duration-300 hover:scale-105 hover:-translate-y-1.5 hover:shadow-glow`}
          >
            <img
              src={imgSrc}
              alt="Community Moment"
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        );
      })}
    </div>
  );
}