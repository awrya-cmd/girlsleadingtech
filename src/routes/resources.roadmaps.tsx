import { createFileRoute } from "@tanstack/react-router";
import { ResourceList } from "@/components/site/ResourceList";
import { roadmaps } from "@/data/resources";

export const Route = createFileRoute("/resources/roadmaps")({
  head: () => ({ meta: [{ title: "Roadmaps — Girls Leading Tech" }, { name: "description", content: "Visual roadmaps for every tech career path." }] }),
  component: () => (
    <ResourceList
      category="Roadmaps"
      title="Career playbooks."
      description="Step-by-step visual paths for every role in tech — frontend, AI, product, design and more."
      items={roadmaps}
    />
  ),
});
