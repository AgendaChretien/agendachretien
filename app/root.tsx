import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/assets/tailwind.css?url";
import { Logo } from "./components/Logo";
import { Brand } from "./components/Brand";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    href: "favicon-light-16x16.png",
    sizes: "16x16",
    media: "(prefers-color-scheme: light)",
  },
  {
    rel: "icon",
    href: "favicon-light-32x32.png",
    sizes: "32x32",
    media: "(prefers-color-scheme: light)",
  },
  {
    rel: "icon",
    href: "favicon-dark-16x16.png",
    sizes: "16x16",
    media: "(prefers-color-scheme: dark)",
  },
  {
    rel: "icon",
    href: "favicon-dark-32x32.png",
    sizes: "32x32",
    media: "(prefers-color-scheme: dark)",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <header className="py-8">
          <div className="container mx-auto flex">
            <div className="flex items-center gap-4">
              <Logo className="h-8" />
              <Brand className="h-5" />
            </div>

            <div className="ml-auto">
              <button>Poster un évènement</button>
            </div>
          </div>
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
