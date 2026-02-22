import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import * as v from "valibot";

import "./app.css";
import type { Route } from "./+types/root";
import { Brand } from "./components/brand";
import { Logo } from "./components/logo";
// import { SuggestEvent } from "./components/suggest-event";
import { Separator } from "./components/ui/separator";
import { Toaster } from "./components/ui/sonner";
import { eventFormSchema } from "./lib/post-event";
import { postEvent, sendEmail } from "./lib/post-event.server";

export const links: Route.LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
];

export function meta() {
  return [
    {
      name: "description",
      content: "Les rendez-vous chrétiens à ne pas manquer dans votre ville.",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ];
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const params = new URLSearchParams(new URL(request.url).search);

  if (params.get("_action") === "suggest-event") {
    const entry = Object.fromEntries(formData);
    const { issues, output, success } = v.safeParse(eventFormSchema, entry);

    if (!success) {
      console.error("Failed to validate event form:", issues);
      return { ok: false };
    }

    const { error, data } = await postEvent(output);

    if (!data || error) {
      console.error("Failed to post event:", error);
      return { ok: false };
    }

    try {
      await sendEmail(data.data.documentId, output);
    } catch (error) {
      console.error("Failed to send email notification:", error);
    }

    return { ok: true };
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark">
        <div className="flex min-h-screen flex-col gap-8">
          <header className="sticky top-0 z-10 mx-auto my-2 flex h-(--header-height) w-full max-w-5xl items-center justify-between px-4 backdrop-blur-sm md:my-4">
            <div className="relative flex items-center gap-4">
              <Link to="/" className="absolute inset-0" aria-label="Retour à la page d'accueil" />
              <Logo className="h-10 fill-primary-8 dark:fill-neutral-12" />
              <div className="flex flex-col items-start">
                <Brand className="h-5 fill-primary-8 dark:fill-neutral-12" />
                <div className="mt-1 rounded-full rounded-tl-none bg-primary-6 px-1.5 text-xs text-trim-both font-black text-background uppercase dark:bg-primary-8">
                  Lyon
                </div>
              </div>
            </div>

            {/* <SuggestEvent /> */}
          </header>

          {children}

          <div className="mt-auto" />
          <Separator className="mt-12" />
          <footer className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-4 xs:flex-row">
            <div className="flex items-center gap-4">
              <Logo className="h-6 fill-primary-8 dark:fill-neutral-12" />
              <Brand className="h-4 fill-primary-8 dark:fill-neutral-12" />
            </div>
            <div className="text-right text-sm text-muted-foreground">
              © {new Date().getFullYear()} Agenda chrétien
            </div>
          </footer>
          <div className="h-16 rounded-t-md bg-primary-4"></div>
        </div>
        <Toaster position="top-center" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (garbage collection)
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
