import { createCookieSessionStorage, type Session } from "react-router";

import type { User } from "~/lib/auth";

type SessionData = {
  jwt: string;
  user: User;
};

type SessionFlashData = {
  error: string;
};

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const sessionStorage = createCookieSessionStorage<SessionData, SessionFlashData>({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function commitSession(session: Session<SessionData>) {
  return sessionStorage.commitSession(session);
}

export async function destroySession(session: Session<SessionData>) {
  return sessionStorage.destroySession(session);
}
