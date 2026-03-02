import { parseFormData } from "@remix-run/form-data-parser";
import * as v from "valibot";

import client from "~/lib/client.server";
import { eventFormSchema } from "~/lib/post-event";
import { postEvent, sendEmail } from "~/lib/post-event.server";

export async function action({ request }: { request: Request }) {
  try {
    const formData = await parseFormData(request);

    const { issues, output, success } = v.safeParse(
      eventFormSchema,
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
