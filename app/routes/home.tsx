import { useState } from "react";
import { Link } from "react-router";

import { Brand } from "~/components/brand";
import Calendar from "~/components/calendar";
import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";
import client from "~/lib/client";
import { uploadUrl } from "~/lib/utils";

import type { Route } from "./+types/home";

export function meta() {
  return [
    { title: "Agenda Chrétien" },
    {
      name: "description",
      content: "Les rendez-vous chrétiens à ne pas manquer dans votre ville.",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      rel: "icon",
      href: "favicon-light-16x16.png",
      sizes: "16x16",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      href: "favicon-light-32x32.png",
      sizes: "32x32",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      href: "favicon-dark-16x16.png",
      sizes: "16x16",
      media: "(prefers-color-scheme: dark)",
    },
    {
      rel: "icon",
      href: "favicon-dark-32x32.png",
      sizes: "32x32",
      media: "(prefers-color-scheme: dark)",
    },
  ];
}

export async function loader() {
  const { data } = await client.GET("/events", {
    params: {
      query: {
        populate: "*",
        pagination: {
          page: 1,
          pageSize: 12,
        },
      },
    },
  });

  return { events: data?.data ?? [] };
}

type Event = Route.ComponentProps["loaderData"]["events"][number];

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
    const value = new Date(startDate).toLocaleDateString();

    if (startTime && endTime && endTime !== startTime) {
      return `${value} ${formatTime(startTime)}-${formatTime(endTime)}`;
    }
    if (startTime) {
      return `${value} ${formatTime(startTime)}`;
    }

    return value;
  }

  return `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`;
}

export default function Home({ loaderData: { events } }: Route.ComponentProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="sticky top-0 z-10 mx-auto my-2 flex h-16 w-full max-w-5xl items-center justify-between px-4 backdrop-blur-sm">
        <div className="relative flex items-center gap-4">
          <Link to="/" className="absolute inset-0" aria-label="Retour à la page d'accueil" />
          <Logo className="h-10 fill-primary-8 dark:fill-neutral-12" />
          <div className="flex flex-col items-start">
            <Brand className="h-5 fill-primary-8 dark:fill-neutral-12" />
            <div className="mt-1 rounded-full rounded-tl-none bg-primary-6 px-1.5 text-xs text-trim-both font-black text-background uppercase dark:bg-primary-8">
              Lyon
            </div>
          </div>
        </div>

        <Button size="sm" variant="outline">
          Proposer un événement
        </Button>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-4">
        <Calendar current={currentDate} onChange={setCurrentDate} />

        <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col gap-4">
              {event.picture && (
                <img
                  src={uploadUrl(event.picture.url)}
                  alt={event.title}
                  className="aspect-video w-full rounded-lg object-cover"
                />
              )}
              <div className="flex flex-col gap-1">
                <div>{event.title}</div>
                <div className="text-sm text-muted-foreground">{displayDate(event)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
