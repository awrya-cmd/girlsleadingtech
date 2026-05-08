import { createFileRoute } from "@tanstack/react-router";
import { ResourceList } from "@/components/site/ResourceList";
import { courses } from "@/data/resources";

export const Route = createFileRoute("/resources/courses")({
  head: () => ({ meta: [{ title: "Courses — Girls Leading Tech" }, { name: "description", content: "The best free and paid courses to level up your tech skills." }] }),
  component: () => (
    <ResourceList
      category="Courses"
      title="Curated learning paths."
      description="Free and paid courses we've vetted to help you go from beginner to job-ready."
      items={courses}
    />
  ),
});
