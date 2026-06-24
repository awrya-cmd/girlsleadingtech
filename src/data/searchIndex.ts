import { scholarships } from "./scholarships";
import { hackathons } from "./hackathons";
import { roleModels } from "./role-models";
import { peopleToFollow } from "./community";
import {
  books,
  communities,
  programs,
  courses,
  tools,
  articles,
  videos,
  roadmaps,
  interviewPrep,
  certifications,
} from "./resources";

export interface UnifiedResource {
  id: string;
  title: string;
  description: string;
  author?: string;
  link?: string;
  categoryName: string;
  categorySlug: string;
  keywords: string[];
}

export const allResources: UnifiedResource[] = [
  // 1. Scholarships
  ...scholarships.map((s) => ({
    id: s.id,
    title: s.title,
    description: `${s.benefit} | Eligibility: ${s.eligibility} | Opens: ${s.openDate}`,
    author: s.provider,
    link: s.link,
    categoryName: "Scholarships",
    categorySlug: "scholarships",
    keywords: s.keywords || [],
  })),

  // 2. Hackathons
  ...hackathons.map((h) => ({
    id: h.id,
    title: h.name,
    description: `${h.benefit} | Eligibility: ${h.eligibility} | Duration: ${h.duration} | Opens: ${h.openDate}`,
    author: h.organisedBy,
    link: h.link,
    categoryName: "Hackathons",
    categorySlug: "hackathons",
    keywords: h.keywords || [],
  })),

  // 3. Role Models
  ...roleModels.map((rm) => ({
    id: rm.id,
    title: rm.name,
    description: `${rm.summary || ""} ${rm.role ? `| Role: ${rm.role}` : ""} ${rm.location ? `| Location: ${rm.location}` : ""}`.trim(),
    author: rm.company || "",
    link: rm.linkedin || rm.twitter || rm.portfolio || rm.instagram,
    categoryName: "Role Models",
    categorySlug: "role-models",
    keywords: (rm as any).keywords || [],
  })),

  // 4. People to Follow
  ...peopleToFollow.map((p) => ({
    id: p.id,
    title: p.name,
    description: p.summary || "",
    author: p.domain,
    link: p.linkedin || p.twitter || p.portfolio || p.instagram,
    categoryName: "People to Follow",
    categorySlug: "people",
    keywords: (p as any).keywords || [],
  })),

  // 5. Programs
  ...programs.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description || "",
    author: r.author || "",
    link: r.link,
    categoryName: "Programs",
    categorySlug: "programs",
    keywords: r.keywords || [],
  })),

  // 6. Courses
  ...courses.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description || "",
    author: r.author || "",
    link: r.link,
    categoryName: "Courses",
    categorySlug: "courses",
    keywords: r.keywords || [],
  })),

  // 7. Tools
  ...tools.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description || "",
    author: r.author || "",
    link: r.link,
    categoryName: "Tools",
    categorySlug: "tools",
    keywords: r.keywords || [],
  })),

  // 8. Articles
  ...articles.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description || "",
    author: r.author || "",
    link: r.link,
    categoryName: "Articles",
    categorySlug: "articles",
    keywords: r.keywords || [],
  })),

  // 9. Videos
  ...videos.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description || "",
    author: r.author || "",
    link: r.link,
    categoryName: "Videos",
    categorySlug: "videos",
    keywords: r.keywords || [],
  })),

  // 10. Books
  ...books.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description || "",
    author: r.author || "",
    link: r.link,
    categoryName: "Books",
    categorySlug: "books",
    keywords: r.keywords || [],
  })),

  // 11. Communities
  ...communities.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description || "",
    author: r.author || "",
    link: r.link,
    categoryName: "Communities",
    categorySlug: "communities",
    keywords: r.keywords || [],
  })),

  // 12. Roadmaps
  ...roadmaps.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description || "",
    author: r.author || "",
    link: r.link,
    categoryName: "Roadmaps",
    categorySlug: "roadmaps",
    keywords: r.keywords || [],
  })),

  // 13. Interview Prep
  ...interviewPrep.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description || "",
    author: r.author || "",
    link: r.link,
    categoryName: "Interview Prep",
    categorySlug: "interview-prep",
    keywords: r.keywords || [],
  })),

  // 14. Certifications
  ...certifications.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description || "",
    author: r.author || "",
    link: r.link,
    categoryName: "Certifications",
    categorySlug: "certifications",
    keywords: r.keywords || [],
  })),
];
