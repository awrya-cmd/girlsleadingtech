import { scholarships } from "../data/scholarships";
import { hackathons } from "../data/hackathons";
import { realEvents } from "../data/events-real";
import { initiatives } from "../data/initiatives";
import { roleModels } from "../data/role-models";
import {
  articles,
  books,
  certifications,
  communities,
  courses,
  interviewPrep,
  programs,
  roadmaps,
  tools,
  videos,
} from "../data/resources";
import { curatedRoadmaps, girlsInTechResources } from "../data/curated-resources";

interface ChatRequestBody {
  query?: string;
}

interface ChatResult {
  query?: string;
  text?: string;
  error?: string;
}

interface SearchHit {
  category: string;
  title: string;
  description: string;
  link?: string;
  score: number;
}

const NUDGE = "Keep exploring — opportunities are waiting for you!";
const NO_DATA =
  "Sorry, I couldn't find anything right now. Try asking about Scholarships, Events, or Mentorship.";

const STOP_WORDS = new Set([
  "a", "an", "the", "for", "in", "on", "at", "to", "of", "and", "or", "is", "are",
  "me", "my", "about", "what", "show", "list", "find", "any", "some", "tell", "give",
]);

type CategoryIntent =
  | "scholarships"
  | "events"
  | "mentorship"
  | "programs"
  | "hackathons"
  | "resources"
  | "communities"
  | "courses"
  | "tools"
  | "role-models"
  | null;

function stripEmDash(text: string): string {
  return text.replace(/\u2014/g, "-").replace(/—/g, "-");
}

function detectCategoryIntent(query: string): CategoryIntent {
  const n = query.toLowerCase().trim();
  if (!n) return null;

  if (/\b(scholarship|scholarships|fellowship|fellowships|grant|grants|funding)\b/.test(n)) {
    return "scholarships";
  }
  if (/\b(event|events|webinar|webinars|session|sessions|talk|talks|meetup)\b/.test(n)) {
    return "events";
  }
  if (/\b(mentor|mentorship|mentoring|mentors)\b/.test(n)) {
    return "mentorship";
  }
  if (/\b(program|programs|initiative|initiatives|cohort)\b/.test(n)) {
    return "programs";
  }
  if (/\b(hackathon|hackathons|hiring challenge|coding challenge)\b/.test(n)) {
    return "hackathons";
  }
  if (/\b(community|communities|network|networks)\b/.test(n)) {
    return "communities";
  }
  if (/\b(course|courses|tutorial|tutorials|learn)\b/.test(n) && !n.includes("roadmap")) {
    return "courses";
  }
  if (/\b(tool|tools|productivity)\b/.test(n)) {
    return "tools";
  }
  if (/\b(role model|role models|inspiration|leader|leaders)\b/.test(n)) {
    return "role-models";
  }
  if (/\b(resource|resources|article|articles|book|books|video|videos|certification)\b/.test(n)) {
    return "resources";
  }
  return null;
}

function scoreText(text: string, query: string): number {
  const normalized = text.toLowerCase();
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  if (normalized.includes(q)) return 100;

  const tokens = q.split(/\s+/).filter((t) => t.length > 2 && !STOP_WORDS.has(t));
  if (!tokens.length) return normalized.includes(q.slice(0, 3)) ? 1 : 0;

  let score = 0;
  for (const token of tokens) {
    if (normalized.includes(token)) score += 10;
  }
  return score;
}

function finish(text: string): string {
  const body = stripEmDash(text.trim());
  if (body.includes(NUDGE)) return body;
  return `${body}\n\n${NUDGE}`;
}

function formatIntentList(
  intro: string,
  items: { category: string; line: string }[],
  limit = 5,
): string {
  if (!items.length) return NO_DATA;
  let text = `${intro}\n\n`;
  items.slice(0, limit).forEach((item, index) => {
    text += `${index + 1}. [${item.category}] ${item.line}\n`;
  });
  return finish(text);
}

function respondScholarships(): string {
  return formatIntentList(
    "Here are some scholarships you might like:",
    scholarships.map((s) => ({
      category: "Scholarship",
      line: `${s.title} — ${s.provider}. ${s.benefit}. Opens: ${s.openDate || "See site"}.`,
    })),
  );
}

function respondEvents(): string {
  const upcoming = realEvents.filter((e) => e.status === "upcoming");
  const pool = (upcoming.length ? upcoming : realEvents).slice(0, 5);
  return formatIntentList(
    "Upcoming events you can join:",
    pool.map((e) => ({
      category: "Event",
      line: `${e.title} — ${e.date}${e.speakerName ? `. With ${e.speakerName}` : ""}.`,
    })),
  );
}

function respondMentorship(): string {
  return formatIntentList(
    "Programs and mentorship paths from GLT:",
    initiatives.map((i) => ({
      category: "Mentorship",
      line: `${i.name} — ${i.tagline || i.description}`,
    })),
  );
}

function respondPrograms(): string {
  return formatIntentList(
    "Here are programs worth exploring:",
    [
      ...initiatives.map((i) => ({
        category: "Program",
        line: `${i.name} — ${i.tagline || i.description}`,
      })),
      ...programs.slice(0, 3).map((p) => ({
        category: "Program",
        line: `${p.title} — ${p.description || "Explore on our resources hub."}`,
      })),
    ],
  );
}

