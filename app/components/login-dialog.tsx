"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react";
import * as formisch from "@formisch/react";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";

import { loginFormSchema, useAuth } from "~/lib/auth";

import { registerDialogHandle } from "./register-dialog";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Field, FieldError, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const loginDialogHandle = DialogPrimitive.createHandle();

function Content() {
  const fetcher = useFetcher<{ ok: true; firstName: string }>();
  const { user } = useAuth();

  const form = formisch.useForm({ schema: loginFormSchema });

  useEffect(() => {
    if (fetcher.state !== "idle" || !fetcher.data) {
      return;
    }

    if (fetcher.data.ok) {
      toast.success(`Bonjour ${fetcher.data.firstName}, vous êtes connecté !`);
      loginDialogHandle.close();
    } else {
      toast.error("Échec de la connexion. Veuillez vérifier vos identifiants et réessayer.");
    }
  }, [fetcher.state, fetcher.data, user]);

  const submitForm: formisch.SubmitHandler<typeof loginFormSchema> = async (values) => {
    fetcher.submit(values, { method: "post", action: "/auth/login" });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Connexion</DialogTitle>
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
          <formisch.Field of={form} path={["password"]}>
            {(field) => (
              <Field>
                <Label htmlFor={field.props.name}>Mot de passe</Label>
                <Input
                  {...field.props}
                  id={field.props.name}
                  value={field.input ?? ""}
                  aria-invalid={!field.isValid}
                  disabled={form.isSubmitting}
                  autoComplete="current-password"
                  type="password"
                  required
                />
                {field.errors && <FieldError>{field.errors[0]}</FieldError>}
              </Field>
            )}
          </formisch.Field>

          <Button type="submit" disabled={form.isSubmitting} className="w-full">
            {form.isSubmitting ? "Connexion..." : "Se connecter"}
          </Button>
        </FieldGroup>
      </formisch.Form>

      <div className="text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <DialogTrigger
          handle={registerDialogHandle}
          render={
            <button
              type="button"
              onClick={() => {
                loginDialogHandle.close();
              }}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Créer un compte
            </button>
          }
        />
      </div>
    </>
  );
}

export function LoginDialog() {
  return (
    <Dialog handle={loginDialogHandle}>
      <DialogContent className="sm:max-w-sm" keepMounted={false}>
        <Content />
      </DialogContent>
    </Dialog>
  );
}
