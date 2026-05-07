import { TZDate } from "@date-fns/tz";
import ics, { type EventAttributes } from "ics";

import client from "~/lib/client.server";
import { formatToText } from "~/lib/rich-text";

import type { Route } from "./+types/event.ics";

function sanitizeFilename(input: string): string {
  const charMap: Record<string, string> = {
    à: "a",
    á: "a",
    â: "a",
    ä: "a",
    ã: "a",
    è: "e",
    é: "e",
    ê: "e",
    ë: "e",
    ì: "i",
    í: "i",
    î: "i",
    ï: "i",
    ò: "o",
    ó: "o",
    ô: "o",
    ö: "o",
    õ: "o",
    ù: "u",
    ú: "u",
    û: "u",
    ü: "u",
    ñ: "n",
    ç: "c",
    œ: "oe",
    æ: "ae",
  };

  let cleaned = input.toLowerCase();

  // Replace special characters with their ASCII equivalents
  cleaned = cleaned.replace(/./g, (char) => charMap[char] || char);

  // Remove diacritics (backup for characters not in the map)
  cleaned = cleaned.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");

  // Keep only ASCII letters, numbers, spaces, hyphens, dots
  cleaned = cleaned.replace(/[^a-z0-9\s\-.]/g, "");

  // Trim and replace spaces with underscores
  cleaned = cleaned.trim().replace(/\s+/g, "_");

  return cleaned || "event";
}

function getDateTime(date: string, time?: string): Date {
  const dateTimeString = time ? `${date}T${time}` : date;
  return new TZDate(dateTimeString);
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

  const startDate = getDateTime(event.startDate, event.startTime);
  const endDate = getDateTime(event.endDate ? event.endDate : event.startDate, event.endTime);

  const start = [startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, startDate.getUTCDate()];
  const end = [endDate.getUTCFullYear(), endDate.getUTCMonth() + 1, endDate.getUTCDate()];

  if (event.startTime && event.endTime) {
    start.push(startDate.getUTCHours(), startDate.getUTCMinutes());
    end.push(endDate.getUTCHours(), endDate.getUTCMinutes());
  }

  const icsData: EventAttributes = {
    uid: `event-${event.documentId}@agendachretien.fr`,
    title: event.title.trim(),
    description: formatToText(event.description).trim(),
    start: start as [number, number, number],
    startInputType: "utc",
    end: end as [number, number, number],
    endInputType: "utc",
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
