/**
 * AccessibilityWidget.tsx
 * Drop-in floating accessibility toolbar for Girls Leading Tech.
 *
 * Features:
 *  - Font size increase / decrease
 *  - High contrast mode
 *  - Grayscale mode
 *  - Highlight all links
 *  - Stop animations / motion
 *  - Readable font (switches to a dyslexia-friendly sans-serif)
 *  - Reset all
 *
 * Usage:
 *   1. Import and place <AccessibilityWidget /> once in your root layout
 *      (e.g. src/components/shared/AccessibilityWidget.tsx, then add to RootLayout)
 *   2. No props needed — it manages everything via CSS classes on <html>.
 */

import { useState, useEffect, useRef } from "react";

// ─── Icons (inline SVGs so no extra dependency) ──────────────────────────────

const IconA = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <text x="3" y="18" fontSize="16" fontWeight="bold" stroke="none" fill="currentColor">A</text>
  </svg>
);

const IconContrast = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 18V4a8 8 0 0 1 0 16z" />
  </svg>
);

const IconGrayscale = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M8 5.3C9 6.5 9.5 8 9.5 9.5S9 12.5 8 13.7M16 5.3C15 6.5 14.5 8 14.5 9.5s.5 3 1.5 4.2" />
  </svg>
);

const IconLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconNoMotion = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <circle cx="12" cy="12" r="9" />
    <line x1="9" y1="9" x2="15" y2="15" />
    <line x1="15" y1="9" x2="9" y2="15" />
  </svg>
);

const IconFont = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M9.6 16L12 9l2.4 7H9.6zM11 4L4 20h2l1.5-4h9l1.5 4h2L13 4h-2z" />
  </svg>
);

const IconReset = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconAccessibility = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <circle cx="12" cy="4" r="2" />
    <path d="M12 7c-4 0-7 1.5-7 1.5l1 2s2.5-1 6-1 6 1 6 1l1-2S16 7 12 7z" />
    <path d="M8.5 10.5L7 20h2l1.5-5 1.5 5 1.5-5 1.5 5h2l-1.5-9.5" />
  </svg>
);

// ─── CSS injected into <head> once ──────────────────────────────────────────

const A11Y_STYLES = `
  /* High Contrast */
  html.a11y-contrast {
    filter: contrast(150%);
  }
  html.a11y-contrast body {
    background: #000 !important;
    color: #fff !important;
  }
  html.a11y-contrast a { color: #ff0 !important; }
  html.a11y-contrast button { border: 2px solid #fff !important; }

  /* Grayscale */
  html.a11y-grayscale {
    filter: grayscale(100%);
  }

  /* Highlight links */
  html.a11y-links a {
    outline: 2px solid #d955a4 !important;
    outline-offset: 2px !important;
    background: rgba(217, 85, 164, 0.08) !important;
    border-radius: 2px !important;
  }

  /* Stop animations */
  html.a11y-no-motion *,
  html.a11y-no-motion *::before,
  html.a11y-no-motion *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }

  /* Readable / dyslexia-friendly font */
  html.a11y-readable * {
    font-family: 'Atkinson Hyperlegible', 'Arial', sans-serif !important;
    letter-spacing: 0.02em !important;
    word-spacing: 0.1em !important;
    line-height: 1.7 !important;
  }
`;

function injectStyles() {
  if (document.getElementById("a11y-widget-styles")) return;
  const style = document.createElement("style");
  style.id = "a11y-widget-styles";
  style.textContent = A11Y_STYLES;
  document.head.appendChild(style);
}

// ─── State helpers ───────────────────────────────────────────────────────────

type State = {
  fontSize: number;       // delta from base, e.g. +2 means root is base+2px
  contrast: boolean;
  grayscale: boolean;
  links: boolean;
  noMotion: boolean;
  readable: boolean;
};

const DEFAULT_STATE: State = {
  fontSize: 0,
  contrast: false,
  grayscale: false,
  links: false,
  noMotion: false,
  readable: false,
};

const BASE_FONT_SIZE = 16; // px

function applyState(state: State) {
  const html = document.documentElement;

  // Font size
  html.style.fontSize = `${BASE_FONT_SIZE + state.fontSize}px`;

  // Toggle classes
  html.classList.toggle("a11y-contrast", state.contrast);
  html.classList.toggle("a11y-grayscale", state.grayscale && !state.contrast);
  html.classList.toggle("a11y-links", state.links);
  html.classList.toggle("a11y-no-motion", state.noMotion);
  html.classList.toggle("a11y-readable", state.readable);
}

function saveState(state: State) {
  try {
    sessionStorage.setItem("a11y-state", JSON.stringify(state));
  } catch {}
}

