import { createFileRoute } from "@tanstack/react-router";
import { ResourceList } from "@/components/site/ResourceList";
import { programs } from "@/data/resources";

export const Route = createFileRoute("/resources/programs")({
  head: () => ({ meta: [{ title: "Programs — Girls Leading Tech" }, { name: "description", content: "Fellowships, cohorts and structured programs for women in tech." }] }),
  component: () => (
    <ResourceList
      category="Programs"
      title="Programs to apply to."
      description="Fellowships, cohorts and structured programs that have launched careers for women in tech."
      items={programs}
    />
  ),
});
