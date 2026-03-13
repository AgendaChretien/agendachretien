import { differenceInDays } from "date-fns";
import * as v from "valibot";

export const documentTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const extensions = [".jpg", ".jpeg", ".png", ".webp", ".pdf", ".doc", ".docx"] as const;

export const getEventFormSchema = (privacyLevel: number) =>
  v.pipe(
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
      privacyLevel: v.optional(
        v.pipe(v.string(), v.toNumber(), v.integer(), v.minValue(1), v.maxValue(privacyLevel)),
        "1",
      ),
      documents: v.optional(
        v.pipe(
          v.array(
            v.pipe(
              v.pipe(
                v.file("Fichier invalide"),
                v.mimeType(documentTypes, "Format de fichier non supporté"),
                v.maxSize(1024 * 1024 * 5, "Veuillez sélectionner un fichier de moins de 5 Mo."),
              ),
            ),
          ),
          v.maxLength(5),
        ),
      ),
      submitter_comment: v.optional(v.string()),
    }),
    v.forward(
      v.partialCheck(
        [["startDate"], ["endDate"]],
        ({ startDate, endDate }) =>
          endDate === undefined || differenceInDays(endDate, startDate) > 0,
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

export type EventFormSchema = ReturnType<typeof getEventFormSchema>;