function loadState(): State {
  try {
    const raw = sessionStorage.getItem("a11y-state");
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_STATE;
}

// ─── Widget component ────────────────────────────────────────────────────────

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>(DEFAULT_STATE);
  const panelRef = useRef<HTMLDivElement>(null);

  // Load saved state on mount
  useEffect(() => {
    injectStyles();
    const saved = loadState();
    setState(saved);
    applyState(saved);
  }, []);

  // Apply + save whenever state changes
  useEffect(() => {
    applyState(state);
    saveState(state);
  }, [state]);

  // Close panel on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const toggle = (key: keyof Omit<State, "fontSize">) =>
    setState((s) => ({ ...s, [key]: !s[key] }));

  const changeFontSize = (delta: number) =>
    setState((s) => ({
      ...s,
      fontSize: Math.max(-4, Math.min(8, s.fontSize + delta)),
    }));

  const reset = () => {
    const fresh = { ...DEFAULT_STATE };
    setState(fresh);
    applyState(fresh);
    saveState(fresh);
  };

  const hasChanges =
    state.fontSize !== 0 ||
    state.contrast ||
    state.grayscale ||
    state.links ||
    state.noMotion ||
    state.readable;

  return (
    <div
      ref={panelRef}
      className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-3"
      role="region"
      aria-label="Accessibility options"
    >
      {/* Panel */}
      {open && (
        <div
          className="
            bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            rounded-2xl w-72 overflow-hidden
          "
          role="dialog"
          aria-modal="false"
          aria-label="Accessibility settings"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#d955a4] px-4 py-3">
            <div className="flex items-center gap-2">
              <IconAccessibility />
              <span className="font-bold text-white text-sm tracking-wide">
                Accessibility
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-white/70 transition-colors"
              aria-label="Close accessibility panel"
            >
              <IconClose />
            </button>
          </div>

          <div className="p-4 space-y-3">

            {/* Font size */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                Text Size
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeFontSize(-2)}
                  disabled={state.fontSize <= -4}
                  className="flex-1 py-2 border-2 border-black font-bold text-lg hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-lg"
                  aria-label="Decrease font size"
                >
                  A<span className="text-xs align-super">−</span>
                </button>
                <span className="text-sm font-semibold text-zinc-500 w-10 text-center">
                  {state.fontSize === 0 ? "Default" : `${state.fontSize > 0 ? "+" : ""}${state.fontSize}px`}
                </span>
                <button
                  onClick={() => changeFontSize(2)}
                  disabled={state.fontSize >= 8}
                  className="flex-1 py-2 border-2 border-black font-bold text-lg hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-lg"
                  aria-label="Increase font size"
                >
                  A<span className="text-sm align-super">+</span>
                </button>
              </div>
            </div>

            {/* Toggle options */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                Display
              </p>
              <div className="grid grid-cols-2 gap-2">
                <ToggleBtn
                  label="High Contrast"
                  icon={<IconContrast />}
                  active={state.contrast}
                  onClick={() => toggle("contrast")}
                />
                <ToggleBtn
                  label="Grayscale"
                  icon={<IconGrayscale />}
                  active={state.grayscale}
                  onClick={() => toggle("grayscale")}
                  disabled={state.contrast}
                />
                <ToggleBtn
                  label="Highlight Links"
                  icon={<IconLink />}
                  active={state.links}
                  onClick={() => toggle("links")}
                />
                <ToggleBtn
                  label="Stop Motion"
                  icon={<IconNoMotion />}
                  active={state.noMotion}
                  onClick={() => toggle("noMotion")}
                />
                <ToggleBtn
                  label="Readable Font"
                  icon={<IconFont />}
                  active={state.readable}
                  onClick={() => toggle("readable")}
                  className="col-span-2"
                />
              </div>
            </div>

            {/* Reset */}
            {hasChanges && (
              <button
                onClick={reset}
                className="
                  w-full flex items-center justify-center gap-2
                  py-2 border-2 border-black rounded-lg
                  text-sm font-semibold text-zinc-600
                  hover:bg-zinc-100 transition-colors
                "
              >
                <IconReset />
                Reset all
              </button>
            )}
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          relative
          h-14 w-14 rounded-full
          bg-[#d955a4] text-white
          border-2 border-black
          shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
          hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          hover:-translate-y-0.5
          active:translate-y-0 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
          transition-all duration-150
          flex items-center justify-center
        "
        aria-label="Open accessibility options"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <IconAccessibility />
        {/* Dot indicator when something is active */}
        {hasChanges && (
          <span className="absolute top-1 left-1 w-3 h-3 bg-[#ffed95] border border-black rounded-full" />
        )}
      </button>
    </div>
  );
}

// ─── Toggle button ─────────────────────────────────────────────────────────

function ToggleBtn({
  label,
  icon,
  active,
  onClick,
  disabled = false,
  className = "",
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`
        flex items-center gap-2 px-3 py-2.5
        border-2 rounded-xl text-left text-sm font-semibold
        transition-all duration-150
        ${active
          ? "bg-[#d955a4] border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          : "bg-white border-black/20 text-zinc-700 hover:border-black hover:bg-zinc-50"
        }
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      <span className="shrink-0">{icon}</span>
      <span className="leading-tight">{label}</span>
    </button>
  );
}