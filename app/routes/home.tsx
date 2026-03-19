import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { format, isSameDay, isSameYear } from "date-fns";
import { LockIcon, XIcon } from "lucide-react";
import qs from "qs";
import { useRef } from "react";
import { NavLink, useSearchParams } from "react-router";
import * as v from "valibot";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { EVENTS_PAGE_SIZE } from "~/lib/config";
import {
  fetchCategories,
  fetchEvents,
  fetchLastAddedEvents,
  type Event,
  type Period,
} from "~/lib/events.server";
import { getSession } from "~/lib/session.server";
import { uploadUrl } from "~/lib/utils";

import type { Route } from "./+types/home";

const pageSchema = v.nullish(v.pipe(v.string(), v.toNumber(), v.minValue(1)), "1");

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  const token = session.get("jwt");

  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const page = v.parse(pageSchema, params.get("page"));

  const events = await fetchEvents({ token, page });
  const lastAddedEvents = await fetchLastAddedEvents({ token });
  const categories = await fetchCategories();

  return { events, lastAddedEvents, categories };
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

function displayPeriod(period: Period) {
  const now = new Date();
  const [start, end] = period;

  if (isSameDay(start, end)) {
    if (isSameDay(start, now)) {
      return "Aujourd'hui";
    }
    if (isSameYear(start, now)) {
      return format(start, "d MMMM");
    }
    if (isSameYear(start, now) && isSameYear(end, now)) {
      return format(start, "d MMMM");
    }
    return format(start, "d MMMM yyyy");
  }

  if (isSameYear(start, now) && isSameYear(end, now)) {
    return `${format(start, "d MMMM")} - ${format(end, "d MMMM")}`;
  }

  return `${format(start, "d/MM/yyyy")} - ${format(end, "d/MM/yyyy")}`;
}

const title = "Agenda Chrétien - Les rendez-vous chrétiens à Lyon et sa région";

const description =
  "Agenda Chrétien rassemble les événements organisés par les églises et associations chrétiennes de la région lyonnaise pour favoriser visibilité, communion et témoignage.";

function Meta() {
  const [searchParams] = useSearchParams();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const page = v.parse(pageSchema, searchParams.get("page"));

  const currentUrl = page === 1 ? baseUrl : `${baseUrl}/?page=${page}`;
  const prevUrl = page > 2 ? `${baseUrl}/?page=${page - 1}` : page === 2 ? baseUrl : undefined;
  const nextUrl = `${baseUrl}/?page=${page + 1}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:image" content={`${baseUrl}/og-image.png`} />
      <meta property="x:image" content={`${baseUrl}/og-image.png`} />
      <link rel="canonical" href={currentUrl} />
      <link rel="next" href={nextUrl} />
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {page > 1 && <meta name="robots" content="noindex, follow" />}
    </>
  );
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
  categoryId,
  initialData,
  onFiltersReset,
}: {
  period: Period | undefined;
  categoryId: string | undefined;
  initialData: Route.ComponentProps["loaderData"]["events"];
  onFiltersReset: () => void;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["events", period, categoryId],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `/api/events?${qs.stringify({ page: pageParam, period, categoryId })}`,
      );
      return (await res.json()) as Event[];
    },
    initialPageParam: 1,
    initialData:
      period || categoryId
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
        <span>Aucun événement</span>

        <Button variant="default" onClick={onFiltersReset}>
          Effacer tous les filtres
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
  categoryId: string | undefined;
  setPeriod: (period: Period | undefined) => void;
  setCategoryId: (categoryId: string | undefined) => void;
}

const useStore = create<State>()((set) => ({
  period: undefined,
  categoryId: undefined,
  setPeriod: (period) => set({ period }),
  setCategoryId: (categoryId) => set({ categoryId }),
}));

export default function Home({ loaderData }: Route.ComponentProps) {
  const period = useStore((state) => state.period);
  const setPeriod = useStore((state) => state.setPeriod);
  const categoryId = useStore((state) => state.categoryId);
  const setCategoryId = useStore((state) => state.setCategoryId);
  const { lastAddedEvents, categories } = loaderData;
  const eventsAnchorRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Meta />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-8 px-4 py-12 md:py-20">
        <h1 className="text-3xl/snug font-extralight sm:text-5xl/snug">
          L'agenda des
          <br />
          rendez-vous chrétiens
          <br />à Lyon et sa région.
        </h1>
        <Button
          size="xl"
          variant="outline-primary"
          onClick={() => eventsAnchorRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          Voir les événements
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 sm:gap-14">
        <div>
          <h2 className="mb-8 text-lg">Ajoutés récemment</h2>
          <LastAddedEvents events={lastAddedEvents} />
          <div ref={eventsAnchorRef} />
        </div>

        <Separator />

        <div className="space-y-8">
          <h2 className="text-lg">Événements</h2>
          <Calendar period={period} onChange={setPeriod} />

          <div className="flex gap-2">
            <Select
              value={categoryId}
              itemToStringLabel={(id) =>
                categories.find((category) => category.documentId === id)?.name ?? ""
              }
              onValueChange={(value) => {
                setCategoryId(value ?? undefined);
              }}
            >
              <SelectTrigger size="sm" className={clsx(categoryId && "border-primary")}>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent side="left">
                <SelectItem value={undefined}>Toutes</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.documentId} value={category.documentId}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {period && (
              <Button size="sm" variant="outline-primary" onClick={() => setPeriod(undefined)}>
                {displayPeriod(period)}
                <XIcon />
              </Button>
            )}
          </div>

          <Events
            period={period}
            categoryId={categoryId}
            initialData={loaderData.events}
            onFiltersReset={() => {
              setPeriod(undefined);
              setCategoryId(undefined);
            }}
          />
        </div>
      </div>
      {/* <Halo /> */}
    </>
  );
}
