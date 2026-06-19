type GridBackgroundProps = {
  className?: string;
};

export default function GridBackground({
  className = "",
}: GridBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <div
        className="absolute left-[-12%] top-[-10%] h-[120%] w-[35vw] blur-3xl opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(255,120,180,0.28), transparent 75%)",
        }}
      />

      <div
        className="absolute right-[-12%] top-[-10%] h-[120%] w-[35vw] blur-3xl opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(240,120,255,0.24), transparent 75%)",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,190,0.28), transparent 72%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(72, 38, 96, 0.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(160, 100, 200, 0.13) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
        }}
      />
    </div>
  );
}