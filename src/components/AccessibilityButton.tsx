export function AccessibilityButton() {
  return (
    <button
      onClick={() => {}}
      className="fixed bottom-[24px] left-[24px] z-[9999] flex items-center justify-center w-11 h-11 bg-white border-2 border-black rounded-full shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:bg-[#ffeef2] active:translate-y-0 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer pointer-events-auto"
      aria-label="Accessibility Options"
    >
      <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="1" />
        <path d="m9 20 3-6 3 6" />
        <path d="m6 8 6 2 6-2" />
        <path d="M12 10v4" />
      </svg>
    </button>
  );
}
