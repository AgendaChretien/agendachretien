import * as v from "valibot";

import { registerFormSchema } from "~/components/auth";
import client from "~/lib/client.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const entry = Object.fromEntries(formData);
  const { issues, output, success } = v.safeParse(registerFormSchema, entry);

  if (!success) {
    console.error("Failed to validate registration form:", issues);
    return { ok: false };
  }

  const { confirmPassword: _, ...values } = output;

  const { data, error } = await client.POST("/auth/local/register", {
    body: { ...values, username: values.email },
  });

  if (error || !data) {
    console.log("Failed to register user:", error);
    return { ok: false };
  }

  return { ok: true };
}

export type ActionData = Awaited<ReturnType<typeof action>>;
