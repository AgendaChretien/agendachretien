import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { LockIcon } from "lucide-react";
import qs from "qs";
import { useRef } from "react";
import { NavLink } from "react-router";
import { create } from "zustand";

import Calendar from "~/components/calendar";
// import { Halo } from "~/components/halo";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Separator } from "~/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { EVENTS_PAGE_SIZE } from "~/lib/config";
import { fetchEvents, fetchLastAddedEvents, type Event, type Period } from "~/lib/events.server";
import { getSession } from "~/lib/session.server";
import { uploadUrl } from "~/lib/utils";

import type { Route } from "./+types/home";

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request);
  const token = session.get("jwt");

  const events = await fetchEvents({ token, page: 1 });
  const lastAddedEvents = await fetchLastAddedEvents({ token });

  return { events, lastAddedEvents };
}

export async function action() {}

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
        loading="lazy"
      />
      <div className="flex flex-col gap-1">
        <div className="flex-1" data-event-title>
          {event.title}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">{displayDate(event)}</div>
          {event.privacyLevel > 1 && (
            <Tooltip>
              <TooltipTrigger>
                <span className="flex-center size-5 rounded-full border border-primary-5 bg-primary-1 text-primary-6 dark:bg-primary-3 dark:text-primary-8">
                  <LockIcon className="size-2.5 stroke-3" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                Cet événement n'est visible que par les utilisateurs identifés comme{" "}
                {event.privacyLevel === 2
                  ? "appartenant à une communauté chrétienne"
                  : "chrétien engagé"}
                .
              </TooltipContent>
            </Tooltip>
          )}
        </div>
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
    queryFn: async ({ pageParam }) => {
      const res = await fetch(`/api/events?${qs.stringify({ page: pageParam, period })}`);
      return (await res.json()) as Event[];
    },
    initialPageParam: 1,
    initialData: period
      ? undefined
      : {
          pages: [initialData],
          pageParams: [1],
        },
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === EVENTS_PAGE_SIZE ? lastPageParam + 1 : undefined,
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

  return (
    <>
      <title>Agenda Chrétien</title>

      <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-8 px-4 py-12 md:py-20">
        <div className="text-3xl/snug font-extralight sm:text-5xl/snug">
          L'agenda des
          <br />
          rendez-vous chrétiens
          <br />à Lyon et sa région.
        </div>
        <Button
          size="xl"
          variant="outline-primary"
          onClick={() => eventsAnchorRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          Voir les événements
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-14 px-4">
        <div>
          <h2 className="mb-8 text-lg">Ajoutés récemment</h2>
          <LastAddedEvents events={lastAddedEvents} />
          <div ref={eventsAnchorRef} />
        </div>

        <Separator />

        <div className="space-y-8">
          <h2 className="text-lg">Événements</h2>
          <Calendar period={period} onChange={setPeriod} />
          <Events
            period={period}
            initialData={loaderData.events}
            onPeriodReset={() => setPeriod(undefined)}
          />
        </div>
      </div>
      {/* <Halo /> */}
    </>
  );
}
