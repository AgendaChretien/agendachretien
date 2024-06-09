import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { graphql } from "gql.tada";
import client from "~/api.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Agenda Chrétien" },
    {
      name: "description",
      content:
        "Tous les évènements autour de la foi chrétienne à Lyon et sa région",
    },
  ];
};

const query = graphql(`
  query GetEvents {
    events {
      documentId
      title
    }
  }
`);

export const loader = async () => {
  const { events } = await client.request(query);

  return json({
    events: events.filter(Boolean),
  });
};

export default function Index() {
  const { events } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto">
      {events.map((event) => (
        <div key={event.documentId}>{event.title}</div>
      ))}
    </div>
  );
}
