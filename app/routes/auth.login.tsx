import { data as json } from "react-router";
import * as v from "valibot";

import { loginFormSchema, type User } from "~/lib/auth";
import { requireHumanUser } from "~/lib/botid.server";
import client from "~/lib/client.server";
import { commitSession, getSession } from "~/lib/session.server";

import type { Route } from "./+types/auth.login";

export async function action({ request }: Route.ActionArgs) {
  // Verify the request is from a human user, not a bot
  await requireHumanUser();

  const formData = await request.formData();
  const entry = Object.fromEntries(formData);
  const { issues, output, success } = v.safeParse(loginFormSchema, entry);

  if (!success) {
    console.error("Failed to validate login form:", issues);
    return { ok: false };
  }

  const { response, data } = await client.POST("/auth/local", {
    body: {
      identifier: output.email,
      password: output.password,
    },
  });

  if (!data) {
    console.error("Failed to authenticate user:", response.statusText);
    return { ok: false };
  }

  const session = await getSession(request);

  session.set("jwt", data.jwt);

  const user: User = {
    id: data.user.id,
    firstName: data.user.firstName,
    lastName: data.user.lastName,
    email: data.user.email,
    confirmed: data.user.confirmed,
  };

  if (data.user.accessLevel) {
    user.accessLevel = data.user.accessLevel;
  }

  session.set("user", user);

  return json(
    { ok: true, firstName: data.user.firstName },
    { headers: { "Set-Cookie": await commitSession(session) } },
  );
}
