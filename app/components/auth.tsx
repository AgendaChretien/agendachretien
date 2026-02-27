import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import * as v from "valibot";

import client from "~/lib/client";

interface User {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmed: boolean;
}

interface AuthContextType {
  user: User | null;
  jwt: string | null;
  isLoading: boolean;
  login: (
    values: v.InferOutput<typeof loginFormSchema>,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_STORAGE_KEY = "auth";

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
    confirmPassword: v.string("La confirmation du mot de passe est requise"),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      ({ password, confirmPassword }) => password === confirmPassword,
      "Les mots de passe ne correspondent pas",
    ),
    ["confirmPassword"],
  ),
);

interface StoredAuth {
  jwt: string;
  user: User;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const { jwt, user } = JSON.parse(stored) as StoredAuth;
        setJwt(jwt);
        setUser(user);
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveAuth = useCallback((jwt: string, user: User) => {
    if (typeof window === "undefined") return;

    const auth: StoredAuth = { jwt, user };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    setJwt(jwt);
    setUser(user);
  }, []);

  const login = useCallback(
    async (values: v.InferOutput<typeof loginFormSchema>) => {
      try {
        const { data, error } = await client.POST("/auth/local", {
          body: {
            identifier: values.email,
            password: values.password,
          },
        });

        if (error || !data) {
          return {
            success: false,
            error: "Identifiants incorrects. Veuillez réessayer.",
          };
        }

        saveAuth(data.jwt, {
          id: data.user.id,
          documentId: data.user.documentId,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          confirmed: data.user.confirmed,
        });

        toast.success(`Bonjour ${data.user.firstName}, vous êtes connecté !`);

        return { success: true };
      } catch {
        return {
          success: false,
          error: "Une erreur est survenue. Veuillez réessayer.",
        };
      }
    },
    [saveAuth],
  );

  const logout = useCallback(() => {
    if (typeof window === "undefined") return;

    localStorage.removeItem(AUTH_STORAGE_KEY);
    setJwt(null);
    setUser(null);

    toast.success("Vous êtes maintenant déconnecté.");
  }, []);

  return (
    <AuthContext.Provider value={{ user, jwt, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
