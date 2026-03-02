import { renderToString } from "react-dom/server";
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
  submitter_comment: _,
  documents: __,
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

const labels: Record<keyof v.InferOutput<typeof eventFormSchema>, string> = {
  title: "Titre",
  description: "Description",
  startDate: "Date de début",
  endDate: "Date de fin",
  startTime: "Heure de début",
  endTime: "Heure de fin",
  address: "Adresse",
  email: "Email",
  phone: "Téléphone",
  url: "URL",
  documents: "Documents",
  submitter_comment: "Commentaire",
};

function formatLongText(text: string) {
  return text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
}

export function sendEmail(id: string, values: v.InferOutput<typeof eventFormSchema>) {
  const editUrl = `${process.env.VITE_STRAPI_URL}/admin/content-manager/collection-types/api::event.event/${id}`;

  const notDefined = <em>Non renseigné</em>;

  const html = renderToString(
    <div>
      <h3>Nouvelle inscription sur Agenda Chrétien</h3>

      {Object.entries(values).map(([key, value]) => {
        if (Array.isArray(value)) {
          return (
            <p key={key}>
              <strong>{labels[key as keyof typeof labels]}:</strong>{" "}
              {value.length ? (
                <ul>
                  {value.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              ) : (
                notDefined
              )}
            </p>
          );
        }

        return (
          <p key={key}>
            <strong>{labels[key as keyof typeof labels]}:</strong>{" "}
            {value ? formatLongText(value) : notDefined}
          </p>
        );
      })}

      <p>
        <strong>Lien d'édition :</strong> <a href={editUrl}>{editUrl}</a>
      </p>
    </div>,
  );

  return transporter.sendMail({
    from: '"No Reply - Agenda Chrétien" <no-reply@agendachretien.fr>',
    to: process.env.NOTIFICATION_EMAIL,
    subject: `Nouvelle inscription`,
    html: html,
  });
}
