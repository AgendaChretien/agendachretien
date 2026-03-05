"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react";
import * as formisch from "@formisch/react";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { redirect, useFetcher, useSearchParams } from "react-router";
import { toast } from "sonner";
import * as v from "valibot";

import { loginDialogHandle } from "~/components/login-dialog";
import { Button } from "~/components/ui/button";
import { DialogTrigger } from "~/components/ui/dialog";
import { Field, FieldError } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { resetPasswordFormSchema } from "~/lib/auth";
import client from "~/lib/client.server";

import type { Route } from "./+types/auth.reset-password";

export function loader() {
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const entry = Object.fromEntries(formData);

  const { issues, output, success } = v.safeParse(resetPasswordFormSchema, entry);

  if (!success) {
    console.error("Failed to validate reset password form:", issues);
    return { ok: false };
  }

  const { response, data } = await client.POST("/auth/reset-password", {
    body: output,
  });

  if (!data) {
    console.error("Failed to reset password:", response.statusText);
    return { ok: false };
  }

  return redirect("/auth/reset-password");
}

export default function ResetPassword() {
  const fetcher = useFetcher<{ ok: boolean }>();
  const [searchParams] = useSearchParams();

  const form = formisch.useForm({
    schema: resetPasswordFormSchema,
    initialInput: {
      code: searchParams.get("code") ?? undefined,
    },
  });

  const submitForm: formisch.SubmitHandler<typeof resetPasswordFormSchema> = async (values) => {
    fetcher.reset();
    fetcher.submit(values, { method: "post", action: "/auth/reset-password" });
  };

  const isSubmitting = fetcher.state === "submitting";

  if (!searchParams.has("code")) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 p-4 text-center">
        <CheckIcon className="size-12 text-green-500" />
        <h1 className="text-2xl font-bold">Votre mot de passe a été réinitialisé avec succès</h1>
        <p className="text-muted-foreground">
          Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
        </p>
        <DialogTrigger handle={loginDialogHandle} render={<Button>Se connecter</Button>} />
      </div>
    );
  }

  return (
    <formisch.Form
      of={form}
      onSubmit={submitForm}
      method="post"
      className="mx-auto flex w-full max-w-md flex-1 items-center px-4"
    >
      <div className="w-full space-y-6 rounded-lg border border-border bg-muted p-6">
        <h1 className="mb-12 text-lg font-bold">Réinitialisation du mot de passe</h1>

        {fetcher.data?.ok === false && (
          <FieldError>Échec de la réinitialisation du mot de passe. Veuillez réessayer.</FieldError>
        )}

        <formisch.Field of={form} path={["code"]}>
          {(field) => <input type="hidden" name={field.props.name} value={field.input} />}
        </formisch.Field>

        <formisch.Field of={form} path={["password"]}>
          {(field) => (
            <Field>
              <Label htmlFor={field.props.name}>Nouveau mot de passe</Label>
              <Input
                {...field.props}
                id={field.props.name}
                value={field.input ?? ""}
                aria-invalid={!field.isValid}
                disabled={isSubmitting}
                autoComplete="new-password"
                type="password"
                required
              />
              {field.errors && <FieldError>{field.errors[0]}</FieldError>}
            </Field>
          )}
        </formisch.Field>
        <formisch.Field of={form} path={["passwordConfirmation"]}>
          {(field) => (
            <Field>
              <Label htmlFor={field.props.name}>Confirmer le mot de passe</Label>
              <Input
                {...field.props}
                id={field.props.name}
                value={field.input ?? ""}
                aria-invalid={!field.isValid}
                disabled={isSubmitting}
                type="password"
                required
              />
              {field.errors && <FieldError>{field.errors[0]}</FieldError>}
            </Field>
          )}
        </formisch.Field>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Réinitialisation en cours..." : "Valider"}
        </Button>
      </div>
    </formisch.Form>
  );
}
