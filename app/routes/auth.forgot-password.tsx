import { data as json } from "react-router";
import * as v from "valibot";

import { forgotPasswordFormSchema } from "~/lib/auth";
import { requireHumanUser } from "~/lib/botid.server";
import client from "~/lib/client.server";

import type { Route } from "./+types/auth.forgot-password";

export async function action({ request }: Route.ActionArgs) {
  // Verify the request is from a human user, not a bot
  await requireHumanUser();

  const formData = await request.formData();
  const entry = Object.fromEntries(formData);
  const { issues, output, success } = v.safeParse(forgotPasswordFormSchema, entry);

  if (!success) {
    console.error("Failed to validate forgot password form:", issues);
    return { ok: false };
  }

  const { response, data } = await client.POST("/auth/forgot-password", {
    body: {
      email: output.email,
    },
  });

  if (!data) {
    console.error("Failed to send reset password email:", response.statusText);
    return { ok: false };
  }

  return json({ ok: true });
}
