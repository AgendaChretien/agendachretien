"use client";
import { Popover as PopoverPrimitive } from "@base-ui/react";
import { UserIcon } from "lucide-react";

import { useAuth } from "./auth";
import { loginDialogHandle } from "./login-dialog";
import { registerDialogHandle } from "./register-dialog";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const popoverHandle = PopoverPrimitive.createHandle();

export function AuthButton() {
  const { user, logout, isLoading } = useAuth();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button size="icon-lg" className="uppercase">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              {user.firstName} {user.lastName}
            </DropdownMenuLabel>
            <DropdownMenuItem disabled>Mes infos</DropdownMenuItem>
            <DropdownMenuItem disabled>Proposer un évènement</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Se déconnecter</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Popover handle={popoverHandle}>
      <PopoverTrigger
        render={
          <Button variant="secondary" size="icon-lg" className="uppercase" disabled={isLoading}>
            <UserIcon />
          </Button>
        }
      />
      <PopoverContent align="end">
        <div className="text-muted-foreground">Vous n'êtes pas connecté</div>
        <div className="flex flex-col gap-2">
          <DialogTrigger
            handle={loginDialogHandle}
            render={
              <Button
                onClick={() => {
                  popoverHandle.close();
                }}
              >
                Se connecter
              </Button>
            }
          />
          <DialogTrigger
            handle={registerDialogHandle}
            render={
              <Button
                variant="ghost"
                onClick={() => {
                  popoverHandle.close();
                }}
              >
                Créer un compte
              </Button>
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
