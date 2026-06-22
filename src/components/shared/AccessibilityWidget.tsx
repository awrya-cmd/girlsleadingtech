/**
 * AccessibilityWidget.tsx — Girls Leading Tech
 * Redesigned: clean typographic UI, no emoji icons, fixed text size & zoom,
 * fixed light/dark mode text visibility, scrollable panel, always in viewport.
 */
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const A11Y_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap');

  /* ── Contrast: Dark ── */
  html.a11y-dark body { background-color: #0a0a0a !important; }
  html.a11y-dark *:not(script):not(style):not(#glt-a11y-widget):not(#glt-a11y-widget *):not(img):not(svg):not(video):not(canvas) {
    background-color: #0a0a0a !important;
    color: #f0f0f0 !important;
    border-color: #333 !important;
  }
  html.a11y-dark a:not(#glt-a11y-widget *) {
    color: #ffd700 !important;
    text-decoration: underline !important;
  }
  html.a11y-dark button:not(#glt-a11y-widget *) {
    background: #1a1a1a !important;
    color: #f0f0f0 !important;
    border: 1px solid #444 !important;
  }
  html.a11y-dark p:not(#glt-a11y-widget *),
  html.a11y-dark h1:not(#glt-a11y-widget *),
  html.a11y-dark h2:not(#glt-a11y-widget *),
  html.a11y-dark h3:not(#glt-a11y-widget *),
  html.a11y-dark h4:not(#glt-a11y-widget *),
  html.a11y-dark h5:not(#glt-a11y-widget *),
  html.a11y-dark h6:not(#glt-a11y-widget *),
  html.a11y-dark li:not(#glt-a11y-widget *),
  html.a11y-dark span:not(#glt-a11y-widget *),
  html.a11y-dark label:not(#glt-a11y-widget *),
  html.a11y-dark td:not(#glt-a11y-widget *),
  html.a11y-dark th:not(#glt-a11y-widget *) {
    color: #f0f0f0 !important;
  }
  html.a11y-dark input:not(#glt-a11y-widget *),
  html.a11y-dark textarea:not(#glt-a11y-widget *),
  html.a11y-dark select:not(#glt-a11y-widget *) {
    background: #1a1a1a !important;
    color: #f0f0f0 !important;
    border-color: #444 !important;
  }
  html.a11y-dark img:not(#glt-a11y-widget *),
  html.a11y-dark video:not(#glt-a11y-widget *) {
    filter: brightness(0.85) !important;
  }

  /* ── Contrast: Light ── */
  html.a11y-light body { background-color: #fffef5 !important; }
  html.a11y-light *:not(script):not(style):not(#glt-a11y-widget):not(#glt-a11y-widget *):not(img):not(svg):not(video) {
    background-color: #fffef5 !important;
    color: #0d0d0d !important;
    border-color: #c0c0a0 !important;
  }
  html.a11y-light p:not(#glt-a11y-widget *),
  html.a11y-light h1:not(#glt-a11y-widget *),
  html.a11y-light h2:not(#glt-a11y-widget *),
  html.a11y-light h3:not(#glt-a11y-widget *),
  html.a11y-light h4:not(#glt-a11y-widget *),
  html.a11y-light span:not(#glt-a11y-widget *),
  html.a11y-light label:not(#glt-a11y-widget *),
  html.a11y-light li:not(#glt-a11y-widget *),
  html.a11y-light td:not(#glt-a11y-widget *) {
    color: #0d0d0d !important;
  }
  html.a11y-light a:not(#glt-a11y-widget *) {
    color: #00008b !important;
    text-decoration: underline !important;
  }
  html.a11y-light input:not(#glt-a11y-widget *),
  html.a11y-light textarea:not(#glt-a11y-widget *),
  html.a11y-light select:not(#glt-a11y-widget *) {
    background: #fffff0 !important;
    color: #0d0d0d !important;
  }

  /* ── Invert ── */
  html.a11y-invert { filter: invert(1) hue-rotate(180deg) !important; }
  html.a11y-invert img:not(#glt-a11y-widget *),
  html.a11y-invert video:not(#glt-a11y-widget *),
  html.a11y-invert canvas:not(#glt-a11y-widget *) {
    filter: invert(1) hue-rotate(180deg) !important;
  }
  html.a11y-invert #glt-a11y-widget { filter: invert(1) hue-rotate(180deg) !important; }

  /* ── Grayscale ── */
  html.a11y-gray { filter: grayscale(100%) !important; }
  html.a11y-gray #glt-a11y-widget { filter: grayscale(0) !important; }

  /* ── Highlight Links ── */
  html.a11y-links a:not(#glt-a11y-widget *) {
    outline: 3px solid #d955a4 !important;
    outline-offset: 2px !important;
    background: rgba(217,85,164,0.1) !important;
    border-radius: 3px !important;
    text-decoration: underline !important;
  }

  /* ── Stop Motion ── */
  html.a11y-no-motion *,
  html.a11y-no-motion *::before,
  html.a11y-no-motion *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }

  /* ── Readable / Dyslexia-friendly font ── */
  html.a11y-font *:not(#glt-a11y-widget):not(#glt-a11y-widget *) {
    font-family: 'Atkinson Hyperlegible', Arial, sans-serif !important;
    word-spacing: 0.15em !important;
  }

  /* ── Line height steps ── */
  html.a11y-lh1 *:not(#glt-a11y-widget):not(#glt-a11y-widget *) { line-height: 1.9 !important; }
  html.a11y-lh2 *:not(#glt-a11y-widget):not(#glt-a11y-widget *) { line-height: 2.4 !important; }
  html.a11y-lh3 *:not(#glt-a11y-widget):not(#glt-a11y-widget *) { line-height: 3.0 !important; }

  /* ── Letter spacing steps ── */
  html.a11y-ls1 *:not(#glt-a11y-widget):not(#glt-a11y-widget *) { letter-spacing: 0.06em !important; }
  html.a11y-ls2 *:not(#glt-a11y-widget):not(#glt-a11y-widget *) { letter-spacing: 0.12em !important; }
  html.a11y-ls3 *:not(#glt-a11y-widget):not(#glt-a11y-widget *) { letter-spacing: 0.2em !important; }

  /* ── Text align ── */
  html.a11y-align-center p:not(#glt-a11y-widget *),
  html.a11y-align-center h1:not(#glt-a11y-widget *),
  html.a11y-align-center h2:not(#glt-a11y-widget *),
  html.a11y-align-center h3:not(#glt-a11y-widget *),
  html.a11y-align-center li:not(#glt-a11y-widget *) { text-align: center !important; }
  html.a11y-align-left p:not(#glt-a11y-widget *),
  html.a11y-align-left h1:not(#glt-a11y-widget *),
  html.a11y-align-left h2:not(#glt-a11y-widget *),
  html.a11y-align-left h3:not(#glt-a11y-widget *),
  html.a11y-align-left li:not(#glt-a11y-widget *) { text-align: left !important; }

  /* ── Big cursor ── */
  html.a11y-cursor, html.a11y-cursor * {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath fill='black' stroke='white' stroke-width='2' d='M5 0l20 15-8 1-5 10L5 0z'/%3E%3C/svg%3E") 0 0, auto !important;
  }

  /* ── Focus indicators ── */
  html.a11y-focus *:focus:not(#glt-a11y-widget *) {
    outline: 4px solid #d955a4 !important;
    outline-offset: 3px !important;
    box-shadow: 0 0 0 6px rgba(217,85,164,0.2) !important;
  }

  /* ── ADHD mode ── */
  html.a11y-adhd *:not(#glt-a11y-widget):not(#glt-a11y-widget *) {
    animation: none !important;
    transition: none !important;
  }
  html.a11y-adhd p:not(#glt-a11y-widget *),
  html.a11y-adhd li:not(#glt-a11y-widget *) {
    max-width: 70ch !important;
    line-height: 1.8 !important;
  }

  /* ── Reading Mask ── */
  #glt-a11y-mask-top, #glt-a11y-mask-bot {
    display: none;
    position: fixed;
    left: 0; right: 0;
    background: rgba(0,0,0,0.6);
    pointer-events: none;
    z-index: 2147483640;
  }
  body.a11y-mask-on #glt-a11y-mask-top,
  body.a11y-mask-on #glt-a11y-mask-bot { display: block; }

  /* ── Reading Guide ── */
  #glt-a11y-guide {
    display: none;
    position: fixed;
    left: 0; right: 0;
    height: 3px;
    background: #d955a4;
    pointer-events: none;
    z-index: 2147483641;
    box-shadow: 0 0 8px rgba(217,85,164,0.5);
  }
  body.a11y-guide-on #glt-a11y-guide { display: block; }

  /* ── Keyboard nav ── */
  html.a11y-keynav a:not(#glt-a11y-widget *):focus,
  html.a11y-keynav button:not(#glt-a11y-widget *):focus,
  html.a11y-keynav input:not(#glt-a11y-widget *):focus,
  html.a11y-keynav [tabindex]:not(#glt-a11y-widget *):focus {
    outline: 3px dashed #d955a4 !important;
    outline-offset: 4px !important;
    background: rgba(217,85,164,0.08) !important;
  }

  /* ── Widget container ── */
  #glt-a11y-widget {
    all: initial;
    position: fixed !important;
    bottom: 24px !important;
    left: 24px !important;
    z-index: 2147483647 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 10px !important;
    font-family: system-ui, sans-serif !important;
  }
`;

function injectCSS() {
  if (document.getElementById("glt-a11y-css")) return;
  const s = document.createElement("style");
  s.id = "glt-a11y-css";
  s.textContent = A11Y_CSS;
  document.head.appendChild(s);
}

function ensureMaskElements() {
  if (!document.getElementById("glt-a11y-mask-top")) {
    const top = document.createElement("div"); top.id = "glt-a11y-mask-top";
    const bot = document.createElement("div"); bot.id = "glt-a11y-mask-bot";
    document.body.appendChild(top);
    document.body.appendChild(bot);
  }
  if (!document.getElementById("glt-a11y-guide")) {
    const g = document.createElement("div"); g.id = "glt-a11y-guide";
    document.body.appendChild(g);
  }
}

function setupReadingMask(on: boolean) {
  document.body.classList.toggle("a11y-mask-on", on);
  if (on) {
    const BAND = 80;
    const move = (e: MouseEvent) => {
      const top = document.getElementById("glt-a11y-mask-top");
      const bot = document.getElementById("glt-a11y-mask-bot");
      if (!top || !bot) return;
      top.style.top = "0";
      top.style.height = `${Math.max(0, e.clientY - BAND)}px`;
      bot.style.top = `${e.clientY + BAND}px`;
      bot.style.height = `${window.innerHeight}px`;
    };
    document.addEventListener("mousemove", move);
    (document as any)._a11yMaskMove = move;
  } else {
    if ((document as any)._a11yMaskMove) {
      document.removeEventListener("mousemove", (document as any)._a11yMaskMove);
      delete (document as any)._a11yMaskMove;
    }
  }
}

function setupReadingGuide(on: boolean) {
  document.body.classList.toggle("a11y-guide-on", on);
  if (on) {
    const move = (e: MouseEvent) => {
      const g = document.getElementById("glt-a11y-guide");
      if (g) g.style.top = `${e.clientY}px`;
    };
    document.addEventListener("mousemove", move);
    (document as any)._a11yGuideMove = move;
  } else {
    if ((document as any)._a11yGuideMove) {
      document.removeEventListener("mousemove", (document as any)._a11yGuideMove);
      delete (document as any)._a11yGuideMove;
    }
  }
}

function setupMuteSounds(on: boolean) {
  document.querySelectorAll<HTMLMediaElement>("audio, video").forEach(el => { el.muted = on; });
  if (on) {
    (document as any)._a11yMuteObserver = new MutationObserver(() => {
      document.querySelectorAll<HTMLMediaElement>("audio, video").forEach(el => { el.muted = true; });
    });
    (document as any)._a11yMuteObserver.observe(document.body, { childList: true, subtree: true });
  } else {
    (document as any)._a11yMuteObserver?.disconnect();
  }
}

// ─── State ───────────────────────────────────────────────────────────────────
type Contrast = "none" | "dark" | "light" | "invert";
type TextAlign = "none" | "left" | "center";

type St = {
  fontSize: number;
  zoom: number;
  contrast: Contrast;
  gray: boolean;
  links: boolean;
  noMotion: boolean;
  font: boolean;
  cursor: boolean;
  lineHeight: number;
  letterSpacing: number;
  textAlign: TextAlign;
  focus: boolean;
  adhd: boolean;
  mask: boolean;
  guide: boolean;
  mute: boolean;
  keynav: boolean;
};

const DEF: St = {
  fontSize: 0, zoom: 0, contrast: "none", gray: false,
  links: false, noMotion: false, font: false, cursor: false,
  lineHeight: 0, letterSpacing: 0, textAlign: "none",
  focus: false, adhd: false, mask: false, guide: false,
  mute: false, keynav: false,
};

// Store original font size to allow proper increments
let originalFontSize: number | null = null;

function applyState(s: St) {
  const h = document.documentElement;

  // Text size: adjust root font-size
  if (s.fontSize === 0) {
    h.style.fontSize = "";
  } else {
    if (originalFontSize === null) {
      const computed = parseFloat(window.getComputedStyle(h).fontSize);
      originalFontSize = isNaN(computed) ? 16 : computed;
    }
    const base = originalFontSize ?? 16;
    h.style.fontSize = `${base + s.fontSize * 2}px`;
  }
  if (s.fontSize === 0) originalFontSize = null;

  // Zoom: use CSS transform on body for broader browser support
  if (s.zoom === 0) {
    document.body.style.transform = "";
    document.body.style.transformOrigin = "";
    document.body.style.width = "";
  } else {
    const scale = 1 + s.zoom * 0.1;
    document.body.style.transform = `scale(${scale})`;
    document.body.style.transformOrigin = "top left";
    document.body.style.width = `${100 / scale}%`;
  }

  h.classList.toggle("a11y-dark",      s.contrast === "dark");
  h.classList.toggle("a11y-light",     s.contrast === "light");
  h.classList.toggle("a11y-invert",    s.contrast === "invert");
  h.classList.toggle("a11y-gray",      s.gray && s.contrast === "none");
  h.classList.toggle("a11y-links",     s.links);
  h.classList.toggle("a11y-no-motion", s.noMotion);
  h.classList.toggle("a11y-font",      s.font);
  h.classList.toggle("a11y-cursor",    s.cursor);
  h.classList.toggle("a11y-focus",     s.focus);
  h.classList.toggle("a11y-adhd",      s.adhd);
  h.classList.toggle("a11y-keynav",    s.keynav);

  h.classList.toggle("a11y-lh1", s.lineHeight === 1);
  h.classList.toggle("a11y-lh2", s.lineHeight === 2);
  h.classList.toggle("a11y-lh3", s.lineHeight === 3);

  h.classList.toggle("a11y-ls1", s.letterSpacing === 1);
  h.classList.toggle("a11y-ls2", s.letterSpacing === 2);
  h.classList.toggle("a11y-ls3", s.letterSpacing === 3);

  h.classList.toggle("a11y-align-left",   s.textAlign === "left");
  h.classList.toggle("a11y-align-center", s.textAlign === "center");
}

function save(s: St) {
  try { sessionStorage.setItem("glt-a11y", JSON.stringify(s)); } catch {}
}
function load(): St {
  try {
    const r = sessionStorage.getItem("glt-a11y");
    if (r) return { ...DEF, ...JSON.parse(r) };
  } catch {}
  return { ...DEF };
}

// ─── Design tokens ───────────────────────────────────────────────────────────
const PINK  = "#d955a4";
const DARK  = "#0f0f1a";
const PANEL_BG = "#ffffff";

// ─── Inline styles ───────────────────────────────────────────────────────────
const baseBtn: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 5,
  padding: "10px 6px",
  border: "1.5px solid #e0e0e0",
  borderRadius: 10,
  background: "#f7f7f7",
  color: "#3a3a3a",
  fontSize: 10,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "system-ui, sans-serif",
  lineHeight: 1.25,
  textAlign: "center",
  minHeight: 62,
  letterSpacing: "0.01em",
};

const activeBtn: React.CSSProperties = {
  ...baseBtn,
  border: `2px solid ${PINK}`,
  borderRadius: 10,
  background: PINK,
  color: "#fff",
  fontWeight: 700,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [st, setSt] = useState<St>(DEF);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    injectCSS();
    ensureMaskElements();
    const saved = load();
    setSt(saved);
    applyState(saved);
    setupReadingMask(saved.mask);
    setupReadingGuide(saved.guide);
    setupMuteSounds(saved.mute);
  }, []);

  useEffect(() => {
    applyState(st);
    save(st);
  }, [st]);

  useEffect(() => {
    if (!open) return;
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  const patch = (p: Partial<St>) => {
    setSt(s => {
      const next = { ...s, ...p };
      if ("mask" in p) setupReadingMask(next.mask);
      if ("guide" in p) setupReadingGuide(next.guide);
      if ("mute" in p) setupMuteSounds(next.mute);
      return next;
    });
  };

  const toggleContrast = (m: Contrast) =>
    patch({ contrast: st.contrast === m ? "none" : m, gray: false });

  const cycleLineHeight = () => patch({ lineHeight: st.lineHeight >= 3 ? 0 : st.lineHeight + 1 });
  const cycleLetterSpacing = () => patch({ letterSpacing: st.letterSpacing >= 3 ? 0 : st.letterSpacing + 1 });
  const cycleTextAlign = () => {
    const order: TextAlign[] = ["none", "left", "center"];
    patch({ textAlign: order[(order.indexOf(st.textAlign) + 1) % order.length] });
  };

  const reset = () => {
    const fresh = { ...DEF };
    // Reset zoom/font-size manually
    document.documentElement.style.fontSize = "";
    document.body.style.transform = "";
    document.body.style.transformOrigin = "";
    document.body.style.width = "";
    setSt(fresh);
    applyState(fresh);
    save(fresh);
    setupReadingMask(false);
    setupReadingGuide(false);
    setupMuteSounds(false);
  };

  const hasChanges = JSON.stringify(st) !== JSON.stringify(DEF);
  const activeCount = Object.entries(st).filter(([k, v]) => v !== (DEF as any)[k]).length;

  const lhLabel    = ["Default", "1.9×", "2.4×", "3.0×"][st.lineHeight];
  const lsLabel    = ["Default", "Wide", "Wider", "Widest"][st.letterSpacing];
  const alignLabel = ["Default", "Left", "Center"][["none","left","center"].indexOf(st.textAlign)];

  if (!mounted) return null;

  const widget = (
    <div id="glt-a11y-widget" ref={ref}>
      {open && (
        <div style={{
          width: 308,
          maxHeight: "calc(100vh - 100px)",
          background: PANEL_BG,
          border: "1.5px solid #e8e8e8",
          borderRadius: 18,
          boxShadow: "0 8px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
          marginBottom: 10,
        }}>

          {/* ── Header ── */}
          <div style={{
            background: DARK,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, letterSpacing: "-0.02em" }}>
                Accessibility
              </div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, marginTop: 2, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Girls Leading Tech
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {hasChanges && (
                <button
                  onClick={reset}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.25)",
                    borderRadius: 7,
                    color: "rgba(255,255,255,0.8)",
                    cursor: "pointer",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "4px 10px",
                    letterSpacing: "0.03em",
                    fontFamily: "system-ui, sans-serif",
                  }}>
                  Reset all
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  color: "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  borderRadius: 8,
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  lineHeight: 1,
                  fontFamily: "system-ui, sans-serif",
                }}>
                ×
              </button>
            </div>
          </div>

          {/* ── Scrollable body ── */}
          <div style={{
            overflowY: "auto",
            overflowX: "hidden",
            flex: 1,
            padding: "14px 14px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            scrollbarWidth: "thin",
            scrollbarColor: `${PINK} #f0f0f0`,
          }}>

            {/* ── Text Size ── */}
            <Group label="Text Size">
              <StepControl
                value={st.fontSize === 0 ? "Default" : `+${st.fontSize * 2}px`}
                active={st.fontSize > 0}
                steps={4}
                current={st.fontSize}
                onDec={() => patch({ fontSize: Math.max(0, st.fontSize - 1) })}
                onInc={() => patch({ fontSize: Math.min(4, st.fontSize + 1) })}
                decLabel="A−"
                incLabel="A+"
                decDisabled={st.fontSize <= 0}
                incDisabled={st.fontSize >= 4}
              />
            </Group>

            {/* ── Zoom ── */}
            <Group label="Page Zoom">
              <StepControl
                value={st.zoom === 0 ? "100%" : `${100 + st.zoom * 10}%`}
                active={st.zoom > 0}
                steps={4}
                current={st.zoom}
                onDec={() => patch({ zoom: Math.max(0, st.zoom - 1) })}
                onInc={() => patch({ zoom: Math.min(4, st.zoom + 1) })}
                decLabel="−"
                incLabel="+"
                decDisabled={st.zoom <= 0}
                incDisabled={st.zoom >= 4}
              />
            </Group>

            {/* ── Color & Contrast ── */}
            <Group label="Color & Contrast">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                <Btn label="Dark" sublabel="High contrast" active={st.contrast === "dark"}
                  onClick={() => toggleContrast("dark")} />
                <Btn label="Light" sublabel="High contrast" active={st.contrast === "light"}
                  onClick={() => toggleContrast("light")} />
                <Btn label="Invert" sublabel="Colors" active={st.contrast === "invert"}
                  onClick={() => toggleContrast("invert")} />
                <Btn label="Grayscale" sublabel="Remove color" active={st.gray && st.contrast === "none"}
                  onClick={() => patch({ gray: !st.gray, contrast: "none" })}
                  disabled={st.contrast !== "none"} />
                <Btn label="Reset" sublabel="Restore color" active={false}
                  onClick={() => patch({ contrast: "none", gray: false })} />
              </div>
            </Group>

            {/* ── Reading ── */}
            <Group label="Reading">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <Btn label="Readable font" sublabel="Atkinson" active={st.font}
                  onClick={() => patch({ font: !st.font })} style={{ gridColumn: "1/-1" }} />
                <CycleBtn label="Line height" value={lhLabel}
                  active={st.lineHeight > 0} onClick={cycleLineHeight}
                  steps={4} current={st.lineHeight} />
                <CycleBtn label="Letter spacing" value={lsLabel}
                  active={st.letterSpacing > 0} onClick={cycleLetterSpacing}
                  steps={4} current={st.letterSpacing} />
                <CycleBtn label="Text align" value={alignLabel}
                  active={st.textAlign !== "none"} onClick={cycleTextAlign}
                  steps={3} current={["none","left","center"].indexOf(st.textAlign)} />
                <Btn label="ADHD mode" sublabel="Reduce noise" active={st.adhd}
                  onClick={() => patch({ adhd: !st.adhd })} />
              </div>
            </Group>

            {/* ── Reading Tools ── */}
            <Group label="Reading Tools">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <Btn label="Reading mask" sublabel="Focus band" active={st.mask}
                  onClick={() => patch({ mask: !st.mask })} />
                <Btn label="Reading guide" sublabel="Cursor line" active={st.guide}
                  onClick={() => patch({ guide: !st.guide })} />
              </div>
            </Group>

            {/* ── Navigation ── */}
            <Group label="Navigation">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <Btn label="Highlight links" sublabel="Outline links" active={st.links}
                  onClick={() => patch({ links: !st.links })} />
                <Btn label="Big cursor" sublabel="Large pointer" active={st.cursor}
                  onClick={() => patch({ cursor: !st.cursor })} />
                <Btn label="Focus ring" sublabel="Keyboard nav" active={st.focus}
                  onClick={() => patch({ focus: !st.focus })} />
                <Btn label="Tab hints" sublabel="Key highlight" active={st.keynav}
                  onClick={() => patch({ keynav: !st.keynav })} />
                <Btn label="Stop motion" sublabel="No animations" active={st.noMotion}
                  onClick={() => patch({ noMotion: !st.noMotion })} />
                <Btn label="Mute sounds" sublabel="All media" active={st.mute}
                  onClick={() => patch({ mute: !st.mute })} />
              </div>
            </Group>

          </div>

          {/* ── Footer ── */}
          <div style={{
            padding: "8px 14px",
            borderTop: "1px solid #f0f0f0",
            background: "#fafafa",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 10, color: "#bbb", fontFamily: "system-ui, sans-serif", letterSpacing: "0.02em" }}>
              Girls Leading Tech
            </span>
            {hasChanges && (
              <span style={{ fontSize: 10, color: PINK, fontWeight: 700, fontFamily: "system-ui, sans-serif" }}>
                {activeCount} {activeCount === 1 ? "setting" : "settings"} active
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close accessibility panel" : "Open accessibility panel"}
        aria-expanded={open}
        aria-haspopup="dialog"
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: open ? DARK : `linear-gradient(140deg, ${PINK} 0%, #e06dc0 100%)`,
          color: "#fff",
          border: open ? `2px solid ${PINK}` : "none",
          boxShadow: open
            ? `0 0 0 3px rgba(217,85,164,0.2), 0 4px 12px rgba(0,0,0,0.15)`
            : `0 4px 14px rgba(217,85,164,0.4), 0 2px 6px rgba(0,0,0,0.1)`,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          transition: "all 0.18s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <HumanIcon size={22} />
        {hasChanges && (
          <span style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#ffed00",
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 8,
            fontWeight: 900,
            color: "#000",
            fontFamily: "system-ui, sans-serif",
          }}>
            {activeCount}
          </span>
        )}
      </button>
    </div>
  );

  return createPortal(widget, document.body);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
        color: "#aaa",
        marginBottom: 7,
        fontFamily: "system-ui, sans-serif",
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Btn({
  label, sublabel, active, onClick, disabled = false, style = {},
}: {
  label: string; sublabel?: string; active: boolean;
  onClick: () => void; disabled?: boolean; style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      style={{
        ...(active ? activeBtn : baseBtn),
        opacity: disabled ? 0.35 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      <span style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "-0.01em",
        lineHeight: 1.2,
        color: active ? "#fff" : "#222",
      }}>
        {label}
      </span>
      {sublabel && (
        <span style={{
          fontSize: 9,
          fontWeight: 400,
          letterSpacing: "0.01em",
          color: active ? "rgba(255,255,255,0.75)" : "#888",
          lineHeight: 1.2,
        }}>
          {sublabel}
        </span>
      )}
    </button>
  );
}

function CycleBtn({
  label, value, active, onClick, steps, current,
}: {
  label: string; value: string; active: boolean;
  onClick: () => void; steps: number; current: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        ...(active ? { ...activeBtn, gap: 3 } : { ...baseBtn, gap: 3 }),
      }}
    >
      <span style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "-0.01em",
        lineHeight: 1.2,
        color: active ? "#fff" : "#222",
      }}>
        {label}
      </span>
      <span style={{
        fontSize: 9,
        fontWeight: active ? 600 : 400,
        color: active ? "rgba(255,255,255,0.85)" : "#888",
        lineHeight: 1.2,
      }}>
        {value}
      </span>
      <span style={{
        fontSize: 8,
        letterSpacing: "0.1em",
        color: active ? "rgba(255,255,255,0.5)" : "#ccc",
        lineHeight: 1,
      }}>
        {"●".repeat(current)}{"○".repeat(steps - 1 - current)}
      </span>
    </button>
  );
}

function StepControl({
  value, active, steps, current, onDec, onInc,
  decLabel, incLabel, decDisabled, incDisabled,
}: {
  value: string; active: boolean; steps: number; current: number;
  onDec: () => void; onInc: () => void;
  decLabel: string; incLabel: string;
  decDisabled: boolean; incDisabled: boolean;
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "#f7f7f7",
      borderRadius: 12,
      padding: "8px 10px",
      border: active ? `1.5px solid ${PINK}` : "1.5px solid #e8e8e8",
    }}>
      <button
        onClick={onDec}
        disabled={decDisabled}
        style={{
          ...baseBtn,
          minHeight: "auto",
          padding: "5px 13px",
          fontSize: 13,
          fontWeight: 800,
          flex: 0,
          borderRadius: 8,
          opacity: decDisabled ? 0.3 : 1,
          letterSpacing: "-0.02em",
        }}
      >
        {decLabel}
      </button>
      <div style={{ flex: 1, textAlign: "center" }}>
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: active ? PINK : "#333",
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "-0.01em",
        }}>
          {value}
        </div>
        <div style={{ fontSize: 9, color: "#ccc", marginTop: 3, letterSpacing: "0.1em" }}>
          {"●".repeat(current)}{"○".repeat(steps - current)}
        </div>
      </div>
      <button
        onClick={onInc}
        disabled={incDisabled}
        style={{
          ...baseBtn,
          minHeight: "auto",
          padding: "5px 13px",
          fontSize: 13,
          fontWeight: 800,
          flex: 0,
          borderRadius: 8,
          opacity: incDisabled ? 0.3 : 1,
          letterSpacing: "-0.02em",
        }}
      >
        {incLabel}
      </button>
    </div>
  );
}

function HumanIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="white" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="4.5" r="2.5" />
      <path d="M18.5 10C16.6 9.4 14.4 9 12 9s-4.6.4-6.5 1L4 12c2-.5 4.8-.9 8-.9s6 .4 8 .9L18.5 10z" />
      <path d="M8.5 12L7 21h2l2-5.5L13 21l2-5.5L17 21h2l-1.5-9" />
    </svg>
  );
}