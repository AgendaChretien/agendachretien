import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { google, outlook, yahoo, type CalendarEvent } from "calendar-link";
import { Calendar, Calendar1, ExternalLink, File } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import ReactPlayer from "react-player";
import { canPlay } from "react-player/patterns";
import * as v from "valibot";

import Apple from "~/components/icons/apple";
import Google from "~/components/icons/google";
import Windows from "~/components/icons/windows";
import Yahoo from "~/components/icons/yahoo";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import client from "~/lib/client";
import { formatToText } from "~/lib/rich-text";
import { uploadUrl } from "~/lib/utils";

import type { Route } from "./+types/event";

import "react-medium-image-zoom/dist/styles.css";

type Event = Route.ComponentProps["loaderData"]["event"];
type Media = NonNullable<Event["attachments"]>[number];

const calendarLinks = [
  { key: "apple", name: "Apple Calendar", icon: <Apple />, blank: false },
  { key: "google", name: "Google Calendar", icon: <Google />, blank: true },
  { key: "outlook", name: "Microsoft Outlook", icon: <Windows />, blank: true },
  { key: "yahoo", name: "Yahoo Calendar", icon: <Yahoo />, blank: true },
  { key: "other", name: "Autre", icon: <Calendar1 />, blank: false },
] as const;

type CalendarLink = (typeof calendarLinks)[number]["key"];

type CalendarUrls = Record<CalendarLink, string>;

function formatTime(time: string) {
  const [hours, minutes] = time.split(":");
  if (Number(minutes) === 0) {
    return `${hours}h`;
  }
  return `${hours}h${minutes}`;
}

function displayDate(event: Event) {
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
        populate: ["picture", "attachments"],
      },
    },
  });

  if (!data?.data) {
    throw new Response("Not found", { status: 404 });
  }

  const event = data.data;

  const calendarEvent: CalendarEvent = {
    title: event.title,
    description: formatToText(event.description),
    start: event.startDate + (event.startTime ? `T${event.startTime}` : ""),
    end: event.endDate
      ? event.endDate + (event.endTime ? `T${event.endTime}` : "")
      : event.startDate + (event.startTime ? `T${event.startTime}` : ""),
    location: event.address,
  };

  const icsLink = `/events/${event.documentId}.ics`;

  const calendarUrls: CalendarUrls = {
    apple: icsLink,
    google: google(calendarEvent),
    outlook: outlook(calendarEvent),
    yahoo: yahoo(calendarEvent),
    other: icsLink,
  };

  return { event: data.data, calendarUrls };
}

function Pictures({ pictures }: { pictures: Media[] }) {
  if (!pictures || pictures.length === 0) {
    return null;
  }

  return (
    <div className="@container space-y-6">
      <h2 className="text-lg">Images</h2>
      <div className="grid grid-cols-2 items-center justify-center gap-4 @md:grid-cols-3">
        {pictures.map((picture) => (
          <Zoom
            key={picture.id}
            classDialog="[&>div[data-rmiz-modal-overlay='visible']]:bg-background! [& [data-rmiz-btn-unzoom]]:border-border!"
          >
            <img
              src={uploadUrl(picture.url)}
              alt={picture.alternativeText || ""}
              className="mx-auto max-h-36 rounded-lg object-contain object-center"
            />
          </Zoom>
        ))}
      </div>
    </div>
  );
}

function Documents({ documents }: { documents: Media[] }) {
  if (!documents || documents.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg">Documents</h2>
      <div className="divide-y divide-border">
        {documents.map((document) => (
          <span key={document.id} className="flex items-center gap-2 py-4">
            <File />
            <a
              key={document.id}
              href={uploadUrl(document.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg underline"
            >
              {document.name}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
}

function Media({ event }: { event: Event }) {
  if (!event.attachments || event.attachments.length === 0) {
    return null;
  }

  const [pictures, documents] = event.attachments.reduce<
    [typeof event.attachments, typeof event.attachments]
  >(
    (acc, picture) => {
      if (picture.mime.startsWith("image/")) {
        acc[0].push(picture);
      } else {
        acc[1].push(picture);
      }
      return acc;
    },
    [[], []],
  );

  return (
    <>
      <Documents documents={documents} />
      <Pictures pictures={pictures} />
    </>
  );
}

const videoContentSchema = v.pipe(
  v.object({
    type: v.literal("paragraph"),
    children: v.tuple([
      v.object({ type: v.literal("text"), text: v.literal("") }),
      v.object({
        type: v.literal("link"),
        url: v.pipe(
          v.string(),
          v.url(),
          v.check((url) => Object.values(canPlay).some((fn) => fn(url))),
        ),
      }),
      v.object({ type: v.literal("text"), text: v.literal("") }),
    ]),
  }),
  v.transform((block) => block.children[1].url),
);

function Description({ event }: { event: Event }) {
  if (!event.description) {
    return null;
  }

  return (
    <div className="prose prose-neutral">
      <BlocksRenderer
        content={event.description.map((block) => {
          if (block.type !== "paragraph") {
            return block;
          }

          const { output, success } = v.safeParse(videoContentSchema, block);

          if (success) {
            return {
              type: "video",
              url: output,
              children: [],
            };
          }

          return block;
        })}
        blocks={
          {
            video: ({ url }: { url: string }) => (
              <ReactPlayer
                src={url}
                style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
              />
            ),
          } as any
        }
      />
    </div>
  );
}

function AddToCalendar({ urls }: { urls: CalendarUrls }) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="mt-auto">
            <Calendar />
            Ajouter à mon agenda
          </Button>
        }
      />

      <DialogContent className="max-w-sm!">
        <DialogHeader>
          <DialogTitle>Ajouter à mon agenda</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {calendarLinks.map((calendar) => (
            <Button
              key={calendar.key}
              variant="outline"
              size="lg"
              className="w-full"
              render={
                <a
                  href={urls[calendar.key]}
                  {...(calendar.blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                />
              }
            >
              {calendar.icon}
              {calendar.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Event({ loaderData: { event, calendarUrls } }: Route.ComponentProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-start justify-start gap-12 px-4">
      <title>{event.title}</title>
      <meta property="og:title" content={event.title} />
      {event.description && (
        <meta property="og:description" content={formatToText(event.description)} />
      )}
      {event.picture && <meta property="og:image" content={uploadUrl(event.picture.url)} />}
      <meta property="og:type" content="event" />

      <img
        src={uploadUrl(event.picture?.url)}
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
          <div className="grid gap-8 md:sticky md:top-[calc(var(--header-height)+1rem)] @md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-muted-foreground">Date</div>
              <div className="mb-4">{displayDate(event)}</div>
              <div>
                <AddToCalendar urls={calendarUrls} />
              </div>
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
                  Voir sur Google Maps <ExternalLink className="h-4" />
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

        <div className="space-y-12 space-x-6 opacity-100 transition-[opacity,translate] delay-500 starting:translate-y-2 starting:opacity-0">
          <Description event={event} />
          <Media event={event} />
        </div>
      </div>
    </div>
  );
}
