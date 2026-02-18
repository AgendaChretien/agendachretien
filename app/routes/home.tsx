import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";

import Calendar from "~/components/calendar";
import { Button } from "~/components/ui/button";
import client from "~/lib/client";
import { uploadUrl } from "~/lib/utils";

import type { Route } from "./+types/home";

import Event from "./event";

type Event = Route.ComponentProps["loaderData"]["events"][number];

type Period = [Date, Date];

const PAGE_SIZE = 12;

async function fetchLastAddedEvents() {
  const { data } = await client.GET("/events", {
    params: {
      query: {
        populate: "*",
        sort: { createdAt: "desc" },
        pagination: {
          page: 1,
          pageSize: 6,
        },
      },
    },
  });

  return data?.data ?? [];
}

async function fetchEvents({ page, period }: { page: number; period?: Period }) {
  const filters: Record<string, any> = {};

  if (period) {
    filters["startDate"] = {
      $lte: period[1].toISOString(),
    };
    filters["endDate"] = {
      $gte: period[0].toISOString(),
    };
  }

  const { data } = await client.GET("/events", {
    params: {
      query: {
        populate: "*",
        sort: { startDate: "asc" },
        filters,
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
  const events = await fetchEvents({ page: 1 });
  const lastAddedEvents = await fetchLastAddedEvents();
  return { events, lastAddedEvents };
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

function EventCard({ event }: { event: Event }) {
  return (
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
      <div className="flex flex-col gap-1">
        <div className="flex-1" data-event-title>
          {event.title}
        </div>
        <div className="text-sm text-muted-foreground">{displayDate(event)}</div>
      </div>
    </NavLink>
  );
}

function Events({
  period,
  initialData,
  onPeriodReset,
}: {
  period: Period | undefined;
  initialData: Route.ComponentProps["loaderData"]["events"];
  onPeriodReset: () => void;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["events", period],
    queryFn: ({ pageParam }) => fetchEvents({ page: pageParam, period }),
    initialPageParam: 1,
    initialData: period
      ? undefined
      : {
          pages: [initialData],
          pageParams: [1],
        },
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === PAGE_SIZE ? lastPageParam + 1 : undefined,
  });

  if (data?.pages[0]?.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span>Aucun événement pour cette période.</span>

        <Button variant="default" onClick={onPeriodReset}>
          Effacer la période
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3 md:gap-y-12">
        {data.pages.map((page) => page.map((event) => <EventCard key={event.id} event={event} />))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Chargement..." : "Charger plus"}
          </Button>
        </div>
      )}
    </>
  );
}

function LastAddedEvents({ events }: { events: Event[] }) {
  return (
    <div className="space-y-8">
      <h2 className="text-lg">Ajoutés récemment</h2>

      <Carousel>
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem key={event.id} className="basis-1/1 min-[480px]:basis-1/2 md:basis-1/3">
              <EventCard event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="max-lg:hidden" />
        <CarouselNext className="max-lg:hidden" />
      </Carousel>
    </div>
  );
}

import { create } from "zustand";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Separator } from "~/components/ui/separator";

interface State {
  period: Period | undefined;
  setPeriod: (period: Period | undefined) => void;
}

const useStore = create<State>()((set) => ({
  period: undefined,
  setPeriod: (period) => set({ period }),
}));

export default function Home({ loaderData }: Route.ComponentProps) {
  const period = useStore((state) => state.period);
  const setPeriod = useStore((state) => state.setPeriod);
  const { lastAddedEvents } = loaderData;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-14 px-4">
      <title>Agenda Chrétien</title>
      <LastAddedEvents events={lastAddedEvents} />
      <Separator />
      <Calendar period={period} onChange={setPeriod} />
      <Events
        period={period}
        initialData={loaderData.events}
        onPeriodReset={() => setPeriod(undefined)}
      />
    </div>
  );
}
