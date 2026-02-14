import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink } from "react-router";

import Calendar from "~/components/calendar";
import { Button } from "~/components/ui/button";
import client from "~/lib/client";
import { uploadUrl } from "~/lib/utils";

import type { Route } from "./+types/home";

const PAGE_SIZE = 12;

type Event = Route.ComponentProps["loaderData"]["events"][number];

async function fetchEvents(page: number) {
  const { data } = await client.GET("/events", {
    params: {
      query: {
        populate: "*",
        sort: "startDate",
        pagination: {
          page,
          pageSize: PAGE_SIZE,
        },
      },
    },
  });
  return data?.data ?? [];
}

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
  const events = await fetchEvents(1);
  return { events };
}

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

  return `${new Date(startDate).toLocaleDateString("fr-FR")} - ${new Date(endDate).toLocaleDateString("fr-FR")}`;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: ({ pageParam }) => fetchEvents(pageParam as number),
    initialPageParam: 1,
    initialData: {
      pages: [loaderData.events],
      pageParams: [1],
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === PAGE_SIZE ? (lastPageParam as number) + 1 : undefined,
  });

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4">
      <Calendar current={currentDate} onChange={setCurrentDate} />

      <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3">
        {data.pages.map((page) =>
          page.map((event) => (
            <NavLink
              to={`/events/${event.documentId}`}
              key={event.id}
              className="relative flex flex-col gap-4"
              viewTransition
            >
              {event.picture && (
                <img
                  src={uploadUrl(event.picture.url)}
                  alt={event.title}
                  className="h-34 w-full rounded-lg object-cover"
                  data-event-picture
                />
              )}
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex-1" data-event-title>
                  {event.title}
                </div>
                <div className="text-sm text-muted-foreground">{displayDate(event)}</div>
              </div>
            </NavLink>
          )),
        )}
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Chargement..." : "Charger plus"}
          </Button>
        </div>
      )}
    </div>
  );
}
