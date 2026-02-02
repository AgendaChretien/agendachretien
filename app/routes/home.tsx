import { useState } from "react";

import { Brand } from "~/components/brand";
import Calendar from "~/components/calendar";
import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";

export function meta() {
  return [
    { title: "Agenda Chrétien" },
    {
      name: "description",
      content: "Les rendez-vous chrétiens à ne pas manquer dans votre ville.",
    },
    {
      rel: "icon",
      href: "favicon-light-16x16.png",
      sizes: "16x16",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      href: "favicon-light-32x32.png",
      sizes: "32x32",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      href: "favicon-dark-16x16.png",
      sizes: "16x16",
      media: "(prefers-color-scheme: dark)",
    },
    {
      rel: "icon",
      href: "favicon-dark-32x32.png",
      sizes: "32x32",
      media: "(prefers-color-scheme: dark)",
    },
  ];
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo className="h-10 fill-primary-8 dark:fill-neutral-12" />
          <div className="flex flex-col items-start">
            <Brand className="h-5 fill-primary-8 dark:fill-neutral-12" />
            <div className="mt-1 rounded-full rounded-tl-none bg-primary-6 px-1.5 text-xs text-trim-both font-black text-background uppercase dark:bg-primary-8">
              Lyon
            </div>
          </div>
        </div>

        <Button size="sm" variant="outline">
          Proposer un événement
        </Button>
      </div>

      <Calendar current={currentDate} onChange={setCurrentDate} />
    </div>
  );
}
