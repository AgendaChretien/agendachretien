"use client";
import { Dialog as DialogPrimitive } from "@base-ui/react";
import * as formisch from "@formisch/react";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";

import { forgotPasswordFormSchema, useAuth } from "~/lib/auth";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Field, FieldError, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const forgotPasswordDialogHandle = DialogPrimitive.createHandle();

function Content({ defaultEmail }: { defaultEmail?: string }) {
  const fetcher = useFetcher<{ ok: true; firstName: string }>();
  const { user } = useAuth();

  const form = formisch.useForm({
    schema: forgotPasswordFormSchema,
    initialInput: { email: defaultEmail },
  });

  useEffect(() => {
    if (fetcher.state !== "idle" || !fetcher.data) {
      return;
    }

    if (fetcher.data.ok) {
      toast.success(`Un email de réinitialisation de mot de passe vous a été envoyé !`);
      forgotPasswordDialogHandle.close();
    } else {
      toast.error("Échec de l'envoi de l'email de réinitialisation. Veuillez réessayer.");
    }
  }, [fetcher.state, fetcher.data, user]);

  const submitForm: formisch.SubmitHandler<typeof forgotPasswordFormSchema> = async (values) => {
    fetcher.submit(values, { method: "post", action: "/auth/forgot-password" });
  };

  const isSubmitting = fetcher.state === "submitting";

  return (
    <>
      <DialogHeader>
        <DialogTitle>Mot de passe perdu</DialogTitle>
      </DialogHeader>

      <formisch.Form of={form} onSubmit={submitForm}>
        <FieldGroup>
          <formisch.Field of={form} path={["email"]}>
            {(field) => (
              <Field>
                <Label htmlFor={field.props.name}>Email</Label>
                <Input
                  {...field.props}
                  id={field.props.name}
                  value={field.input ?? ""}
                  aria-invalid={!field.isValid}
                  disabled={form.isSubmitting}
                  autoComplete="username"
                  type="email"
                  inputMode="email"
                  autoCapitalize="none"
                  spellCheck="false"
                  required
                />
                {field.errors && <FieldError>{field.errors[0]}</FieldError>}
              </Field>
            )}
          </formisch.Field>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Envoi en cours..." : "Réinitialiser le mot de passe"}
            </Button>
          </div>
        </FieldGroup>
      </formisch.Form>
    </>
  );
}

function getEmailFromPayload(payload: unknown): string | undefined {
  if (typeof payload === "object" && payload !== null && "email" in payload) {
    const email = (payload as { email?: unknown }).email;
    if (typeof email === "string") {
      return email;
    }
  }
  return undefined;
}

export function ForgotPasswordDialog() {
  return (
    <Dialog handle={forgotPasswordDialogHandle}>
      {({ payload }) => (
        <DialogContent className="sm:max-w-sm" keepMounted={false}>
          <Content defaultEmail={getEmailFromPayload(payload)} />
        </DialogContent>
      )}
    </Dialog>
  );
}
