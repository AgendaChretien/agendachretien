import * as v from "valibot";

import client from "./client";
import type { paths } from "./openapi";

export const eventFormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(1, "Le titre est obligatoire"),
    v.minLength(3, "Le titre doit contenir au moins 3 caractères"),
  ),
  description: v.optional(v.string()),
  startDate: v.pipe(v.string(), v.isoDate()),
  endDate: v.optional(v.string()),
  startTime: v.optional(v.pipe(v.string(), v.isoTime())),
  endTime: v.optional(v.pipe(v.string(), v.isoTime())),
  address: v.optional(v.string()),
  email: v.optional(v.pipe(v.string(), v.email("Format d'email invalide"))),
  phone: v.optional(v.string()),
  url: v.optional(v.pipe(v.string(), v.url("Format d'URL invalide"))),

  submitter_email: v.pipe(v.string(), v.email("Format d'email invalide")),
  submitter_comment: v.optional(v.string()),
});

function sanitizeTime(time: string) {
  return `${time}:00.000`;
}

type PostData = Exclude<
  paths["/events"]["post"]["requestBody"],
  undefined
>["content"]["application/json"]["data"];

export function postEvent({
  // oxlint-disable-next-line no-unused-vars
  submitter_email,
  // oxlint-disable-next-line no-unused-vars
  submitter_comment,
  description,
  ...data
}: v.InferOutput<typeof eventFormSchema>) {
  const postData: PostData = {
    ...data,
  };

  if (data.startTime) {
    postData.startTime = sanitizeTime(data.startTime);
  }
  if (data.endTime) {
    postData.endTime = sanitizeTime(data.endTime);
  }
  if (description) {
    postData.description = description.split("\n\n").map((paragraph) => ({
      type: "paragraph",
      children: [{ type: "text", text: paragraph }],
    }));
  }

  return client.POST("/events", {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    params: {
      query: { status: "draft" },
    },
    body: { data: postData },
  });
}
