import { createFileRoute } from "@tanstack/react-router";
import { ResourceList } from "@/components/site/ResourceList";
import { certifications } from "@/data/resources";

export const Route = createFileRoute("/resources/certifications")({
  head: () => ({ meta: [{ title: "Certifications — Girls Leading Tech" }, { name: "description", content: "Validate your skills with these industry-recognised certifications." }] }),
  component: () => (
    <ResourceList
      category="Certifications"
      title="Validate your skills."
      description="Industry-recognised certifications that hiring managers actually look for."
      items={certifications}
    />
  ),
});
