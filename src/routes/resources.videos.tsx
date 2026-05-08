import { createFileRoute } from "@tanstack/react-router";
import { ResourceList } from "@/components/site/ResourceList";
import { videos } from "@/data/resources";

export const Route = createFileRoute("/resources/videos")({
  head: () => ({ meta: [{ title: "Videos — Girls Leading Tech" }, { name: "description", content: "YouTube channels, lectures and playlists worth bingeing." }] }),
  component: () => (
    <ResourceList
      category="Videos"
      title="Watch, learn, repeat."
      description="The YouTube channels, lectures and playlists every woman in tech should bookmark."
      items={videos}
    />
  ),
});
