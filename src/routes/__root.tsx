import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { HeadContent, Scripts, createRootRoute, Link } from "@tanstack/react-router";
import Chatbot from "@/components/Chatbot";

import AccessibilityWidget from "@/components/shared/AccessibilityWidget";

import { FeedbackButton } from "@/components/FeedbackButton";
import { AccessibilityButton } from "@/components/AccessibilityButton";

import appCss from "../styles.css?url";


function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mesh px-4">
      <div className="glass-strong max-w-md rounded-3xl p-10 text-center shadow-soft">
        <h1 className="font-display text-7xl text-gradient">404</h1>
        <h2 className="mt-3 font-display text-2xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This corner of the universe doesn't exist yet.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft"
        >
          Take me home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Girls Leading Tech — Empowering Women in Tech" },
      { name: "description", content: "A community of 4000+ women across 1000+ colleges in India, building, learning and leading in tech together." },
      { name: "author", content: "Girls Leading Tech" },
      { property: "og:title", content: "Girls Leading Tech — Empowering Women in Tech" },
      { property: "og:description", content: "A community of 4000+ women across 1000+ colleges in India, building, learning and leading in tech together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@GirlLeadingTech" },
      { name: "twitter:title", content: "Girls Leading Tech — Empowering Women in Tech" },
      { name: "twitter:description", content: "A community of 4000+ women across 1000+ colleges in India, building, learning and leading in tech together." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/CiyMXuF1kAWOhNxHxkAiVIP6ons1/social-images/social-1778518491333-unnamed.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/CiyMXuF1kAWOhNxHxkAiVIP6ons1/social-images/social-1778518491333-unnamed.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "shortcut icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />

      <AccessibilityWidget />

      <FeedbackButton />
      <AccessibilityButton />

    </>
  );
}