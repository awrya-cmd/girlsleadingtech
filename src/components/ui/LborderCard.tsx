"use client";

import PixelStar from "./pixelstar";

export default function CardFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full">

      {/* STAR */}
      <div className="absolute -top-4 -left-4 z-30">
        <PixelStar />
      </div>

      {/* CARD */}
      <div
        className="
          relative
          h-full
          overflow-hidden
          p-8 md:p-10
          bg-white/60
          backdrop-blur-md
          transition-all
          duration-300
          hover:shadow-[0_0_40px_rgba(217,85,164,0.18)]
        "
        style={{
          border: "1px solid rgba(217,85,164,0.65)",
        }}
      >
        {/* L BORDER */}
        <div className="pointer-events-none absolute inset-0">

          {/* RIGHT */}
          <div className="absolute right-0 top-2 bottom-0 w-[6px] bg-[#d955a4]" />

          {/* BOTTOM */}
          <div className="absolute bottom-0 left-2 right-0 h-[6px] bg-[#d955a4]" />

        </div>

        {children}
      </div>
    </div>
  );
}