import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import client from "~/lib/client";
import { uploadUrl } from "~/lib/utils";

import type { Route } from "./+types/event";

export async function loader({ params }: Route.LoaderArgs) {
  const { data } = await client.GET("/events/{id}", {
    params: {
      path: { id: params.eventId },
      query: {
        populate: "*",
      },
    },
  });

  if (!data?.data) {
    throw new Response("Not found", { status: 404 });
  }

  return { event: data.data };
}

export default function Event({ loaderData: { event } }: Route.ComponentProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-start justify-start gap-12 px-4">
      <img
        src={uploadUrl(event.picture.url)}
        className="h-56 w-full rounded-lg object-cover object-center"
        style={{ viewTransitionName: "event-picture" }}
      />
      <div className="prose prose-neutral">
        <h1 style={{ viewTransitionName: "event-title" }}>{event.title}</h1>

        <div className="opacity-100 transition-[opacity,translate] delay-500 starting:translate-y-2 starting:opacity-0">
          <BlocksRenderer content={event.description as any} />
        </div>
      </div>
    </div>
  );
}
