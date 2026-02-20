import * as formisch from "@formisch/react";
import { clsx } from "clsx";
import { Check, ChevronRight, Send } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";

import { eventFormSchema } from "~/lib/post-event";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const steps = 4;

function purge(values: Record<string, any>) {
  const result: Record<string, any> = {};

  for (const key in values) {
    if (values[key] !== "" && values[key] !== undefined) {
      result[key] = values[key];
    }
  }

  return result;
}

function RequiredBadge() {
  return (
    <span className="h-4 rounded-full bg-primary px-1.5 text-xs text-primary-foreground/80">
      Requis
    </span>
  );
}

interface StepProps {
  form: formisch.FormStore<typeof eventFormSchema>;
  disabled: boolean;
  className?: string;
  onFocus: () => void;
}

function Step1({ form, disabled, className, onFocus }: StepProps) {
  const [multiDays, setMultiDays] = useState(false);

  console.log(formisch.getAllErrors(form));

  return (
    <FieldGroup className={className}>
      <formisch.Field of={form} path={["title"]}>
        {(field) => (
          <Field>
            <Label htmlFor="title">
              Titre <RequiredBadge />
            </Label>
            <Input
              {...field.props}
              id="title"
              value={field.input}
              aria-invalid={!field.isValid}
              disabled={disabled}
              onFocus={onFocus}
            />
            {field.errors && <FieldError>{field.errors[0]}</FieldError>}
          </Field>
        )}
      </formisch.Field>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4 xs:flex-row">
          <formisch.Field of={form} path={["startDate"]}>
            {(field) => (
              <Field>
                <Label htmlFor="startDate">
                  {multiDays ? "Date de début" : "Date"} <RequiredBadge />
                </Label>
                <Input
                  {...field.props}
                  id="startDate"
                  type="date"
                  value={field.input}
                  aria-invalid={!field.isValid}
                  disabled={disabled}
                  className="dark:scheme-dark"
                  onFocus={onFocus}
                />
              </Field>
            )}
          </formisch.Field>

          {multiDays && (
            <formisch.Field of={form} path={["endDate"]}>
              {(field) => (
                <Field>
                  <Label htmlFor="endDate">Date de fin</Label>
                  <Input
                    {...field.props}
                    id="endDate"
                    type="date"
                    value={field.input}
                    aria-invalid={!field.isValid}
                    disabled={disabled}
                    className="dark:scheme-dark"
                    onFocus={onFocus}
                  />
                </Field>
              )}
            </formisch.Field>
          )}
        </div>

        <div>
          <formisch.Field of={form} path={["startDate"]}>
            {(field) => (field.errors ? <FieldError>{field.errors[0]}</FieldError> : <></>)}
          </formisch.Field>
          <formisch.Field of={form} path={["endDate"]}>
            {(field) => (field.errors ? <FieldError>{field.errors[0]}</FieldError> : <></>)}
          </formisch.Field>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <formisch.Field of={form} path={["startTime"]}>
            {(field) => (
              <Field>
                <Label htmlFor="startTime">Heure de début</Label>
                <Input
                  {...field.props}
                  id="startTime"
                  type="time"
                  value={field.input}
                  aria-invalid={!field.isValid}
                  disabled={disabled}
                  className="dark:scheme-dark"
                  onFocus={onFocus}
                />
              </Field>
            )}
          </formisch.Field>
          <formisch.Field of={form} path={["endTime"]}>
            {(field) => (
              <Field>
                <Label htmlFor="endTime">Heure de fin</Label>
                <Input
                  {...field.props}
                  id="endTime"
                  type="time"
                  value={field.input}
                  aria-invalid={!field.isValid}
                  disabled={disabled}
                  className="dark:scheme-dark"
                  onFocus={onFocus}
                />
              </Field>
            )}
          </formisch.Field>
        </div>

        <div>
          <formisch.Field of={form} path={["startTime"]}>
            {(field) => (field.errors ? <FieldError>{field.errors[0]}</FieldError> : <></>)}
          </formisch.Field>
          <formisch.Field of={form} path={["endTime"]}>
            {(field) => (field.errors ? <FieldError>{field.errors[0]}</FieldError> : <></>)}
          </formisch.Field>
        </div>
      </div>

      <Field orientation="horizontal">
        <Checkbox
          id="multiDays"
          checked={multiDays}
          onCheckedChange={(checked) => setMultiDays(checked)}
        />
        <FieldContent>
          <FieldLabel htmlFor="multiDays">Évènement sur plusieurs jours</FieldLabel>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}

function Step2({ form, disabled, className, onFocus }: StepProps) {
  return (
    <FieldGroup className={className}>
      <formisch.Field of={form} path={["description"]}>
        {(field) => (
          <Field>
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...field.props}
              id="description"
              className="field-sizing-content min-h-96"
              value={field.input}
              disabled={disabled}
              onFocus={onFocus}
            />
            {field.errors && <FieldError>{field.errors[0]}</FieldError>}
          </Field>
        )}
      </formisch.Field>
    </FieldGroup>
  );
}

