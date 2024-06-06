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
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen w-screen items-center justify-center gap-4">
          <Logo className="h-8" />
          <Brand className="h-5" />
        </div>

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
