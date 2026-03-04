import { data } from "react-router";

import { destroySession, getSession } from "~/lib/session.server";

import type { Route } from "./+types/auth.logout";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request);

  return data({ ok: true }, { headers: { "Set-Cookie": await destroySession(session) } });
}