function Step3({ form, disabled, className, onFocus }: StepProps) {
  return (
    <FieldGroup className={className}>
      <formisch.Field of={form} path={["address"]}>
        {(field) => (
          <Field>
            <Label htmlFor="address">Adresse</Label>
            <Textarea
              {...field.props}
              id="address"
              className="field-sizing-content"
              value={field.input}
              disabled={disabled}
              onFocus={onFocus}
            />
            {field.errors && <FieldError>{field.errors[0]}</FieldError>}
          </Field>
        )}
      </formisch.Field>
      <formisch.Field of={form} path={["email"]}>
        {(field) => (
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              {...field.props}
              id="email"
              type="email"
              value={field.input}
              aria-invalid={!field.isValid}
              disabled={disabled}
              onFocus={onFocus}
            />
            {field.errors && <FieldError>{field.errors[0]}</FieldError>}
          </Field>
        )}
      </formisch.Field>
      <formisch.Field of={form} path={["phone"]}>
        {(field) => (
          <Field>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              {...field.props}
              id="phone"
              value={field.input}
              aria-invalid={!field.isValid}
              disabled={disabled}
              onFocus={onFocus}
            />
            {field.errors && <FieldError>{field.errors[0]}</FieldError>}
          </Field>
        )}
      </formisch.Field>
      <formisch.Field of={form} path={["url"]}>
        {(field) => (
          <Field>
            <Label htmlFor="url">Site internet</Label>
            <Input
              {...field.props}
              id="url"
              value={field.input}
              aria-invalid={!field.isValid}
              disabled={disabled}
              onFocus={onFocus}
            />
            {field.errors && <FieldError>{field.errors[0]}</FieldError>}
          </Field>
        )}
      </formisch.Field>
    </FieldGroup>
  );
}

function Step4({ form, disabled, className, onFocus }: StepProps) {
  return (
    <FieldGroup className={className}>
      <formisch.Field of={form} path={["submitter_email"]}>
        {(field) => (
          <Field>
            <Label htmlFor="submitter_email">
              Votre email <RequiredBadge />
            </Label>
            <Input
              {...field.props}
              id="submitter_email"
              type="email"
              value={field.input}
              aria-invalid={!field.isValid}
              disabled={disabled}
              onFocus={onFocus}
            />
            {field.errors && <FieldError>{field.errors[0]}</FieldError>}
          </Field>
        )}
      </formisch.Field>
      <formisch.Field of={form} path={["submitter_comment"]}>
        {(field) => (
          <Field>
            <Label htmlFor="submitter_comment">Commentaire</Label>
            <Textarea
              {...field.props}
              id="submitter_comment"
              className="field-sizing-content"
              value={field.input}
              disabled={disabled}
              onFocus={onFocus}
            />
            {field.errors && <FieldError>{field.errors[0]}</FieldError>}
          </Field>
        )}
      </formisch.Field>
    </FieldGroup>
  );
}

function Content() {
  const formId = useId();
  const form = formisch.useForm({ schema: eventFormSchema });
  const fetcher = useFetcher<{ ok: boolean }>();
  const [step, setStep] = useState(1);

  const disabled = fetcher.state !== "idle";

  const submitForm: formisch.SubmitHandler<typeof eventFormSchema> = async (values) => {
    await fetcher.submit(purge(values), {
      action: "/?_action=suggest-event",
      method: "post",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.ok === false) {
      toast.error(
        "Nous sommes désolés, une erreur est survenue lors de l'envoi de votre proposition. Veuillez réessayer ultérieurement.",
      );
    }
  }, [fetcher.state, fetcher.data]);

  if (fetcher.data?.ok) {
    return (
      <div className="flex flex-col items-center gap-4 px-4 text-center text-balance">
        <Check className="size-10 text-green-500" />
        <span>
          Merci, votre proposition a bien été envoyée et sera prochainement examinée par notre
          équipe.
        </span>
        <DialogClose render={<Button>Fermer</Button>} />
      </div>
    );
  }

  return (
    <>
      <formisch.Form id={formId} of={form} onSubmit={submitForm} className="-mx-4 overflow-hidden">
        <div
          className="grid w-[calc(100%*var(--columns))] grid-cols-[repeat(var(--columns),1fr)] transition-transform"
          style={
            {
              "--columns": steps,
              transform: `translateX(-${(step - 1) * (100 / steps)}%)`,
            } as React.CSSProperties
          }
        >
          {[Step1, Step2, Step3, Step4].map((Component, index) => (
            <div key={index} className="px-4">
              <Component
                form={form}
                disabled={disabled}
                onFocus={() => {
                  setStep(index + 1);
                }}
              />
            </div>
          ))}
        </div>
      </formisch.Form>
      <DialogFooter>
        <Button
          type="button"
          variant="ghost"
          disabled={disabled || step === 1}
          onClick={() => {
            setStep(step - 1);
          }}
        >
          Retour
        </Button>
        <Button
          type="button"
          disabled={disabled}
          className={clsx(step >= steps && "hidden")}
          onClick={() => {
            setStep(step + 1);
          }}
        >
          Suivant
          <ChevronRight />
        </Button>
        <Button
          type="submit"
          disabled={disabled}
          form={formId}
          className={clsx(step < steps && "hidden")}
        >
          <Send />
          Envoyer
        </Button>
      </DialogFooter>
    </>
  );
}

export function SuggestEvent() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="sm" variant="outline">
            Proposer un évènement
          </Button>
        }
      />

      <DialogContent keepMounted={false}>
        <DialogHeader>
          <DialogTitle>Proposer un évènement</DialogTitle>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
}
