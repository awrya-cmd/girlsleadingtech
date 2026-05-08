import { createFileRoute } from "@tanstack/react-router";
import { ResourceList } from "@/components/site/ResourceList";
import { communities } from "@/data/resources";

export const Route = createFileRoute("/resources/communities")({
  head: () => ({ meta: [{ title: "Communities — Girls Leading Tech" }, { name: "description", content: "Find your tribe — global communities for women in tech." }] }),
  component: () => (
    <ResourceList
      category="Communities"
      title="Find your tribe."
      description="The global communities, fellowships and networks lifting women in tech."
      items={communities}
    />
  ),
});
