import { Link } from "@tanstack/react-router";

export default function ButtonFrame({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link to={to} className="inline-block">
      <div
        className="
          relative
          inline-flex
          items-center
          justify-center
          px-8
          py-5
          bg-[#e7d4eb]
          border-[5px]
          border-black
          overflow-hidden
          transition-all
          duration-200
          hover:translate-y-[-2px]
          active:translate-y-[1px]
        "
      >
        {/* Inner Border */}
        <div className="absolute inset-[8px] border-[2px] border-black pointer-events-none" />

        {/* Pink L Shape */}
        <div className="absolute inset-[10px] pointer-events-none">
          <div className="absolute right-0 top-0 bottom-0 w-[12px] bg-[#d94b9f]" />
          <div className="absolute left-0 right-0 bottom-0 h-[12px] bg-[#d94b9f]" />
        </div>

        {/* Text */}
        <span
          className="relative z-10 text-black text-center whitespace-nowrap"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "clamp(0.75rem, 1vw, 1rem)",
            lineHeight: 1.2,
            letterSpacing: "0.08em",
          }}
        >
          {children}
        </span>
      </div>
    </Link>
  );
}