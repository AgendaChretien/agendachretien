import * as v from "valibot";

import client from "./client";
import { transporter } from "./email.server";
import type { paths } from "./openapi";
import { eventFormSchema } from "./post-event";

type PostData = Exclude<
  paths["/events"]["post"]["requestBody"],
  undefined
>["content"]["application/json"]["data"];

function sanitizeTime(time: string) {
  return `${time}:00.000`;
}

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

export function sendEmail(id: string, event: v.InferOutput<typeof eventFormSchema>) {
  let html = `
    <div style="padding: 1rem">
      <h3>Un nouvel événement a été suggéré sur Agenda Chrétien.</h3>
  `;

  for (const [key, value] of Object.entries(event)) {
    html += `<p><strong>${key}:</strong><br />${value}</p>`;
  }

  const editUrl = `${process.env.STRAPI_ADMIN_URL}/content-manager/collectionType/api::event.event/${id}`;

  html += `<p><strong>Lien d'édition:</strong><br /><a href="${editUrl}">${editUrl}</a></p>`;

  html += "</div>";

  return transporter.sendMail({
    from: '"No Reply - Agenda Chrétien" <noreply@agendachretien.fr>',
    to: "admin@agendachretien.fr",
    subject: `Nouvel événement suggéré: ${event.title}`,
    html: html.trim(),
  });
}
