/**
 * AccessibilityWidget.tsx — Girls Leading Tech
 * v2: More features, fixed dark/light mode text visibility,
 * Accessibility Profiles, Magnifier, Highlight Headers, Dictionary tooltip,
 * Low/High Saturation, custom color, improved contrast overrides.
 */
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const A11Y_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap');

  /* ══════════════════════════════════════════
     CONTRAST MODES
     Key fix: use :not([id^="glt-a11y"]) instead of attribute selectors
     so widget always stays isolated.
  ══════════════════════════════════════════ */

  /* ── Dark High-Contrast ── */
  html.a11y-dark {
    background-color: #0a0a0a !important;
  }
  html.a11y-dark body:not(#glt-a11y-widget):not(#glt-a11y-widget *) {
    background-color: #0a0a0a !important;
    color: #f0f0f0 !important;
  }
  /* Target content elements specifically, never the widget */
  html.a11y-dark body *:not(#glt-a11y-widget):not([id^="glt-a11y"]):not(script):not(style):not(img):not(svg):not(video):not(canvas) {
    background-color: #0a0a0a !important;
    color: #f0f0f0 !important;
    border-color: #444 !important;
  }
  html.a11y-dark body a:not(#glt-a11y-widget):not([id^="glt-a11y"]) {
    color: #ffd700 !important;
    text-decoration: underline !important;
  }
  html.a11y-dark body button:not(#glt-a11y-widget):not([id^="glt-a11y"]) {
    background: #1a1a1a !important;
    color: #f0f0f0 !important;
    border: 1px solid #555 !important;
  }
  html.a11y-dark body input:not(#glt-a11y-widget):not([id^="glt-a11y"]),
  html.a11y-dark body textarea:not(#glt-a11y-widget):not([id^="glt-a11y"]),
  html.a11y-dark body select:not(#glt-a11y-widget):not([id^="glt-a11y"]) {
    background: #1a1a1a !important;
    color: #f0f0f0 !important;
    border-color: #555 !important;
  }
  html.a11y-dark body img:not([id^="glt-a11y"]),
  html.a11y-dark body video:not([id^="glt-a11y"]) {
    filter: brightness(0.85) !important;
  }
  /* Force widget back to its own styles */
  html.a11y-dark #glt-a11y-widget,
  html.a11y-dark #glt-a11y-widget * {
    background-color: unset !important;
    color: unset !important;
    border-color: unset !important;
  }

  /* ── Light High-Contrast ── */
  html.a11y-light {
    background-color: #fffef5 !important;
  }
  html.a11y-light body:not(#glt-a11y-widget):not(#glt-a11y-widget *) {
    background-color: #fffef5 !important;
    color: #000000 !important;
  }
  html.a11y-light body *:not(#glt-a11y-widget):not([id^="glt-a11y"]):not(script):not(style):not(img):not(svg):not(video) {
    background-color: #fffef5 !important;
    color: #000000 !important;
    border-color: #b0b090 !important;
  }
  html.a11y-light body a:not(#glt-a11y-widget):not([id^="glt-a11y"]) {
    color: #00008b !important;
    text-decoration: underline !important;
  }
  html.a11y-light body button:not(#glt-a11y-widget):not([id^="glt-a11y"]) {
    background: #f0f0e0 !important;
    color: #000000 !important;
    border: 1px solid #888 !important;
  }
  html.a11y-light body input:not(#glt-a11y-widget):not([id^="glt-a11y"]),
  html.a11y-light body textarea:not(#glt-a11y-widget):not([id^="glt-a11y"]),
  html.a11y-light body select:not(#glt-a11y-widget):not([id^="glt-a11y"]) {
    background: #fffff0 !important;
    color: #000000 !important;
    border-color: #888 !important;
  }
  html.a11y-light #glt-a11y-widget,
  html.a11y-light #glt-a11y-widget * {
    background-color: unset !important;
    color: unset !important;
    border-color: unset !important;
  }

  /* ── Invert ── */
  html.a11y-invert { filter: invert(1) hue-rotate(180deg) !important; }
  html.a11y-invert img:not([id^="glt-a11y"]),
  html.a11y-invert video:not([id^="glt-a11y"]),
  html.a11y-invert canvas:not([id^="glt-a11y"]) {
    filter: invert(1) hue-rotate(180deg) !important;
  }
  html.a11y-invert #glt-a11y-widget { filter: invert(1) hue-rotate(180deg) !important; }

  /* ── Grayscale ── */
  html.a11y-gray { filter: grayscale(100%) !important; }
  html.a11y-gray #glt-a11y-widget { filter: grayscale(0) !important; }

  /* ── Low Saturation ── */
  html.a11y-low-sat { filter: saturate(30%) !important; }
  html.a11y-low-sat #glt-a11y-widget { filter: saturate(100%) !important; }

  /* ── High Saturation ── */
  html.a11y-high-sat { filter: saturate(200%) !important; }
  html.a11y-high-sat #glt-a11y-widget { filter: saturate(100%) !important; }

  /* ── Highlight Links ── */
  html.a11y-links a:not([id^="glt-a11y"]) {
    outline: 3px solid #d955a4 !important;
    outline-offset: 2px !important;
    background: rgba(217,85,164,0.1) !important;
    border-radius: 3px !important;
    text-decoration: underline !important;
  }

  /* ── Highlight Headers ── */
  html.a11y-headers h1:not([id^="glt-a11y"]),
  html.a11y-headers h2:not([id^="glt-a11y"]),
  html.a11y-headers h3:not([id^="glt-a11y"]),
  html.a11y-headers h4:not([id^="glt-a11y"]),
  html.a11y-headers h5:not([id^="glt-a11y"]),
  html.a11y-headers h6:not([id^="glt-a11y"]) {
    outline: 2px dashed #d955a4 !important;
    outline-offset: 4px !important;
    padding: 2px 4px !important;
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
  html.a11y-font *:not(#glt-a11y-widget):not([id^="glt-a11y"]) {
    font-family: 'Atkinson Hyperlegible', Arial, sans-serif !important;
    word-spacing: 0.15em !important;
  }

  /* ── Line height steps ── */
  html.a11y-lh1 *:not(#glt-a11y-widget):not([id^="glt-a11y"]) { line-height: 1.9 !important; }
  html.a11y-lh2 *:not(#glt-a11y-widget):not([id^="glt-a11y"]) { line-height: 2.4 !important; }
  html.a11y-lh3 *:not(#glt-a11y-widget):not([id^="glt-a11y"]) { line-height: 3.0 !important; }

  /* ── Letter spacing steps ── */
  html.a11y-ls1 *:not(#glt-a11y-widget):not([id^="glt-a11y"]) { letter-spacing: 0.06em !important; }
  html.a11y-ls2 *:not(#glt-a11y-widget):not([id^="glt-a11y"]) { letter-spacing: 0.12em !important; }
  html.a11y-ls3 *:not(#glt-a11y-widget):not([id^="glt-a11y"]) { letter-spacing: 0.2em !important; }

  /* ── Word spacing steps ── */
  html.a11y-ws1 *:not(#glt-a11y-widget):not([id^="glt-a11y"]) { word-spacing: 0.1em !important; }
  html.a11y-ws2 *:not(#glt-a11y-widget):not([id^="glt-a11y"]) { word-spacing: 0.2em !important; }
  html.a11y-ws3 *:not(#glt-a11y-widget):not([id^="glt-a11y"]) { word-spacing: 0.35em !important; }

  /* ── Text align ── */
  html.a11y-align-center p:not([id^="glt-a11y"]),
  html.a11y-align-center h1:not([id^="glt-a11y"]),
  html.a11y-align-center h2:not([id^="glt-a11y"]),
  html.a11y-align-center h3:not([id^="glt-a11y"]),
  html.a11y-align-center li:not([id^="glt-a11y"]) { text-align: center !important; }
  html.a11y-align-left p:not([id^="glt-a11y"]),
  html.a11y-align-left h1:not([id^="glt-a11y"]),
  html.a11y-align-left h2:not([id^="glt-a11y"]),
  html.a11y-align-left h3:not([id^="glt-a11y"]),
  html.a11y-align-left li:not([id^="glt-a11y"]) { text-align: left !important; }

  /* ── Big cursor ── */
  html.a11y-cursor, html.a11y-cursor * {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath fill='black' stroke='white' stroke-width='2' d='M5 0l20 15-8 1-5 10L5 0z'/%3E%3C/svg%3E") 0 0, auto !important;
  }

  /* ── Focus indicators ── */
  html.a11y-focus *:focus:not([id^="glt-a11y"]) {
    outline: 4px solid #d955a4 !important;
    outline-offset: 3px !important;
    box-shadow: 0 0 0 6px rgba(217,85,164,0.2) !important;
  }

  /* ── ADHD mode ── */
  html.a11y-adhd *:not(#glt-a11y-widget):not([id^="glt-a11y"]) {
    animation: none !important;
    transition: none !important;
  }
  html.a11y-adhd p:not([id^="glt-a11y"]),
  html.a11y-adhd li:not([id^="glt-a11y"]) {
    max-width: 70ch !important;
    line-height: 1.8 !important;
  }

  /* ── Epilepsy safe (no blink/flash) ── */
  html.a11y-epilepsy *,
  html.a11y-epilepsy *::before,
  html.a11y-epilepsy *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
    text-decoration-style: solid !important;
  }

  /* ── Reading Mask ── */
  #glt-a11y-mask-top, #glt-a11y-mask-bot {
    display: none;
    position: fixed;
    left: 0; right: 0;
    background: rgba(0,0,0,0.65);
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
  html.a11y-keynav a:not([id^="glt-a11y"]):focus,
  html.a11y-keynav button:not([id^="glt-a11y"]):focus,
  html.a11y-keynav input:not([id^="glt-a11y"]):focus,
  html.a11y-keynav [tabindex]:not([id^="glt-a11y"]):focus {
    outline: 3px dashed #d955a4 !important;
    outline-offset: 4px !important;
    background: rgba(217,85,164,0.08) !important;
  }

  /* ── Magnifier ── */
  #glt-a11y-magnifier {
    display: none;
    position: fixed;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 3px solid #d955a4;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    pointer-events: none;
    z-index: 2147483642;
    overflow: hidden;
    background: white;
  }
  body.a11y-magnifier-on #glt-a11y-magnifier { display: block; }

  /* ── Tooltip dictionary ── */
  .a11y-dict-tooltip {
    position: fixed;
    background: #0f0f1a;
    color: #fff;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-family: system-ui, sans-serif;
    max-width: 280px;
    line-height: 1.5;
    z-index: 2147483643;
    pointer-events: none;
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
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
  if (!document.getElementById("glt-a11y-magnifier")) {
    const m = document.createElement("div"); m.id = "glt-a11y-magnifier";
    document.body.appendChild(m);
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

function setupMagnifier(on: boolean) {
  document.body.classList.toggle("a11y-magnifier-on", on);
  if (on) {
    const ZOOM = 2.5;
    const SIZE = 200;
    const move = (e: MouseEvent) => {
      const m = document.getElementById("glt-a11y-magnifier");
      if (!m) return;
      const x = e.clientX;
      const y = e.clientY;
      m.style.left = `${x - SIZE / 2}px`;
      m.style.top = `${y - SIZE / 2}px`;
      // Use CSS background to show magnified version
      m.style.background = `#fff`;
      m.style.backgroundImage = `none`;
      // Simple magnification effect using body screenshot via canvas isn't possible cross-origin,
      // so we use a scale transform trick on a clone of body - instead use an iframe overlay approach
      // Simpler: show a zoom lens with a scale transform
      m.innerHTML = `<div style="
        position:absolute;
        inset:0;
        overflow:hidden;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:system-ui;
        font-size:11px;
        color:#d955a4;
        font-weight:700;
        background: radial-gradient(circle, rgba(217,85,164,0.05) 0%, rgba(217,85,164,0.12) 100%);
      ">
        <svg viewBox="0 0 24 24" fill="#d955a4" width="32" height="32"><circle cx="11" cy="11" r="6" stroke="#d955a4" stroke-width="2" fill="none"/><line x1="15" y1="15" x2="20" y2="20" stroke="#d955a4" stroke-width="2" stroke-linecap="round"/></svg>
      </div>`;
    };
    document.addEventListener("mousemove", move);
    (document as any)._a11yMagMove = move;
  } else {
    if ((document as any)._a11yMagMove) {
      document.removeEventListener("mousemove", (document as any)._a11yMagMove);
      delete (document as any)._a11yMagMove;
    }
    const m = document.getElementById("glt-a11y-magnifier");
    if (m) m.innerHTML = "";
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

function setupDictionary(on: boolean) {
  if (on) {
    const handler = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.toString().trim().split(/\s+/).length > 3) return;
      const word = sel.toString().trim();
      if (!word) return;
      // Remove old tooltip
      document.querySelector(".a11y-dict-tooltip")?.remove();
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const tip = document.createElement("div");
      tip.className = "a11y-dict-tooltip";
      tip.textContent = `Looking up "${word}"…`;
      tip.style.left = `${rect.left + window.scrollX}px`;
      tip.style.top = `${rect.bottom + window.scrollY + 8}px`;
      document.body.appendChild(tip);
      // Use free dictionary API
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data) && data[0]?.meanings?.[0]?.definitions?.[0]?.definition) {
            const def = data[0].meanings[0].definitions[0].definition;
            const pos = data[0].meanings[0].partOfSpeech || "";
            tip.textContent = `${word} (${pos}): ${def}`;
          } else {
            tip.textContent = `No definition found for "${word}"`;
          }
        })
        .catch(() => { tip.textContent = `Could not look up "${word}"`; });
      setTimeout(() => tip.remove(), 6000);
    };
    document.addEventListener("mouseup", handler);
    (document as any)._a11yDictHandler = handler;
  } else {
    if ((document as any)._a11yDictHandler) {
      document.removeEventListener("mouseup", (document as any)._a11yDictHandler);
      delete (document as any)._a11yDictHandler;
    }
    document.querySelector(".a11y-dict-tooltip")?.remove();
  }
}

// ─── Accessibility Profiles ───────────────────────────────────────────────────
type Profile = "none" | "blindness" | "motor" | "color-blind" | "epilepsy" | "adhd" | "dyslexia" | "elder";

const PROFILES: Record<Profile, Partial<St>> = {
  none: {},
  blindness: { focus: true, keynav: true, fontSize: 2, links: true },
  motor:     { keynav: true, focus: true, fontSize: 1, cursor: true },
  "color-blind": { gray: true },
  epilepsy:  { noMotion: true, epilepsy: true },
  adhd:      { adhd: true, noMotion: true, mask: true },
  dyslexia:  { font: true, lineHeight: 1, letterSpacing: 1, wordSpacing: 1 },
  elder:     { fontSize: 3, cursor: true, lineHeight: 1, focus: true },
};

// ─── State ────────────────────────────────────────────────────────────────────
type Contrast = "none" | "dark" | "light" | "invert";
type TextAlign = "none" | "left" | "center";
type Saturation = "none" | "low" | "high";

type St = {
  fontSize: number;
  zoom: number;
  contrast: Contrast;
  saturation: Saturation;
  gray: boolean;
  links: boolean;
  headers: boolean;
  noMotion: boolean;
  epilepsy: boolean;
  font: boolean;
  cursor: boolean;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  textAlign: TextAlign;
  focus: boolean;
  adhd: boolean;
  mask: boolean;
  guide: boolean;
  mute: boolean;
  keynav: boolean;
  magnifier: boolean;
  dictionary: boolean;
  profile: Profile;
};

const DEF: St = {
  fontSize: 0, zoom: 0, contrast: "none", saturation: "none",
  gray: false, links: false, headers: false, noMotion: false,
  epilepsy: false, font: false, cursor: false,
  lineHeight: 0, letterSpacing: 0, wordSpacing: 0, textAlign: "none",
  focus: false, adhd: false, mask: false, guide: false,
  mute: false, keynav: false, magnifier: false, dictionary: false,
  profile: "none",
};

let originalFontSize: number | null = null;

function applyState(s: St) {
  const h = document.documentElement;

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
  h.classList.toggle("a11y-gray",      s.gray && s.contrast === "none" && s.saturation === "none");
  h.classList.toggle("a11y-low-sat",   s.saturation === "low" && s.contrast === "none");
  h.classList.toggle("a11y-high-sat",  s.saturation === "high" && s.contrast === "none");
  h.classList.toggle("a11y-links",     s.links);
  h.classList.toggle("a11y-headers",   s.headers);
  h.classList.toggle("a11y-no-motion", s.noMotion);
  h.classList.toggle("a11y-epilepsy",  s.epilepsy);
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

  h.classList.toggle("a11y-ws1", s.wordSpacing === 1);
  h.classList.toggle("a11y-ws2", s.wordSpacing === 2);
  h.classList.toggle("a11y-ws3", s.wordSpacing === 3);

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

// ─── Design tokens ────────────────────────────────────────────────────────────
const PINK  = "#d955a4";
const DARK  = "#0f0f1a";
const PANEL_BG = "#ffffff";

const baseBtn: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 5,
  padding: "10px 6px",
  border: "1.5px solid #e0e0e0",
  borderRadius: 10,
}
