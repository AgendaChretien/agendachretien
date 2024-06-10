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
        <div className="flex h-svh flex-col items-center justify-center gap-12">
          <div className="flex items-center justify-center gap-8">
            <Logo className="h-12" />
            <Brand className="h-6" />
          </div>
          <div className="container mx-auto max-w-[600px] text-center text-xl">
            <span className="italic opacity-50">
              “Mais si nous espérons ce que nous ne voyons pas, nous l’attendons
              avec persévérance.”
            </span>{" "}
            <span className="opacity-30">– Romains 8.25</span>
          </div>
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
