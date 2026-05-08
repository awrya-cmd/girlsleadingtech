import { createFileRoute } from "@tanstack/react-router";
import { ResourceList } from "@/components/site/ResourceList";
import { articles } from "@/data/resources";

export const Route = createFileRoute("/resources/articles")({
  head: () => ({ meta: [{ title: "Articles — Girls Leading Tech" }, { name: "description", content: "Curated articles, essays and newsletters for women in tech." }] }),
  component: () => (
    <ResourceList
      category="Articles"
      title="Reading worth your time."
      description="Hand-picked essays, newsletters and deep dives from the sharpest minds in tech."
      items={articles}
    />
  ),
});
