import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { ExternalLink } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import client from "~/lib/client";
import { uploadUrl } from "~/lib/utils";

import type { Route } from "./+types/event";

function formatTime(time: string) {
  const [hours, minutes] = time.split(":");
  if (Number(minutes) === 0) {
    return `${hours}h`;
  }
  return `${hours}h${minutes}`;
}

function displayDate(event: Route.ComponentProps["loaderData"]["event"]) {
  const { startDate, endDate, startTime, endTime } = event;

  if (!endDate || startDate === endDate) {
    const value = new Date(startDate).toLocaleDateString("fr-FR");

    if (startTime && endTime && endTime !== startTime) {
      return `${value} ${formatTime(startTime)}-${formatTime(endTime)}`;
    }
    if (startTime) {
      return `${value} ${formatTime(startTime)}`;
    }

    return value;
  }

  return `Du ${new Date(startDate).toLocaleDateString("fr-FR")} au ${new Date(endDate).toLocaleDateString("fr-FR")}`;
}

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
      <title>{event.title}</title>
      <meta property="og:title" content={event.title} />
      <meta
        property="og:description"
        content={event.description.map((block) => block.content).join(" ")}
      />
      <meta property="og:image" content={uploadUrl(event.picture.url)} />
      <meta property="og:type" content="event" />

      <img
        src={uploadUrl(event.picture.url)}
        className="aspect-16/7 w-full rounded-lg object-cover object-center"
        style={{ viewTransitionName: "event-picture" }}
      />
      <div className="grid w-full grid-cols-1 grid-rows-[auto_1fr] gap-8 md:grid-cols-[1fr_1px_300px]">
        <div className="prose prose-neutral max-sm:prose-sm">
          <h1 style={{ viewTransitionName: "event-title" }}>{event.title}</h1>
        </div>

        <Separator orientation="vertical" className="row-span-2 hidden md:block" />
        <Separator className="block md:hidden" />

        <div className="@container row-span-2">
          <div className="grid gap-6 md:sticky md:top-[calc(var(--header-height)+1rem)] @md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-muted-foreground">Date</div>
              <div>{displayDate(event)}</div>
            </div>

            {event.address && (
              <div className="space-y-2">
                <div className="text-muted-foreground">Adresse</div>
                <div>{event.address}</div>
                <Button
                  variant="secondary"
                  render={
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  Google Maps <ExternalLink className="h-4" />
                </Button>
              </div>
            )}

            {event.email && (
              <div className="space-y-2">
                <div className="text-muted-foreground">Email</div>
                <div className="max-w-full truncate">
                  <a className="underline" href={`mailto:${event.email}`} title={event.email}>
                    {event.email}
                  </a>
                </div>
              </div>
            )}

            {event.phone && (
              <div className="space-y-2">
                <div className="text-muted-foreground">Téléphone</div>
                <div className="max-w-full truncate">
                  <a className="underline" href={`tel:${event.phone}`}>
                    {event.phone}
                  </a>
                </div>
              </div>
            )}

            {event.url && (
              <div className="space-y-2">
                <div className="text-muted-foreground">Site internet</div>
                {event.url && (
                  <Button
                    variant="secondary"
                    render={
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      />
                    }
                  >
                    Ouvrir <ExternalLink className="h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        <Separator className="block md:hidden" />

        <div className="prose opacity-100 transition-[opacity,translate] delay-500 prose-neutral starting:translate-y-2 starting:opacity-0">
          <BlocksRenderer content={event.description as any} />
        </div>
      </div>
    </div>
  );
}
