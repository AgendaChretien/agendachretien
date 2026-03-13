import { parseFormData } from "@remix-run/form-data-parser";
import * as v from "valibot";

import { requireHumanUser } from "~/lib/botid.server";
import client from "~/lib/client.server";
import { getEventFormSchema } from "~/lib/post-event";
import { postEvent, sendEmail } from "~/lib/post-event.server";
import { getSession } from "~/lib/session.server";

export async function action({ request }: { request: Request }) {
  // Verify the request is from a human user, not a bot
  await requireHumanUser();

  const session = await getSession(request);
  const user = session.get("user");
  const privacyLevel = user?.accessLevel ?? 1;

  try {
    const formData = await parseFormData(request);

    const { issues, output, success } = v.safeParse(
      getEventFormSchema(privacyLevel),
      Object.fromEntries(formData.entries()),
    );

    if (!success) {
      console.error("Failed to validate event form:", JSON.stringify(issues, null, 2));
      return { ok: false };
    }

    const { error, data } = await postEvent(output);

    if (!data || error) {
      console.error("Failed to post event:", error);
      return { ok: false };
    }

    const documents = formData.getAll("documents[]") as File[];

    if (documents.length > 0) {
      const filesFormData = new FormData();
      for (const document of documents) {
        filesFormData.append("files", document);
      }
      filesFormData.append("ref", "api::event.event");
      filesFormData.append("refId", String(data.data.id));
      filesFormData.append("field", "extraPictures");

      // @ts-expect-error
      await client.POST("/upload", {
        body: filesFormData,
      });
    }

    await sendEmail(data.data.documentId, output);
  } catch (error) {
    console.error("Failed to send email notification:", error);
  }

  return { ok: true };
}
