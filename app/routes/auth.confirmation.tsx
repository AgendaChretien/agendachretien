import { CheckIcon, XIcon } from "lucide-react";
import { data, Navigate, redirect } from "react-router";

import { loginDialogHandle } from "~/components/login-dialog";
import { Button } from "~/components/ui/button";
import { DialogTrigger } from "~/components/ui/dialog";
import { useAuth } from "~/lib/auth";
import client from "~/lib/client.server";

import type { Route } from "./+types/auth.confirmation";

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return { ok: true };
  }

  const { response } = await client.GET("/auth/email-confirmation", {
    params: {
      query: {
        confirmation: code,
      },
    },
  });

  if (!response.ok) {
    return data({ ok: false }, { status: 400 });
  }

  return redirect("/auth/confirmation");
}

export default function AuthConfirmation({ loaderData }: Route.ComponentProps) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  if (!loaderData.ok) {
    return (
      <div className="flex flex-col items-center gap-4 p-4 text-center">
        <XIcon className="size-12 text-red-500" />
        <h1 className="text-xl font-bold">Échec de confirmation</h1>
        <p>Nous n'avons pas pu confirmer votre inscription.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 text-center">
      <CheckIcon className="size-12 text-green-500" />
      <h1 className="text-2xl font-bold">Votre inscription est confirmée !</h1>
      <p className="text-muted-foreground">
        Vous pouvez maintenant vous connecter avec vos identifiants.
      </p>
      <DialogTrigger handle={loginDialogHandle} render={<Button>Se connecter</Button>} />
    </div>
  );
}
