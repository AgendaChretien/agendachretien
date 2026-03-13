import { format } from "date-fns";

import client from "./client.server";
import { EVENTS_PAGE_SIZE } from "./config";

export type Period = [Date, Date];

export type Event = Awaited<ReturnType<typeof fetchEvents>>[number];

export async function fetchEvents({
  page,
  period,
  token,
}: {
  page: number;
  period?: Period;
  token?: string;
}) {
  const filters: Record<string, any> = {};

  if (period) {
    filters["$or"] = [
      {
        startDate: {
          $gte: format(period[0], "yyyy-MM-dd"),
          $lte: format(period[1], "yyyy-MM-dd"),
        },
        endDate: {
          $null: true,
        },
      },
      {
        startDate: {
          $lte: format(period[1], "yyyy-MM-dd"),
        },
        endDate: {
          $gte: format(period[0], "yyyy-MM-dd"),
        },
      },
    ];
  } else {
    filters["$or"] = [
      {
        startDate: {
          $gte: format(new Date(), "yyyy-MM-dd"),
        },
        endDate: {
          $null: true,
        },
      },
      {
        endDate: {
          $gte: format(new Date(), "yyyy-MM-dd"),
        },
      },
    ];
  }

  const { data } = await client.GET("/events", {
    params: {
      query: {
        populate: "picture",
        sort: { startDate: "asc" },
        filters,
        pagination: {
          page,
          pageSize: EVENTS_PAGE_SIZE,
        },
      },
    },
    headers: {
      Authorization: token,
    },
  });

  return data?.data ?? [];
}

export async function fetchLastAddedEvents({ token }: { token?: string }) {
  const { data } = await client.GET("/events", {
    params: {
      query: {
        populate: "picture",
        sort: { createdAt: "desc" },
        pagination: {
          page: 1,
          pageSize: 6,
        },
      },
    },
    headers: {
      Authorization: token,
    },
  });

  return data?.data ?? [];
}
