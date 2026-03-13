import ics, { type EventAttributes } from "ics";

import client from "~/lib/client.server";
import { formatToText } from "~/lib/rich-text";

import type { Route } from "./+types/event.ics";

function sanitizeFilename(input: string): string {
  const cleaned = input
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s\-.]/gu, "")
    .trim()
    .replace(/\s+/g, "_");
  return cleaned || "event";
}

export async function loader({ params }: Route.LoaderArgs) {
  const { data } = await client.GET("/events/{id}", {
    params: {
      path: { id: params.eventId },
      query: {
        populate: ["picture", "extraPictures"],
      },
    },
  });

  if (!data?.data) {
    throw new Response("Not found", { status: 404 });
  }

  const event = data.data;

  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate ?? event.startDate);

  const start = [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()];
  const end = [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()];

  if (event.startTime && event.endTime) {
    start.push(...(event.startTime.split(":").map(Number) as [number, number]));
    end.push(...(event.endTime.split(":").map(Number) as [number, number]));
  }

  const icsData: EventAttributes = {
    uid: `event-${event.documentId}@agendachretien.fr`,
    title: event.title,
    description: formatToText(event.description),
    start: start as [number, number, number],
    end: end as [number, number, number],
    url: `https://agendachretien.fr/events/${event.documentId}`,
  };

  if (event.address) {
    icsData.location = event.address;
  }

  const result = await new Promise<string>((resolve) => {
    ics.createEvent(icsData, (error, value) => {
      if (error) {
        console.log(error);
        throw new Response("Failed to generate calendar file", { status: 500 });
      } else {
        resolve(value);
      }
    });
  });

  const filename = sanitizeFilename(event.title);

  return new Response(result, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="${filename}.ics"`,
      "Cache-Control": "no-cache",
    },
  });
}
