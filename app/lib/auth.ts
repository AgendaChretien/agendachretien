import { createContext } from "react";
import { useRouteLoaderData } from "react-router";
import * as v from "valibot";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  confirmed: boolean;
}

interface AuthContext {
  user: User | undefined;
  isAuthenticated: boolean;
  refresh: () => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export const loginFormSchema = v.object({
  email: v.pipe(
    v.string("L'email est requis"),
    v.nonEmpty("L'email est requis"),
    v.email("Format d'email invalide"),
  ),
  password: v.pipe(
    v.string("Le mot de passe est requis"),
    v.nonEmpty("Le mot de passe est requis"),
    v.minLength(8, "Le mot de passe doit contenir au moins 8 caractères"),
  ),
});

export const registerFormSchema = v.pipe(
  v.object({
    firstName: v.pipe(v.string("Le prénom est requis"), v.nonEmpty("Le prénom est requis")),
    lastName: v.pipe(v.string("Le nom est requis"), v.nonEmpty("Le nom est requis")),
    church: v.optional(v.string()),
    association: v.optional(v.string()),
    comment: v.optional(v.string()),
    email: v.pipe(
      v.string("L'email est requis"),
      v.nonEmpty("L'email est requis"),
      v.email("Format d'email invalide"),
    ),
    phone: v.optional(v.string()),
    password: v.pipe(
      v.string("Le mot de passe est requis"),
      v.nonEmpty("Le mot de passe est requis"),
      v.minLength(8, "Le mot de passe doit contenir au moins 8 caractères"),
    ),
    passwordConfirmation: v.string("La confirmation du mot de passe est requise"),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["passwordConfirmation"]],
      ({ password, passwordConfirmation }) => password === passwordConfirmation,
      "Les mots de passe ne correspondent pas",
    ),
    ["passwordConfirmation"],
  ),
);

export const forgotPasswordFormSchema = v.object({
  email: v.pipe(
    v.string("L'email est requis"),
    v.nonEmpty("L'email est requis"),
    v.email("Format d'email invalide"),
  ),
});

export const resetPasswordFormSchema = v.pipe(
  v.object({
    code: v.string("Le code de réinitialisation est requis"),
    password: v.pipe(
      v.string("Le mot de passe est requis"),
      v.nonEmpty("Le mot de passe est requis"),
      v.minLength(8, "Le mot de passe doit contenir au moins 8 caractères"),
    ),
    passwordConfirmation: v.string("La confirmation du mot de passe est requise"),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["passwordConfirmation"]],
      ({ password, passwordConfirmation }) => password === passwordConfirmation,
      "Les mots de passe ne correspondent pas",
    ),
    ["passwordConfirmation"],
  ),
);

export function useAuth() {
  const data = useRouteLoaderData<{ user: User | undefined }>("root");

  return {
    user: data?.user,
    isAuthenticated: !!data?.user,
  };
}
