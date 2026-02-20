import { differenceInDays } from "date-fns";
import * as v from "valibot";

export const eventFormSchema = v.pipe(
  v.object({
    title: v.pipe(
      v.string("Le titre est obligatoire"),
      v.minLength(1, "Le titre est obligatoire"),
      v.minLength(3, "Le titre doit contenir au moins 3 caractères"),
    ),
    description: v.optional(v.string()),
    startDate: v.pipe(
      v.string("La date de début est obligatoire"),
      v.isoDate("Format de date invalide"),
    ),
    endDate: v.optional(v.pipe(v.string(), v.isoDate("Format de date invalide"))),
    startTime: v.optional(v.pipe(v.string(), v.isoTime("Format d'heure invalide"))),
    endTime: v.optional(v.pipe(v.string(), v.isoTime("Format d'heure invalide"))),
    address: v.optional(v.string()),
    email: v.optional(v.pipe(v.string(), v.email("Format d'email invalide"))),
    phone: v.optional(v.string()),
    url: v.optional(v.pipe(v.string(), v.url("Format d'URL invalide"))),

    submitter_email: v.pipe(
      v.string("Votre email est obligatoire"),
      v.email("Format d'email invalide"),
    ),
    submitter_comment: v.optional(v.string()),
  }),
  v.forward(
    v.partialCheck(
      [["startDate"], ["endDate"]],
      ({ startDate, endDate }) => endDate === undefined || differenceInDays(endDate, startDate) > 0,
      "La date de fin doit être postérieure au début",
    ),
    ["endDate"],
  ),
  v.forward(
    v.partialCheck(
      [["startTime"], ["endTime"]],
      ({ startTime, endTime }) => endTime === undefined || startTime !== undefined,
      "L'heure de fin ne peut pas être définie si l'heure de début ne l'est pas",
    ),
    ["startTime"],
  ),
  v.forward(
    v.partialCheck(
      [["startTime"], ["endTime"]],
      ({ startTime, endTime }) =>
        endTime === undefined ||
        new Date(`1970-01-01T${endTime}`) >= new Date(`1970-01-01T${startTime}`),
      "L'heure de fin doit être postérieure à l'heure de début",
    ),
    ["endTime"],
  ),
);
