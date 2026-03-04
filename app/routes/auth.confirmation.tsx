import { CheckIcon } from "lucide-react";
import { Navigate } from "react-router";

import { loginDialogHandle } from "~/components/login-dialog";
import { Button } from "~/components/ui/button";
import { DialogTrigger } from "~/components/ui/dialog";
import { useAuth } from "~/lib/auth";

export default function AuthConfirmation() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
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
