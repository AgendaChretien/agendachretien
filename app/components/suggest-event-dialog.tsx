import { Dialog as DialogPrimitive } from "@base-ui/react";
import * as formisch from "@formisch/react";
import { clsx } from "clsx";
import { Check, Send, TrashIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";

import { useAuth } from "~/lib/auth";
import { filterEmpty } from "~/lib/form";
import {
  documentTypes,
  getEventFormSchema,
  extensions,
  type EventFormSchema,
} from "~/lib/post-event";

import { loginDialogHandle } from "./login-dialog";
import { registerDialogHandle } from "./register-dialog";
import { RequiredBadge } from "./required-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";

export const suggestEventDialogHandle = DialogPrimitive.createHandle();

interface PartProps {
  form: formisch.FormStore<EventFormSchema>;
  disabled: boolean;
}

function formatSize(size: number) {
  if (size < 1024) {
    return `${size} o`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} Ko`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} Mo`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} Go`;
  }
}

function GeneralInfo({ form, disabled }: PartProps) {
  const [multiDays, setMultiDays] = useState(false);

  return (
    <FieldGroup className="gap-4">
      <formisch.Field of={form} path={["title"]}>
        {(field) => (
          <Field>
            <Label htmlFor="title">
              Titre <RequiredBadge />
            </Label>
            <Input
              {...field.props}
              id="title"
              value={field.input ?? ""}
              aria-invalid={!field.isValid}
              disabled={disabled}
              autoComplete="off"
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
                  value={field.input ?? ""}
                  aria-invalid={!field.isValid}
                  disabled={disabled}
                  className="dark:scheme-dark"
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
                    value={field.input ?? ""}
                    aria-invalid={!field.isValid}
                    disabled={disabled}
                    className="dark:scheme-dark"
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
                  value={field.input ?? ""}
                  aria-invalid={!field.isValid}
                  disabled={disabled}
                  className="dark:scheme-dark"
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
                  value={field.input ?? ""}
                  aria-invalid={!field.isValid}
                  disabled={disabled}
                  className="dark:scheme-dark"
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
          disabled={disabled}
          onCheckedChange={(checked) => setMultiDays(checked)}
        />
        <FieldContent>
          <FieldLabel htmlFor="multiDays">Événement sur plusieurs jours</FieldLabel>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}

function Visibility({ form, disabled }: PartProps) {
  const { user } = useAuth();

  const accessLevel = user?.accessLevel ?? 1;

  if (accessLevel <= 1) {
    return null;
  }

  return (
    <FieldSet>
      <FieldLegend variant="label">Visibilité</FieldLegend>
      <FieldDescription>Indiquez qui peut voir votre événement.</FieldDescription>

      <formisch.Field of={form} path={["privacyLevel"]}>
        {(field) => (
          <RadioGroup
            defaultValue="1"
            name={field.props.name}
            value={field.input}
            disabled={disabled}
            onValueChange={(value) => field.onChange(value)}
            inputRef={field.props.ref}
          >
            <Field orientation="horizontal" data-disabled={disabled}>
              <RadioGroupItem value="1" id="public" disabled={disabled} />
              <FieldContent>
                <FieldLabel htmlFor="public" className="font-normal">
                  Public
                </FieldLabel>
                <FieldDescription>
                  Votre événement sera visible par tous les utilisateurs.
                </FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal" data-disabled={disabled}>
              <RadioGroupItem value="2" id="community" disabled={disabled} />
              <FieldContent>
                <FieldLabel htmlFor="community" className="font-normal">
                  Communauté
                </FieldLabel>
                <FieldDescription>
                  Votre événement sera visible par les internautes reconnus comme appartenant à une
                  communauté chrétienne (église, association, etc.).
                </FieldDescription>
              </FieldContent>
            </Field>
            {accessLevel >= 3 && (
              <Field orientation="horizontal" data-disabled={disabled}>
                <RadioGroupItem value="3" id="christians-only" disabled={disabled} />
                <FieldContent>
                  <FieldLabel htmlFor="christians-only" className="font-normal">
                    Engagé
                  </FieldLabel>
                  <FieldDescription>
                    Votre événement sera visible uniquement par les internautes reconnus comme étant
                    engagés dans des activités chrétiennes.
                  </FieldDescription>
                </FieldContent>
              </Field>
            )}
          </RadioGroup>
        )}
      </formisch.Field>
    </FieldSet>
  );
}

function Description({ form, disabled }: PartProps) {
  return (
    <formisch.Field of={form} path={["description"]}>
      {(field) => (
        <Field>
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...field.props}
            id="description"
            className="field-sizing-content min-h-48"
            value={field.input ?? ""}
            disabled={disabled}
          />
          {field.errors && <FieldError>{field.errors[0]}</FieldError>}
        </Field>
      )}
    </formisch.Field>
  );
}

function ExtraDetails({ form, disabled }: PartProps) {
  return (
    <FieldGroup className="gap-4">
      <formisch.Field of={form} path={["address"]}>
        {(field) => (
          <Field>
            <Label htmlFor="address">Adresse de l'événement</Label>
            <Textarea
              {...field.props}
              id="address"
              className="field-sizing-content"
              value={field.input ?? ""}
              disabled={disabled}
            />
            {field.errors && <FieldError>{field.errors[0]}</FieldError>}
          </Field>
        )}
      </formisch.Field>
      <formisch.Field of={form} path={["email"]}>
        {(field) => (
          <Field>
            <Label htmlFor="email">Email de contact</Label>
            <Input
              {...field.props}
              id="email"
              type="email"
              value={field.input ?? ""}
              aria-invalid={!field.isValid}
              disabled={disabled}
            />
            {field.errors && <FieldError>{field.errors[0]}</FieldError>}
          </Field>
        )}
      </formisch.Field>
      <formisch.Field of={form} path={["phone"]}>
        {(field) => (
          <Field>
            <Label htmlFor="phone">Téléphone de contact</Label>
            <Input
              {...field.props}
              id="phone"
              value={field.input ?? ""}
              aria-invalid={!field.isValid}
              disabled={disabled}
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
              value={field.input ?? ""}
              aria-invalid={!field.isValid}
              disabled={disabled}
            />
            {field.errors && <FieldError>{field.errors[0]}</FieldError>}
          </Field>
        )}
      </formisch.Field>
    </FieldGroup>
  );
}

function Documents({ form, disabled }: PartProps) {
  return (
    <FieldSet>
      <FieldLegend>Documents</FieldLegend>
      <FieldDescription>
        Fournissez les documents associés à l'événement (affiche, programme, etc.).
      </FieldDescription>

      <formisch.FieldArray of={form} path={["documents"]}>
        {(fieldArray) => (
          <div className={clsx("flex flex-col gap-2", fieldArray.items.length === 0 && "hidden")}>
            {fieldArray.items.map((item, index) => (
              <formisch.Field key={item} of={form} path={["documents", index]}>
                {(field) => (
                  <>
                    {index > 0 && <FieldSeparator />}
                    <Field>
                      <div className="flex items-center gap-2 rounded-sm">
                        <div className="flex-1 space-y-1">
                          <div>{field.input ? field.input.name : "Choisissez un fichier"}</div>
                          <div className="text-sm text-muted-foreground">
                            {field.input
                              ? formatSize(field.input.size)
                              : ".jpg, .png, .pdf, .doc, .docx"}
                          </div>
                        </div>
                        <Button
                          disabled={disabled}
                          render={<label htmlFor={`document-${index}`} />}
                          variant="secondary"
                        >
                          {field.input ? "Modifier" : "Sélectionner"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          disabled={disabled}
                          onClick={() => formisch.remove(form, { path: ["documents"], at: index })}
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                      <Input
                        {...field.props}
                        id={`document-${index}`}
                        type="file"
                        disabled={disabled}
                        placeholder="foo"
                        className="sr-only"
                        accept={[...extensions, ...documentTypes].join(",")}
                      />
                      {field.errors && <FieldError>{field.errors[0]}</FieldError>}
                    </Field>
                  </>
                )}
              </formisch.Field>
            ))}
          </div>
        )}
      </formisch.FieldArray>

      <Button
        type="button"
        disabled={disabled}
        onClick={() => {
          formisch.insert(form, {
            path: ["documents"],
          });
        }}
      >
        Ajouter un document
      </Button>
    </FieldSet>
  );
}

function SubmitterComment({ form, disabled }: PartProps) {
  return (
    <formisch.Field of={form} path={["submitter_comment"]}>
      {(field) => (
        <Field>
          <Label htmlFor="submitter_comment">Commentaire</Label>
          <FieldDescription>
            Utilisez ce champ pour ajouter des commentaires que vous souhaitez partager avec notre
            équipe.
          </FieldDescription>
          <Textarea
            {...field.props}
            id="submitter_comment"
            className="field-sizing-content"
            value={field.input ?? ""}
            disabled={disabled}
          />
          {field.errors && <FieldError>{field.errors[0]}</FieldError>}
        </Field>
      )}
    </formisch.Field>
  );
}

interface ContentProps {
  form: formisch.FormStore<EventFormSchema>;
}

function Content({ form }: ContentProps) {
  const formId = useId();
  const fetcher = useFetcher<{ ok: boolean }>();

  const disabled = fetcher.state !== "idle";
  // const disabled = true;

  const submitForm: formisch.SubmitHandler<EventFormSchema> = async (values) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(filterEmpty(values))) {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(`${key}[]`, v));
      } else {
        formData.append(key, value);
      }
    }

    await fetcher.submit(formData, {
      action: "/suggest-event",
      method: "post",
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    if (fetcher.data?.ok) {
      formisch.reset(form);
    }

    if (fetcher.state === "idle" && fetcher.data?.ok === false) {
      toast.error(
        "Nous sommes désolés, une erreur est survenue lors de l'envoi de votre proposition. Veuillez réessayer ultérieurement.",
      );
    }
  }, [form, fetcher.state, fetcher.data]);

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
      <formisch.Form
        id={formId}
        of={form}
        onSubmit={submitForm}
        className="space-y-6 divide-y divide-border *:pb-6 *:last:pb-0"
      >
        {[GeneralInfo, Description, ExtraDetails, Documents, Visibility, SubmitterComment].map(
          (Component, index) => (
            <Component key={index} form={form} disabled={disabled} />
          ),
        )}
      </formisch.Form>
      <DialogFooter>
        <DialogClose
          render={
            <Button disabled={disabled} variant="ghost">
              Annuler
            </Button>
          }
        />
        <Button type="submit" disabled={disabled} form={formId}>
          <Send />
          {fetcher.state === "submitting" ? "Envoi..." : "Envoyer"}
        </Button>
      </DialogFooter>
    </>
  );
}

function UnavailableContent() {
  return (
    <div className="flex flex-col gap-6 text-center">
      <div className="text-balance">Vous devez être connecté pour proposer un événement</div>
      <div className="flex flex-col gap-2">
        <DialogTrigger
          handle={loginDialogHandle}
          render={
            <Button
              onClick={() => {
                suggestEventDialogHandle.close();
              }}
            >
              Se connecter
            </Button>
          }
        />
        <DialogTrigger
          handle={registerDialogHandle}
          render={
            <Button
              variant="ghost"
              onClick={() => {
                suggestEventDialogHandle.close();
              }}
            >
              Créer un compte
            </Button>
          }
        />
      </div>
    </div>
  );
}

export function SuggestEventDialog() {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const form = formisch.useForm({
    schema: getEventFormSchema(user?.accessLevel ?? 1),
  });

  return (
    <Dialog
      open={dialogOpen}
      handle={suggestEventDialogHandle}
      onOpenChange={(open) => {
        if (!open && form.isDirty) {
          setConfirmationOpen(true);
        } else {
          formisch.reset(form);
          setDialogOpen(open);
        }
      }}
    >
      <DialogContent keepMounted={false} className={clsx(user ? "max-w-xl!" : "max-w-xs!")}>
        <DialogHeader>
          <DialogTitle>Proposer un événement</DialogTitle>
        </DialogHeader>
        {user ? <Content form={form} /> : <UnavailableContent />}
      </DialogContent>

      <AlertDialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="-mt-1.5 mb-1 text-lg font-medium">
              Votre proposition n'a pas encore été envoyée
            </AlertDialogTitle>
            <AlertDialogDescription className="mb-6 text-base text-gray-600">
              Vous allez perdre les informations que vous avez saisies. Voulez-vous vraiment fermer
              la fenêtre ?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setConfirmationOpen(false);
                  setDialogOpen(false);
                }}
                variant="destructive"
              >
                Fermer quand même
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
