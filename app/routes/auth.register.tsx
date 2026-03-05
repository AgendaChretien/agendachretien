import { renderToString } from "react-dom/server";
import * as v from "valibot";

import { registerFormSchema } from "~/lib/auth";
import { requireHumanUser } from "~/lib/botid.server";
import client from "~/lib/client.server";
import { transporter } from "~/lib/email.server";

function sendEmail(id: string, values: v.InferOutput<typeof registerFormSchema>) {
  const editUrl = `${process.env.VITE_STRAPI_URL}/admin/content-manager/collection-types/plugin::users-permissions.user/${id}`;

  const html = renderToString(
    <div>
      <h3>Nouvelle inscription sur Agenda Chrétien</h3>
      <p>
        <strong>Prénom :</strong> {values.firstName}
      </p>
      <p>
        <strong>Nom :</strong> {values.lastName}
      </p>
      <p>
        <strong>Église fréquentée :</strong> {values.church || <em>Non renseigné</em>}
      </p>
      <p>
        <strong>Association :</strong> {values.association || <em>Non renseigné</em>}
      </p>
      <p>
        <strong>Email :</strong> {values.email}
      </p>
      <p>
        <strong>Téléphone :</strong> {values.phone || <em>Non renseigné</em>}
      </p>
      <p>
        <strong>Lien d'édition :</strong> <a href={editUrl}>{editUrl}</a>
      </p>
      <p>
        <strong>Commentaire :</strong>{" "}
        {values.comment ? (
          values.comment.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))
        ) : (
          <em>Non renseigné</em>
        )}
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

export async function action({ request }: { request: Request }) {
  // Verify the request is from a human user, not a bot
  await requireHumanUser();

  const formData = await request.formData();

  const entry = Object.fromEntries(formData);
  const { issues, output, success } = v.safeParse(registerFormSchema, entry);

  if (!success) {
    console.error("Failed to validate registration form:", issues);
    return { ok: false };
  }

  const { passwordConfirmation: _, comment: __, ...values } = output;

  const { data, error } = await client.POST("/auth/local/register", {
    body: { ...values, username: values.email },
  });

  if (error || !data) {
    console.log("Failed to register user:", error);
    return { ok: false };
  }

  try {
    await sendEmail(data.user.documentId, output);
  } catch (error) {
    console.error("Failed to send registration email:", error);
  }

  return { ok: true };
}

export type ActionData = Awaited<ReturnType<typeof action>>;
