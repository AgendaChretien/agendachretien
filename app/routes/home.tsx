import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { NavLink } from "react-router";
import { create } from "zustand";

import halo from "~/assets/halo.png";
import Calendar from "~/components/calendar";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Separator } from "~/components/ui/separator";
import client from "~/lib/client";
import { uploadUrl } from "~/lib/utils";

import type { Route } from "./+types/home";
import Event from "./event";

type Event = Awaited<ReturnType<typeof fetchEvents>>[number];

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
        populate: "picture",
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
      <img
        src={uploadUrl(event.picture?.url)}
        alt={event.title}
        className="aspect-video w-full rounded-lg object-cover"
        data-event-picture
      />
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
      <div className="flex flex-col items-center gap-4 py-12 text-center">
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
        <div className="flex justify-center py-8">
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
  );
}

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
  const eventsAnchorRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  const haloY = useTransform(scrollYProgress, [0, 0.3], ["-40%", "-70%"], { clamp: true });

  return (
    <>
      <title>Agenda Chrétien</title>

      <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-8 px-4 py-12 md:py-20">
        <div className="text-3xl/snug font-extralight sm:text-5xl/snug">
          L'agenda des
          <br />
          événements chrétiens
          <br />
          de la région de Lyon.
        </div>
        <Button
          size="xl"
          variant="outline"
          onClick={() => eventsAnchorRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          Explorer maintenant
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-14 px-4">
        <div className="space-y-8">
          <h2 className="text-lg">Ajoutés récemment</h2>
          <LastAddedEvents events={lastAddedEvents} />
          <div ref={eventsAnchorRef} />
        </div>

        <Separator />

        <div className="space-y-8">
          <h2 className="text-lg">Évènements</h2>
          <Calendar period={period} onChange={setPeriod} />
          <Events
            period={period}
            initialData={loaderData.events}
            onPeriodReset={() => setPeriod(undefined)}
          />
        </div>
      </div>

      <motion.img
        src={halo}
        alt="Halo"
        className="pointer-events-none fixed top-0 left-1/2 -z-10 w-[min(200vw,2000px)] max-w-none -translate-x-1/2"
        style={{ y: haloY }}
      />
    </>
  );
}
