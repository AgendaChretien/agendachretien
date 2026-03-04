"use client";
import { Popover as PopoverPrimitive } from "@base-ui/react";
import { UserIcon } from "lucide-react";
import { useFetcher } from "react-router";

import { useAuth } from "~/lib/auth";

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
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const popoverHandle = PopoverPrimitive.createHandle();

export function AuthButton() {
  const { user } = useAuth();
  const fetcher = useFetcher();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button size="icon" className="uppercase" variant="outline-primary">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="space-y-1">
              <div className="text-foreground">
                {user.firstName} {user.lastName}
              </div>
              <div>{user.email}</div>
            </DropdownMenuLabel>
            {/* <DropdownMenuItem disabled>Mes infos</DropdownMenuItem> */}
          </DropdownMenuGroup>
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            onClick={() => {
              fetcher.submit(null, { method: "post", action: "/auth/logout" });
            }}
          >
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Popover handle={popoverHandle}>
      <PopoverTrigger
        render={
          <Button variant="secondary" size="icon" className="uppercase">
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
