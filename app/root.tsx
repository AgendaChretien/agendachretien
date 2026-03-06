import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/react";

import "./app.css";
import { BotIdClient } from "botid/client";
import {} from "botid/client/core";
import { MenuIcon } from "lucide-react";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";

import type { Route } from "./+types/root";
import { AuthButton } from "./components/auth-button";
import { Brand } from "./components/brand";
import { GlobalSpinner } from "./components/global-spinner";
import { LoginDialog } from "./components/login-dialog";
import { Logo } from "./components/logo";
import { RegisterDialog } from "./components/register-dialog";
import { SuggestEventDialog, suggestEventDialogHandle } from "./components/suggest-event-dialog";
import { ThemeProvider, ThemeSwitcher, ThemeSwitcherSubMenu } from "./components/theme";
import { Button } from "./components/ui/button";
import { DialogTrigger } from "./components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Separator } from "./components/ui/separator";
import { Toaster } from "./components/ui/sonner";
import { getSession } from "./lib/session.server";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (garbage collection)
    },
  },
});

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  const user = session.get("user");

  return { user };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('theme') || 'system';
                  var media = window.matchMedia('(prefers-color-scheme: dark)');
                  var isDark = stored === 'dark' || (stored === 'system' && media.matches);

                  document.documentElement.dataset.theme = stored;
                  if (isDark) document.documentElement.classList.add('dark');
                } catch (_) {}
              })();
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9JLCGND4YT"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-9JLCGND4YT');
            `,
          }}
        ></script>

        <Links />

        <BotIdClient
          protect={
            import.meta.env.PROD
              ? [
                  { path: "/auth/login*", method: "POST" },
                  { path: "/auth/register*", method: "POST" },
                  { path: "/auth/forgot-password*", method: "POST" },
                  { path: "/auth/reset-password*", method: "POST" },
                  { path: "/suggest-event*", method: "POST" },
                ]
              : []
          }
        />
      </head>
      <body>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            {isNavigating && <GlobalSpinner />}

            <div className="isolate flex min-h-lvh flex-col gap-8">
              <header className="@container sticky top-0 z-10 mx-auto my-2 flex h-(--header-height) w-full max-w-5xl items-center justify-between bg-background/50 px-6 backdrop-blur-sm md:my-4">
                <div className="relative flex items-center gap-4">
                  <Link
                    to="/"
                    className="absolute inset-0"
                    aria-label="Retour à la page d'accueil"
                  />
                  <Logo className="h-8 fill-primary-8 md:h-10 dark:fill-neutral-12" />
                  <div className="flex flex-col items-start">
                    <Brand className="h-4 fill-primary-8 sm:h-5 dark:fill-neutral-12" />
                    <div className="mt-1 rounded-full rounded-tl-none bg-primary-6 px-1.5 text-xs text-trim-both font-black text-background uppercase dark:bg-primary-8">
                      Lyon
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ThemeSwitcher className="max-sm:hidden" />
                  <DialogTrigger
                    handle={suggestEventDialogHandle}
                    tabIndex={-1}
                    render={<Button className="max-sm:hidden">Proposer un événement</Button>}
                  />
                  <AuthButton />

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" size="icon" className="sm:hidden">
                          <MenuIcon />
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DialogTrigger
                          handle={suggestEventDialogHandle}
                          tabIndex={-1}
                          render={<DropdownMenuItem>Proposer un événement</DropdownMenuItem>}
                        />
                        <ThemeSwitcherSubMenu />
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </header>

              {children}

              <Separator className="mt-auto" />
              <footer className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-4 xs:flex-row">
                <div className="flex items-center gap-3">
                  <Logo className="h-6 fill-muted-foreground" />
                  <Brand className="h-4 fill-muted-foreground" />
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Agenda chrétien
                </div>
              </footer>
              <div className="h-16 rounded-t-md bg-primary-8 dark:bg-primary-4"></div>
            </div>

            <LoginDialog />
            <RegisterDialog />
            <SuggestEventDialog />
          </QueryClientProvider>
        </ThemeProvider>
        <Toaster position="top-center" />
        <ScrollRestoration />
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
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
