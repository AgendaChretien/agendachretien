import qs from "qs";
import * as v from "valibot";

import { fetchEvents } from "~/lib/events.server";
import { getSession } from "~/lib/session.server";

import type { Route } from "./+types/api.events";

const paramsSchema = v.object({
  page: v.optional(v.pipe(v.string(), v.toNumber()), "1"),
  period: v.optional(v.tuple([v.pipe(v.string(), v.toDate()), v.pipe(v.string(), v.toDate())])),
});

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  const token = session.get("jwt");

  const url = new URL(request.url);
  const params = qs.parse(url.searchParams.toString());

  const { issues, output, success } = v.safeParse(paramsSchema, params);

  if (!success) {
    console.error("Failed to validate query parameters:", issues);
    return new Response("Invalid query parameters", { status: 400 });
  }

  const events = await fetchEvents({ token, ...output });

  return events;
}