function respondHackathons(): string {
  return formatIntentList(
    "Hackathons and challenges you can try:",
    hackathons.map((h) => ({
      category: "Hackathon",
      line: `${h.name} by ${h.organisedBy}. ${h.benefit}. Opens: ${h.openDate || "See site"}.`,
    })),
  );
}

function respondCommunities(): string {
  return formatIntentList(
    "Communities where you can connect:",
    communities.slice(0, 5).map((c) => ({
      category: "Community",
      line: `${c.title} — ${c.description || "Join and grow with peers."}`,
    })),
  );
}

function respondCourses(): string {
  return formatIntentList(
    "Courses to level up your skills:",
    courses.slice(0, 5).map((c) => ({
      category: "Course",
      line: `${c.title}${c.author ? ` by ${c.author}` : ""} — ${c.description || "Self-paced learning."}`,
    })),
  );
}

function respondTools(): string {
  return formatIntentList(
    "Tools that can speed up your work:",
    tools.slice(0, 5).map((t) => ({
      category: "Tool",
      line: `${t.title} — ${t.description || "Handy for builders."}`,
    })),
  );
}

function respondRoleModels(): string {
  return formatIntentList(
    "Women in tech worth following:",
    roleModels.slice(0, 5).map((r) => ({
      category: "Role Model",
      line: `${r.name} (${r.domain}) — ${(r.summary ?? "").slice(0, 120)}${(r.summary ?? "").length > 120 ? "…" : ""}`,
    })),
  );
}

function respondResources(): string {
  return formatIntentList(
    "Curated resources from our hub:",
    [
      ...books.slice(0, 2).map((b) => ({
        category: "Resource",
        line: `${b.title} — ${b.description || "Recommended read."}`,
      })),
      ...articles.slice(0, 2).map((a) => ({
        category: "Resource",
        line: `${a.title} — ${a.description || "Quick read."}`,
      })),
      ...videos.slice(0, 1).map((v) => ({
        category: "Resource",
        line: `${v.title} — ${v.description || "Watch and learn."}`,
      })),
    ],
  );
}

function handleCategoryIntent(intent: CategoryIntent): string | null {
  switch (intent) {
    case "scholarships": return respondScholarships();
    case "events": return respondEvents();
    case "mentorship": return respondMentorship();
    case "programs": return respondPrograms();
    case "hackathons": return respondHackathons();
    case "communities": return respondCommunities();
    case "courses": return respondCourses();
    case "tools": return respondTools();
    case "role-models": return respondRoleModels();
    case "resources": return respondResources();
    default: return null;
  }
}

function matchCuratedResource(query: string): string | null {
  const norm = query.toLowerCase().trim();
  const match = (keywords: string[]) => keywords.some((kw) => norm.includes(kw));

  if (match(["dsa", "data structure", "algorithm", "leetcode", "leet-code"])) {
    return formatRoadmap(curatedRoadmaps.dsa);
  }
  if (match(["java"]) && !norm.includes("javascript")) {
    return formatRoadmap(curatedRoadmaps.java);
  }
  if (match(["css", "styling", "flexbox", "grid layout", "responsive design"])) {
    return formatRoadmap(curatedRoadmaps.css);
  }
  if (match(["frontend", "front-end", "html", "javascript", "react", "tailwind", "material-ui"])) {
    return formatRoadmap(curatedRoadmaps.frontend);
  }
  if (match(["backend", "back-end", "node.js", "node", "express", "rest api", "nosql", "auth"])) {
    return formatRoadmap(curatedRoadmaps.backend);
  }
  if (match(["python"])) return formatRoadmap(curatedRoadmaps.python);
  if (match(["machine learning", " ml ", " ml", "ml ", "deep learning", "pytorch", "tensorflow", " ai"])) {
    return formatRoadmap(curatedRoadmaps.ml);
  }
  if (match(["iot", "internet of things", "esp32", "sensor", "arduino"])) {
    return formatRoadmap(curatedRoadmaps.iot);
  }
  if (match(["git", "github", "version control", "pull request", "open source"])) {
    return formatRoadmap(curatedRoadmaps.git);
  }
  if (match(["cloud", "deploy", "docker", "ci/cd", "vercel", "netlify", "aws"])) {
    return formatRoadmap(curatedRoadmaps.cloud);
  }
  if (match(["girl", "woman", "women", "female", "diversity", "sister"])) {
    return formatGirlsResources();
  }
  return null;
}

function formatRoadmap(roadmap: (typeof curatedRoadmaps)["dsa"]): string {
  let text = `[Roadmap] ${roadmap.title}\n\n`;
  text += `${roadmap.summary || "Here is a step-by-step path to grow in this area:"}\n\n`;
  roadmap.steps.forEach((step, index) => {
    text += `${index + 1}. ${step}\n`;
  });
  if (roadmap.links.length) {
    text += `\nHelpful links:\n`;
    roadmap.links.forEach((link) => {
      text += `• ${link.name}: ${link.url}\n`;
    });
  }
  return finish(text);
}

