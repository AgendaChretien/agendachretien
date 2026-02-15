import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { AtSign, ExternalLink, Phone } from "lucide-react";

import { Button } from "~/components/ui/button";
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
      <img
        src={uploadUrl(event.picture.url)}
        className="h-56 w-full rounded-lg object-cover object-center"
        style={{ viewTransitionName: "event-picture" }}
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral">
          <h1 style={{ viewTransitionName: "event-title" }}>{event.title}</h1>
        </div>

        <div className="prose opacity-100 transition-[opacity,translate] delay-500 prose-neutral md:col-start-1 md:row-start-2 starting:translate-y-2 starting:opacity-0">
          <BlocksRenderer content={event.description as any} />
        </div>
        <div className="row-start-2 md:col-start-2 md:row-start-2">
          <div className="grid gap-y-8 rounded-sm bg-muted p-4 sm:grid-cols-2 md:grid-cols-1 md:rounded-xl md:p-6">
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
      </div>
    </div>
  );
}
