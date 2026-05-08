import { createFileRoute } from "@tanstack/react-router";
import { ResourceList } from "@/components/site/ResourceList";
import { books } from "@/data/resources";

export const Route = createFileRoute("/resources/books")({
  head: () => ({ meta: [{ title: "Books — Girls Leading Tech" }, { name: "description", content: "Books that shaped our community of women in tech." }] }),
  component: () => (
    <ResourceList
      category="Books"
      title="The shelf we recommend."
      description="Books that shape how we think about code, careers, leadership and life."
      items={books}
    />
  ),
});
