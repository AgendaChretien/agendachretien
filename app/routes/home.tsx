import { Brand } from "~/components/brand";
import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";

export function meta() {
  return [
    { title: "Agenda Chrétien" },
    {
      name: "description",
      content: "Les rendez-vous chrétiens à ne pas manquer dans votre ville.",
    },
  ];
}

export default function Home() {
  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <Logo className="h-10 fill-foreground" />
        <div className="flex flex-col items-start">
          <Brand className="h-5" />
          <div className="mt-1 rounded-full rounded-tl-none bg-primary px-1.5 text-xs font-black text-background uppercase">
            Grenoble
          </div>
        </div>
      </div>

      <Button size="sm" variant="outline">
        Proposer un événement
      </Button>
    </div>
  );
}
