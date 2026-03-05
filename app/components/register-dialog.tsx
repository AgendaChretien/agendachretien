"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react";
import * as formisch from "@formisch/react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";

import { registerFormSchema, useAuth } from "~/lib/auth";
import { filterEmpty } from "~/lib/form";
import type { ActionData } from "~/routes/auth.register";

import { loginDialogHandle } from "./login-dialog";
import { RequiredBadge } from "./required-badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
  FieldSeparator,
  FieldDescription,
} from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const registerDialogHandle = DialogPrimitive.createHandle();

function Content() {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);
  const fetcher = useFetcher<ActionData>();

  const form = formisch.useForm({ schema: registerFormSchema });

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      setSuccess(true);
    } else {
      toast.error("Échec de l'inscription. Veuillez vérifier vos informations et réessayer.");
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (user) {
      registerDialogHandle.close();
    }
  }, [user]);

  const submitForm: formisch.SubmitHandler<typeof registerFormSchema> = (values) => {
    fetcher.submit(filterEmpty(values), { method: "post", action: "/auth/register" });
  };

  const isSubmitting = fetcher.state === "submitting";

  if (success) {
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-lg font-semibold">Encore une étape…</h2>
        <p>
          Votre compte a été créé avec succès. Un email de confirmation vous a été envoyé contenant
          un lien qui vous permettra de valider votre inscription. Vous pourrez ensuite vous
          connecter.
        </p>
        <p className="font-bold">⚠️ Pensez à vérifier vos spams.</p>
        <DialogTrigger
          handle={loginDialogHandle}
          render={
            <Button
              onClick={() => {
                registerDialogHandle.close();
              }}
            >
              Se connecter
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Inscription</DialogTitle>
      </DialogHeader>

      <formisch.Form of={form} onSubmit={submitForm}>
        <FieldGroup>
          <formisch.Field of={form} path={["email"]}>
            {(field) => (
              <Field>
                <Label htmlFor={field.props.name}>
                  Email <RequiredBadge />
                </Label>
                <Input
                  {...field.props}
                  id={field.props.name}
                  value={field.input ?? ""}
                  aria-invalid={!field.isValid}
                  disabled={isSubmitting}
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
                <Label htmlFor={field.props.name}>
                  Mot de passe <RequiredBadge />
                </Label>
                <Input
                  {...field.props}
                  id={field.props.name}
                  value={field.input ?? ""}
                  aria-invalid={!field.isValid}
                  disabled={isSubmitting}
                  autoComplete="current-password"
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
                <Label htmlFor={field.props.name}>
                  Confirmer le mot de passe <RequiredBadge />
                </Label>
                <Input
                  {...field.props}
                  id={field.props.name}
                  value={field.input ?? ""}
                  aria-invalid={!field.isValid}
                  disabled={isSubmitting}
                  autoComplete="current-password"
                  type="password"
                  required
                />
                {field.errors && <FieldError>{field.errors[0]}</FieldError>}
              </Field>
            )}
          </formisch.Field>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Pour mieux vous connaître</FieldLegend>
            <FieldDescription></FieldDescription>

            <formisch.Field of={form} path={["firstName"]}>
              {(field) => (
                <Field>
                  <Label htmlFor={field.props.name}>
                    Prénom <RequiredBadge />
                  </Label>
                  <Input
                    {...field.props}
                    id={field.props.name}
                    value={field.input ?? ""}
                    aria-invalid={!field.isValid}
                    disabled={isSubmitting}
                    autoComplete="given-name"
                    type="text"
                    inputMode="text"
                    autoCapitalize="words"
                    spellCheck="false"
                    required
                  />
                  {field.errors && <FieldError>{field.errors[0]}</FieldError>}
                </Field>
              )}
            </formisch.Field>
            <formisch.Field of={form} path={["lastName"]}>
              {(field) => (
                <Field>
                  <Label htmlFor={field.props.name}>
                    Nom <RequiredBadge />
                  </Label>
                  <Input
                    {...field.props}
                    id={field.props.name}
                    value={field.input ?? ""}
                    aria-invalid={!field.isValid}
                    disabled={isSubmitting}
                    autoComplete="family-name"
                    type="text"
                    inputMode="text"
                    autoCapitalize="words"
                    spellCheck="false"
                    required
                  />
                  {field.errors && <FieldError>{field.errors[0]}</FieldError>}
                </Field>
              )}
            </formisch.Field>
            <formisch.Field of={form} path={["phone"]}>
              {(field) => (
                <Field>
                  <Label htmlFor={field.props.name}>Téléphone</Label>
                  <Input
                    {...field.props}
                    id={field.props.name}
                    value={field.input ?? ""}
                    aria-invalid={!field.isValid}
                    disabled={isSubmitting}
                    autoComplete="tel"
                    type="tel"
                    inputMode="tel"
                    autoCapitalize="none"
                    spellCheck="false"
                    required
                  />
                  {field.errors && <FieldError>{field.errors[0]}</FieldError>}
                </Field>
              )}
            </formisch.Field>
            <formisch.Field of={form} path={["church"]}>
              {(field) => (
                <Field>
                  <Label htmlFor={field.props.name}>Église fréquentée</Label>
                  <Input
                    {...field.props}
                    id={field.props.name}
                    value={field.input ?? ""}
                    aria-invalid={!field.isValid}
                    disabled={isSubmitting}
                    type="text"
                    inputMode="text"
                    spellCheck="false"
                    required
                  />
                  {field.errors && <FieldError>{field.errors[0]}</FieldError>}
                </Field>
              )}
            </formisch.Field>
            <formisch.Field of={form} path={["association"]}>
              {(field) => (
                <Field>
                  <Label htmlFor={field.props.name}>Association représentée</Label>
                  <Input
                    {...field.props}
                    id={field.props.name}
                    value={field.input ?? ""}
                    aria-invalid={!field.isValid}
                    disabled={isSubmitting}
                    type="text"
                    inputMode="text"
                    spellCheck="false"
                    required
                  />
                  {field.errors && <FieldError>{field.errors[0]}</FieldError>}
                </Field>
              )}
            </formisch.Field>
            <FieldSeparator />
            <formisch.Field of={form} path={["comment"]}>
              {(field) => (
                <Field>
                  <Label htmlFor={field.props.name}>Commentaire</Label>
                  <Textarea
                    {...field.props}
                    id={field.props.name}
                    value={field.input ?? ""}
                    aria-invalid={!field.isValid}
                    disabled={isSubmitting}
                    className="field-sizing-content"
                    inputMode="text"
                    spellCheck="false"
                    required
                  />
                  <FieldDescription>
                    Si vous avez des besoins spécifiques ou des remarques, n'hésitez pas à les
                    indiquer ici.
                  </FieldDescription>
                  {field.errors && <FieldError>{field.errors[0]}</FieldError>}
                </Field>
              )}
            </formisch.Field>
          </FieldSet>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Inscription..." : "S'inscrire"}
          </Button>
        </FieldGroup>
      </formisch.Form>

      <div className="text-center text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <DialogTrigger
          handle={loginDialogHandle}
          render={
            <button
              type="button"
              onClick={() => {
                registerDialogHandle.close();
              }}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Se connecter
            </button>
          }
        />
      </div>
    </>
  );
}

export function RegisterDialog() {
  return (
    <Dialog handle={registerDialogHandle}>
      <DialogContent className="max-w-lg" keepMounted={false}>
        <Content />
      </DialogContent>
    </Dialog>
  );
}
