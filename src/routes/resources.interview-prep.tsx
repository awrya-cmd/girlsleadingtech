import { createFileRoute } from "@tanstack/react-router";
import { ResourceList } from "@/components/site/ResourceList";
import { interviewPrep } from "@/data/resources";

export const Route = createFileRoute("/resources/interview-prep")({
  head: () => ({ meta: [{ title: "Interview Prep — Girls Leading Tech" }, { name: "description", content: "Everything you need to ace your next tech interview." }] }),
  component: () => (
    <ResourceList
      category="Interview Prep"
      title="Ace the interview."
      description="DSA, system design, behavioural and mock interview platforms — your prep stack in one page."
      items={interviewPrep}
    />
  ),
});
