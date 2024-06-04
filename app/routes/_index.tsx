import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Agenda Chrétien" },
    {
      name: "description",
      content:
        "Tous les évènement autour de la foi chrétienne à Lyon et sa région",
    },
  ];
};

export default function Index() {
  return null;
}
