import { createFileRoute } from "@tanstack/react-router";
import { ResourceList } from "@/components/site/ResourceList";
import { tools } from "@/data/resources";

export const Route = createFileRoute("/resources/tools")({
  head: () => ({ meta: [{ title: "Tools — Girls Leading Tech" }, { name: "description", content: "Productivity, AI, design and dev tools to make your life easier." }] }),
  component: () => (
    <ResourceList
      category="Tools"
      title="The stack we swear by."
      description="Productivity, AI, design and dev tools we recommend to every builder in our community."
      items={tools}
    />
  ),
});