function formatGirlsResources(): string {
  let text = `[Community] Girls in tech resources\n\n`;
  text += `Programs, scholarships, and communities picked for you:\n\n`;
  girlsInTechResources.forEach((res, index) => {
    text += `${index + 1}. [${res.category}] ${res.title} — ${res.description}\n`;
  });
  return finish(text);
}

function searchAll(query: string): SearchHit[] {
  const results: SearchHit[] = [];

  const add = <T,>(
    items: T[],
    category: string,
    getFields: (item: T) => { title: string; desc: string; link?: string },
  ) => {
    for (const item of items) {
      const fields = getFields(item);
      const score = scoreText(`${fields.title} ${fields.desc} ${category}`, query);
      if (score > 0) {
        results.push({ category, title: fields.title, description: fields.desc, link: fields.link, score });
      }
    }
  };

  add(scholarships, "Scholarship", (s) => ({
    title: s.title,
    desc: `${s.provider || ""} ${s.benefit || ""} ${s.eligibility || ""} ${s.openDate || ""}`,
    link: s.link,
  }));
  add(realEvents, "Event", (e) => ({
    title: e.title,
    desc: `${e.summary || ""} ${e.speakerName || ""} ${e.date || ""}`,
    link: e.youtubeLink || e.registrationLink,
  }));
  add(initiatives, "Mentorship", (i) => ({
    title: i.name,
    desc: `${i.tagline || ""} ${i.description || ""}`,
    link: i.url,
  }));
  add(hackathons, "Hackathon", (h) => ({
    title: h.name,
    desc: `${h.organisedBy || ""} ${h.benefit || ""} ${h.openDate || ""}`,
    link: h.link,
  }));
  add(programs, "Program", (p) => ({
    title: p.title,
    desc: `${p.author ? `By ${p.author}` : ""} ${p.description || ""}`,
    link: p.link,
  }));
  add(books, "Resource", (b) => ({
    title: b.title,
    desc: `${b.author ? `By ${b.author}` : ""} ${b.description || ""}`,
    link: b.link,
  }));
  add(communities, "Community", (c) => ({
    title: c.title,
    desc: c.description || "",
    link: c.link,
  }));
  add(courses, "Course", (c) => ({
    title: c.title,
    desc: `${c.author ? `By ${c.author}` : ""} ${c.description || ""}`,
    link: c.link,
  }));
  add(tools, "Tool", (t) => ({
    title: t.title,
    desc: t.description || "",
    link: t.link,
  }));
  add(roadmaps, "Roadmap", (r) => ({
    title: r.title,
    desc: r.description || "",
    link: r.link,
  }));
  add(interviewPrep, "Resource", (ip) => ({
    title: ip.title,
    desc: ip.description || "",
    link: ip.link,
  }));
  add(certifications, "Resource", (c) => ({
    title: c.title,
    desc: c.description || "",
    link: c.link,
  }));
  add(articles, "Resource", (a) => ({
    title: a.title,
    desc: `${a.author ? `By ${a.author}` : ""} ${a.description || ""}`,
    link: a.link,
  }));
  add(videos, "Resource", (v) => ({
    title: v.title,
    desc: v.description || "",
    link: v.link,
  }));
  add(roleModels, "Role Model", (r) => ({
    title: r.name,
    desc: `${r.domain} ${r.summary} ${r.role || ""} ${r.company || ""}`,
  }));

  return results.sort((a, b) => b.score - a.score);
}

function formatSearchResults(results: SearchHit[], query: string): string {
  if (!results.length) return NO_DATA;

  let text = `Here is what I found for "${query}":\n\n`;
  results.slice(0, 5).forEach((res, index) => {
    const desc = stripEmDash(res.description || "")
      .split(/(?<=[.!?])\s+/)
      .slice(0, 2)
      .join(" ");
    const linkPart = res.link ? ` More: ${res.link}` : "";
    text += `${index + 1}. [${res.category}] ${res.title} — ${desc || "See details on our site."}${linkPart}\n`;
  });
  return finish(text);
}

export async function handleChatRequest(body: ChatRequestBody): Promise<ChatResult> {
  const cleanedQuery = (body.query || "").toString().trim();
  if (!cleanedQuery) {
    return { error: "Query is required." };
  }

  const curated = matchCuratedResource(cleanedQuery);
  if (curated) {
    return { query: cleanedQuery, text: curated };
  }

  const intent = detectCategoryIntent(cleanedQuery);
  const intentOnly =
    intent &&
    cleanedQuery.split(/\s+/).length <= 4 &&
    !["google", "python", "java", "react"].some((w) => cleanedQuery.toLowerCase().includes(w));

  if (intentOnly) {
    const intentText = handleCategoryIntent(intent);
    if (intentText) {
      return { query: cleanedQuery, text: intentText };
    }
  }

  const matches = searchAll(cleanedQuery);
  const text =
    matches.length > 0
      ? formatSearchResults(matches, cleanedQuery)
      : handleCategoryIntent(intent) || NO_DATA;

  return { query: cleanedQuery, text };
}
